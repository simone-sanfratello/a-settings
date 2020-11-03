'use strict'

const path = require('path')

const DEFAULT = {
  path: path.join(process.cwd(), 'settings'),
  processEnv: 'NODE_ENV',
  argv: 2,
  configFile: '.settings.js'
}

function deepFreeze (object) {
  Object.freeze(object)
  if (object === undefined) {
    return object
  }

  Object.getOwnPropertyNames(object).forEach(function (prop) {
    if (object[prop] !== null &&
      (typeof object[prop] === 'object' || typeof object[prop] === 'function') &&
      !Object.isFrozen(object[prop])) {
      deepFreeze(object[prop])
    }
  })

  return object
};

const Settings = function () {
  let _env
  let _settings
  let _config
  let _verbose

  function _init () {
    // load .settings.js file if any
    const _configFile = path.join(process.cwd(), DEFAULT.configFile)
    try {
      _config = require(_configFile)
    } catch (error) {
      _verbose && console.warn('settings config file', _configFile, 'not found, use defaults')
      _config = DEFAULT
    }

    _env = process.env[_config.processEnv] || process.argv[_config.argv]
    _verbose = process.argv.indexOf('--verbose')
    _load(_env)
  }

  function _load (env) {
    if (!env) {
      _verbose && console.warn('missing env in settings > use "_root" settings')
      _env = env = '_root'
    }
    try {
      _settings = require(path.join(_config.path, env))
    } catch (error) {
      _verbose && console.error('unable to load settings', env, ' in', _config.path, error)
      throw new Error('SETTINGS_LOAD_ERROR')
    }
  }

  _init()

  return deepFreeze({
    env: _env,
    ..._settings
  })
}

const settings = new Settings()

module.exports = settings
