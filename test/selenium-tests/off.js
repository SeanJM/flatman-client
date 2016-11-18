var a = el('div');
var x = true;

a.on('click', () => x = false);

a.off('click');
a.trigger('click');

return {
  left : x,
  right : true
};
