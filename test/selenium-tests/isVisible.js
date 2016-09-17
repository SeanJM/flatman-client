var a = el();
var b = el();
var c = el();
var d = el();
var e = el({ class : 'e' });
var f = el({ class : 'f' });

a.appendTo('body');
b.appendTo('body');
c.appendTo('body');
d.appendTo('body');
e.appendTo('body');

f.appendTo(e);

a.style({ width : 30 });
a.style('height', '10px');

b.style('position', 'absolute');
b.style('left', '-100000px');

c.style('display', 'none');

d.style('width', 0);
d.style('height', 0);
d.style('overflow', 'hidden');

e.style('display', 'none');

return {
  right : (
    a.isVisible() &&
    !b.isVisible() &&
    !c.isVisible() &&
    !d.isVisible() &&
    !f.isVisible()
  ),
  left : true
};
