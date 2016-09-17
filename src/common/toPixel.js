function toPixel(name, value) {
  if (typeof value === 'number' && TO_PIXEL.indexOf(name) > -1) {
    return  value + 'px';
  } else {
    return value;
  }
}
