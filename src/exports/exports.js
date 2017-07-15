el.fn = Node.fn;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    el : el,
    version : VERSION,
    Component : Component,
  };
} else if (typeof window !== 'undefined') {
  window.flatman = {
    el : el,
    version : VERSION,
    Component : Component,
  };
}