const { _filter } = require('lodash/filter');
const { _size } = require('lodash/size');
const { _forEach } = require('lodash/forEach');
const { _isNull } = require('lodash/isNull');
const { _isEmpty } = require('lodash/isEmpty');
const { _has } = require('lodash/has');

function getText(data) {
  let text = null;
  let index = null;
  _forEach(data, (val, key) => {
    if (text === null && typeof val === 'string') {
      text = val;
      index = key;
    }
  });
  return { text, index };
}

function deep(object) {
  var level = 1;
  var key;
  for (key in object) {
    if (!object.hasOwnProperty(key)) continue;
    if (typeof object[key] == 'object') {
      var depth = deep(object[key]) + 1;
      level = Math.max(depth, level);
    }
  }
  return level;
}

function getType(key, value, level = null) {
  let text = '';
  const type = typeof value;
  const datetype = Object.prototype.toString.call(value);

  switch (type) {
    case 'boolean':
      if (value === true) {
        text = `${key}: %c TRUE`;
        console.log(text, 'color: green; font-style: italic');
      } else if (value === false) {
        text = `${key}: %c FALSE`;
        console.log(text, 'color: red; font-style: italic');
      }
      break;

    case 'number':
      text = `${key}: %c ${value}`;
      if (value > 0) console.log(text, 'color: SaddleBrown');
      else console.log(text, 'color: Tomato; font-style: italic');
      break;

    case 'string':
      text = `${key}: %c "${value}"`;
      console.log(text, 'color: blue');
      break;

    case 'function':
      text = `%c${key}()`;
      // one option is not login out funtions
      if (level !== 'DEBUGDATA') console.log(text, 'color: DarkCyan');
      break;

    case 'undefined':
      text = `${key}: %c UNDEFINED`;
      console.log(text, 'color: Chocolate; font-style: italic');
      break;

    case 'null':
      text = `${key}: %c NULL`;
      console.log(text, 'color: Brown; font-style: italic');
      break;

    // objects are a especial case
    case 'object':
      if (datetype === '[object Date]') {
        text = `${key}: %c ${value.toLocaleString()} (date)`;
        console.log(text, 'color: DarkGreen');
        break;
      }
      if (_isNull(value)) {
        text = `${key}: %c NULL`;
        console.log(text, 'color: Brown; font-style: italic');
        break;
      }
      if (_has(value, '_isAMomentObject')) {
        text = `${key}: %c ${value.format('lll')} (moment)`;
        console.log(text, 'color: ForestGreen');
        break;
      }
      if (_isEmpty(value)) {
        text = `${key}: %c EMPTY`;
        console.log(text, 'color: DeepPink');
        break;
      }

      // check how deep the object is, formationd very deep nested objects will
      // will make the the browser slow down
      const deeped = deep(value);
      const unordered = value;
      const ordered = {};
      // try sort out the objects
      Object.keys(unordered)
        .sort()
        .forEach(function(key) {
          ordered[key] = unordered[key];
        });

      if (deeped > 0 && deeped < 10) {
        // Not an arrrayjust go 2 levels deep
        console.groupCollapsed(`${key} [${_size(value)}]`);
        const properties = Object.getOwnPropertyNames(ordered);
        _forEach(properties, o => {
          getType(o, value[o], level);
        });
        console.groupEnd();

        break;
      }

      console.groupCollapsed(`${key} (x)`);
      console.log(value);
      console.groupEnd();
      break;

    default:
      console.log('*TYPE: ', type);
      console.log(key, ':', value);
  }
}

function loop(data, level) {
  if (_size(data) === 1) {
    _forEach(data[0], (val, key) => getType(key, val, level));
  } else {
    _forEach(data, (val, key) => getType(key, val, level));
  }
}

function logOut(data, level = 'DEBUG') {
  const objType = typeof data;

  // if clear them clear the console first the out put the message
  if (level === 'CLEAR') {
    console.clear();
    level = 'DEBUG';
  }

  // if we only got a string jsut print it out
  if (objType === 'string' || objType === 'number') {
    switch (level) {
      case 'ERROR':
        console.error(data, 'color: red');
        break;
      case 'WARNING':
        console.warn(data, 'color: orange');
      case 'INFO':
        console.info(data, 'color: blue');
        break;
      default:
        console.log(data, 'color: blue');
    }
  } else {
    // look for the first string on the arguments and use it as a label
    const Label = getText(data);

    // removed the label from the data structure

    const unordered = _filter(data, o => {
      return o !== Label.text;
    });

    const ordered = {};
    // try sort out the objects
    Object.keys(unordered)
      .sort()
      .forEach(function(key) {
        ordered[key] = unordered[key];
      });

    switch (level) {
      case 'ERROR':
        console.error(`---${Label.text}---`);
        console.groupCollapsed(`---${Label.text}---`);
        loop(ordered, level);
        console.groupEnd();
        break;

      case 'WARNING':
        console.warn(`---${Label.text}---`);
        console.groupCollapsed(`- ${Label.text}`);
        loop(ordered, level);
        console.groupEnd();
        break;

      default:
        console.group(`- ${Label.text}`);
        loop(ordered, level);
        console.groupEnd();
      //console.log(text);
    }
  }
}

const LOGGING_LEVELS = {};
LOGGING_LEVELS.NOTSET = 0;
LOGGING_LEVELS.CLEAR = 10;
LOGGING_LEVELS.DEBUG = 20;
LOGGING_LEVELS.DEBUGDATA = 30;
LOGGING_LEVELS.WARNING = 40;
LOGGING_LEVELS.ERROR = 50;

let INVERTED_LOGGING_LEVELS = {};
Object.keys(LOGGING_LEVELS).map(function(levelName) {
  INVERTED_LOGGING_LEVELS[LOGGING_LEVELS[levelName]] = levelName;
});

let loggingLevel = LOGGING_LEVELS.NOTSET;

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

exports = module.exports = logOut;

exports.LOGGING_LEVELS = LOGGING_LEVELS;
exports.Logging = Logging;
exports.logger = logger;