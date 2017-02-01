import domassist from '../domassist';
import test from 'tape-rollup';

const page = window.phantom.page;

test('Events - on single element', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
  `;
  console.log(el);
  const link = domassist.find('a');
  console.log(`link ${typeof link}`);
  const pos = link.getBoundingClientRect();

  domassist.on(link, 'click', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
    assert.end();
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
});

test('Events - on multiple elements', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
    <a href="#">Click</a>
    <a href="#">Click</a>
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const pos = link.getBoundingClientRect();

  domassist.on(link, 'click', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
    assert.end();
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
});
