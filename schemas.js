const mongoose = require('mongoose')


const Com = new mongoose.Schema({
  com_id: {
    type: Number,
    required: true,
    index: {
      unique: true
    }
  },
  raw_html: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: 0
  },
  fetched_at: {
    type: Date,
    default: null
  },
  stats: {
    name: String,
    owner_id: Number,
    owner_name: String,
    created_at: {
      year: Number,
      month: Number,
      date: Number,
    },
    level: Number,
    member_count: Number,
    tags: [ String ],
    description: String,
  }
})

module.exports = { Com }

// return {
//   name: $('h1').text(),
//   owner_id: Number(last(($('#community_prof_frm2 .r a').attr('href')).split('/'))),
//   owner_name: $('#community_prof_frm2 .r a strong').first().text(),
//   created_at: parseDate($('#community_prof_frm2 .r strong').first().text()),
//   level: Number($('#cbox_profile tr td strong').eq(0).text()),
//   member_count: Number($('#cbox_profile tr td strong').eq(3).text()),
//   tags: tags,
//   description: $('.cnt').text()
// }
