var a = el('div');
var b = el('div');

a.addClass('my-class-name');
b.addClass(['my-class', 'my-class-2']);

return {
  right : (
    a.attr('class') === 'my-class-name'
    && b.attr('class') === 'my-class my-class-2'
  ),
  left : true
};
