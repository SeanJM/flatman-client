var a = el('div');
var b = el('div');

b.addClass('my-class');
b.toggleClass('my-class');
a.toggleClass('my-class');

return {
  left : a.hasClass('my-class') && !b.hasClass('my-class'),
  right : true
};
