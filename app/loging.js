import _filter from 'lodash/filter';
import _size from 'lodash/size';
import _forEach from 'lodash/forEach';

import { getText } from './getText';
import getType from './getType';

export function logOut(data, level) {
  const objType = typeof data;

  if (objType === 'string' || objType === 'number') {
    // default for string is warning not log

    switch (level) {
      case 'CLEAR':
        console.clear();
        break;
      case 'ERROR':
        console.error(data);
        break;
      case 'WARNING':
        console.warn(data);
      case 'INFO':
        console.info(data);
        break;
      default:
        console.log(data);
    }
  } else {
    const Label = getText(data);
    data = _filter(data, o => {
      return o !== Label.text;
    });
    switch (level) {
      case 'ERROR':
        console.error(`1---${Label.text}---`);
        console.groupCollapsed(`---${Label}---`);
        _forEach(data, (val, key) => getType(key, val, level));
        console.groupEnd();
        break;

      case 'WARNING':
        console.warn(`2---${Label.text}---`);
        console.groupCollapsed(`---${Label.text}---`);
        _forEach(data, (val, key) => getType(key, val, level));
        console.groupEnd();
        break;

      default:
        console.group(`---${Label.text}---`);
        if (_size(data) === 1) {
          _forEach(data[0], (val, key) => getType(key, val, level));
        } else {
          _forEach(data, (val, key) => getType(key, val, level));
        }

        console.groupEnd();
      //console.log(text);
    }
  }
}
