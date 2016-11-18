var a = el('div', { style : 'position: absolute; left: 0; top: 0; width : 0; height: 0'});
var o;

a.appendTo(document.body);
o = a.offset();

return {
  right : (
    o.top === 0 &&
    o.left === 0 &&
    o.width === 0 &&
    o.height === 0
  ),
  left : true
};
