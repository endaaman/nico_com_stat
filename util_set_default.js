const _ = require('lodash')
const co = require('co')
const { init, done } = require('./db')

const { Com } = init()

co(function*() {
  const docs = yield Com.find()
  for (let doc of docs) {
    yield Com.findByIdAndUpdate(doc.id, doc)
  }

  done()
}).catch((err)=>{
  console.error(err)
  done()
})

process.on('SIGINT', done)
