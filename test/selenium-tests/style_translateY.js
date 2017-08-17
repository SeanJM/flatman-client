var el = flatman.el;
var a = el('div');

a.style({
  translateY: 40,
  rotateY: 30,
  rotateZ: 30,
  rotate: 30,
  scale: 3
});

a.appendTo(document.body);

return {
  left : a.attr('style'),
  right : "transform: translateY(40px) rotateY(30deg) rotateZ(30deg) rotate(30deg) scale(3);"
};