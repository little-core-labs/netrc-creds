const core = require('@actions/core')
const assert = require('nanoassert')
const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const os = require('os')

const machine = core.getInput('machine')
if (machine) assert(typeof machine === 'string', 'machine input must be a string')
const login = core.getInput('login')
if (login) assert(typeof login === 'string', 'login input must be a string')
const password = core.getInput('password')
if (password) assert(typeof password === 'string', 'password input must be a string')

const credsInput = core.getInput('creds')

const creds = credsInput ? JSON.parse(credsInput) : []

assert(Array.isArray(creds), 'creds input must be an array')

assert(creds || machine || login || password, 'you must pass a machine,login,password combo, or a creds JSON field.')

let credsString = ''

if (machine || login || password) {
  assert(password != null, 'password must be defined')
  assert(login != null, 'login must be defined')
  assert(machine != null, 'machine must be defined')

  let credString = ''

  credString += `machine ${machine}\n`
  credString += `login ${login}\n`
  credString += `password ${password}\n`
  credString += '\n'

  credsString += credString
}

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

      console.log('wrote credentials to ~/.netrc')
    })
  })
})
