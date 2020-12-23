const core = require('@actions/core')
const assert = require('nanoassert')
const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const os = require('os')

const creds = JSON.parse(core.getInput('creds'))
assert(Array.isArray(creds), 'creds input must be an array')

let credsString = ''

creds.forEach(cred => {
  assert(cred.machine, 'cred has a machine field')
  assert(cred.login, 'cred has a login field')
  assert(cred.password, 'cred has a password field')

  let credString = ''

  credString += `machine ${cred.machine}\n`
  credString += `login ${cred.login}\n`
  credString += `password ${cred.password}\n`
  credString += '\n'

  credsString += credString
})

const netrc = path.resolve(os.homedir(), '.netrc')

exec(`touch ${netrc}`, (error, stdout, stderr) => {
  console.log(stdout)
  console.error(stderr)
  if (error !== null) {
    console.error(`exec error: ${error}`)
  }
  exec(`chmod 600 ${netrc}`, (error, stdout, stderr) => {
    console.log(stdout)
    console.error(stderr)
    if (error !== null) {
      console.error(`exec error: ${error}`)
    }
    fs.appendFile(netrc, credsString, err => {
      if (err) {
        console.error(err)
        return core.setFailed(err.message)
      }

      console.log(`wrote ${creds.length} credentials to ~/.netrc`)
    })
  })
})
