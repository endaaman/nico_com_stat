const _ = require('lodash')
const co = require('co')
const db = require('./db')

const { Com } = db.init()

co(function*() {
  const docs = yield Com.find()
  for (let doc of docs) {
    yield Com.findByIdAndUpdate(doc.id, doc)
  }

  db.done()
}).catch((err)=>{
  console.error(err)
  db.done()
})

process.on('SIGINT', db.done)
