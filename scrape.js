const cheerio = require('cheerio')

function parseDate(str) {
  const matched = str.match(/(\d+)年(\d+)月(\d+)日/)
  return {
    year: Number(matched[1]),
    month: Number(matched[2]),
    date: Number(matched[3])
  }
}

module.exports = function(html) {
  const $ = cheerio.load(html)

  return {
    name: $('h1').text(),
    owner: $('#community_prof_frm2 .r a strong').first().text(),
    created_at: parseDate($('#community_prof_frm2 .r strong').first().text())
  }
}
