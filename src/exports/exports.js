el.fn = Node.fn;

if (module && module.exports) {
  module.exports = {
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