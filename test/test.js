function stringMe(res) {
  var type = Object.prototype.toString.call(res);
  var t;
  if (type === '[object Array]') {
    return '[' + res.map(function (a) {
      return stringMe(a);
    }).join(',\n ') + ']';
  } else if (type === '[object String]' || type === '[object Number]') {
    return res;
  } else if (res.node) {
    return res.getSelector();
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
  logTest('attributes', el('div').attr('type', 'test').attr('title', 'my-title'));
}());
