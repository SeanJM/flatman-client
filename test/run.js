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

  // prependTo
  (function () {
    var a = el('div', { class : 'a' });
    var b = el('div', { class : 'b' });
    var c = el('div', { class : 'c' });
    var p;
    a.append(b);
    c.prependTo(a);
    test('prependTo', a.firstChild().node, c.node);
  }());

  // remove
  (function () {
    var a = el('div', { class : 'a' });
    a.appendTo('body');
    a.remove();
    test('remove', el(document.body).contains(a), false);
  }());

  // removeClass
  (function () {
    var a = el('div', { class : 'a' });
    test('removeClass', a.removeClass('a').hasClass('a'), false);
  }());

  // replaceWith
  (function () {
    var a = el('div');
    var b = el('div');
    var c = el('div');
    a.append(b);
    b.replaceWith(c);
    test('replaceWith', a.contains(c) && !a.contains(b), true);
  }());

  // scale
  (function () {
    var a = el('div');
    a.appendTo('body');
    a.scale(2);
    test('scale', a.attr('style'), 'transform: matrix(2, 0, 0, 2, 0, 0);');
    a.remove();
  }());

  // select
  (function () {
    var a = el('input', { type : 'text' });
    a.value('text');
    a.select(0, 1);
    test('select', a.select()[0] === 0 && a.select()[1] === 1, true);
  }());

  // selectorPath
  (function () {
    var a;
    el('div', { class : '1' },
      el('div', { class : '1_1'},
        a = el('div', { class : '1_1_1'})
      )
    );
    test('selectorPath', a.selectorPath(), 'div.1 div.1_1 div.1_1_1');
  }());

  // siblings
  (function () {
    var a;
    var b;
    el('div', { class : '1' },
      a = el('div', { class : '1_1'}),
      el('div', { class : '1_2'}),
      el('div', { class : '1_3'}),
      b = el('div', { class : '1_4'})
    );
    test('siblings', a.siblings()[3].node, b.node);
  }());

  // style
  (function () {
    var a = el('div');
    var b = el('div');
    var c = el('div');
    var m = 'rgb(255, 0, 0)';

    a.style('color', 'red');
    b.style('color: red');
    c.style({ color : 'red' });

    a.appendTo('body');
    b.appendTo('body');
    c.appendTo('body');

    test('style', a.style('color') === m && b.style('color') === m && c.style('color') === m, true);
  }());

  // tag
  (function () {
    var a = el('div');
    a.tag('span');
    test('tag', a.tag(), 'span');
  }());
});

(function () {
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
