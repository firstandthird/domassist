function find(selector, el) {
  let element;
  
  if (el) {
    element = el;
  } else {
    el = document;
  }
  
  return el.querySelectorAll(selector);
}

export default find;