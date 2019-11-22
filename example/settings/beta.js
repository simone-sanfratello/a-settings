'use strict'

const app = require('./_root')

app.url = 'https://beta.myapp.com'
app.port = 9004
app.log.level = 'info'
app.log.path = '/tmp/myapp.log'

module.exports = app
