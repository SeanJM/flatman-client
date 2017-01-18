var el = flatman.el;
var a = el('div', { className : 'test' });
var b = el('div', { className : 'test2' });
var c = el('div', { className : 'test3' });

a.append([
  b.append([
    c
  ])
]);

return {
  left : c.closest('.test2').node === b.node,
  right : true
};
