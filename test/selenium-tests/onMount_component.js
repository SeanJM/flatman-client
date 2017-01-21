var el = flatman.el;
var Component = flatman.Component;
var isMounted = false;

Component.create('C', {
  render() {
    return el('div', { onMount : function () {
      isMounted = !isMounted;
    }});
  }
});

el('C').appendTo(document.body);

return {
  left : isMounted,
  right : true
};
