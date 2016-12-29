function off(el, event) {
  const data = el.dataset[event];
  
  if (!data) {
    return;
  }
  
  el.removeEventListener(event, data.cb, data.capture);
}

export default off;