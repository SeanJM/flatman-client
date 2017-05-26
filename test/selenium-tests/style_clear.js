var el = flatman.el;
var a = el('div');
var res = [];

a.style({ display :  'inline-block' });
a.appendTo(document.body);
res.push(a.style('display'));
a.attr('style', '');
res.push(a.style('display'));

return {
  left : res[0] === 'inline-block' && res[1] === 'block',
  right : true
};