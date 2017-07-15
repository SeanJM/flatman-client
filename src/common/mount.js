function mount(child) {
  var c = (child.document || child);
  if (c.hasParent && c.hasParent(BODY)) {
    c
      .trigger('mount')
      .children()
      .forEach(mount);
  }
}