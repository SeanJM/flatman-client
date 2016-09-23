function bindIEInputEvent(self) {
  if (IS_IE && isTextInput(self.node)) {
    // Normalize IE 9 input event
    self.node.addEventListener('keyup', function (e) {
      if (e.target === self.node) {
        if (!values.length) {
          values = [
            self.node.value,
            self.node.value
          ];
        } else {
          values[0] = values[1];
          values[1] = self.node.value;
        }

        if (values[0] !== values[1] && (e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY)) {
          self.trigger('input', {
            type : 'input',
            which : e.which
          });
        }
      }
    }, false);
  }
}
