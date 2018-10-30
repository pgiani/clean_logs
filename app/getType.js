import _isNull from 'lodash/isNull';
import _forEach from 'lodash/forEach';
import _keys from 'lodash/keys';
import _size from 'lodash/size';

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

export default function getType(key, value, level = null) {
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
      if (value.hasOwnProperty('_isAMomentObject')) {
        text = `${key}: %c ${value.format('lll')} (moment)`;
        console.log(text, 'color: ForestGreen');
        break;
      }
      if (Object.keys(value).length === 0) {
        text = `${key}: %c EMPTY`;
        console.log(text, 'color: DeepPink');
        break;
      }

      // check how deep the object is, formation of very deep nested objects will
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
        // Not an arrray, just go 2 levels deep
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
