var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var p = el('div');

Component.create('C', {
  render() {
    return a;
  }
});

p.append([ el('C') ]);

return {
  left : p.find(a => a.componentTagName === 'C')[0].node === a.node,
  right : true
};
