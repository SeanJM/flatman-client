function initComponentMethods() {
  Component.fn("offset", function () {
    return this.document.offset();
  });
}
