var el = flatman.el;
var a = el('div', {
  style : {
    width : 100,
    height : 100,
    overflow : 'scroll'
  }
}, [
  el('div', { style : { height : 300, width : 100 }})
]);

a.appendTo(document.body);
a.scrollTop(10);

return {
  left : a.scrollTop() === 10,
  right : true
};
