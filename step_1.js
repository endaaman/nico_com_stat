const min = Number(process.argv[2])
const max = Number(process.argv[3])
const size = Number(process.argv[4])

if (!min || !max || !size) {
  console.warn('please specify correct arguments')
  process.exit(1)
}

const Q = require('q')
const co = require('co')
const prompt = require('prompt')

const { run, sampleRange } = require('./utils')
const promptGet = Q.nbind(prompt.get, prompt)


run(function*({ Com }) {
  console.log(`MAX_ID: ${max} MIN_ID: ${min} SAMPLE_SIZE: ${size}`)
  const { ok } = yield promptGet({
    name: 'ok',
    message: 'ok? [y/n]'
  })
  if (ok !== 'y') {
    console.log('ok, no ok.')
    return
  }

  const ids = sampleRange(min, max, size)
  let conflicts = 0
  for (let comId of ids) {
    let com = new Com({
      com_id: comId
    })
    try {
      yield com.save()
    } catch(e) {
      conflicts = conflicts + 1
      console.log(`conflict: ${comId}`)
    }
  }
  console.log(`total conflicts: ${conflicts}`)
})
