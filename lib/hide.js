function hide(el) {
  const currentDisplay = window.getComputedStyle(el).getPropertyValue('display');

  el.dataset._currentDisplay = currentDisplay;

  el.style.display = 'none';
}

export default hide;
