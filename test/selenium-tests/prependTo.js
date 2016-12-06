var a = el('div', { className : 'a' });
var b = el('div', { className : 'b' });
var c = el('div', { className : 'c' });

a.append([b]);
c.prependTo(b);

return {
  left : b.children()[0].node === c.node,
  right : true
};
