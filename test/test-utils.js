export default {
  fireEvent(el, type) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(type, false, false, null);

    el.dispatchEvent(evt);
  }
};
