var el = flatman.el;
var a = el('div');

el.fn('test', function () {
  return this.node;
});

return {
  left : a.test() === a.node,
  right : true
};
