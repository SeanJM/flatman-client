// children
var p = el('div');
var a = el('div');
var b = el('div');

p.append(a, b);

return {
  left : (
    p.children(0).node === a.node
  ),
  right : true
};
