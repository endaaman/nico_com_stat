const _ = require('lodash')
const { run } = require('./utils')

run(function*({ Com }) {
  const docs = yield Com.find({status: {$gt: 100}})
  const stats = _.countBy(docs, doc => doc.status)
  console.log(`whole: ${docs.length}`)
  for (let i in stats) {
    const ratio = _.round((stats[i] / docs.length) * 100, 2)
    console.log(`${i}: ${stats[i]} (${ratio}%)`)
  }
})
