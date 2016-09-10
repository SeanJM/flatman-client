var a = el();
var b = el();

a.addClass('my-class-name');
b.addClass(['my-class', 'my-class-2']);

return {
  aClassName : a.attr('class'),
  bClassName : b.attr('class')
};
