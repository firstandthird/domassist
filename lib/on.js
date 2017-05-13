import find from './find';
import privData from './privData';

function on(selector, event, cb, capture = false) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => on(item, event, cb, capture));
    return;
  }

  const data = {
    cb,
    capture
  };

  const el = find(selector);
  if (el.length) {
    el.forEach(item => {
      const eventDict = privData.get(item, 'events');
      if (!eventDict[event]) {
        eventDict[event] = [];
      }
      eventDict[event].push(data);
      item.addEventListener(event, cb, capture);
    });
  }
}

export default on;
