var VERSION = '1.3.8';

var CSS_PROPERTY_IS_NUMBER = [
  'z-index',
  'opacity'
];

var TO_PIXEL = [
  'borderRadius',
  'bottom',
  'fontSize',
  'height',
  'left',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'right',
  'top',
  'translateX',
  'translateY',
  'translateZ',
  'width',
];

var TO_DEG = [
  'rotate'
];

var DEFAULT_STYLES = [
  'auto',
  'none'
];

var JS_PROPERTY_TO_CSS = {
  zIndex : 'z-index',

  marginLeft : 'margin-left',
  marginTop : 'margin-top',
  marginRight : 'margin-right',
  marginBottom : 'margin-bottom',

  paddingLeft : 'padding-left',
  paddingTop : 'padding-top',
  paddingRight : 'padding-right',
  paddingBottom : 'padding-bottom',
};

// Browser detection
var IS_IE = /^Mozilla\/(4\.0|5\.0|1\.22) \(((c|C)ompatible;|Windows; U;) MSIE 9\.0;/.test(window.navigator.userAgent);

// Keyboard keys
var IS_BACKSPACE_KEY = 8;
var IS_DELETE_KEY = 46;

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var SVG_TAGNAMES = ['svg', 'circle', 'line', 'path', 'use'];

// Vendor Prefixes
var CSS_PREFIXED_PROPERTIES = ['transform', 'userSelect', 'userModify', 'transition', 'animation'];
var PREFIXES = ['Moz', 'webkit', 'ms'];
var VENDOR_PREFIX;

var IE_INPUT = {
  node : [],
  value : []
};

var BODY;
