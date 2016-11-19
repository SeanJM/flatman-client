var a = el('div');
var b = el('div');
var c = el('div');

a.append([b]);
b.replaceWith(c);

return {
  left : a.contains(c) && !a.contains(b),
  right : true
};
