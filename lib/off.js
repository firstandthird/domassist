import find from './find';
import privData from './privData';

function off(selector, event, handler) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => off(item, event, handler));
  }

  const el = find(selector);

  if (el.length) {
    el.forEach(item => {
      const eventDict = privData.get(item, 'events');

      if (eventDict[event]) {
        // Just want to unbind given handler
        if (typeof handler !== 'undefined') {
          const handlerData = eventDict[event].filter(data => data.cb === handler)[0];
          eventDict[event] = eventDict[event].filter(data => data.cb !== handler);

          item.removeEventListener(event, handlerData.cb, handlerData.capture);
        } else {
          // Remove all handlers for a given event
          eventDict[event].forEach(eventData => {
            item.removeEventListener(event, eventData.cb, eventData.capture);
          });

          eventDict[event].length = 0;
        }

        if (eventDict[event].length === 0) {
          eventDict[event] = undefined;
        }
      }
    });
  }
}

export default off;
