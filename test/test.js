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
  console.log(type);
}

function logTest(name, res) {
  var title = el('h1', name);
  var pre = el('pre', { class : 'grey'}, stringMe(res));
  title.appendTo(document.body);
  pre.appendTo(document.body);
}

function Comp () {
  this.el = el('div',
    this.doc = el('div', {
      class : 'child_child-1'
    }),
    this.an = el('div', {
      class : 'child_child-2'
    }),
    this.an = el('div', {
      class : 'child_child-3'
    }),
    this.ab = el('div', {
      class : 'child_child-4'
    }),
    this.ab = el('div', el('div'))
  );
  console.log(this.el);
}

Comp.prototype.put = function () {
  this.el.appendTo(document.body);
};

var test = new Comp();

test.put();

// Parents test
(function () {
  var child;

  el('div', { class : 'parent-1' },
    el('div', { class : 'parent-2' },
      child = el('div', { class : 'parent-3 '})
    )
  );

  logTest('parents', child.parents());
}());
