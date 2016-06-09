function partial(fn) {
  var left = new Array(arguments.length - 1);
  var leftIndex = 0;

  for (; leftIndex < left.length; leftIndex++) {
    left[leftIndex] = arguments[leftIndex + 1];
  }

  return function () {
    var right = new Array(arguments.length);
    var rightIndex = 0;

    for (; rightIndex < right.length; rightIndex++) {
      right[rightIndex] = arguments[rightIndex];
    }

    fn.apply(null, left.concat(right));
  };
}
