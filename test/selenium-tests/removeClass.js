var el = flatman.el;
var a = el('div', { className : 'a b' });

a.removeClass('a')

return {
  left : a.hasClass('b') && !a.hasClass('a'),
  right : true
};
