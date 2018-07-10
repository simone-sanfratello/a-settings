const http = require('http')
const settings = require('settings')

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write(settings.env)
  res.end()
}).listen(settings.port)
