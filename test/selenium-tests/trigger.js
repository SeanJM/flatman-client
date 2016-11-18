var a = el('div');
var x = true;

a.on('click', function () { x = false; });
a.trigger('click');

return {
  left : x,
  right : false
};
