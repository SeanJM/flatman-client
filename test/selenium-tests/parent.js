var a = el();
var b = el();

a.appendTo(b);

return {
  left : a.parent().node === b.node,
  right : true
};
