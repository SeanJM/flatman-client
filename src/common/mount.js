function mount(child) {
  if (child.hasParent && child.hasParent(BODY)) {
    child.trigger({ type : 'mount', target : child });
    child.children().forEach(mount);
  }
}