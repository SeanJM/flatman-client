var a = el('input', { type : 'text' });

a.node.value = 'text';
a.select(0, 1);

return {
  left : a.select()[0] === 0 && a.select()[1] === 1,
  right : true
};
