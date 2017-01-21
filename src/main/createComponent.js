function createComponent(tagName, opt, array) {
  var i = 1;
  var n = arguments.length;
  var k;
  var constructor = Component.lib[tagName];
  var hasAppend = typeof constructor.prototype.append === 'function';
  var hasText = typeof constructor.prototype.text === 'function';
  var component = new constructor(opt);
  var children = [];
  var strings = [];

  function getNames(node) {
    if (node.children) {
      node.children().forEach(function (child) {
        var name = child.name();
        if (name) {
          component.node[name] = child;
        }
        getNames(child);
      });
    }
  }

  component.tagName = tagName;
  component.node = component.node || {};
  component.dict = component.dict || {};

  if (hasText) {
    array.forEach(function (child) {
      if (typeof child === 'string' || typeof child === 'number') {
        strings.push(child);
      } else {
        children.push(child);
      }
    });
  } else {
    children = array;
  }

  for (k in opt) {
    component.dict[k] = opt[k];
  }

  if (typeof component.render === 'function') {
    component.node.document = component.render(opt);
    if (component.node.document) {
      component.node.document.componentTagName = tagName;
      getNames(component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }
  }

  if (children.length && hasAppend) {
    component.append(children);
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
}
