var el = flatman.el;
var a = el('div');
var b = el('div');
var c = el('div');
var d = el('div');
var e = el('div');

a.append([b, c, e]);
e.after([d]);

return {
  left : a.children(3) === d,
  right : true
};
