window.el = createNode;
window.CreateNode = CreateNode;
window.el.classPrefix = CreateNode.classPrefix;
window.el.fn = CreateNode.fn;

// Node environment
if (module && module.exports) {
  module.exports = startText;
}
