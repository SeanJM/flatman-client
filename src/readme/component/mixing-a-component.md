### Special considerations

Wrapped components cannot share method names which are shared with 'el()' node. They will be excluded.

```javascript
Component.create('interior', {
  myExposedMethod() {
    // Do stuff
  },

  render() {
    return el('div', {
      name : 'interior',
      className : 'component'
    });
  }
});

Component.create('my-component', Component.wrap('interior', {
  constructor(props) {
    // Set my stuff
  },

  thisMethod() {
    // do stuff
  },

  onHover() {
    // Do stuff
    this.node.name.trigger('hover');
  },

  render(props) {
    el('div', {
      onClick : props.onClick,
      onHover : () => this.onHover()
    }, [
      props.component // <-- The 'interior' component
    ])
  }
}));
```

```javascript
var a = el('my-component');

a.myExposedMethod();
a.thisMethod();
```
