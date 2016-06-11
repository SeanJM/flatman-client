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
  } else if (type.indexOf('[object HTML') !== -1) {
    return renderNode(el(res), 0);
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

function objectIsEqual(a, b) {
  if (a === b) {
    return a === b;
  } else {
    for (var k in a) {
      if (!isEqual(a[k], b[k])) {
        return false;
      }
    }
  }
  return true;
}

function arrayIsEqual(a, b) {
  var i = 0;
  var n = a.length;

  if (a.length === b.length) {
    for (; i < n; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

function isEqual(a, b) {
  if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
    return a === b;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return arrayIsEqual(a, b);
  } else if (typeof a === 'object' && typeof b === 'object') {
    return objectIsEqual(a, b);
  }
  return false;
}

function startTest(callback) {
  var passed = 0;
  var failed = 0;
  var testDiv = el('div', { class : 'test-container' });

  el('h1', 'el Tests').appendTo(testDiv);

  function test(name, a, b) {
    var title;
    var result;
    var div = el('div', { class : 'result' },
      result = el('div', { class : 'result_dot' }),
      title = el('div', { class : 'result_title'}, name)
    );
    var status = el('div', { class : 'result_status' },
      el('div', { class : 'result_status_item result_status_item--expected'},
        el('div', { class : 'result_status_title'}, 'Expected'),
        el('div', { class : 'result_status_value'}, stringMe(b))
      ),
      el('div', { class : 'result_status_item result_status_item--actual'},
        el('div', { class : 'result_status_title'}, 'Actual'),
        el('div', { class : 'result_status_value'}, stringMe(a))
      )
    );

    if (isEqual(a, b)) {
      div.addClass('result--pass');
      passed += 1;
    } else {
      div.append(status);
      div.addClass('result--fail');
      failed += 1;
    }

    div.appendTo(testDiv);
  }

  callback(test);

  el('div', { class : 'test-results' }, 'Failed: ' + failed + ' Passed: ' + passed).appendTo(testDiv);

  el('div', { class : 'test-results_bar' },
    el('div', {
      class : 'test-results_bar_progress',
      style : 'width: ' + (passed / (failed + passed) * 100) + '%;'
    })
  ).appendTo(testDiv);

  testDiv.appendTo(document.body);
}
