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

  var afterRender = {
    once : [],
    on : [],
    className : false
  };

  function getNames(node) {
    if (node.childNodes) {
      node.childNodes.forEach(function (child) {
        var name = isCreateNode(child)
          ? child.name()
          : child.dict && child.dict.name;

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
  component.childNodes = component.childNodes || [];

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
    if (k.slice(0, 4) === 'once') {
      afterRender.once.push({
        name : k.slice(4).toLowerCase(),
        callback : opt[k]
      });
    } else if (k.slice(0, 2) === 'on') {
      afterRender.on.push({
        name : k.slice(2).toLowerCase(),
        callback : opt[k]
      });
    } else if (k === 'className') {
      afterRender.className = opt[k];
    } else if (k === 'id') {
      afterRender.id = opt[k];
    } else {
      component.dict[k] = opt[k];
    }
  }

  if (typeof component.render === 'function') {
    component.node.document = component.render(opt);

    if (component.node.document) {
      getNames(component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }

    afterRender.once.forEach(function (def) {
      component.once(def.name, def.callback);
    });

    afterRender.on.forEach(function (def) {
      component.on(def.name, def.callback);
    });

    if (afterRender.className) {
      if (component.addClass) {
        component.addClass(afterRender.className);
      } else {
        component.node.document.addClass(afterRender.className);
      }
    }

    if (afterRender.id) {
      if (component.attr) {
        component.attr('id', afterRender.id);
      } else {
        component.node.document.attr('id', afterRender.id);
      }
    }
  }

  if (children.length && hasAppend) {
    component.append(children);
  } else if (children.length && component.node && component.node.document) {
    component.node.document.append(children);
    [].push.apply(component.childNodes, children);
  } else if (children.length) {
    throw new Error('Invalid component \'' + constructor.name + '\' does not have an append method');
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
}
