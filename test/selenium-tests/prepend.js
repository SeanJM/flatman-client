var a = el('div', { className : 'a' });
var b = el('div', { className : 'b' });
var c = el('div', { className : 'c' });

a.append([b]);
b.prepend([c]);

return {
  left : a.children()[0].node === c.node,
  right : true
};
