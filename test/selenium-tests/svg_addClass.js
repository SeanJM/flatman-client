var el = flatman.el;
var a = el('svg');
var res = [];

a.addClass('a-class');

return {
  left : a.hasClass('a-class'),
  right : true
};