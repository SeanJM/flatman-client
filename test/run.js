// Parents test
startTest(function (test) {
  // Add Class
  (function () {
    var a = el('div');
    a.addClass('my-class-name');
    test('addClass', a.attr('class'), 'my-class-name');
  }());

  // Append
  (function () {
    var a = el('div');
    var b = el('div');
    a.append(b);
    test('append', a.firstChild().node, b.node);
  }());

  // attr
  (function () {
    var a = el('div');
    a.attr('type', 'test');
    test('attr', a.attr('type'), 'test');
  }());

  // empty attr
  (function () {
    var a = el('div');
    a.attr('type', 'test').attr('tabindex', '0');
    test('attr (no arguments, returns an object)', a.attr(), { type : 'test', tabindex : '0' });
  }());

  // before
  (function () {
    var p = el('div');
    var a = el('div');
    var b = el('div');
    p.append(a);
    b.before(a);
    test('before', p.firstChild().node, b.node);
  }());

  // check
  (function () {
    var p = el('input', { type : 'checkbox' });
    test('check', p.check().isChecked(), true);
  }());

  // unchecked
  (function () {
    var p = el('input', { type : 'checkbox' });
    test('unchecked', p.isChecked(), false);
  }());

  // children
  (function () {
    var p = el('div');
    var a = el('div');
    var b = el('div');
    var t1;
    p.append(a, b);
    t1 = p.children()[0].node === a.node && p.children()[1].node === b.node;
    test('children', t1, true);
  }());

  // clone
  (function () {
    var p = el('div', { class : 'test' });
    var c = p.clone();
    test('clone', p.attr('class'), c.attr('class'));
  }());

  // closest, contains
  (function () {
    var p = el('div', { class : 'test1' });
    var c = el('div', { class : 'test2' });
    var x;
    p.append(c);

    test('closest', c.closest('.test1').node, p.node);
    test('contains (true)', p.contains(c), true);
    test('contains (false)', c.contains(p), false);
  }());

  // copyAttributes
  (function () {
    var p = el('div', { class : 'test1', tabIndex : '0' });
    var c = el('div', { class : 'test2' });
    var x;
    c.copyAttributes(p);
    x = c.attr('class') === 'test1' && c.attr('tabindex') === '0';
    test('copyAttributes', x, true);
  }());

  // disable
  (function () {
    var p = el('div').disable();
    test('disable', p.isDisabled(), true);
  }());

  // find
  (function () {
    var a;
    var p = el('div', a = el('div', { class : 'test'}));
    test('find', p.find('.test')[0].node, a.node);
  }());

  // firstChild
  (function () {
    var a;
    var p = el('div', a = el('div', { class : 'test'}));
    test('firstChild', p.firstChild().node, a.node);
  }());

  // focus
  (function () {
    var p = el('div', { tabIndex : '0' });
    p.appendTo('body');
    p.focus();
    test('focus', p.isFocused(), true);
    p.remove();
  }());

  // getSelector
  (function () {
    var p = el('div', { class : 'test'});
    var a = el('div', { class : 'test', tabIndex : '0', id : 'my-id'});
    var t = p.getSelector() === 'div.test' && a.getSelector() === 'div.test#my-id';
    test('getSelector', t, true);
  }());

  // getSelector
  (function () {
    var a = el('div', { class : 'test'});
    var b = el('div', { class : 'test-2'});
    var t = a.hasClass('test') && b.hasClass('test-2');
    test('hasClass', t, true);
  }());

  // hasParent
  (function () {
    var a = el('div', { class : 'test'});
    var b = el('div', { class : 'test-2'});
    a.append(b);
    test('hasParent', b.hasParent(a) && !a.hasParent(b), true);
  }());

  // isChecked
  (function () {
    var a = el('input', { type : 'checkbox'});
    var b = el('input', { type : 'checkbox'});
    a.check();
    test('isChecked', a.isChecked() && !b.isChecked(), true);
  }());

  // isDisabled
  (function () {
    var a = el('input', { type : 'checkbox'});
    var b = el('input', { type : 'checkbox'});
    a.disable();
    test('isDisabled', a.isDisabled() && !b.isDisabled(), true);
  }());

  // isFocused
  (function () {
    var a = el('input', { type : 'checkbox' });
    var b = el('input', { type : 'checkbox' });

    a.appendTo('body');
    b.appendTo('body');
    a.focus();

    test('isFocused', a.isFocused() && !b.isFocused(), true);

    a.remove();
    b.remove();
  }());

  // isVisible
  (function () {
    var a = el('div');
    var b = el('div');
    var c = el('div');
    var d = el('div');
    var e = el('div');
    var f = el('div');

    a.appendTo('body');
    b.appendTo('body').style('position: absolute; left: -100000px');
    c.appendTo('body').style('display', 'none');
    d.appendTo('body').style('width : 0; height: 0; overflow: hidden;');
    e.appendTo('body').style('display', 'none');
    f.appendTo(e);

    test('isVisible',
      a.isVisible() &&
      !b.isVisible() &&
      !c.isVisible() &&
      !d.isVisible() &&
      !f.isVisible(),
      true
    );

    a.remove();
    b.remove();
    c.remove();
    d.remove();
    e.remove();
    f.remove();
  }());

  // lastChild
  (function () {
    var a = el('div');
    var b = el('div');
    var c = el('div');
    var d = el('div');
    a.append(b, c, d);
    test('lastChild', a.lastChild().node, d.node);
  }());

  // nodeText
  (function () {
    var a = el('div', 'text');
    test('nodeText', a.nodeText(), 'text');
  }());

  // off
  (function () {
    var a = el('div');
    var x = true;

    a.on('click', function () {
      test('off', true, false);
      x = false;
    });

    a.off('click');
    a.trigger('click');

    if (x) {
      test('off', true, true);
    }
  }());

  // offset
  (function () {
    var a = el('div', { style : 'position: absolute; left: 0; top: 0; width : 0; height: 0'});
    var o;
    a.appendTo('body');
    o = a.offset();
    test('offset', o.top === 0 && o.left === 0 && o.width === 0 && o.height === 0, true);
    a.remove();
  }());

  // on
  (function () {
    var a = el('div');
    var x = true;

    a.on('click', function () {
      test('on', true, true);
      x = false;
    });

    a.trigger('click');

    if (x) {
      test('on', true, false);
    }
  }());

  // parent
  (function () {
    var a = el('div');
    var b = el('div');
    a.appendTo(b);
    test('parent', a.parent().node, b.node);
  }());

  // parents
  (function () {
    var a = el('div', { class : 'a' });
    var b = el('div', { class : 'b' });
    var c = el('div', { class : 'c' });
    var p;
    a.append(b.append(c));
    p = c.parents();
    test('parents', p[0].node, a.node);
  }());

  // prepend
  (function () {
    var a = el('div', { class : 'a' });
    var b = el('div', { class : 'b' });
    var c = el('div', { class : 'c' });
    var p;
    a.append(b);
    a.prepend(c);
    test('prepend', a.firstChild().node, c.node);
  }());
});

(function () {
  // parent_1.appendTo('body');
  // parent_1.remove();
  // logTest('remove', !parent_1.hasParent(document.body));
  // parent_1.addClass('remove-this-class').removeClass('remove-this-class');
  // logTest('removeClass', !parent_1.hasClass('remove-this-class'));
  // parent.append(d1, d2);
  // d1.replaceWith(parent_1);
  // logTest('replaceWith', !d1.hasParent(parent));
  // d1 = el('input', { type : 'text' }).value('some text');
  // logTest('select', d1.select(1, 3).select()[0] === 1 && d1.select(1, 3).select()[1] === 3);
  // logTest('selectorPath', parent_1_1.selectorPath());
  // logTest('siblings', parent_1.siblings());
  // logTest('style', parent_1.style({ color : 'red' }));
  // logTest('style', parent_1.style('color') === 'rgb(255, 0, 0)');
  // logTest('style', el('div', { style : { color : 'red' } }).style('color') === 'rgb(255, 0, 0)');
  // logTest('tag', parent_1.tag('h1'));
  // logTest('tag', parent_1.tag() === 'h1');
  // parent_1.text('this is a title');
  // logTest('text', parent_1.text());
  // logTest('textNodes', parent_1.textNodes());
  // parent_1.toggleClass('this-class');
  // logTest('toggleClass (true)', parent_1.hasClass('this-class'));
  // parent_1.toggleClass('this-class');
  // logTest('toggleClass (false)', parent_1.hasClass('this-class'));
  // d1 = el('input', { type : 'checkbox' }).check().uncheck();
  // logTest('uncheck (true)', !d1.isChecked());
  // d1 = el('input', { type : 'text' }).value('test');
  // logTest('value', d1.value() === 'test');
}());
