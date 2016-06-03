const { run } = require('./utils')

run(function*({ Com }) {
  const docs = yield Com.find()
  for (let doc of docs) {
    yield Com.findByIdAndUpdate(doc.id, doc)
  }
})
