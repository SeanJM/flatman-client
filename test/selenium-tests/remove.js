var a = el();

a.appendTo('body');
a.remove();

return {
  left : document.body.contains(a.node),
  right : false
};
