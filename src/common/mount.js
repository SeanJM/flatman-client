function mount(child) {
  if (child.hasParent && child.hasParent(BODY)) {
    child.trigger('mount');
    child.children().forEach(mount);
  }
}