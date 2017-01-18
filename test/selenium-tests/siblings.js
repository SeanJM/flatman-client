var el = flatman.el;
var a;
var b;

el('div', { className : '1' }, [
  a = el('div', { className : '1_1'}),
  el('div', { className : '1_2'}),
  el('div', { className : '1_3'}),
  b = el('div', { className : '1_4'})
]);

return {
  left : a.siblings()[3].node === b.node,
  right : true
};
