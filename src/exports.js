window.CreateNode = CreateNode;

// El assignments
window.el = createNode;
window.el.fn = CreateNode.fn;
window.el.isVisible = isVisible;
window.el.hasParent = hasParent;
window.el.contains = contains;
window.el.isElement = isElement;
window.el.isComponent = isComponent;

// Node environment
if (typeof module === 'object' && module.exports) {
  module.exports = startText;
}
