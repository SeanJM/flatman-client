var el = flatman.el;
// children
var p = el('div');
var a = el('div');
var b = el('div');

p.append([a, b]);

return {
  left : (
    p.children()[0].node === a.node
    && p.children()[1].node === b.node
  ),
  right : true
};
