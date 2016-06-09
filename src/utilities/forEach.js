function forEach (array, callback) {
  var i = 0;
  var n = isArray(array) || isNodelist(array) ? array.length : 0;

  for (; i < n; i++) {
    callback(array[i], i, array);
  }
}
