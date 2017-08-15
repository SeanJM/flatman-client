var el = flatman.el;
var Component = flatman.Component;

Component.lib = {};
Component.create('C', {
  render() {
    return el('div', [
      el('div', { ref : 'b' }),
      el('div', { ref : 'c' })
    ]);
  }
});

Component.create('D', {
  render() {
    return el('C');
  }
});

var p = el('C');
var q = el('D');

return {
  left : (
    p.refs.b.ref === 'b' &&
    p.refs.c.ref === 'c' &&
    q.refs.b.ref === 'b' &&
    q.refs.c.ref === 'c'
  ),
  right : true
};