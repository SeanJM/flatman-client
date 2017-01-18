var el = flatman.el;
var a = el('input', { type : 'input' });

a.node.value = 'test';

return {
  left : a.node.value,
  right : 'test'
};
