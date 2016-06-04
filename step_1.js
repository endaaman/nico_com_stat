const min = 1
const max = 3000000
const sampleSize = Number(process.argv[2])

if (!sampleSize) {
  console.warn('please specify correct arguments')
  process.exit(1)
}

const Q = require('q')
const prompt = require('prompt')

const { run, sampleRange } = require('./utils')
const promptGet = Q.nbind(prompt.get, prompt)


run(function*({ Com }) {
  console.log(`MAX_ID: ${max} MIN_ID: ${min} SAMPLE_SIZE: ${sampleSize}`)
  const { ok } = yield promptGet({
    name: 'ok',
    message: 'ok? [y/n]'
  })
  if (ok !== 'y') {
    console.log('not ok.')
    return
  }

  const docs = yield Com.find({}, {com_id: 1})
  const excludes = docs.map(a => a.com_id)

  const ids = sampleRange(min, max, sampleSize, excludes)
  let conflicts = 0
  for (let comId of ids) {
    let com = new Com({
      com_id: comId
    })
    try {
      yield com.save()
    } catch(e) {
      // sampleRange の第四引数で作製済みのものは除外しているので理論上エラーは発生しない
      conflicts = conflicts + 1
      console.log(`conflict: ${comId}`)
    }
  }
  console.log(`total conflicts: ${conflicts}`)
})
