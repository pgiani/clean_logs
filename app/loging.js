import _isNull from 'lodash/isNull';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _isArray from 'lodash/isArray';
import _keys from 'lodash/keys';
import _filter from 'lodash/filter';
import _ from 'lodash';
import moment from 'moment';
import { getText } from './getText';

function deep(object) {
  return 10;
  try {
    let level = 1;
    var key;
    for (key in object) {
      if (!object.hasOwnProperty(key)) continue;
      if (typeof object[key] === 'object') {
        const depth = deep(object[key]) + 1;
        level = Math.max(depth, level);
      }
    }
    return level;
  } catch (e) {
    console.error(e);
    return 10;
  }
}

function ls(key, value) {
  let text = '';
  const type = typeof value;
  const datetype = Object.prototype.toString.call(value);
  // console.log('key', key, 'value', value);
  let deeped;
  switch (type) {
    case 'boolean':
      if (value === true) {
        text = `${key}: %c TRUE`;
        console.log(text, 'color: green');
      } else if (value === false) {
        text = `${key}: %c FALSE`;
        console.log(text, 'color: red');
      }
      break;
    case 'number':
      text = `${key}: %c ${value}`;
      if (value > 0) console.log(text, 'color: SaddleBrown');
      else console.log(text, 'color: Tomato ');
      break;
    case 'string':
      text = `${key}: %c ${value}`;
      console.log(text, 'color: blue');
      break;
    case 'function':
      text = `%c${key}()`;
      console.log(text, 'color: DarkCyan');

      break;
    case 'undefined':
      text = `${key}: %c UNDEFINED`;
      console.log(text, 'color: Chocolate');
      break;
    case 'null':
      text = `${key}: %c NULL`;
      console.log(text, 'color: Brown');
      break;
    case 'object':
      if (datetype === '[object Date]') {
        text = `*${key}: %c ${moment(value).format('lll')}`;
        console.log(text, 'color: DarkGreen');
        break;
      }
      if (_isNull(value)) {
        text = `${key}: %c NULL`;
        console.log(text, 'color: Brown');
        break;
      }
      if (moment.isMoment(value)) {
        text = `${key}: %c ${value.format('lll')}`;
        console.log(text, 'color: ForestGreen');
        break;
      }

      if (_isEmpty(value)) {
        text = `${key}: %c EMPTY `;
        console.log(text, 'color: DeepPink');
        break;
      }
      console.info(key, ':', value);
      break;
    default:
      console.log('*TYPE: ', type);
      console.log(key, ':', value);
  }
}
function lc(key, value) {
  let text = '';
  const type = typeof value;
  const datetype = Object.prototype.toString.call(value);
  let deeped;
  switch (type) {
    case 'boolean':
      if (value === true) {
        text = `${key}: %c TRUE`;
        console.log(text, 'color: green');
      } else if (value === false) {
        text = `${key}: %c FALSE`;
        console.log(text, 'color: red');
      }
      break;
    case 'number':
      text = `${key}: %c ${value}`;
      if (value > 0) console.log(text, 'color: SaddleBrown');
      else console.log(text, 'color: Tomato ');
      break;
    case 'string':
      text = `${key}: %c ${value}`;
      console.log(text, 'color: blue');
      break;
    case 'function':
      break;
    case 'undefined':
      text = `${key}: %c UNDEFINED`;
      console.log(text, 'color: Chocolate');
      break;
    case 'null':
      text = `${key}: %c NULL`;
      console.log(text, 'color: Brown');
      break;
    case 'object':
      if (datetype === '[object Date]') {
        text = `*${key}: %c ${moment(value).format('lll')}`;
        console.log(text, 'color: DarkGreen');
        break;
      }
      if (_isNull(value)) {
        text = `${key}: %c NULL`;
        console.log(text, 'color: Brown');
        break;
      }
      if (moment.isMoment(value)) {
        text = `${key}: %c ${value.format('lll')}`;
        console.log(text, 'color: ForestGreen');
        break;
      }
      if (_isEmpty(value)) {
        text = `${key}: %c EMPTY`;
        console.log(text, 'color: DeepPink');
        break;
      }
      deeped = deep(value);
      if (_isArray(value) && deep < 10) {
        console.log('Array ', key, ':');
        console.table(value);
        break;
      }
      if (deeped < 3) {
        console.groupCollapsed(key);
        _forEach(value, (vals, keys) => {
          lc(keys, vals);
        });
        console.groupEnd();
        break;
      }
      console.info(key, ':', value);
      break;
    default:
      console.log('*TYPE: ', type);
      console.log(key, ':', value);
  }
}
export function l(key, value) {
  let text = '';
  const type = typeof value;
  const datetype = Object.prototype.toString.call(value);
  //  const logdata =
  //   'datetype' + datetype + 'type' + type + ' - key' + key + ' - value' + value;

  let deeped;
  switch (type) {
    case 'boolean':
      if (value === true) {
        text = `${key}: %c TRUE`;
        console.log(text, 'color: green');
      } else if (value === false) {
        text = `${key}: %c FALSE`;
        console.log(text, 'color: red');
      }
      break;
    case 'number':
      text = `${key}: %c ${value}`;
      if (value > 0) console.log(text, 'color: SaddleBrown');
      else console.log(text, 'color: Tomato ');
      break;
    case 'string':
      text = `${key}: %c ${value}`;
      console.log(text, 'color: blue');
      break;
    case 'function':
      text = `%c${key}()`;
      console.log(text, 'color: DarkCyan');

      break;
    case 'undefined':
      text = `${key}: %c UNDEFINED`;
      console.log(text, 'color: Chocolate');
      break;
    case 'null':
      text = `${key}: %c NULL`;
      console.log(text, 'color: Brown');
      break;
    case 'object':
      if (datetype === '[object Date]') {
        text = `*${key}: %c ${moment(value).format('lll')}`;
        console.log(text, 'color: DarkGreen');
        break;
      }
      if (_isNull(value)) {
        text = `${key}: %c NULL`;
        console.log(text, 'color: Brown');
        break;
      }
      if (moment.isMoment(value)) {
        text = `${key}: %c ${value.format('lll')}`;
        console.log(text, 'color: ForestGreen');
        break;
      }
      if (_isEmpty(value)) {
        text = `${key}: %c EMPTY`;
        console.log(text, 'color: DeepPink');
        break;
      }
      deeped = deep(value);
      if (deeped > 0) {
        // Not an arrrayjust go 2 levels deep
        console.groupCollapsed(key);
        _forEach(value, (vals, keys) => {
          ls(keys, vals);
        });
        console.groupEnd();
        break;
      }
      // go deep on arrays
      console.info(key, ':', value);
      break;
    default:
      console.log('*TYPE: ', type);
      console.log(key, ':', value);
  }
}

export function logOut(data, levelText, consoleType = 'x') {
  if (consoleType === 'off') return;
  const objType = typeof data;
  const KeysOnText = _keys(data);
  if (objType === 'string' || objType === 'number') {
    // default for string is warning not log
    if (consoleType === 'x') consoleType = 'w';
    switch (consoleType) {
      case 'c':
        console.clear();
        break;
      case 'e':
        console.error(data);
        break;
      case 'w':
        console.warn(data);
      case 'i':
        console.info(data);
        break;
      default:
        console.log(data);
    }
  } else if (objType !== 'object') {
    switch (consoleType) {
      case 'c':
        console.clear();
        break;
      case 'e':
        l('Error:', data);
        break;
      case 't':
        console.table(data);
        break;
      case 'w':
        l('Warn', data);
        console.warn(` `);
        break;
      default:
        l('Log', data);
        console.info(` | `);
    }
  } else {
    const Label = getText(data);
    data = _.filter(data, o => {
      console.log('===');
      console.log(o);
      console.log('==|==');
      return o !== Label.text;
    });
    switch (consoleType) {
      case 'e':
        console.error(`1---${Label.text}---`);
        console.groupCollapsed(`---${Label}---`);
        _forEach(data, (val, key) => l(key, val));
        console.groupEnd();
        break;

      case 'w':
        console.warn(`2---${Label.text}---`);
        console.groupCollapsed(`---${Label.text}---`);
        _forEach(data, (val, key) => l(key, val));
        console.groupEnd();
        break;

      case 'noFunc':
        console.warn(`Trace ---${Label.text} ${_.size(data)}`);
        console.group(Label.text);
        if (_.size(data) === 1) {
          _forEach(data[0], (val, key) => lc(key, val));
        } else {
          _forEach(data, (val, key) => lc(key, val));
        }

        console.groupEnd();
        break;

      default:
        console.warn(`4---${Label.text}---`);
        console.groupCollapsed(`---${Label.text}---`);

        _forEach(KeysOnText, key => l(key, data[key]));

        console.groupEnd();
      //console.log(text);
    }
  }
}
