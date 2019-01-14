export function getText(data) {
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
