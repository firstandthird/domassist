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

test('addAttrs - div attributes', assert => {
  const el = domassist.findOne('#domassist');
  el.appendChild(setup(5));
  let testDiv = domassist.findOne('.div-0');
  domassist.addAttrs(testDiv, {
    id: 'new-id',
    title: 'this is a title',
    testAttr: 'data attribute',
  });
  testDiv = domassist.findOne('.div-0');
  assert.equal(testDiv.id, 'new-id', 'ID attribute added');
  assert.equal(testDiv.title, 'this is a title', 'Title attribute added');
  assert.equal(testDiv.dataset.testAttr, 'data attribute', 'Data attribute added');
  teardown(el);
  assert.end();
});

test('addAttrs - anchor attributes', assert => {
  const el = domassist.findOne('#domassist');
  el.appendChild(document.createElement('a'));
  let testAnchor = domassist.findOne('a');
  domassist.addAttrs(testAnchor, {
    id: 'anchor-id',
    title: 'this is a title',
    href: 'http://google.com',
    testAttr: 'data attribute',
  });
  testAnchor = domassist.findOne('a');
  assert.equal(testAnchor.id, 'anchor-id', 'ID attribute added');
  assert.equal(testAnchor.title, 'this is a title', 'Title attribute added');
  assert.equal(testAnchor.href, 'http://google.com/', 'HREF attribute added');
  assert.equal(testAnchor.dataset.testAttr, 'data attribute', 'Data attribute added');
  teardown(el);
  assert.end();
});

test('addAttrs - multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  el.appendChild(setup(5));
  let testDivs = domassist.find('.test-divs');
  domassist.addAttrs(testDivs, {
    title: 'this is a title',
    testAttr: 'data attribute',
  });
  testDivs = domassist.find('.test-divs');
  testDivs.forEach((item, index) => {
    assert.equal(item.title, 'this is a title', `Attributes added to div-${index + 1} correctly`);
  });
  teardown(el);
  assert.end();
});
