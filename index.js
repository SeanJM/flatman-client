!function(a,b){function c(a,b){function c(b,c){b&&(f[c]=b.getNode?b.getNode():b,e.push(f[c]),a.childNodes.push(f[c]),f[c].node?(f[c].parentNode=a,d.appendChild(f[c].node)):d.appendChild(new Text(f[c])))}var d=document.createDocumentFragment(),e=[],f=[];if(Array.isArray(b))for(var g=0,h=b.length;g<h;g++)c(b[g],g);else c(b,0);a.node.appendChild(d),e.forEach(j)}function d(a){function b(){d.dragstart.length>1&&(document.body.style[x.userSelect]="none",document.body.style.cursor="default")}function c(){d.dragstart.length>1&&(document.body.style[x.userSelect]="",document.body.style.cursor="")}var d=a.subscribers;d.dragstart&&-1===d.dragstart.indexOf(b)&&(a.on("dragstart",b),a.on("dragend",c))}function e(a,b){b.children&&b.children().forEach(function(b){var c=b.name&&b.name();c&&!a.node[c]&&(a.node[c]=b.component||b),e(a,b)})}function f(a){return n(a)?a:a instanceof r?a.node:"string"==typeof a||"number"==typeof a&&!isNaN(a)?new Text(a):!!(a&&a.node&&a.node.document)&&f(a.node.document)}function g(a){var b,c,d,e,f=0,g=0;return"number"==typeof a.selectionStart?(f=a.selectionStart,g=a.selectionEnd):(c=document.selection.createRange())&&c.parentElement()===a&&(b=a.value.replace(/\r\n/g,"\n"),d=a.createTextRange(),d.moveToBookmark(c.getBookmark()),e=a.createTextRange(),e.collapse(!1),d.compareEndPoints("StartToEnd",e)>-1?f=g=a.value.length:(f=-d.moveStart("character",-a.value.length),f+=b.slice(0,f).split("\n").length-1,d.compareEndPoints("EndToEnd",e)>-1?g=a.value.length:(g=-d.moveEnd("character",-a.value.length),g+=b.slice(0,g).split("\n").length-1))),[f,g]}function h(a){var b=[],c=!1,d=a.length,e=0,f="";for(a=a.replace(/\s+/g," ");e<d;)"["===a[e]&&"'"!==a[e-1]?(c=!0,f+=a[e]):"]"===a[e]&&"'"!==a[e-1]?(c=!1,f+=a[e]):" "!==a[e]||c?f+=a[e]:(b.push(f),f=""),e++;return b.push(f),b}function i(a){var b=a.match(/\.[a-zA-Z0-9\-\_]+/g),c=a.match(/\#[a-zA-Z0-9\-\_]+/),d=a.match(/\[[^\]]+?\]/g),e=a.match(/^[a-zA-Z0-9\-\_]+/),f={tagName:!!e&&e[0],attributes:{}};return b&&(f.attributes.className=b.map(function(a){return a.slice(1)})),c&&(f.attributes.id=c[0].slice(1)),d&&d.forEach(function(a){var b=a.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);b[1]="class"===b[1]?"className":b[1],b[3]=!!b[3]&&b[3].slice(1,-1),b[2]?"*"===b[2]?f.attributes[b[1]]=new RegExp(b[3]):"^"===b[2]?f.attributes[b[1]]=new RegExp("^"+b[3]):"$"===b[2]&&(f.attributes[b[1]]=new RegExp(b[3]+"$")):b[3]?f.attributes[b[1]]=new RegExp("^"+b[3]+"$"):f.attributes[b[1]]=new RegExp(".+")}),f}function j(a){a.hasParent&&a.hasParent(y)&&(a.trigger("mount",{target:a}),a.children().forEach(j))}function k(a){for(var b=[],c=a.parentNode,d=document.body.parentNode;c&&c!==d;)b.push(c),c=c.parentNode;return b}function l(a,b,c){if(a.setSelectionRange)a.setSelectionRange(b,c);else if(a.createTextRange){var d=a.createTextRange();d.collapse(!0),d.moveStart("character",b),d.moveEnd("character",c),d.select()}}function m(a){a.trigger&&(a.trigger("unmount"),a.children().forEach(m))}function n(a){var b=["HTML","SVGS","SVGU"],c=Object.prototype.toString.call(a).substr(8,4);return-1!==b.indexOf(c)}function o(a){var b=["text","password","phone","number"],c=a.tagName,d="TEXTAREA"===c,e="INPUT"===c&&b.indexOf(a.type)>-1;return d||e}function p(a,b,c){var d=Component.lib[a],f=new d(b),g=[],h=[];if(f.tagName=a,f.node=f.node||{},f.props=f.props||{},d.prototype.text)for(var i=0,j=c.length;i<j;i++)"string"==typeof c[i]||"number"==typeof c[i]?h.push(c[i]):g.push(c[i]);else g=c;for(var k in b)f.props[k]=b[k];if("function"==typeof f.render){if(f.node.document=f.render(b),!f.node.document)throw new Error("Invalid component, component must return a node in the render function.");f.node.document.component=f,e(f,f.node.document)}return g.length&&f.append(g),h.length&&f.text.apply(f,h),f}function q(a){var b={},c=[];switch(arguments.length){case 2:Array.isArray(arguments[1])?c=arguments[1]:b=arguments[1];break;case 3:b=arguments[1],c=arguments[2]}if(Component.function[a])return Component.function[a](b,c);if(Component.lib[a])return p(a,b,c);if("string"==typeof a)return new r(a,b,c);if(n(a))return new r(a,b,c,!0);throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")')}function r(a,b,c,e){function f(a){return e||a===window?a:(this.isSVG=-1!==G.indexOf(a),a=this.isSVG?document.createElementNS(F,a):document.createElement(a))}arguments.length;this.subscribers={},this.childNodes=[],this.node=f.call(this,a),this.tagName=this.node.tagName.toLowerCase(),this.append(c),this.attr(b),this.node.style.transform=this.node.style[x.transform],this.node.style.userSelect=this.node.style[x.userSelect],this.node.style.userModify=this.node.style[x.userModify],d(this)}function s(){function a(a,b){var c=document.createEvent("CustomEvent");return b=b||{bubbles:!1,cancelable:!1,detail:void 0},c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}"function"!=typeof window.CustomEvent&&(a.prototype=window.Event.prototype,window.CustomEvent=a)}function t(){var a=!1;document.addEventListener("click",function(b){a?b.target.dispatchEvent(new MouseEvent("doubleclick",{clientX:b.pageX,clientY:b.pageY,bubbles:!0,cancelable:!0})):a=!0,setTimeout(function(){a=!1},250)})}function u(){document.body.addEventListener("mousedown",function(a){function b(a){var h=new CustomEvent("dragend",{detail:{startX:d,startY:e,pageX:a.pageX,pageY:a.pageY,distanceX:a.pageX-d,distanceY:a.pageY-e},target:g,bubbles:!0,cancelable:!0});document.body.removeEventListener("mousemove",c),document.body.removeEventListener("mouseup",b),1===a.which&&f&&(f=!1,document.body.style[x.userSelect]="",document.body.style.cursor="",g.dispatchEvent(h))}function c(a){var b={detail:{startX:d,startY:e,pageX:a.pageX,pageY:a.pageY,distanceX:a.pageX-d,distanceY:a.pageY-e},target:g,bubbles:!0,cancelable:!0};Math.abs(d-a.pageX)+Math.abs(e-a.pageY)>5&&!f?(f=!0,g.dispatchEvent(new CustomEvent("dragstart",b))):f&&g.dispatchEvent(new CustomEvent("dragmove",b))}var d=a.pageX,e=a.pageY,f=!1,g=a.target;1===a.which&&(document.body.addEventListener("mouseup",b),document.body.addEventListener("mousemove",c))})}function v(){C&&document.addEventListener("keyup",function(a){var b;o(a.target)&&(b=J.node.indexOf(a.target),-1===b?(b=J.node.length,J.node.push(a.target),J.value.push(["",a.target.value])):(J.value[b].shift(),J.value[b].push(a.target.value)),J.value[b][0]===J.value[b][1]||a.which!==E&&a.which!==D||a.target.dispatchEvent(new Event("input")))},!1)}function w(){for(var a,b=document.getElementsByTagName("*")[0],c=window.getComputedStyle(b),d=!1,e={},f=0,g=I.length;f<g;f++)for(var h=0,i=H.length;h<i;h++)a=I[f]+H[h][0].toUpperCase()+H[h].slice(1),void 0!==c[a]&&(d||(d=I[f]),e[H[h]]=a);x=e}var x,y,z="1.3.8",A=["borderRadius","bottom","fontSize","height","left","marginBottom","marginLeft","marginRight","marginTop","maxHeight","maxWidth","minHeight","minWidth","paddingBottom","paddingLeft","paddingRight","paddingTop","right","top","translateX","translateY","translateZ","width"],B=["rotate"],C=/^Mozilla\/(4\.0|5\.0|1\.22) \(((c|C)ompatible;|Windows; U;) MSIE 9\.0;/.test(window.navigator.userAgent),D=8,E=46,F="http://www.w3.org/2000/svg",G=["svg","circle","line","path","use"],H=["transform","userSelect","userModify","transition","animation"],I=["Moz","webkit","ms"],J={node:[],value:[]};r.fn=function(a,b){r.prototype[a]=b},r.prototype.addClass=function(a){function b(a){-1===c.indexOf(a)&&c.push(a)}var c=this.classList();return Array.isArray(a)?a.forEach(b):b(a),this.node.className=c.sort().join(" "),this},r.prototype.after=function(a){var b=this.siblings(),d=b.indexOf(this);d<b.length-1?b[d+1].before(a):c(this.getNode().parentNode,a)},r.prototype.append=function(a){if(arguments.length>1)throw"You have too many arguments ("+arguments.length+") for '.append', it takes a node or an array of nodes.";return c(this,a),this},r.prototype.appendTo=function(a){return n(a)?c(q(a),this):c(a,this),this},r.prototype.attr=function(){function a(a,b){return"className"===a?f.className(b):"style"===a&&"object"==typeof b?f.style(b):f.isSVG?f.node.setAttributeNS("http://www.w3.org/1999/xlink",a,b):"once"===a.substr(0,4)?f.once(a.substr(4),b):"on"===a.substr(0,2)?f.on(a.substr(2),b):f.node.setAttribute(a,b),f}function b(b,c){return"string"==typeof b&&void 0!==c?a(b,c):"string"==typeof b?f.node.getAttribute(b):void 0}function c(a){for(var c in a)b(c,a[c])}var d={},e=this.node.attributes,f=this;if(0===arguments.length){for(var g=0,h=e.length;g<h;g++)d[e[g].nodeName]=e[g].nodeValue;return d}return"object"==typeof arguments[0]?c(arguments[0]):b(arguments[0],arguments[1])},r.prototype.before=function(a){function b(a){var b=a.getNode();b.parentNode=d,c.appendChild(b.node)}var c=document.createDocumentFragment(),d=this.parentNode,e=d.childNodes;if(Array.isArray(a))for(var f=0,g=a.length;f<g;f++)b(a[f]);else b(a);return this.node.parentNode.insertBefore(c,this.node),[].splice.apply(e,[e.indexOf(this),0].concat(a)),[].forEach.call(c,j),this},r.prototype.check=function(){return this.node.checked=!0,this},r.prototype.children=function(a,b){return"number"==typeof a&&"number"==typeof b?this.childNodes.slice(a,b):Array.isArray(a)?(this.childNodes=[],this.node.innerHTML="",this.append(a),this):"number"==typeof a?this.childNodes[a]:this.childNodes},r.prototype.classList=function(){for(var a,b=(this.node.getAttribute("class")||"").split(" "),c=[],d=0,e=b.length;d<e;d++)(a=b[d].trim())&&c.push(a);return c},r.prototype.className=function(a){return void 0===a?this.classList().join(" "):(a=Array.isArray(a)?a.sort().filter(function(a){return a}).join(" "):a,this.isSVG?this.node.setAttributeNS(null,"class",a):this.node.className=a,this)},r.prototype.clone=function(){return q(this.node.cloneNode(!0))},r.prototype.cloneDeep=function(){return q(this.node.cloneNode(!0)).mapChildren()},r.prototype.closest=function(a){for(var b,c=this.node.parentNode;c;){if(b=q(c),b.is(a))return b;c=c.parentNode}return!1},r.prototype.contains=function(a){function b(a,b){return b=b.getNode().node,a.contains(b)&&b!==a}if(Array.isArray(a))for(var c=0,d=a.length;c<d;c++)if(b(this.node,a[c]))return!0;return b(this.node,a)},r.prototype.copy=function(a){var b=q(a);return this.attr(b.attr()),this.html(b.html()),this},r.prototype.disable=function(){return this.node.setAttribute("disabled","disabled"),this},r.prototype.enable=function(){return this.node.removeAttribute("disabled"),this},function(){function a(a){function b(d){d.forEach(function(d){d.children&&(a(d)&&c.push(d),b(d.childNodes))})}var c=[];return b(this.childNodes),c}function b(b){function c(b){e.push(a.call(b,function(a){return a.is(d[0])}))}for(var d=h(b),e=[[this]];d.length;)e[e.length-1].forEach(c),d.shift();return e.slice(-1)[0]}r.prototype.find=function(c){if("string"==typeof c)return b.call(this,c);if("function"==typeof c)return a.call(this,c);throw new Error("Invalid selector for 'find'")}}(),r.prototype.focus=function(){return this.node.focus(),this},r.prototype.getNode=function(){return this},r.prototype.getSelector=function(){var a=this.attr(),b=this.node.tagName.toLowerCase(),c=this.siblings(),d={class:function(a){return"."+a.replace(/[ ]+/g," ").trim().split(" ").filter(function(a){return!/^\d+$/.test(a)}).join(".")},id:function(a){return"#"+a},name:function(a){return'[name="'+a+'"]'},title:function(a){return'[title="'+a+'"]'},value:function(a){return'[value="'+a+'"]'},type:function(a){return'[type="'+a+'"]'}},e=[];if("body"===b)return b;-1===b.indexOf(":")&&e.push(b);for(var f in a)"function"==typeof d[f]&&a[f].length&&e.push(d[f.toLowerCase()](a[f]));return c.length>1&&void 0===this.node.id&&e.push(":nth-child("+(c.indexOf(this.node)+1)+")"),e.join("").replace(/\n/g,"")},r.prototype.hasClass=function(a){var b=this.classList();if(Array.isArray(a)){for(var c=0,d=a.length;c<d;c++)if(-1===b.indexOf(a[c]))return!1;return!0}return-1!==b.indexOf(a)},r.prototype.hasParent=function(a){function b(a){return(a.getNode?a.getNode().node:a).contains(c)}var c=this.node;return Array.isArray(a)?a.map(b):b(a)},r.prototype.html=function(a){return void 0===a?this.node.innerHTML:(this.node.innerHTML=a,this)},r.prototype.is=function(a){const b=i(a),c=this.attr();if(b.tagName&&b.tagName!==this.tagName)return!1;for(var d in b.attributes)if("className"===d){if(!this.hasClass(b.attributes[d]))return!1}else if(b.attributes[d])if("string"==typeof b.attributes[d]){if(b.attributes[d]!==c[d])return!1}else if(!b.attributes[d].test(c[d]))return!1;return!0},r.prototype.isChecked=function(){return this.node.checked},r.prototype.isDisabled=function(){return"disabled"===this.node.getAttribute("disabled")},r.prototype.isFocused=function(){return document.activeElement===this.node},r.prototype.isVisible=function(){function a(a){var b=a.offset(),d=a.style();return!(b.right<0)&&(!(b.left>c)&&(!(b.bottom<0)&&("none"!==d.display&&("hidden"!==d.visibility&&("hidden"!==d.overflow||0!==b.height&&0!==b.width)))))}var b,c=window.innerWidth;if(a(this)){b=this.parents();for(var d=0,e=b.length;d<e;d++)if(!a(b[d]))return!1;return!0}return!1},r.prototype.mapChildren=function(){function a(b){[].forEach.call(b.node.childNodes,function(c){var d;n(c)&&(d=q(c),b.childNodes.push(d),d.parentNode=b,a(d))})}return a(this),this},r.prototype.name=function(a){return void 0!==a?(this.node.setAttribute("name",a),this):this.node.getAttribute("name")},r.prototype.off=function(a,b){function c(a,b){var c=d.subscribers[a];d.node.removeEventListener(a,b),c.splice(c.indexOf(b),1)}var d=this;a=a.toLowerCase().split(",");for(var e=0,f=a.length;e<f;e++)if(a[e]=a[e].trim(),a[e].length&&b)c(a[e],b);else for(;this.subscribers[a[e]].length;)c(a[e],this.subscribers[a[e]][0]);return this},r.prototype.offset=function(){var a=this.node.getBoundingClientRect();return{width:a.width,height:a.height,left:a.left,right:a.right,bottom:a.bottom,top:a.top}},r.prototype.on=function(a,b){function c(a,b){return function(c){a.trigger(b,c)}}a=a.toLowerCase().split(",");for(var d=0,e=a.length;d<e;d++)a[d]=a[d].trim(),a[d].length&&("load"!==a[d]&&"error"!==a[d]||"img"!==this.tagName?(this.subscribers[a[d]]=(this.subscribers[a[d]]||[]).concat(b),this.node.addEventListener(a[d],b)):this.node[a[d]]=c(this,a[d]));return this},r.prototype.once=function(a,b){var c=this,d=function(e){b.call(c,e),c.off(a,d)};return this.on(a,d),this},r.prototype.parent=function(){return this.parentNode},r.prototype.parents=function(){return k(this.node).map(function(a){return q(a)})},r.prototype.prepend=function(a){function b(a){var b=a.getNode();b.parentNode=e,c.appendChild(b.node)}var c=document.createDocumentFragment(),d=this.childNodes,e=this;if(Array.isArray(a))for(var f=0,g=a.length;f<g;f++)b(a[f]);else b(a);return[].splice.apply(d,[d.indexOf(d[0]),0].concat(a)),d.length?this.node.insertBefore(c,this.node.childNodes[0]):this.node.appendChild(c),[].forEach.call(c,j),this},r.prototype.prependTo=function(a){var b=a.getNode(),c=b.node.childNodes;return c.length?b.node.insertBefore(this.node,c[0]):b.node.appendChild(this.node),b.childNodes.unshift(this),this},r.prototype.remove=function(){var a=this.hasParent(y),b=this.parentNode.childNodes;return this.node.parentNode.removeChild(this.node),b.splice(b.indexOf(this),1),a&&m(this),this},r.prototype.removeChild=function(a){return Array.isArray(a)?a.forEach(function(a){a.remove()}):a.remove(),this},r.prototype.removeClass=function(a){function b(b){return b!==a}var c=this.classList();return Array.isArray(a)?a.forEach(function(a){c=c.filter(b)}):c=c.filter(b),this.node.className=c.join(" "),this},r.prototype.replaceWith=function(a){var b=(this.hasParent(y),a.getNode());return m(this),this.node.parentNode?this.node.parentNode.replaceChild(b.node,this.node):this.node=b.node,j(b),this},r.prototype.scrollHeight=function(){return this.node.scrollHeight},r.prototype.scrollTop=function(a){return void 0===a?this.node.scrollTop:(this.node.scrollTop=a,this)},r.prototype.scrollWidth=function(){return this.node.scrollWidth},r.prototype.select=function(a,b){if(["input","textarea"].indexOf(this.tagName)>-1)return void 0===a&&void 0===b?g(this.node):(a<0&&(a=this.node.value.length+a),b<0&&(b=this.node.value.length+b),void 0===b&&(b=a),this.node.focus(),l(this.node,a,b),this);if("select"===this.tagName){if(void 0===a)return this.node.selectedIndex;this.node.value=this.node.childNodes[a].value}},r.prototype.selectorPath=function(){for(var a=[this.getSelector()],b=this.node.parentNode;b;){if(a.unshift(q(b).getSelector()),b===document.body||b.id.length>0)return a.join(" ");b=b.parentNode}return a.join(" ")},r.prototype.siblings=function(){var a=this.parentNode;return a?a.childNodes:[]},function(){function a(a,b){var c=window.getComputedStyle(a),d=c[b];return d?"px"===d.slice(-2)?Number(d.slice(0,-2)):d:c}function b(a,b){if("number"==typeof b){if(A.indexOf(a)>-1)return b+"px";if(B.indexOf(a)>-1)return b+"deg"}return b}function c(a,c,e){var f=x[c]?x[c]:c;"function"==typeof d[c]?a.style[f]=d[c](e):a.style[f]=b(c,e)}var d={transform:function(a){var c=[];if("object"==typeof a){for(var d in a)"number"==typeof a[d]||"string"==typeof a[d]?c.push(d+"("+b(d,a[d])+")"):Array.isArray(a[d])&&c.push(d+"("+a[d].map(partial(toPixel,d)).join(", ")+")");a=c.join(" ")}return a}};r.prototype.style=function(b,d){if("object"==typeof b){for(var e in b)c(this.node,e,b[e]);return this}return"string"==typeof b&&void 0!==d?(c(this.node,b,d),this):a(this.node,b)}}(),r.prototype.text=function(a){return void 0!==a&&"boolean"!=typeof a?(this.node.textContent=a,this):this.node.textContent.trim()},r.prototype.textNodes=function(){for(var a=document.createTreeWalker(this.node,NodeFilter.SHOW_TEXT,null,!1),b=a.nextNode(),c=[];b;)c.push(b),b=a.nextNode();return c},r.prototype.toggleClass=function(a){return this.hasClass(a)?this.removeClass(a):this.addClass(a),this},r.prototype.trigger=function(a,b){var c=this.subscribers;return a=a.toLowerCase().split(","),this.node.disabled||a.forEach(function(a){a=a.trim(),a.length&&c[a]&&c[a].forEach(function(a){a.call(self,b)})}),this},r.prototype.uncheck=function(){return this.node.checked=!1,this},r.prototype.value=function(a){return void 0!==a?(this.node.value=a,this):this.node.value?this.node.value.trim():this.node.value},s(),t(),u(),v(),w(),y=q(document.body),Component.facade(Object.keys(r.prototype)),Component.createWrapper(q),q.fn=r.fn,"object"==typeof module?module.exports={el:q,version:z,Component:Component}:window&&(window.flatman={el:q,version:z,Component:Component}),b.true=a}({},function(){return this}());