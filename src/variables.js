// CSS Related
var
  CLASS_PREFIX = '',

  CSS_PROPERTY_IS_NUMBER = [
    'z-index',
    'opacity'
  ],

  TO_PIXEL = [
    'borderRadius',
    'bottom',
    'fontSize',
    'height',
    'left',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'minHeight',
    'minWidth',
    'maxHeight',
    'maxWidth',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'right',
    'top',
    'width',
  ],

  DEFAULT_STYLES = [
    'auto',
    'none'
  ],

  JS_PROPERTY_TO_CSS = {
    zIndex : 'z-index',

    marginLeft : 'margin-left',
    marginTop : 'margin-top',
    marginRight : 'margin-right',
    marginBottom : 'margin-bottom',

    paddingLeft : 'padding-left',
    paddingTop : 'padding-top',
    paddingRight : 'padding-right',
    paddingBottom : 'padding-bottom',
  },

  VENDOR_PREFIX = (function () {
    var styles = window.getComputedStyle(document.body);
    var properties = ['transform'];
    var prefix = ['Moz', 'webkit', 'ms'];
    var list = {};
    var property;

    for (var i = 0, n = prefix.length; i < n; i++) {
      for (var x = 0, y = properties.length; x < y; x++) {
        property = prefix[i] + properties[x][0].toUpperCase() + properties[x].slice(1);

        if (typeof styles[property] !== 'undefined') {
          list[properties[x]] = property;
        }

      }
    }

    return list;
  }());

// Browser detection
var IS_IE = /^Mozilla\/(4\.0|5\.0|1\.22) \(((c|C)ompatible;|Windows; U;) MSIE 9\.0;/.test(window.navigator.userAgent);

// Keyboard keys
var
  IS_BACKSPACE_KEY = 8,
  IS_DELETE_KEY = 46;
