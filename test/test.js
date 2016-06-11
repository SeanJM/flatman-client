function renderNode(node, n) {
  return '{tab}&lt;{tag}{attr}&gt;{children}{tab}&lt;/{tag}&gt;'.replace(/\{(\w+)}/g, function (a, b) {
    var x = [];
    var y;
    if (b === 'tag') {
      return node.node.tagName.toLowerCase();
    } else if (b === 'attr') {
      y = node.attr();
      for (var k in y) {
        x.push(k + '="' + y[k] + '"');
      }
      return x.length ? ' ' + x.join(' ') : '';
    } else if (b === 'children') {
      if (node.children()) {
        return node.children().map(function (c) {
          return renderNode(c, n + 1);
        }).join('');
      }
    }
    return '';
  });
}

function stringMe(res) {
  var type = Object.prototype.toString.call(res);
  var t;
  var a;
  if (type === '[object Text]') {
    return type + ': "' + res.nodeValue + '"';
  } else if (type === '[object Array]') {
    return '[\n' + res.map(function (a) {
      return '  ' + stringMe(a);
    }).join(',\n') + '\n]';
  } else if (type === '[object String]') {
    return '"' + res + '"';
  } else if (type === '[object Number]') {
    return res;
  } else if (res && res.node) {
    return renderNode(res, 0);
  } else if (type === '[object Object]') {
    t = '{';
    a = [];
    for (var k in res) {
      a.push('\n  ' + k + ' : ' + stringMe(res[k]));
    }
    t += a.join(',') + '\n}';
    return t;
  } else if (type === '[object Boolean]') {
    return res ? 'true' : 'false';
  }
}

function logTest(name, res) {
  var title = el('h2', name);
  var pre = el('pre', { class : 'grey'}, stringMe(res));
  title.appendTo(document.body);
  pre.appendTo(document.body);
}

el('h1', 'el Tests').appendTo(document.body);

// Parents test
(function () {
  var parent_1_1;
  var d1;
  var d2;
  var d1_1;
  var parent;
  var parent_1;

  d1 = el('div', { class : 'div-1' }, d1_1 = el('div', { class : 'div-1_1' }));
  d2 = el('div', { class : 'div-2' });


  parent = el('div', { class : 'parent-1', tabIndex : 0 },
    parent_1 = el('div', { class : 'parent-2' },
      parent_1_1 = el('div', { class : 'parent-3 '})
    )
  );

  logTest('addClass', el('div').addClass('my-class-name'));
  logTest('append', el('div').append(el('div')));
  logTest('attr', el('div').attr('type', 'test').attr('title', 'my-title'));
  logTest('empty attr', el('div').attr('type', 'test').attr());
  d2.before(d1_1);
  logTest('before', d1);

  logTest('check / isChecked (true)', el('input', { type : 'checkbox' }).check().isChecked());
  logTest('check / isChecked (false)', el('input', { type : 'checkbox' }).isChecked());

  d1 = el('div', { class : 'parent-1' },
    el('div', { class : 'parent-2' },
      el('div', { class : 'parent-3 '})
    )
  );
  logTest('children', d1.children());
  logTest('clone', d1.clone());
  logTest('closest', parent_1_1.closest('.parent-1'));
  logTest('closest (false)', parent_1_1.closest('body'));
  logTest('contains (true)', parent.contains(parent_1_1));
  logTest('contains (false)', parent.contains(d1));
  logTest('copyAttributes', parent_1_1.copyAttributes(d1));
  logTest('disable', d1.disable().node.getAttribute('disabled') === 'disabled');
  logTest('enable', d1.enable().node.getAttribute('disabled') !== 'disabled');
  logTest('find', parent.find('.parent-1')[0].node === parent_1_1.node);
  logTest('find', parent.firstChild().node === parent_1.node);
  parent.appendTo(document.body);
  logTest('focus / isFocused', parent.focus().isFocused());
  parent.remove();
  logTest('getSelector', parent.getSelector());
  logTest('hasClass (true)', parent.hasClass('parent-1'));
  logTest('hasClass (false)', parent.hasClass('parent-2'));
  logTest('hasParent (true)', parent_1.hasParent(parent));
  logTest('hasParent (false)', parent.hasParent(parent_1));
  parent.appendTo(document.body);
  logTest('isVisible (true)', parent.isVisible());
  parent.remove();
  logTest('isVisible (false)', parent.isVisible());
  parent.append(d1 = el('div', { class : 'last-child' }));
  logTest('lastChild (true)', parent.lastChild().node === d1.node);
  d1.append('text');
  logTest('nodeText', parent.nodeText() === 'text');
  d1.on('click', function () { logTest('on / trigger', true); logTest('off', true); });
  d1.trigger('click');
  d1.off('click');
  d1.trigger('click');
  parent.append(d1);
  logTest('parent', d1.parent().node === parent.node);
  parent.append(d1);
  parent.prepend(d2);
  logTest('prepend', parent.firstChild().node === d2.node);
  parent_1.prependTo(parent);
  logTest('prependTo', parent.firstChild().node === parent_1.node);
  parent_1.appendTo(document.body);
  parent_1.remove();
  logTest('remove', !parent_1.hasParent(document.body));
  parent_1.addClass('remove-this-class').removeClass('remove-this-class');
  logTest('removeClass', !parent_1.hasClass('remove-this-class'));
  parent.append(d1, d2);
  d1.replaceWith(parent_1);
  logTest('replaceWith', !d1.hasParent(parent));
  d1 = el('input', { type : 'text' }).value('some text');
  logTest('select', d1.select(1, 3).select()[0] === 1 && d1.select(1, 3).select()[1] === 3);
  logTest('selectorPath', parent_1_1.selectorPath());
  logTest('siblings', parent_1.siblings());
  logTest('style', parent_1.style({ color : 'red' }));
  logTest('style', parent_1.style('color') === 'rgb(255, 0, 0)');
  logTest('style', el('div', { style : { color : 'red' } }).style('color') === 'rgb(255, 0, 0)');
  logTest('tag', parent_1.tag('h1'));
  logTest('tag', parent_1.tag() === 'h1');
  parent_1.text('this is a title');
  logTest('text', parent_1.text());
  logTest('textNodes', parent_1.textNodes());
  parent_1.toggleClass('this-class');
  logTest('toggleClass (true)', parent_1.hasClass('this-class'));
  parent_1.toggleClass('this-class');
  logTest('toggleClass (false)', parent_1.hasClass('this-class'));
  d1 = el('input', { type : 'checkbox' }).check().uncheck();
  logTest('uncheck (true)', !d1.isChecked());
  d1 = el('input', { type : 'text' }).value('test');
  logTest('value', d1.value() === 'test');
}());
