const _ = require('lodash')
const co = require('co')
const { init, done } = require('./db')

const { Com } = init()

co(function*() {
  const docs = yield Com.find()
  console.log(_.countBy(docs, (doc)=> doc.status))

  done()
}).catch((err)=>{
  console.error(err)
  done()
})

process.on('SIGINT', done)
