const app = require('./_root')

app.url = 'https://myapp.com'
app.port = 443
app.log.level = 'info'
app.log.path = '/var/log/myapp.log'

module.exports = app
