var el = flatman.el;
var p = el('div', { className : 'test', id : 'test' });

return {
  left : p.is('[id*="te]'),
  right : true
};
