var a = el('div', { class : 'test' });
var b = el('div', { class : 'test2' });
var c = el('div', { class : 'test3' });

a.append(b.append(c));

return {
  left : c.closest('.test2').node === b.node,
  right : true
};
