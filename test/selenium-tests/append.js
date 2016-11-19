var a = el('div');
var b = el('div');

a.append([b]);

return {
  left : a.children()[0].node === b.node,
  right : true
};
