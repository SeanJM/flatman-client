function createComponent(tagName, props, array) {
  var constructor = Component.lib[tagName];
  var component = new constructor(props);
  var children = [];
  var strings = [];

  component.tagName = tagName;
  component.node = component.node || {};
  component.props = component.props || {};

  if (constructor.prototype.text) {
    for (var i = 0, n = array.length; i < n; i++) {
      if (typeof array[i] === 'string' || typeof array[i] === 'number') {
        strings.push(array[i]);
      } else {
        children.push(array[i]);
      }
    }
  } else {
    children = array;
  }

  for (var prop in props) {
    component.props[prop] = props[prop];
  }

  if (typeof component.render === 'function') {
    component.node.document = component.render(props);
    if (component.node.document) {
      component.node.document.component = component;
      getComponentNames(component, component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }
  }

  if (children.length) {
    component.append(children);
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
}
