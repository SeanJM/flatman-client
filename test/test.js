// Parents test
startTest('el', function (test) {
  // Add Class
  (function () {
    var a = el('div');
    a.addClass('my-class-name');
    test('addClass', a.attr('class')).shouldEqual('my-class-name');
  }());

  // Append
  (function () {
    var a = el('div');
    var b = el('div');
    a.append(b);
    test('append', a.firstChild().node).shouldEqual(b.node);
  }());

  // attr
  (function () {
    var a = el('div');
    a.attr('type', 'test');
    test('attr', a.attr('type')).shouldEqual('test');
  }());

  // empty attr
  (function () {
    var a = el('div');
    a.attr('type', 'test').attr('tabindex', '0');
    test('attr (no arguments, returns an object)', a.attr())
    .shouldEqual({ type : 'test', tabindex : '0' });
  }());

  // before
  (function () {
    var p = el('div');
    var a = el('div');
    var b = el('div');
    p.append(a);
    b.before(a);
    test('before', p.firstChild().node).shouldEqual(b.node);
  }());

  // check
  (function () {
    var a = el('input', { type : 'checkbox' });
    var b = el('input', { type : 'checkbox' });
    test('check', a.check().isChecked() && !b.isChecked()).shouldEqual(true);
  }());

  // children
  (function () {
    var p = el('div');
    var a = el('div');
    var b = el('div');
    var t1;
    p.append(a, b);
    t1 = p.children()[0].node === a.node && p.children()[1].node === b.node;
    test('children', t1).shouldEqual(true);
  }());

  // clone
  (function () {
    var p = el('div', { class : 'test' });
    var c = p.clone();
    test('clone', p.attr('class')).shouldEqual(c.attr('class'));
  }());

  // closest, contains
  (function () {
    var p = el('div', { class : 'test1' });
    var c = el('div', { class : 'test2' });
    var x;
    p.append(c);

    test('closest', c.closest('.test1').node, p.node);
    test('contains (true)', p.contains(c)).shouldEqual(true);
    test('contains (false)', c.contains(p)).shouldEqual(false);
  }());

  // copyAttributes
  (function () {
    var p = el('div', { class : 'test1', tabIndex : '0' });
    var c = el('div', { class : 'test2' });
    var x;
    c.copyAttributes(p);
    x = c.attr('class') === 'test1' && c.attr('tabindex') === '0';
    test('copyAttributes', x).shouldEqual(true);
  }());

  // disable
  (function () {
    var p = el('div').disable();
    test('disable', p.isDisabled()).shouldEqual(true);
  }());

  // find
  (function () {
    var a;
    var p = el('div', a = el('div', { class : 'test'}));
    test('find', p.find('.test')[0].node).shouldEqual(a.node);
  }());

  // firstChild
  (function () {
    var a;
    var p = el('div', a = el('div', { class : 'test'}));
    test('firstChild', p.firstChild().node).shouldEqual(a.node);
  }());

  // focus
  (function () {
    var p = el('div', { tabIndex : '0' });
    p.appendTo('body');
    p.focus();
    test('focus', p.isFocused()).shouldEqual(true);
    p.remove();
  }());

  // getSelector
  (function () {
    var p = el('div', { class : 'test'});
    var a = el('div', { class : 'test', tabIndex : '0', id : 'my-id'});
    var t = p.getSelector() === 'div.test' && a.getSelector() === 'div.test#my-id';
    test('getSelector', t).shouldEqual(true);
  }());

  // getSelector
  (function () {
    var a = el('div', { class : 'test'});
    var b = el('div', { class : 'test-2'});
    var t = a.hasClass('test') && b.hasClass('test-2');
    test('hasClass', t).shouldEqual(true);
  }());

  // hasParent
  (function () {
    var a = el('div', { class : 'test'});
    var b = el('div', { class : 'test-2'});
    a.append(b);
    test('hasParent', b.hasParent(a) && !a.hasParent(b)).shouldEqual(true);
  }());

  // isChecked
  (function () {
    var a = el('input', { type : 'checkbox'});
    var b = el('input', { type : 'checkbox'});
    a.check();
    test('isChecked', a.isChecked() && !b.isChecked()).shouldEqual(true);
  }());

  // isDisabled
  (function () {
    var a = el('input', { type : 'checkbox'});
    var b = el('input', { type : 'checkbox'});
    a.disable();
    test('isDisabled', a.isDisabled() && !b.isDisabled()).shouldEqual(true);
  }());

  // isFocused
  (function () {
    var a = el('input', { type : 'checkbox' });
    var b = el('input', { type : 'checkbox' });

    a.appendTo('body');
    b.appendTo('body');
    a.focus();

    test('isFocused', a.isFocused() && !b.isFocused()).shouldEqual(true);

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
      !f.isVisible()
    ).shouldEqual(true);

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
    test('lastChild', a.lastChild().node).shouldEqual(d.node);
  }());

  // nodeText
  (function () {
    var a = el('div', 'text');
    test('nodeText', a.nodeText()).shouldEqual('text');
  }());

  // off
  (function () {
    var a = el('div');
    var x = true;

    a.on('click', function () {
      test('off', true).shouldEqual(false);
      x = false;
    });

    a.off('click');
    a.trigger('click');

    if (x) {
      test('off', true).shouldEqual(true);
    }
  }());

  // offset
  (function () {
    var a = el('div', { style : 'position: absolute; left: 0; top: 0; width : 0; height: 0'});
    var o;

    a.appendTo('body');
    o = a.offset();

    test('offset',
      o.top === 0 &&
      o.left === 0 &&
      o.width === 0 &&
      o.height === 0
    ).shouldEqual(true);

    a.remove();
  }());

  // on
  (function () {
    var a = el('div');
    var x = true;

    a.on('click', function () { x = false; });

    a.trigger('click');

    if (x) {
      test('on', true).shouldEqual(false);
    } else {
      test('on', true).shouldEqual(true);
    }
  }());

  // parent
  (function () {
    var a = el('div');
    var b = el('div');
    a.appendTo(b);
    test('parent', a.parent().node).shouldEqual(b.node);
  }());

  // parents
  (function () {
    var a = el('div', { class : 'a' });
    var b = el('div', { class : 'b' });
    var c = el('div', { class : 'c' });
    var p;

    a.append(b.append(c));
    p = c.parents();

    test('parents', p[0].node).shouldEqual(a.node);
  }());

  // prepend
  (function () {
    var a = el('div', { class : 'a' });
    var b = el('div', { class : 'b' });
    var c = el('div', { class : 'c' });

    a.append(b);
    a.prepend(c);

    test('prepend', a.firstChild().node).shouldEqual(c.node);
  }());

  // prependTo
  (function () {
    var a = el('div', { class : 'a' });
    var b = el('div', { class : 'b' });
    var c = el('div', { class : 'c' });

    a.append(b);
    c.prependTo(a);

    test('prependTo', a.firstChild().node).shouldEqual(c.node);
  }());

  // remove
  (function () {
    var a = el('div', { class : 'a' });

    a.appendTo('body');
    a.remove();

    test('remove', el(document.body).contains(a)).shouldEqual(false);
  }());

  // removeClass
  (function () {
    var a = el('div', { class : 'a' });
    test('removeClass', a.removeClass('a').hasClass('a')).shouldEqual(false);
  }());

  // replaceWith
  (function () {
    var a = el('div');
    var b = el('div');
    var c = el('div');

    a.append(b);
    b.replaceWith(c);

    test('replaceWith', a.contains(c) && !a.contains(b)).shouldEqual(true);
  }());

  // scale
  (function () {
    var a = el('div');

    a.appendTo('body');
    a.scale(2);

    test('scale', a.attr('style')).shouldEqual('transform: matrix(2, 0, 0, 2, 0, 0);');

    a.remove();
  }());

  // select
  (function () {
    var a = el('input', { type : 'text' });

    a.value('text');
    a.select(0, 1);

    test('select', a.select()[0] === 0 && a.select()[1] === 1).shouldEqual(true);
  }());

  // selectorPath
  (function () {
    var a;

    el('div', { class : '1' },
      el('div', { class : '1_1'},
        a = el('div', { class : '1_1_1'})
      )
    );

    test('selectorPath', a.selectorPath()).shouldEqual('div.1 div.1_1 div.1_1_1');
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

    test('siblings', a.siblings()[3].node).shouldEqual(b.node);
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

    test('style',
      a.style('color') === m &&
      b.style('color') === m &&
      c.style('color') === m
    ).shouldEqual(true);
  }());

  // tag
  (function () {
    var a = el('div');
    a.tag('span');
    test('tag', a.tag(), 'span');
  }());

  // text
  (function () {
    var a = el('div', el('div'), el('div'));
    a.text('span');
    test('text', a.text()).shouldEqual('span');
  }());

  // text
  (function () {
    var a = el('div', el('div'), el('div'));
    a.text('span');
    test('textNodes', a.textNodes()[0].nodeValue).shouldEqual('span');
  }());

  // toggleClass
  (function () {
    var a = el('div');
    var b = el('div');

    b.addClass('my-class');
    b.toggleClass('my-class');
    a.toggleClass('my-class');

    test('toggleClass', a.hasClass('my-class') && !b.hasClass('my-class')).shouldEqual(true);
  }());

  // trigger
  (function () {
    var a = el('div');
    var x = true;

    a.on('click', function () { x = false; });
    a.trigger('click');

    test('trigger', x, false);
  }());

  // uncheck
  (function () {
    var a = el('input', { type : 'checkbox' });
    var b = el('input', { type : 'checkbox' });

    a.check().uncheck();
    b.check();

    test('uncheck', !a.isChecked() && b.isChecked()).shouldEqual(true);
  }());

  // uncheck
  (function () {
    var a = el('input', { type : 'input' });
    a.value('test');
    test('value', a.value()).shouldEqual('test');
  }());
});
