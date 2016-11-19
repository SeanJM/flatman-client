var a = el('div', { class : 'a' });
var b = el('div', { class : 'b' });
var c = el('div', { class : 'c' });
var p;

a.append([b.append([c])]);
p = c.parents();

return {
  left : p[1].node === a.node,
  right : true
};
