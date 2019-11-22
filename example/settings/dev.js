'use strict'

const app = require('./_root')

app.port = 9002
app.log.level = 'trace'
app.log.path = '/tmp/myapp.log'

module.exports = app
