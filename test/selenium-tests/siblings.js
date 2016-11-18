var a;
var b;

el('div', { class : '1' }, [
  a = el('div', { class : '1_1'}),
  el('div', { class : '1_2'}),
  el('div', { class : '1_3'}),
  b = el('div', { class : '1_4'})
]);

return {
  left : a.siblings()[3].node === b.node,
  right : true
};
