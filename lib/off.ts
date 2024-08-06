import find from './find';
import { DomSelector } from './types';

function off(selector: DomSelector | DomSelector[], event: string) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => off(item, event));
    return;
  }
  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  // only disable events that were registered with domassist.on,
  // don't de-register events that were registered by other libs:
  const data = window._domassistevents[`_${event}`];

  if (!data) {
    return;
  }

  const el = find(selector);

  if (el.length) {
    el.forEach((item) => {
      item.removeEventListener(event, data.cb, data.options);
    });
  }
}

export default off;
