import { getText } from './getText';
import getType from './getType';

function loop(data, level) {
  const propNames = Object.keys(data[0]);
  if (propNames.length === 1) {
    getType(propNames[0], data[0][propNames[0]], level);
  } else {
    propNames.forEach(name => getType(name, data[0][name], level));
  }
}

export default function logOut(data, level = 'DEBUG') {
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

    const unordered = data.filter(datum => datum !== Label.text);

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
