// Author: Pgiani - Page: https://github.com/pgiani/clean_logs.git
import logOut from './loging';

export const LOGGING_LEVELS = {
  NOTSET: 0,
  CLEAR: 10,
  DEBUG: 20,
  DEBUGDATA: 30,
  WARNING: 40,
  ERROR: 50,
};

let INVERTED_LOGGING_LEVELS = {};
Object.keys(LOGGING_LEVELS).map(function(levelName) {
  INVERTED_LOGGING_LEVELS[LOGGING_LEVELS[levelName]] = levelName;
});

let loggingLevel = LOGGING_LEVELS.NOTSET;

function log(level, data) {
  const levelText = INVERTED_LOGGING_LEVELS[level];
  logOut(data, levelText);
}

export const Logging = {};
Logging.log = log;

function logWithLevel(level, message, messagetype) {
  if (loggingLevel <= level) Logging.log(level, message, messagetype);
}

//region [ Logger ]
export const logger = {};

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
