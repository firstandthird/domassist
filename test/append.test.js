import domassist from '../domassist';
import test from 'tape-rollup';

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('append, string', assert => {
  const el = domassist.findOne('#domassist');
  domassist.append(el, '<div id="new"></div>');
  const sibling = el.lastElementChild;
  assert.ok(sibling, 'String element value appended');
  teardown(el);
  assert.end();
});

test('append, Node', assert => {
  const el = domassist.findOne('#domassist');
  const div = document.createElement('div');
  div.id = 'new';
  domassist.append(el, div);
  const sibling = el.lastElementChild;
  assert.ok(sibling, 'Node element value appended');
  teardown(el);
  assert.end();
});
