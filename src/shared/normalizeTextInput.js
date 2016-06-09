function normalizeTextInput (self) {
  var values = [];

  if (IS_IE && isTextInput(self._node_)) {
    // Normalize IE 9 input event
    self._node_.addEventListener('keyup', function (e) {
      if (e.target === self._node_) {
        if (!values.length) {
          values = [
            self._node_.value,
            self._node_.value
          ];
        } else {
          values[0] = values[1];
          values[1] = self._node_.value;
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
