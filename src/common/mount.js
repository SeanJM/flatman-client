function mount(child) {
  var createNode = getEl(child);
  if (createNode) {
    if (createNode.hasParent(BODY)) {
      createNode.trigger('mount');
    }
    if (createNode.childNodes) {
      createNode.childNodes.forEach(mount);
    }
  }
}