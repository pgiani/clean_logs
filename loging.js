import _filter from 'lodash/filter';
import _size from 'lodash/size';
import _sortedIndexBy from 'lodash/sortedIndexBy';
import _forEach from 'lodash/forEach';

import { getText } from './getText';
import getType from './getType';

function loop(data, level) {
  if (_size(data) === 1) {
    _forEach(data[0], (val, key) => getType(key, val, level));
  } else {
    _forEach(data, (val, key) => getType(key, val, level));
  }
}

export function logOut(data, level = 'DEBUG') {
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
