// Author: Pgiani - Page: https://github.com/pgiani/clean_logs.git
import { logOut } from './app/loging';

exports.LOGGING_LEVELS = LOGGING_LEVELS = {
  NOTSET: 0,
  DEBUG: 10,
  DEBUGDATA: 11,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
  CLEAR: 100,
};

var INVERTED_LOGGING_LEVELS = {};
Object.keys(LOGGING_LEVELS).map(function(levelName) {
  INVERTED_LOGGING_LEVELS[LOGGING_LEVELS[levelName]] = levelName;
});

var loggingLevel = LOGGING_LEVELS.NOTSET;

function log(level, data) {
  const levelText = INVERTED_LOGGING_LEVELS[level];
  logOut(data, levelText);
}

const Logging = {};
Logging.log = log;

function logWithLevel(level, message, messagetype) {
  if (loggingLevel <= level) Logging.log(level, message, messagetype);
}

//region [ Logger ]
const logger = {};

/**
 * Sets the logging level
 * @param {@Link LOGGING_LEVELS} level
 */
logger.setLevel = function setLoggingLevel(level) {
  var firstTry = LOGGING_LEVELS[level];
  if (!isNaN(firstTry)) {
    loggingLevel = firstTry;
    return;
  }

  var intLevel = parseInt(level);
  if (!isNaN(intLevel)) loggingLevel = level;
  else throw new Error('Invalid logging level');
};

/**
 * A universal log
 * First arg is the desired logging level
 * Additional arg(s) is the message(s)
 * @param level
 * @param message
 */
logger.log = function(level, message, messagetype) {
  logWithLevel(level, message, messagetype);
};

/**
 * @param {...*} message
 */
logger.debugdata = function logDebug(message) {
  this.log(LOGGING_LEVELS.DEBUGDATA, arguments);
};

/**
 * @param {...*} message
 */
logger.debug = function logDebug(message) {
  this.log(LOGGING_LEVELS.DEBUG, arguments);
};

/**
 * @param {...*} message
 */
logger.clear = function lognoFunc(message) {
  this.log(LOGGING_LEVELS.CLEAR, arguments);
};

/**
 * @param {...*} message
 */
logger.warning = function logWarning(message) {
  this.log(LOGGING_LEVELS.WARNING, arguments);
};

/**
 * @param {...*} message
 */
logger.error = function logError(message) {
  this.log(LOGGING_LEVELS.ERROR, arguments);
};

exports.logger = logger;
//endregion

exports.Logging = Logging;

if (require.main === module) {
  logger.info('hihiii');
}
