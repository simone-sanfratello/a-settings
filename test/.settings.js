const path = require('path')

module.exports = {
  path: path.join(__dirname, 'envs'),
  root: '_root.js',
  processEnv: 'NODE_ENV',
  argv: 2
}