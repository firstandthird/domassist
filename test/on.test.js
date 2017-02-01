import domassist from '../domassist';
import test from 'tape-rollup';

const page = window.phantom.page;

test('Events - on single element', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;
  const link = domassist.findOne('a');
  const pos = link.getBoundingClientRect();

  domassist.on(link, 'click', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
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
  links.forEach((item, index) => {
    const pos = item.getBoundingClientRect();

    domassist.on(item, 'click', e => {
      assert.equal(e.target.id, `link-${index + 1}`, `Link with id of link-${index + 1} fired`);
    });

    page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  });
});
