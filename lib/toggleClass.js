function toggleClass(el, value) {
  if (el.classList.contains(value)) {
    el.classList.remove(value);
  } else {
    el.classList.add(value);
  }
}

export default toggleClass;
