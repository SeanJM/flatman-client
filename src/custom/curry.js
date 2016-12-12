function curry(fn) {
  var length = fn.length;
  var curried = [];

  function c() {
    var i = 0;
    var n = arguments.length;

    for (; i < n; i++) {
      curried.push(arguments[i]);
    }

    if (curried.length === length) {
      return fn.apply(fn, curried);
    } else {
      return c;
    }
  }

	if (typeof fn !== 'function') {
  	throw new Error('The first argument in \'curry\' must be a function');
  }

  return c;
}
