import domassist from '../domassist';
import test from 'tape-rollup';

const page = window.phantom.page;

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('Events - once with Element', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const pos = link.getBoundingClientRect();

  let clicks = 0;

  domassist.once(link, 'click', e => {
    clicks++;
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);

  setTimeout(() => {
    assert.equal(clicks, 1, 'Element only fired once');
    teardown(el);
    assert.end();
  }, 500);
});

test('Events - once with selector', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
  `;
  const link = domassist.findOne('a', el);
  const pos = link.getBoundingClientRect();

  let clicks = 0;

  domassist.once('a', 'click', e => {
    clicks++;
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);

  setTimeout(() => {
    assert.equal(clicks, 1, 'Selector only fired once');
    teardown(el);
    assert.end();
  }, 500);
});
