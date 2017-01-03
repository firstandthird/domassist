function find(selector, el) {
  let element;

  if (el) {
    element = el;
  } else {
    element = document.body;
  }

  return element.querySelectorAll(selector);
}

export default find;
