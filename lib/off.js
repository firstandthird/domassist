function off(el, event) {
  const data = el.dataset[`_${event}`];
  
  if (!data) {
    return;
  }
  
  el.removeEventListener(event, data.cb, data.capture);
}

export default off;