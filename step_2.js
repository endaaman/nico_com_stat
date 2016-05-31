const LIMIT = 100
const INTERVAL = 100

/*
  comIdに対応したコミュニティページのHTMLが未取得のものから_idの若い順に、
  LIMIT 回、 INTERVAL msの間隔で取得し、DBに保存する
*/

const _ = require('lodash')
const co = require('co')
const rp = require('request-promise')

const db = require('./db')

const { Com } = db.init()


const limit = Number(process.argv[2]) || LIMIT
const interval = Number(process.argv[3]) || INTERVAL

const NOT_FOUND = Symbol()

function wait(ms = interval) {
  return new Promise((r)=> setTimeout(r, ms))
}

function fetch(comId) {
  return rp(`http://com.nicovideo.jp/community/co${comId}`)
  .then(r => r, err =>  NOT_FOUND)
}



co(function*() {
  let count = 0
  let success = 0
  while (count < limit) {
    count = count + 1
    const com = yield Com.findOne({raw_html: '', not_exist: false})
    console.log(com.com_id)
    const html = yield fetch(com.com_id)

    if (html !== NOT_FOUND) {
      success = success + 1
      com.raw_html = html
      com.not_exist = false
    } else {
      com.raw_html = ''
      com.not_exist = true
    }
    com.fetched_at = Date.now()
    yield com.save()

    console.log(`done: ${success}(${count}) / ${limit}`)
    yield wait()
  }

  db.done()
}).catch((err)=>{
  console.error(err)
  db.done()
})

process.on('SIGINT', db.done)
