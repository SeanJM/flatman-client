var el = flatman.el;
var a = el('div');

a
  .attr('type', 'test')
  .attr('tabindex', '0');

return {
  left : a.attr().type === 'test' && a.attr().tabindex === '0',
  right : true
};
