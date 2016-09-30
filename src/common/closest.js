function closest(node, selector) {
  var p = parents(node);
  var i = 0;
  var n = p.length;
  var t;

  for (; i < n; i++) {
    t = [].filter.call(p[i].querySelectorAll(selector),
      function (a) {
        return p.indexOf(a) > -1;
      }
    );

    if (t.length) {
      return t[0];
    }
  }

  return null;
}
