const { run } = require('./utils')
const scrape = require('./scrape')

run(function*({ Com }) {
  const docs = yield Com.find({raw_html: {$ne: ''}})
  for (let doc of docs) {
    const stats = scrape(doc.raw_html)
    doc.stats = stats
    yield doc.save()
  }
})
