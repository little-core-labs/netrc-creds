// const exec = require('child_process').exec
const core = require('@actions/core')
// const path = require('path')

// const scriptPath = path.resolve(__dirname, 'run.sh')

const creds = core.getInput('creds')

console.log(creds)

// exec(`${scriptPath} ${version}`, (error, stdout, stderr) => {
//   console.log(stdout)
//   console.log(stderr)
//   if (error !== null) {
//     console.log(`exec error: ${error}`)
//   }
// })
