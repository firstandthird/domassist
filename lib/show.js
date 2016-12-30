function show(el) {  
  const savedDisplay = el.dataset._currentDisplay || 'block';
  
  el.style.display = savedDisplay;
}

export default show;