const MIN_ID = 1000000
const MAX_ID = 3000000
const SAMPLE_SIZE = 1000

/*
  MIN_ID から MAX_ID の範囲のidから、 SAMPLE_SIZE のサンプル数をidを選択し、
  そのidを持つコレクションを作成する。
*/

const _ = require('lodash')
const co = require('co')
const db = require('./db')

const { Com } = db.init()

function pickupRandomIds(minId, maxId, size) {
  return _.chain(_.range(minId, maxId))
    .sampleSize(size)
    .sortBy((a)=> a)
    .value()
}


co(function*() {
  // const ids = pickupRandomIds(10, 100, 10)
  const ids = pickupRandomIds(MIN_ID, MAX_ID, SAMPLE_SIZE)
  for (let comId of ids) {
    console.log(comId)
    let com = new Com({
      com_id: comId
    })
    yield com.save()
  }

  db.done()
}).catch((err)=>{
  console.error(err)
  db.done()
})

process.on('SIGINT', db.done)
