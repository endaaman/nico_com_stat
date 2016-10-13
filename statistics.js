const _ = require('lodash')
const Q = require('q')

function max(data) {
  return _.reduce(data, (max, x)=> max < x ? x : max, data[0])
}

function min(data) {
  return _.reduce(data, (min, x)=> min > x ? x : min, data[0])
}

function sturges(data) {
  const m = 1 + Math.log(data.length) / Math.log(2)
  const c = (max(data) - min(data)) / m
  return { m, c }
}

function average(data) {
  const count = data.length
  return _.reduce(data, (sum, x)=> sum + x, 0) / count
}

function dispersion(data) {
  const count = data.length
  const ave = average(data)
  return _.reduce(data, (sum, x)=> {
    let abmo = x - ave // abmodality
    return sum + abmo * abmo
  }, 0) / count
}

function standardDeviation(data) {
  const disp = dispersion(data)
  return Math.sqrt(disp)
}

function standardizedVariate(x, data) {
  return (x - average(data)) / standardDeviation(data)
}

function deviation(x, data) {
  return 50 + 10 * standardizedVariate(x, data)
}

module.exports = {
  sturges,
  average,
  dispersion,
  standardDeviation,
  standardizedVariate,
  deviation
}
