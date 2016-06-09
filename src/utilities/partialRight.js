function partialRight(fn) {
  var right = new Array(arguments.length - 1);
  var rightIndex = 0;

  for (; rightIndex < right.length; rightIndex++) {
    right[rightIndex] = arguments[rightIndex + 1];
  }

  return function () {
    var left = new Array(arguments.length);
    var leftIndex = 0;

    for (; leftIndex < left.length; leftIndex++) {
      left[leftIndex] = arguments[leftIndex];
    }

    fn.apply(null, left.concat(right));
  };
}
