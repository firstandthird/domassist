function on(el, event, cb, capture = false) {
  const data = {
    cb,
    capture
  };

  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  window._domassistevents[`_${event}`] = data;
  if (Array.isArray(el)) {
    el.forEach((item) => {
      item.addEventListener(event, cb, capture);
    });
  } else {
    el.addEventListener(event, cb, capture);
  }
}

export default on;
