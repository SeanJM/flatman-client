var el = flatman.el;
var i = 0;

var a = el('div').once('click', function () { i++; });

a.trigger('click');
a.trigger('click');
a.trigger('click');

return {
  left : i,
  right : 1
};
