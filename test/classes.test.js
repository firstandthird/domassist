import domassist from '../domassist';
import test from 'tape-rollup';

const classes = ['class-1', 'class-2', 'class-3'];
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

test('addClass, hasClass, removeClass, toggleClass', assert => {
  const el = domassist.findOne('#domassist');

  assert.ok(!domassist.hasClass(el, 'testClass'), 'Does not have test class');
  domassist.addClass(el, 'testClass');
  assert.ok(domassist.hasClass(el, 'testClass'), 'Class added');
  domassist.removeClass(el, 'testClass');
  assert.ok(!domassist.hasClass(el, 'testClass'), 'test class removed');

  el.innerHTML = '<div></div>';
  domassist.toggleClass(el.firstChild, 'new-class');
  assert.ok(domassist.hasClass(el.firstChild, 'new-class'), 'toggleClass - class list should contain "new-class"');
  domassist.toggleClass(el.firstChild, 'new-class');
  assert.notOk(domassist.hasClass(el.firstChild, 'new-class'), 'toggleClass - class list should not contain "new-class"');

  teardown(el);
  assert.end();
});

test('addClass - single element / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  domassist.addClass(el, classes);
  assert.equal(el.classList.length, 3, 'Three classes added to single element');
  assert.end();
});

test('addClass - multiple elements / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  const total = 5;
  el.appendChild(setup(total));
  domassist.addClass('.test-divs', classes);
  const divs = domassist.find('.test-divs');
  const count = divs.filter((div) => {
    const totalClasses = classes.filter((cls) => div.classList.contains(cls));
    return totalClasses.length === 3;
  });
  assert.equal(count.length, total, 'All elements got classes added');
  teardown(el);
  assert.end();
});

test('removeClass - single element / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  domassist.addClass(el, classes);
  domassist.removeClass(el, classes);
  assert.equal(el.classList.length, 0, 'Three classes removed from single element');
  assert.end();
});

test('removeClass - multiple elements / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  const total = 5;
  el.appendChild(setup(total));
  domassist.addClass('.test-divs', classes);
  domassist.removeClass('.test-divs', classes);
  const divs = domassist.find('.test-divs');
  const count = divs.filter((div) => {
    const totalClasses = classes.filter((cls) => div.classList.contains(cls));
    return totalClasses.length === 3;
  });
  assert.equal(count.length, 0, 'All classes removed from elements');
  teardown(el);
  assert.end();
});
