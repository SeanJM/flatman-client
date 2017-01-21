(function () {
  function findPredicate(predicate) {
    var found = [];

    function find(childNodes) {
      childNodes.forEach(function (element) {
        if (element.children) {
          if (predicate(element)) {
            found.push(element);
          }
          find(element.childNodes);
        }
      });
    }

    find(this.childNodes);
    return found;
  }

  function findStringSelector(selector) {
    var list = getSelectorGroup(selector);
    var found = [ [ this ] ];
    var self = this;

    function each (node) {
      found.push(findPredicate.call(node, function (element) {
        return element.is(list[0]);
      }));
    }

    while (list.length) {
      found[found.length - 1].forEach(each);
      list.shift();
    }

    return found.slice(-1)[0];
  }


  Node.prototype.find = function (selector) {
    if (typeof selector === 'string') {
      return findStringSelector.call(this, selector);
    } else if (typeof selector === 'function') {
      return findPredicate.call(this, selector);
    }
    throw new Error('Invalid selector for \'find\'');
  };
}());
