var el = flatman.el;
var a = el('div');

a.attr('type', 'test');

return {
  left : a.attr('type'),
  right : 'test'
};
