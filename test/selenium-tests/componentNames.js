var el = flatman.el;
var Component = flatman.Component;

Component.create('C', {
  render() {
    return el('div', [
      el('Control', { name : 'control' })
    ]);
  }
});

Component.create('Control', {
  render() {
    return el('div');
  }
});

var p = el('C');

return {
  left : !!p.node.control,
  right : true
};
