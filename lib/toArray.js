function toArray(value) {
  return (!Array.isArray(value)) ? [].slice.call(value) : value;
}

export default toArray;
