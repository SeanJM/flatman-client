var el = flatman.el;
var a = el('div');

a.style('fontSize', 13);
a.appendTo(document.body);

return {
  left : a.style('fontSize'),
  right : 13
};
