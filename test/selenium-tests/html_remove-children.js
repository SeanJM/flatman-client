var el = flatman.el;
var a = el('div', { className : 'test'});
var b = el('div', { className : 'test-2'});
var result = [];

a.append([b]);
result.push(a.childNodes.length);

a.html("");
result.push(a.childNodes.length);

return {
  left : result[0] === 1 && result[1] === 0,
  right : true
};
