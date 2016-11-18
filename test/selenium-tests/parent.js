var a = el('div');
var b = el('div');

a.appendTo(b);

return {
  left : a.parent().node === b.node,
  right : true
};
