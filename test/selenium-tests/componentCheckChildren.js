// Component Basics
var a = el('div');
var b = el('div');

function C() {}

C.prototype.render = function () {
  return el('div', { className : 'children-test' });
};

var p = el(C, [
  el('div'),
  el('div'),
  el('div'),
  el('div')
]);

return {
  left : (
    p.childNodes.length === 4
  ),
  right : true
};