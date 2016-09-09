Will toggle a class name on a node. If the class exists, it will be removed, if it does not exist, it will be added.

```javascript
var myDIV = el();
myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```
