window.el = createNode;
window.CreateNode = CreateNode;
window.el.classPrefix = CreateNode.classPrefix;
window.el.fn = CreateNode.fn;

// Node environment
if (typeof module === 'object' && module.exports) {
  module.exports = startText;
}
