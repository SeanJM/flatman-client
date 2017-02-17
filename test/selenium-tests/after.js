var el = flatman.el;

var a = [
  el('div'),
  el('div'),
  el('div'),
  el('div'),
  el('div'),
  el('div'),
];

var b = [
  el('div'),
  el('div'),
  el('div'),
  el('div'),
  el('div'),
  el('div'),
];

a[0].append([a[1], a[3], a[4]]);
a[3].after([a[2]]);

return {
  left : a[0].children(2) === a[2] && a[2].parentNode === a[0],
  right : true
};
