import domassist from '../domassist';
import test from 'tape-rollup';

test('Events - on single element', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;
  const link = domassist.findOne('a');

  domassist.on(link, 'click', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
  });

  link.click();
});

test('Events - on multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(4);
  el.innerHTML = `
    <a id="link-1" href="#">Click</a>
    <a id="link-2" href="#">Click</a>
    <a id="link-3" href="#">Click</a>
    <a id="link-4" href="#">Click</a>
  `;
  const links = domassist.find('a', el);
  let index = 1;
  domassist.on(links, 'click', e => {
    assert.equal(e.target.id, `link-${index}`, `Link with id of link-${index} fired`);
  });
  links.forEach((item) => {
    item.click();
    index += 1;
  });
});
