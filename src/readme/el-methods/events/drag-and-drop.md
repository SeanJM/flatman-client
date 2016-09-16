- `on('dragstart', [ Function ])`
- `on('dragmove', [ Function ])`
- `on('dragend', [ Function ])`

You must access the `detail` property to get `pageX` and `pageY` properties.

Additional properties:

- `startX`
- `startY`
- `distanceX`
- `distanceY`

### `startX` and `startY`

The `X` and `Y` position of where drag started

### `distanceX` and `distanceY`

The distance travelled in `pixels` between the start position and the current position.
