import domassist from '../domassist';
import test from 'tape-rollup';

const setup = (total) => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const div = document.createElement('div');
    domassist.addClass(div, 'test-divs');
    domassist.addClass(div, `div-${i}`);
    frag.appendChild(div);
  }
  return frag;
};

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('html - add html single element', assert => {
  const el = domassist.findOne('#domassist');
  domassist.html(el, 'hello world');
  assert.equal(el.innerHTML, 'hello world', 'New HTML was added to the element');
  assert.end();
});

test('html - add html multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  const total = 5;

  el.appendChild(setup(total));
  let els = domassist.find('.test-divs');
  domassist.html(els, 'hello world');
  // not a live nodelist so need to get the divs again
  els = domassist.find('.test-divs');
  const count = els.filter((item) => item.innerHTML === 'hello world');
  assert.equal(count.length, total, 'New HTML was added to all the elements');
  teardown(el);
  assert.end();
});

test('html - remove html', assert => {
  const el = domassist.findOne('#domassist');
  domassist.html(el, '');
  assert.equal(el.innerHTML, '', 'HTML removed from element');
  assert.end();
});
