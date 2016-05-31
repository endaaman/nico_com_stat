const mongoose = require('mongoose')
const schemas = require('./schemas')

module.exports = {
  init() {
    mongoose.connect('mongodb://127.0.0.1:27017/nico_1')
    Object.keys(schemas).map(name => {
      mongoose.model(name, schemas[name])
    })

    const models = {}
    Object.keys(schemas).map(name => {
      models[name] = mongoose.model(name)
    })
    return models
  },

  done() {
    mongoose.disconnect()
    console.log('done.')
  }

}
