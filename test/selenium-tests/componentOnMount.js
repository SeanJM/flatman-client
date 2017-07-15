var Component = flatman.Component;
var el = flatman.el;
var isMounted = false;

Component.lib.C = undefined;

Component.create('C', {
  render(props) {
    return el('div', {
      onMount: props.onMount,
      className : 'children-test'
    });
  }
});

Component.create('D', {
  render() {
    return el('div', {
      className : 'D'
    });
  }
});

var p = el('D', [
  el('C', {
    onMount: function () {
      isMounted = true;
    }
  })
]);

p.appendTo(document.body);

return {
  left : isMounted,
  right : true
};