var x = true;
var y = true;

var a = el('div').on('click', function () { x = false; });
var b = el('div', { onClick : function () { y = false; } });

a.trigger('click');
b.trigger('click');

return {
  left : x && y,
  right : false
};
