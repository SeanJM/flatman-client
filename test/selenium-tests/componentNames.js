function C() {

}

function Control() {
  this.dict = {
    name : 'control'
  };
}

Control.prototype.render = function () {
  return el('div');
};

C.prototype.render = function () {
  return el('div', [
    el(Control)
  ]);
};

var p = el(C);

return {
  left : !!p.node.control,
  right : true
};
