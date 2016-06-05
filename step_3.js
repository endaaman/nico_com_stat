const { run } = require('./utils')
const scrape = require('./scrape')

run(function*({ Com }) {
  const docs = yield Com.find({raw_html: {$ne: ''}})
  for (let doc of docs) {
    // console.log(doc.stats)
    const stats = scrape(doc.raw_html)
    yield Com.findByIdAndUpdate(doc._id, {$set: {stats: stats}})
  }
})
