function mount(child) {
  var c = child.document || child;
  if (document.body.contains(c.node)) {
    c
      .trigger('mount')
      .children()
      .forEach(mount);
  }
}