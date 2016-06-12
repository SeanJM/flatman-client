function objectIsEqual(a, b) {
  if (a === b) {
    return a === b;
  } else {
    for (var k in a) {
      if (!isEqual(a[k], b[k])) {
        return false;
      }
    }
  }
  return true;
}