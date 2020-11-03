'use strict'

const http = require('http')
const settings = require('a-settings')

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.write(`Hey, I am ${settings.env} server`)
  response.end()
}).listen(settings.port)
