import find from './find';

function toArray(value) {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (value instanceof Node) {
    return [value];
  }
  if (typeof value === 'string') {
    value = find(value);
  }

  return [].slice.call(value);
}

export default toArray;
