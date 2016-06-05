const cheerio = require('cheerio')

function parseDate(str) {
  const matched = str.match(/(\d+)年(\d+)月(\d+)日/)
  return {
    year: Number(matched[1]),
    month: Number(matched[2]),
    date: Number(matched[3])
  }
}

function last(a){
  return a[a.length-1]
}

module.exports = function(html) {
  const $ = cheerio.load(html)
  
  const elTags = $('#cbox_profile tr').eq(4).find('a')
  const tags = []
  let i = 0
  while (i < elTags.get().length) {
    tags.push(elTags.eq(i).text())
    i = i + 1
  }

  return {
    name: $('h1').text(),
    owner_id: Number(last(($('#community_prof_frm2 .r a').attr('href')).split('/'))),
    owner_name: $('#community_prof_frm2 .r a strong').first().text(),
    created_at: parseDate($('#community_prof_frm2 .r strong').first().text()),
    level: Number($('#cbox_profile tr td strong').eq(0).text()),
    member_count: Number($('#cbox_profile table tr').eq(2).find('strong').text()),
    tags: tags,
    description: $('.cnt2').text().trim()
  }
}
