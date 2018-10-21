import _filter from 'lodash/filter';
import { getText } from './getText';
import getType from './getType';

export function logOut(data, levelText, consoleType = 'x') {
  if (consoleType === 'off') return;
  const objType = typeof data;
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
    data = _filter(data, o => {
      return o !== Label.text;
    });
    switch (consoleType) {
      case 'e':
        console.error(`1---${Label.text}---`);
        console.groupCollapsed(`---${Label}---`);
        _forEach(data, (val, key) => getType(key, val));
        console.groupEnd();
        break;

      case 'w':
        console.warn(`2---${Label.text}---`);
        console.groupCollapsed(`---${Label.text}---`);
        _forEach(data, (val, key) => getType(key, val));
        console.groupEnd();
        break;

      default:
        console.group(`---${Label.text}---`);
        if (_.size(data) === 1) {
          _forEach(data[0], (val, key) => getType(key, val));
        } else {
          _forEach(data, (val, key) => getType(key, val));
        }

        console.groupEnd();
      //console.log(text);
    }
  }
}
