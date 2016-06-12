function arrayIsEqual(a, b) {
  var i = 0;
  var n = a.length;

  if (a.length === b.length) {
    for (; i < n; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  return false;
}