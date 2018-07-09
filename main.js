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
    __load(__env)
  }

  function __load (env) {
    if (!env) {
      console.error('missing env in settings; check .settings.js file')
      throw new Error('SETTINGS_LOAD_ERROR')
    }
    try {
      __settings = require(path.join(__config.path, env))
    } catch (error) {
      console.error('unable to load settings in', __config.path, error)
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

// @todo Object.freeze(settings)

module.exports = settings
