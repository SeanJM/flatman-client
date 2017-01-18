var el = flatman.el;
var a;
var p = el('div', { className : 'test', id : 'test' });

return {
  left : p.is('#test.test'),
  right : true
};
