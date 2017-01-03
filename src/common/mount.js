function mount(element) {
  if (
    element.hasParent(BODY)
    && MOUNTED.indexOf(element) === -1
    && element.trigger
  ) {
    MOUNTED.push(element);
    element.trigger('mount');
    element.childNodes.forEach(mount);
  }
}
