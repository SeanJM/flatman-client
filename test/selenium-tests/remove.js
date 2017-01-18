var el = flatman.el;
var a = el('div');

a.appendTo(document.body);
a.remove();

return {
  left : document.body.contains(a.node) && a.childNodes.length === 0,
  right : false
};
