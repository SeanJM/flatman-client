var el = flatman.el;
var Component = flatman.Component;

Component.lib = {};

Component.create('C', {
  render() {
    return el('div', [
      el('Control', { ref : 'control' })
    ]);
  }
});

Component.create('Control', {
  render(props) {
    return el('div', { ref : props.ref });
  }
});

var p = el('C');

return {
  left : !!p.refs.control,
  right : true
};
