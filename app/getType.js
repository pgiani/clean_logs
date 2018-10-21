import _isNull from 'lodash/isNull';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _isArray from 'lodash/isArray';
import _keys from 'lodash/keys';
import _size from 'lodash/size';
import _has from 'lodash/has';

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

export default function getType(key, value) {
  let text = '';
  const type = typeof value;
  const datetype = Object.prototype.toString.call(value);

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
      text = `${key}: %c "${value}"`;
      console.log(text, 'color: blue');
      break;
    case 'function':
      text = `ƒ %c${key}()`;
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
        text = `${key}: %c ${value.toLocaleString()} (date)`;
        console.log(text, 'color: DarkGreen');
        break;
      }
      if (_isNull(value)) {
        text = `${key}: %c NULL`;
        console.log(text, 'color: Brown');
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
      deeped = deep(value);
      if (deeped > 0 && deeped < 10) {
        // Not an arrrayjust go 2 levels deep
        console.groupCollapsed(`${key} [${_size(value)}]`);
        const properties = Object.getOwnPropertyNames(value);
        _forEach(properties, o => {
          getType(o, value[o]);
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
