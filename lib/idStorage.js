const storage = new Map();

const idStorage = {
  areSimilar(a, b) {
    const everyKey = f => Object.keys(a).every(f);
    const type = ({}).toString
      .call(a)
      .match(/\[object (\w+)\]/)[1];

    switch (type) {
      case 'Array':
        return a.length === b.length &&
          everyKey(k => idStorage.areSimilar(a.sort()[k], b.sort()[k]));
      case 'Object':
        return Object.keys(a).length === Object.keys(b).length &&
          everyKey(k => idStorage.areSimilar(a[k], b[k]));
      default:
        return a === b;
    }
  },

  add(data) {
    const id = idStorage.generateID();
    storage.set(id, data);

    return id;
  },

  generateID() {
    const h = n => (n | 0).toString(16);
    const s = n => h((Math.random() * (1 << (n << 2))) ^ Date.now()).slice(-n);

    return [
      s(4) + s(4), s(4),
      `4${s(3)}`,
      h(8 | (Math.random() * 4)) + s(3),
      Date.now().toString(16).slice(-10) + s(2)
    ].join('-');
  },

  removeFromID(id) {
    const val = storage.get(id);
    storage.delete(id);

    return val;
  },

  removeFromValue(value) {
    let found = null;

    storage.forEach((val, key) => {
      if (!found && idStorage.areSimilar(val, value)) {
        found = key;
      }
    });

    return idStorage.removeFromID(found);
  }
};

export default idStorage;
