// Normalize IE 9 input event
function initInputEvent() {
  if (IS_IE) {
    document.body.addEventListener(
      'keyup',
      function (e) {
        var index;

        if (isTextInput(e.target)) {
          index = IE_INPUT.node.indexOf(e.target);
          if (index === -1) {
            index = IE_INPUT.node.length;
            IE_INPUT.node.push(e.target);
            IE_INPUT.value.push([
              '',
              e.target.value
            ]);
          } else {
            IE_INPUT.value[index].shift();
            IE_INPUT.value[index].push(e.target.value);
          }

          if ((
            IE_INPUT.value[index][0] !== IE_INPUT.value[index][1]
          ) && (
            e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY
          )) {
            e.target.dispatchEvent(
              new Event('input')
            );
          }
        }
      },
      false
    );
  }
}
