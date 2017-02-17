var el = flatman.el;
var a = el('div');
var b = el('div');
var c = el('div');
var d = el('div');
var e = el('div');

a.append([b, c]);
b.after(d);

return {
  left : a.children(1) === d,
  right : true
};
