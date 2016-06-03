const _ = require('lodash')
const co = require('co')
const mongoose = require('mongoose')

const config = require('./config')
const schemas = require('./schemas')


function run(gen) {
  co(function*() {
    mongoose.connect(config.dbPath)
    Object.keys(schemas).map(name => {
      mongoose.model(name, schemas[name])
    })

    const models = {}
    Object.keys(schemas).map(name => {
      models[name] = mongoose.model(name)
    })
    yield co(gen.bind(null, models))
    done()
  }).catch((err)=>{
    console.error(err)
    done()
  })
  process.on('SIGINT', done)
}

function done() {
  mongoose.disconnect()
  console.log('done.')
}

function wait(ms = 1000) {
  return new Promise((r)=> setTimeout(r, ms))
}

function sampleFromPool(pool, size) {
  return _.chain(pool)
    .sampleSize(size)
    .sortBy((a)=> a)
    .value()
}

function sampleRange(minId, maxId, size) {
  return sampleFromPool(_.range(minId, maxId), size)
}

module.exports = { run, wait, sampleFromPool, sampleRange }
