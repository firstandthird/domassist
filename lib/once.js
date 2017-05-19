import on from './on';
import off from './off';
import find from './find';

function once(selector, event, handler, capture = false) {
  if (Array.isArray(selector)) {
    selector.forEach(item => once(item, event, handler, capture));
    return;
  }

  const el = find(selector);

  if (el.length > 1) {
    // Need to get the event id for each element so once runs properly
    once(el, event, handler, capture);
    return;
  }

  const eventId = on(el, event, e => {
    off(eventId);
    handler(e);
  }, capture);
}

export default once;
