const _ = require('lodash')
const { run } = require('./utils')

run(function*({ Com }) {
  const docs = yield Com.find()
  const stats = _.countBy(docs, doc => doc.status)
  console.log(`whole: ${docs.length}`)
  for (let i in stats) {
    console.log(`${i}: ${stats[i]}`)
  }

})
