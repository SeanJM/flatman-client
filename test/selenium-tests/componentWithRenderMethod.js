// Component Basics
var a = el('div');
var b = el('div');

function C() {
  this.dict = {
    name : 'c'
  };
}

C.prototype.addClass = function (a) {
  this.node.document.addClass(a);
};

C.prototype.render = function () {
  a.append([b]);
  return a;
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