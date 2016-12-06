// Component Basics
var a = el('div');
var b = el('div');

function C() {
  this.node = {
    document : a
  };
  this.node.document.append([b]);
}

C.prototype.addClass = function (a) {
  this.node.document.addClass(a);
};

var p = el(C, { className : 'test' });

return {
  left : (
    p.node.document.node === a.node
    && p.node.document.attr('class') === 'test'
    && p.node.document.children()[0].node === b.node
  ),
  right : true
};
