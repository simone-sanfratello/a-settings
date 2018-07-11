# a-settings

[![NPM Version](http://img.shields.io/npm/v/a-settings.svg?style=flat)](https://www.npmjs.org/package/a-settings)
[![NPM Downloads](https://img.shields.io/npm/dm/a-settings.svg?style=flat)](https://www.npmjs.org/package/a-settings)
[![JS Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

node.js settings provider for different environments

## Purpose

- Declare env in `process.argv` or in `NODE_ENV`
- DRY settings using root configuration and env customization
- Improve security avoiding settings runtime reassignment or injection
- Stop doing this, it's not maintanable
````js
if(process.env.NODE_ENV == 'debug') {
  port = 1234
} else {
  port = 80
}
````

## Quick start

In `app.js` and in any other .js file get settings from `settings/$env`  
`settings.env` contains the env name
````js
const http = require('http')
const settings = require('a-settings')

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.write(`Hey, I am ${settings.env} server`)
  response.end()
}).listen(settings.port)
````

declare settings in `settings/_root.js`
````js
const app = {
  url: '',
  name: 'myapp',
  port: 9001,
  log: {
    level: 'info',
    path: '/var/log/myapp'
  }
}

module.exports = app
````

and in `settings/dev.js`
````js
const app = require('./_root')

app.port = 9002
app.log.level = 'trace'
app.log.path = '/tmp/myapp.log'

module.exports = app
````

in `settings/beta.js`
````js
const app = require('./_root')

app.port = 9003
app.url = 'https://beta.myapp.com',

module.exports = app
````

then run `app.js` with `dev` settings
````bash
node main.js dev
````

or run `app.js` using `beta` settings
````bash
node main.js beta
````

see [example/](./example/)

### Options

Default options are

**path** directory containing env settings files, default is `/settings` in process current working  
**processEnv** process env name, default is `NODE_ENV`, so `NODE_ENV=beta node app.jsv`  
**argv** process argv index, default is `2` (the third) so `node app.js dev`  

#### NOTES
- If `$env` is provided in both ways as `NODE_ENV=beta node app.js dev`, env var wins, so in this case will be `beta`   
- If `$env` is not provided, default is `_root`

### Custom Options
to use custom otions, use `.settings.js` in app root directory

````js
const path = require('path')

module.exports = {
  path: path.join(__dirname, 'settings'), 
  processEnv: 'NODE_ENV',
  argv: 2
}
````

#### verbosity
To enable verbosity, add `--verbose` at process
````bash
node app.js alpha --verbose
````

### TODO
- [ ] add travis
- [ ] check node engine >= 8
- [ ] load options from `package.json`

## License

The MIT License (MIT)

Copyright (c) 2018 [braces lab](https://braceslab.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
