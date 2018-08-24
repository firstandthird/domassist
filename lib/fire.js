import find from './find';

const NativeCustomEvent = window.CustomEvent;

//
// Check for the usage of native support for CustomEvents which is lacking
// completely on IE.
//
function canIuseNativeCustom() {
  try {
    const p = new NativeCustomEvent('t', {
      detail: {
        a: 'b'
      }
    });
    return p.type === 't' && p.detail.a === 'b';
  } catch (e) {
    return false;
  }
}

// Lousy polyfill for the Custom Event constructor for IE.
const IECustomEvent = function CustomEvent(type, params) {
  const e = document.createEvent('CustomEvent');

  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, undefined);
  }

  return e;
};

const DomassistCustomEvent = canIuseNativeCustom() ?
  NativeCustomEvent : IECustomEvent;

function fire(selector, type, params = {}) {
  if (Array.isArray(selector)) {
    return selector.forEach(item => fire(item, type, params));
  }

  const els = find(selector);

  if (els.length) {
    if (params.bubbles !== false) {
      params.bubbles = true;
    }

    els.forEach(el => {
      const event = new DomassistCustomEvent(type, params);
      el.dispatchEvent(event);
    });

    return els;
  }
}

export default fire;
