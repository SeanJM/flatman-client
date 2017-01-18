var el = flatman.el;
var a = el('div', { className : 'test1' });
var b = el('div', { className : 'test2' });
var c = el('div', { className : 'test2' });
var d = el('div', { className : 'test2' });

a.append([b, c, d]);

return {
  left : (
    a.contains(b, c, d)
    && !b.contains(a, c, d)
    && a.contains([ b, c ], d)
  ),
  right : true
};
