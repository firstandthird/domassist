class Data {
  constructor() {
    this.uuid = `Domassist${`${Math.random()}`.replace(/\D/g, '')}`;
  }

  cache(owner) {
    let value = owner[this.uuid];

    if (!value) {
      value = {};

      // If it's a DOM Node
      if (owner.nodeType) {
        owner[this.uuid] = value;
      } else {
        Object.defineProperty(owner, this.uuid, {
          value,
          configurable: true
        });
      }
    }

    return value;
  }

  get(element, key, def = {}) {
    const cache = this.cache(element);
    let value = cache[key];

    if (!value) {
      cache[key] = def;
      value = cache[key];
    }

    return value;
  }
}

export default new Data();
