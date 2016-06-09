function map (array, callback) {
  var i = 0;
  var n = isArray(array) || isNodelist(array) ? array.length : 0;
  var a = [];

  for (; i < n; i++) {
    a.push(callback(array[i], i, array));
  }

  return a;
}
