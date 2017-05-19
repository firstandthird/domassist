/* eslint no-console: 0 */

import '../node_modules/map-polyfill/dist/map.min';
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
import TestUtils from './test-utils';

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

test('closest', assert => {
  const el = domassist.findOne('#domassist');
  const levels = 4;
  // clean up test dom
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  function addNode(num) {
    const node = document.createElement('div');
    node.innerText = num;
    node.classList.add(`level-${num}`);
    const children = el.children;
    if (children.length) {
      const child = domassist.findOne(`.level-${num - 1}`);
      child.appendChild(node);
    } else {
      el.appendChild(node);
    }
  }
  for (let i = 0; i < levels; i += 1) {
    addNode(i + 1);
  }
  const startEl = domassist.findOne(`.level-${levels}`);
  let count = levels - 1;
  while (count) {
    assert.ok(domassist.closest(startEl, `.level-${count}`), `Should find element with class of level-${count}`);
    --count;
  }
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
  button.click();
});

test('Events - once', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);

  let clicks = 0;
  domassist.once(link, 'click', e => {
    clicks++;
  });

  link.click();
  link.click();
  link.click();

  setTimeout(() => {
    assert.equal(clicks, 1, 'Only fired once');
    assert.end();
  }, 500);
});

test('Events - hover', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <div></div>
  `;

  const box = domassist.findOne('div', el);

  domassist.hover(box, e => {
    assert.pass('Enter fired');
    assert.equal(e.type, 'mouseenter', 'Correct event');
  }, e => {
    assert.pass('Leave fired');
    assert.equal(e.type, 'mouseleave', 'Correct event');
  });

  TestUtils.fireEvent(box, 'mouseenter');
  TestUtils.fireEvent(box, 'mouseleave');

  assert.end();
});
