var el = flatman.el;
var a = el('div');
var b = el('div');

a.appendTo(b);

return {
  left : b.children()[0] === a,
  right : true
};
