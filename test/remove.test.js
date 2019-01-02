import domassist from '../domassist';
import test from 'tape-rollup';

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('remove, Node', assert => {
  const el = domassist.findOne('#domassist');
  const div = document.createElement('div');
  div.id = 'new';
  domassist.append(el, div);

  assert.ok(domassist.findOne(div), 'node exist before removing');
  domassist.remove(div);
  assert.ok(!domassist.findOne('#new'), 'node was removed');

  teardown(el);
  assert.end();
});

test('remove, selector', assert => {
  const el = domassist.findOne('#domassist');
  const div = document.createElement('div');
  div.id = 'new';
  domassist.append(el, div);

  assert.ok(domassist.findOne('#new'), 'element exist before removing');
  domassist.remove('#new');
  assert.ok(!domassist.findOne('#new'), 'element was removed');

  teardown(el);
  assert.end();
});

test('remove, multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  const div = document.createElement('div');
  div.className = 'new';
  const divTwo = div.cloneNode();
  domassist.append(el, div);
  domassist.append(el, divTwo);

  assert.equal(el.childNodes.length, 2, 'elements exist before removing');
  domassist.remove('.new');
  assert.equal(el.childNodes.length, 0, 'elements were removed');

  teardown(el);
  assert.end();
});

test('remove, selector in context', assert => {
  const el = domassist.findOne('#domassist');
  const container = document.createElement('div');
  container.id = 'container';
  const content = document.createElement('div');
  content.className = 'content';
  const contentTwo = content.cloneNode();
  domassist.append(el, content);
  domassist.append(container, contentTwo);
  domassist.append(el, container);

  assert.equal(domassist.find('.content').length, 2, 'elements exist before removing');
  domassist.remove('.content', container);
  assert.equal(domassist.find('.content').length, 1, 'element was removed');
  assert.equal(domassist.findOne('.content').parentNode.id, 'domassist', 'element was removed from its context');

  teardown(el);
  assert.end();
});

test('remove, not matched selector', assert => {
  const el = domassist.findOne('#domassist');
  assert.doesNotThrow(() => domassist.remove('.new'), 'no error thrown on non-matched selector');
  teardown(el);
  assert.end();
});
