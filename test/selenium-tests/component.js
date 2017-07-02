var el = flatman.el;
var Component = flatman.Component;
var a = el('div');

Component.lib = {};

Component.create('C', {
  render() {
    return a;
  }
});

var p = el('C');

return {
  left : p.document === a,
  right : true
};
