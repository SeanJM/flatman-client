// Component Basics
var a = el('div');

function C() {
  this.node = {
    document : a
  };
}

var p = el(C);

return {
  left : (
    p.node.document.node === a.node
  ),
  right : true
};
