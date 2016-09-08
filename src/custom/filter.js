function filter (array, callback) {
  var i = 0;
  var n = isArray(array) || isNodeList(array) ? array.length : 0;
  var a = [];

  for (; i < n; i++) {
    if (callback(array[i], i, array)) {
      a.push(array[i]);
    }
  }

  return a;
}
