function createComponent(tagName, props, children) {
  var constructor = Component.lib[tagName];
  var component = new constructor(props, children);
  return component;
}
