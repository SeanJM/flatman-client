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
  render(props) {
    return el('div', { name : props.name });
  }
});

var p = el('C');

return {
  left : !!p.node.control,
  right : true
};
