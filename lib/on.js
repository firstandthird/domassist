function on(el, event, cb, capture = false) {
  const data = {
    cb,
    capture
  };

  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  window._domassistevents[`_${event}`] = data;

  el.addEventListener(event, cb, capture);
}

export default on;
