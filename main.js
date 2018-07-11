const path = require('path')

const DEFAULT = {
  path: path.join(process.cwd(), 'settings'),
  processEnv: 'NODE_ENV',
  argv: 2,
  configFile: '.settings.js'
}

/**
 * singleton module
 */
const Settings = function () {
  let __env
  let __settings
  let __config
  let __verbose

  function __init () {
    // load .settings.js file
    const __configFile = path.join(process.cwd(), DEFAULT.configFile)
    try {
      __config = require(__configFile)
    } catch (error) {
      console.warn('settings config file', __configFile, 'not found, use defaults')
      __config = DEFAULT
    }

    __env = process.env[__config.processEnv] || process.argv[__config.argv]
    __verbose = process.argv.indexOf('--verbose')
    __load(__env)
  }

  function __load (env) {
    if (!env) {
      __verbose && console.warn('missing env in settings > use _root settings')
      __env = env = '_root'
    }
    try {
      __settings = require(path.join(__config.path, env))
    } catch (error) {
      __verbose && console.error('unable to load settings', env, ' in', __config.path, error)
      throw new Error('SETTINGS_LOAD_ERROR')
    }
  }

  __init()

  return Object.freeze({
    env: __env,
    ...__settings
  })
}

const settings = new Settings()

module.exports = settings
