// Component Basics
var a = el('div', { name : 'a' });
var b = el('div', { name : 'b' });
var c = el('div', { name : 'c' });

function C() {
  this.dict = {
    name : 'C'
  };
}

C.prototype.render = function () {
  a.append([ b.append([ c ]) ]);
  return a;
};

var p = el(C);

return {
  left : (
    p.node.document.node === a.node &&
    p.node.b.node === b.node &&
    p.node.c.node === c.node
  ),
  right : true
};