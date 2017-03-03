function mount(child) {
  if (child.hasParent && child.hasParent(BODY)) {
    child.trigger('mount', { target : child });
    child.children().forEach(mount);
  }
}