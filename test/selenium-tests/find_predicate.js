var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var p = el('div');

Component.lib = {};

Component.create('C', {
  render() {
    return a;
  }
});

p.append([ el('C') ]);

return {
  left : p.find(a => a.tagName === 'C')[0].document === a,
  right : true
};
