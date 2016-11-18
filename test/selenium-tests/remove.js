var a = el('div');

a.appendTo(document.body);
a.remove();

return {
  left : document.body.contains(a.node),
  right : false
};
