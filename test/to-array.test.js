import domassist from '../domassist';
import test from 'tape-rollup';

test('toArray - null', assert => {
  const els = domassist.toArray();
  assert.equal(Array.isArray(els), true, 'always returns an array');
  assert.equal(els.length, 0, 'returns empty array if null');
  assert.end();
});

test('toArray - single node', assert => {
  const container = domassist.findOne('#domassist');

  container.innerHTML = `
    <div class="test"></div>
  `;
  const el = domassist.findOne('div', container);
  const els = domassist.toArray(el);
  assert.equal(Array.isArray(els), true, 'is array');
  assert.equal(els.length, 1);
  assert.equal(els[0], el);
  assert.end();
});

test('toArray - nodelist', assert => {
  const frag = document.createDocumentFragment();
  const total = 5;
  for (let i = 0; i < total; i += 1) {
    const div = document.createElement('div');
    domassist.addClass(div, 'div-array');
    frag.appendChild(div);
  }
  const el = domassist.findOne('#domassist');
  el.appendChild(frag);
  const divs = domassist.find('.div-array');
  const arr = domassist.toArray(divs);
  assert.ok(Array.isArray(arr), 'Nodelist converted to an array');
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  assert.end();
});
