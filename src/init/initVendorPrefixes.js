function initVendorPrefixes() {
 var styles = window.getComputedStyle(document.body);
 var properties = ['transform', 'userSelect', 'userModify'];
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

 VENDOR_PREFIX = list;
}
