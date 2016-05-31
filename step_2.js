const LIMIT = 100
const INTERVAL = 100

/*
  comIdに対応したコミュニティページのHTMLが未取得のものから_idの若い順に、
  LIMIT 回、 INTERVAL msの間隔で取得し、DBに保存する
*/

const _ = require('lodash')
const co = require('co')
const axios = require('axios')

const { init, done } = require('./db')

const { Com } = init()


const limit = Number(process.argv[2]) || LIMIT
const interval = Number(process.argv[3]) || INTERVAL

const NOT_FOUND = Symbol()

function wait(ms = interval) {
  return new Promise((r)=> setTimeout(r, ms))
}

function fetch(comId) {
  return axios.get(`http://com.nicovideo.jp/community/co${comId}`, {
    headers: {
      'User-Agent': 'dwango',
      'Accept-Language': 'ja'
    }
  }).then(res => ({
    status: res.status,
    html: res.data
  }), e => ({
    status: e.status
  }))
}



co(function*() {
  let count = 0
  let success = 0
  while (count < limit) {
    count = count + 1
    const com = yield Com.findOne({status: 0})

    if (!com) {
      console.log('Congrat!! All sapmle communities stat are acquired!!')
      break
    }
    const res = yield fetch(com.com_id)

    if (res.html) {
      success = success + 1
      com.raw_html = res.html
    } else {
      com.raw_html = ''
    }
    com.status = res.status
    com.fetched_at = Date.now()
    yield com.save()

    console.log(`co${com.com_id} -> ${res.status} : ${success}(${count})/${limit}`)
    yield wait()
  }

  done()
}).catch((err)=>{
  console.error(err)
  done()
})

process.on('SIGINT', done)
