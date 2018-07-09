
node.js multi-env settings

### why

NO

if(env == debug) {

} else {

}





load .settings.js in process dir, else use defaults

define defaults

verbosity: argv contains --verbose

use examples

node app.js dev
node app.js beta
ENV=production node app.js

travisCI nodejs v 8, 9 ,10

.settings file

doc

engine >= 8

### TEST

- load from .settings.js
- fail load .settings.js, use default
- load from package.json
- check freeze
settings.env = 'eee'
console.log(settings.env)
settings.eeenv = '123'
console.log(settings.eeenv)

### security

settings are not hackable on runtime - readonly

### TODO
- [ ] load settings from `package.json`
- [ ] add events
  - onLoad
  - onError
  
