function mount(child) {
  if (child.hasParent) {
    if (child.hasParent(BODY)) {
      child.trigger('mount');
    }
    child.children().forEach(mount);
  }
}