import find from './find';
import privData from './privData';

function storeIntoDict(element, key, data) {
  const eventDict = privData.get(element, 'events');
  if (!eventDict[key]) {
    eventDict[key] = [];
  }

  eventDict[key].push(data);
}

function on(selector, event, cb, capture = false) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => on(item, event, cb, capture));
    return;
  }

  const el = find(selector);
  let type = event;
  let storeKeys = [type];
  let namespaces = '';
  if (type.indexOf('.') > -1) {
    const tmp = type.split('.');

    // Not allowing to bind to .ns
    if (!tmp[0]) {
      return;
    }

    type = tmp.shift();
    namespaces = `.${tmp.join('.')}`;
    storeKeys = [type, namespaces];
  }

  const data = {
    type,
    cb,
    capture
  };

  if (el.length) {
    el.forEach(item => {
      storeKeys.forEach(key => storeIntoDict(item, key, data));
      item.addEventListener(type, cb, capture);
    });
  }
}

export default on;
