import domassist from '../domassist';
import test from 'tape-rollup';

const setup = (total) => {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const div = document.createElement('div');
    domassist.addClass(div, 'test-divs');
    domassist.addClass(div, `div-${i}`);
    const p = document.createElement('p');
    p.innerHTML = `paragraph-${1}`;
    div.appendChild(p);
    frag.appendChild(div);
  }
  return frag;
};

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('find - string selector', assert => {
  const el = document.getElementById('domassist');
  const total = 5;
  el.appendChild(setup(5));
  const els = domassist.find('.test-divs');
  assert.ok(Array.isArray(els), 'Returned value should be an array');
  assert.equal(els.length, total, `Number of returned items should be ${total}`);
  teardown(el);
  assert.end();
});

test('find - from document', assert => {
  const el = domassist.find('body')[0];
  assert.equal(el, document.body, 'Should have a context of document if none provided.');
  assert.end();
});

test('find - DOM Node', assert => {
  const el = document.getElementById('domassist');
  assert.ok(Array.isArray(domassist.find(el)), 'Passed DOM node is returned as an array');
  assert.equal(domassist.find(el).length, 1, 'Number of returned items should be 1');
  teardown(el);
  assert.end();
});

test('find - invalid selector', assert => {
  assert.equal(domassist.find('hello').length, 0, 'Pass non-existent selector returns empty array');
  assert.end();
});

test('find - element with context', assert => {
  const el = document.getElementById('domassist');
  el.appendChild(setup(5));
  const para = domassist.find('p', '.div-1');
  assert.ok(Array.isArray(para), 'Pass selector with context should return an array');
  assert.equal(para.length, 1, 'Number of return items should be 1');
  assert.equal(para[0].innerHTML, 'paragraph-1', 'Element\'s copy should be "paragraph-1"');
  teardown(el);
  assert.end();
});

test('find - pass NodeList', assert => {
  const el = document.getElementById('domassist');
  el.appendChild(setup(5));
  const divs = domassist.find(document.querySelectorAll('.test-divs'));
  assert.ok(Array.isArray(divs), 'NodeList returned as an array');
  assert.equal(divs.length, 5, 'NodeList returned with 5 items');
  teardown(el);
  assert.end();
});
