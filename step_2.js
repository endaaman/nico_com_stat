const _ = require('lodash')
const co = require('co')
const axios = require('axios')

const { run, wait } = require('./utils')


const limit = Number(process.argv[2])
const interval = Number(process.argv[3])

if (!limit || !interval) {
  console.warn('please specify correct arguments')
  process.exit(1)
}

const NOT_FOUND = Symbol()

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

run(function*({ Com }) {
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
    yield wait(interval)
  }
})
