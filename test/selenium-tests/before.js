var el = flatman.el;
var a = el('div');
var b = el('div');
var c = el('div');

a.append([b]);
b.before([c]);

return {
  left : a.children()[0].node === c.node,
  right : true
};
