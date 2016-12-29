function on(el, event, cb, capture = false) {
  const data = {
    cb,
    capture
  };
  
  el.dataset[event] = data;
  
  el.addEventListener(event, cb, capture);
}

export default on;