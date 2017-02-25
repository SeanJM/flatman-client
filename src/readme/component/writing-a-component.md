```javascript
Component.create('my-component', {
  constructor(props) {
    // Set my stuff
  },

  onHover() {
    // Do stuff
  },

  touchInner() {
    this.node.inner.trigger('touch');
  },

  render(props) {
    el('div', {
      onClick : props.onClick,
      onHover : () => this.onHover()
    }, [
      // Names will be added as a reference to 'this.node',
      // name : 'inner' becomes this.node.inner
      el('div', { name : 'inner' })
    ])
  }
});
```
