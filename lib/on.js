import find from './find';

function on(selector, event, cb, options) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => on(item, event, cb, options));
    return;
  }

  let eventOptions = {};

  if (typeof options === 'boolean') {
    eventOptions.capture = options;
  } else if (typeof options === 'object') {
    eventOptions = Object.assign({}, options);
  }

  const data = {
    cb,
    options: eventOptions
  };

  // _domassistevents keeps track of events we registered
  // with 'domassist.on' so they can be deregistered by
  // 'domassist.off' without affecting events registered
  // by other libraries:
  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  window._domassistevents[`_${event}`] = data;
  const el = find(selector);

  if (el.length) {
    el.forEach((item) => {
      item.addEventListener(event, cb, eventOptions);
    });
  }
}

export default on;
