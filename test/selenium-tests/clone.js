var el = flatman.el;
var p = el('div', { className : 'test' });
var c = p.clone();

return {
  left : p.attr('class'),
  right : c.attr('class')
};
