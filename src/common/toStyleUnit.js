function toStyleUnit(name, value) {
  if (typeof value === 'number') {
    if (TO_PIXEL.indexOf(name) > -1) {
      return  value + 'px';
    } else if (TO_DEG.indexOf(name) > -1) {
      return value + 'deg';
    }
  }
  return value;
}
