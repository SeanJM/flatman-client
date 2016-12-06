var a = el('div', { className : 'a' });
var b = el('div', { className : 'b' });
var c = el('div', { className : 'c' });
var p;

a.append([b.append([c])]);
p = c.parents();

return {
  left : p[1].node === a.node,
  right : true
};
