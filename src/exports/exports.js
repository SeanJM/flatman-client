// El assignments
window.el = createEl;
window.el.fn = CreateNode.fn;
window.el.isVisible = isVisible;
window.el.hasParent = hasParent;
window.el.contains = contains;
window.el.isElement = isElement;
window.el.isComponent = isComponent;
window.el.isCreateNode = isCreateNode;

// Node environment
if (typeof module === 'object' && module.exports) {
  module.exports = startText;
}