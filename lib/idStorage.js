const storage = new Map();

const idStorage = {
  add(data) {
    storage.set(idStorage.generateID(), data);
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
    storage.remove(id);

    return val;
  },

  removeFromValue(value) {
    let found = null;

    storage.forEach((val, key) => {
      if (!found && val === value) {
        found = key;
      }
    });

    return idStorage.removeFromID(found);
  }
};

export default idStorage;
