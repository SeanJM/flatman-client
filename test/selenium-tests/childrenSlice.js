// children
var p = el();

var a = el();
var b = el();
var c = el();

var x;

p.append(a, b, c);

x = p.children(1, -1);

return {
  left : (
    x[0].node === b.node
  ),
  right : true
};
