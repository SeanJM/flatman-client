function mount(child) {
  if (child.childNodes) {
    if (child.hasParent(BODY)) {
      child.trigger('mount');
    }
    if (child.childNodes) {
      child.childNodes.forEach(mount);
    }
  }
}