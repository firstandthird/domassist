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

const page = window.phantom.page;

test('modify - add class', assert => {
  const el = domassist.findOne('#domassist');
  domassist.modify(el, {
    addClass: 'testing',
  });
  assert.ok(domassist.hasClass(el, 'testing'), 'Class added');
  assert.end();
});

test('modify - remove class', assert => {
  const el = domassist.findOne('#domassist');
  domassist.modify(el, {
    addClass: 'testing',
  });
  domassist.modify(el, {
    removeClass: 'testing'
  });
  assert.notOk(domassist.hasClass(el, 'testing'), 'Class removed');
  assert.end();
});

test('modify - attributes', assert => {
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

test('modify - html', assert => {
  const el = domassist.findOne('#domassist');
  domassist.modify(el, {
    html: 'hello world'
  });
  assert.equal(el.innerHTML, 'hello world', 'HTML added');
  assert.end();
});
//
test('modify - events', assert => {
  // assert.plan(5);
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a style="display: block; height: 100px; width: 100px;" href="#">Click</a>
  `;
  const link = domassist.findOne('a');
  const pos = link.getBoundingClientRect();
  domassist.modify(link, {
    events: {
      click: (e) => {
        assert.ok(e instanceof MouseEvent, 'Click event fired');
      },
      mouseenter: (e) => {
        assert.ok(e instanceof MouseEvent, 'Enter fired');
        assert.equal(e.type, 'mouseenter', 'Correct event');
      },
      mouseleave: (e) => {
        assert.ok(e instanceof MouseEvent, 'Leave fired');
        assert.equal(e.type, 'mouseleave', 'Correct event');
        assert.end();
      }
    }
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('mousemove', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('mousemove', pos.left + pos.width + 100, pos.top + pos.height + 100);
});
test('modify - styles', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <p>p1</p>
    <p>p2</p>
  `;
  const els = domassist.find('p');
  domassist.modify(els, {
    styles: {
      width: '100px',
      height: '150px',
    }
  });

  assert.equal(els[0].style.width, '100px', 'width on first el set correctly');
  assert.equal(els[0].style.height, '150px', 'height on first el set correctly');
  assert.equal(els[1].style.width, '100px', 'width on second el set correctly');
  assert.equal(els[1].style.height, '150px', 'height on second el set correctly');
  teardown(el);
  assert.end();
});
