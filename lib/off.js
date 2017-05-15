import find from './find';
import privData from './privData';

function extractFromDict(element, key, handler, justNameSpace) {
  const eventDict = privData.get(element, 'events');
  let eventsToUnbind = [];
  let type = key;
  let namespace = '';

  // Allowing namespace to continue
  if (type.indexOf('.') > 0) {
    const tmp = type.split('.');

    type = tmp.shift();
    namespace = `.${tmp.join('.')}`;

    // Let's remove the namespaced events
    extractFromDict(element, namespace, handler, true);
  }

  let filtered = eventDict[type];

  if (filtered) {
    if (typeof handler !== 'undefined') {
      // Just those that match the handler
      filtered = filtered.filter(d => d.cb === handler);
    }

    eventsToUnbind = eventsToUnbind.concat(
      filtered.map(data => ({ type, data }))
    );

    // Actually removing from the dict
    if (typeof handler !== 'undefined') {
      eventDict[type] = eventDict[type].filter(d => d.cb !== handler);
    } else {
      eventDict[type].length = 0;
    }

    // Don't keep the key, prevent leaks
    if (eventDict[type].length === 0) {
      eventDict[type] = undefined;
    }
  }

  // When unbinding for .namespace need to actually remove the normal events too
  if (!justNameSpace && type.indexOf('.') === 0) {
    // Flat map
    eventsToUnbind = Array.prototype.concat.apply([],
      eventsToUnbind.map(({ data }) => extractFromDict(element, data.type, data.cb)));
  }

  return eventsToUnbind;
}

function off(selector, event, handler) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => off(item, event, handler));
  }

  const el = find(selector);

  if (el.length) {
    el.forEach(item => {
      extractFromDict(item, event, handler).forEach(({ type, data }) => {
        item.removeEventListener(type, data.cb, data.capture);
      });
    });
  }
}

export default off;
