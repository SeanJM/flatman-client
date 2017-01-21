var el = flatman.el;
var a = el('div', { className : 'a' });
var b = el('div', { className : 'b' });
var c = el('div', { className : 'c' });
var d = el('div', { className : 'd' });

a.append([b]);

b.append([d]);
b.prepend([c]);

return {
  left : b.children(0).node === c.node,
  right : true
};
