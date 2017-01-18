var el = flatman.el;
var p = el('div');
var a = el('div');
var b = el('div');
var c = el('div');

var x;

p.append([a, b, c]);

x = p.children(1, -1);

return {
  left : (
    x[0].node === b.node
  ),
  right : true
};
