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
        }).join('\n');
      }
    }
    return '';
  });
}

function stringMe(res) {
  var type = Object.prototype.toString.call(res);
  var t;
  if (type === '[object Array]') {
    return '[\n' + res.map(function (a) {
      return '  ' + stringMe(a);
    }).join(',\n') + '\n]';
  } else if (type === '[object String]' || type === '[object Number]') {
    return res;
  } else if (res.node) {
    return renderNode(res, 0);
  } else if (type === '[object Object]') {
    t = '{';
    for (var k in res) {
      t += stringMe(res[k]);
    }
    t += '}';
    return t;
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
  var child;

  el('div', { class : 'parent-1' },
    el('div', { class : 'parent-2' },
      child = el('div', { class : 'parent-3 '})
    )
  );

  logTest('parents for ' + child.getSelector(), child.parents());
  logTest('addClass', el('div').addClass('my-class-name'));
  logTest('append', el('div').append(el('div')));
  logTest('attributes', el('div').attr('type', 'test').attr('title', 'my-title'));
}());
