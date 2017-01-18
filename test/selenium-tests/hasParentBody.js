var el = flatman.el;
var a = el('div', { className : 'test'});
var b = el(document.body);

a.appendTo(document.body);

return {
  left : a.hasParent(document.body) && a.hasParent(b),
  right : true
};
