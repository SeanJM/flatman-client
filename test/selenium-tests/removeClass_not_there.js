var el = flatman.el;
var a = el('div', { className : 'b' });

a.removeClass('a')

return {
  left : a.hasClass('b') && !a.hasClass('a'),
  right : true
};
