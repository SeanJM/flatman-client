el.fn = Node.fn;

if (typeof module === 'object') {
  module.export = {
    el : el,
    version : VERSION,
    Component : Component,
  };
} else if (window) {
  window.flatman = {
    el : el,
    version : VERSION,
    Component : Component,
  };
}