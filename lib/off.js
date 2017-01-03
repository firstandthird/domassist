function off(el, event) {
  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  const data = window._domassistevents[`_${event}`];

  if (!data) {
    return;
  }

  el.removeEventListener(event, data.cb, data.capture);
}

export default off;
