var el = flatman.el;

var div = [
  document.createElement('div'),
  document.createElement('div'),
  document.createElement('div'),
];

div[1].appendChild(div[2]);
div[0].appendChild(div[1]);

div[2].className = 'test';

document.body.appendChild(div[0]);

var map = el(div[0]).mapChildren();

return {
  left : map.childNodes.length === 1 &&
        map.childNodes[0].childNodes.length === 1 &&
        map.find('.test')[0].node === div[2],
  right : true
};
