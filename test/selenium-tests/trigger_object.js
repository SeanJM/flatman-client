var el = flatman.el;
var a = el('div');
var x = true;

function e() {
  this.type = 'click';
}

a.on('click', function () { x = false; });
a.trigger(new e());

return {
  left : x,
  right : false
};
