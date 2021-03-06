/* eslint no-console: 0 */

import domassist from '../domassist';
import test from 'tape-rollup';
import { teardown } from './setup';
import './find.test';
import './classes.test';
import './attrs.test';
import './on.test';
import './off.test';
import './fire.test';
import './html.test';
import './modify.test';
import './show-hide.test';
import './styles.test';
import './append.test';
import './closest.test';
import './remove.test';

const page = window.phantom.page;

test('ready', assert => {
  // if you add more assertions update this number
  const assertions = 3;

  assert.plan(assertions);

  domassist.ready(() => {
    const x = 1;
    assert.ok(x === 1, '1st ready() fired');
  });
  domassist.ready(() => {
    const x = 2;
    assert.ok(x === 2, '2nd ready() fired');
  });
  domassist.ready(() => {
    const x = 3;
    assert.ok(x === 3, '3rd ready() fired');
  });
});

test('findOne', assert => {
  const el = domassist.find('#domassist');

  el[0].innerHTML = `
    <ul id="list">
      <li id="firstItem">Test1</li>
      <li>Test2</li>
    </ul>
    <p class="para1">p1</p>
    <p class="para2"><span>p2</span></p>
  `;

  assert.ok(domassist.findOne('#list'), 'Element found');
  assert.notOk(domassist.findOne('#fake'), 'Element not found');
  const firstItem = domassist.findOne('#firstItem');
  assert.equal(firstItem.innerHTML, 'Test1', 'ID selector found with value of Test1');
  const para = domassist.findOne('.para1');
  assert.equal(para.innerHTML, 'p1', 'Class selector found with value of p1');
  const elWithContext = domassist.findOne('span', '.para2');
  assert.equal(elWithContext.innerHTML, 'p2', 'Correct element with context found');
  teardown(el);
  assert.end();
});

test('matches', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <div class="test"></div>
  `;

  const matcher = domassist.findOne('div', el);
  assert.ok(domassist.matches(matcher, '.test'), 'Matches');
  assert.end();
});

test('Events - delegate', assert => {
  const el = domassist.findOne('#domassist');

  domassist.delegate(el, 'click', 'button', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
    assert.end();
  });

  el.innerHTML = `
    <button type="button">Click</button>
  `;

  const button = domassist.findOne('button', el);
  const pos = button.getBoundingClientRect();

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
});

test('Events - once', assert => {
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
    assert.equal(clicks, 1, 'Only fired once');
    assert.end();
  }, 500);
});

test('Events - hover', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <div style="height: 100px; width: 100px;"></div>
  `;

  const box = domassist.findOne('div', el);
  const pos = box.getBoundingClientRect();

  domassist.hover(box, e => {
    assert.ok(e instanceof MouseEvent, 'Enter fired');
    assert.equal(e.type, 'mouseenter', 'Correct event');
  }, e => {
    assert.ok(e instanceof MouseEvent, 'Leave fired');
    assert.equal(e.type, 'mouseleave', 'Correct event');
    assert.end();
  });

  page.sendEvent('mousemove', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('mousemove', pos.left + pos.width + 100, pos.top + pos.height + 100);
});
