(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fc0f90de"],{"25f0":function(e,t,r){"use strict";var i=r("6eeb"),n=r("825a"),o=r("d039"),s=r("ad6d"),a="toString",c=RegExp.prototype,l=c[a],d=o((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),f=l.name!=a;(d||f)&&i(RegExp.prototype,a,(function(){var e=n(this),t=String(e.source),r=e.flags,i=String(void 0===r&&e instanceof RegExp&&!("flags"in c)?s.call(e):r);return"/"+t+"/"+i}),{unsafe:!0})},"3ca3":function(e,t,r){"use strict";var i=r("6547").charAt,n=r("69f3"),o=r("7dd0"),s="String Iterator",a=n.set,c=n.getterFor(s);o(String,"String",(function(e){a(this,{type:s,string:String(e),index:0})}),(function(){var e,t=c(this),r=t.string,n=t.index;return n>=r.length?{value:void 0,done:!0}:(e=i(r,n),t.index+=e.length,{value:e,done:!1})}))},"3f87":function(e,t,r){"use strict";r.r(t);r("cb29"),r("4de4"),r("a15b"),r("fb6a"),r("a9e3"),r("ac1f"),r("841c"),r("498a");function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,i=new Array(t);r<t;r++)i[r]=e[r];return i}function n(e){if(Array.isArray(e))return i(e)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("e260"),r("d3b7"),r("3ca3"),r("ddb0");function o(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}r("b0c0"),r("25f0");function s(e,t){if(e){if("string"===typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e){return n(e)||o(e)||s(e)||a()}function l(e){if(Array.isArray(e))return e}function d(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],i=!0,n=!1,o=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done);i=!0)if(r.push(s.value),t&&r.length===t)break}catch(c){n=!0,o=c}finally{try{i||null==a["return"]||a["return"]()}finally{if(n)throw o}}return r}}function f(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(e,t){return l(e)||d(e,t)||s(e,t)||f()}r("4160"),r("c975"),r("a434"),r("b64b"),r("159b");var h=null;function _(e){return h||(h=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){return setTimeout(e,16)}).bind(window)),h(e)}var p=null;function g(e){p||(p=(window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(e){clearTimeout(e)}).bind(window)),p(e)}function v(e){var t=document.createElement("style");return t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),(document.querySelector("head")||document.body).appendChild(t),t}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=document.createElement(e);return Object.keys(t).forEach((function(e){r[e]=t[e]})),r}function b(e,t,r){var i=window.getComputedStyle(e,r||null)||{display:"none"};return i[t]}function x(e){if(!document.documentElement.contains(e))return{detached:!0,rendered:!1};var t=e;while(t!==document){if("none"===b(t,"display"))return{detached:!1,rendered:!1};t=t.parentNode}return{detached:!1,rendered:!0}}var y='.resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:"";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}',z=0,w=null;function S(e,t){e.__resize_mutation_handler__||(e.__resize_mutation_handler__=C.bind(e));var r=e.__resize_listeners__;if(!r)if(e.__resize_listeners__=[],window.ResizeObserver){var i=e.offsetWidth,n=e.offsetHeight,o=new ResizeObserver((function(){(e.__resize_observer_triggered__||(e.__resize_observer_triggered__=!0,e.offsetWidth!==i||e.offsetHeight!==n))&&N(e)})),s=x(e),a=s.detached,c=s.rendered;e.__resize_observer_triggered__=!1===a&&!1===c,e.__resize_observer__=o,o.observe(e)}else if(e.attachEvent&&e.addEventListener)e.__resize_legacy_resize_handler__=function(){N(e)},e.attachEvent("onresize",e.__resize_legacy_resize_handler__),document.addEventListener("DOMSubtreeModified",e.__resize_mutation_handler__);else if(z||(w=v(y)),T(e),e.__resize_rendered__=x(e).rendered,window.MutationObserver){var l=new MutationObserver(e.__resize_mutation_handler__);l.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),e.__resize_mutation_observer__=l}e.__resize_listeners__.push(t),z++}function A(e,t){if(e.detachEvent&&e.removeEventListener)return e.detachEvent("onresize",e.__resize_legacy_resize_handler__),void document.removeEventListener("DOMSubtreeModified",e.__resize_mutation_handler__);var r=e.__resize_listeners__;r&&(r.splice(r.indexOf(t),1),r.length||(e.__resize_observer__?(e.__resize_observer__.unobserve(e),e.__resize_observer__.disconnect(),e.__resize_observer__=null):(e.__resize_mutation_observer__&&(e.__resize_mutation_observer__.disconnect(),e.__resize_mutation_observer__=null),e.removeEventListener("scroll",O),e.removeChild(e.__resize_triggers__.triggers),e.__resize_triggers__=null),e.__resize_listeners__=null),!--z&&w&&w.parentNode.removeChild(w))}function E(e){var t=e.__resize_last__,r=t.width,i=t.height,n=e.offsetWidth,o=e.offsetHeight;return n!==r||o!==i?{width:n,height:o}:null}function C(){var e=x(this),t=e.rendered,r=e.detached;t!==this.__resize_rendered__&&(!r&&this.__resize_triggers__&&(I(this),this.addEventListener("scroll",O,!0)),this.__resize_rendered__=t,N(this))}function O(){var e=this;I(this),this.__resize_raf__&&g(this.__resize_raf__),this.__resize_raf__=_((function(){var t=E(e);t&&(e.__resize_last__=t,N(e))}))}function N(e){e&&e.__resize_listeners__&&e.__resize_listeners__.forEach((function(t){t.call(e)}))}function T(e){var t=b(e,"position");t&&"static"!==t||(e.style.position="relative"),e.__resize_old_position__=t,e.__resize_last__={};var r=m("div",{className:"resize-triggers"}),i=m("div",{className:"resize-expand-trigger"}),n=m("div"),o=m("div",{className:"resize-contract-trigger"});i.appendChild(n),r.appendChild(i),r.appendChild(o),e.appendChild(r),e.__resize_triggers__={triggers:r,expand:i,expandChild:n,contract:o},I(e),e.addEventListener("scroll",O,!0),e.__resize_last__={width:e.offsetWidth,height:e.offsetHeight}}function I(e){var t=e.__resize_triggers__,r=t.expand,i=t.expandChild,n=t.contract,o=n.scrollWidth,s=n.scrollHeight,a=r.offsetWidth,c=r.offsetHeight,l=r.scrollWidth,d=r.scrollHeight;n.scrollLeft=o,n.scrollTop=s,i.style.width=a+1+"px",i.style.height=c+1+"px",r.scrollLeft=l,r.scrollTop=d}t["default"]={name:"vue-clamp",props:{tag:{type:String,default:"div"},autoresize:{type:Boolean,default:!1},maxLines:Number,maxHeight:[String,Number],ellipsis:{type:String,default:"…"},expanded:Boolean},data:function(){return{offset:null,text:this.getText(),localExpanded:!!this.expanded}},computed:{clampedText:function(){return this.text.slice(0,this.offset)+this.ellipsis},isClamped:function(){return!!this.text&&this.offset!==this.text.length},realText:function(){return this.isClamped?this.clampedText:this.text},realMaxHeight:function(){if(this.localExpanded)return null;var e=this.maxHeight;return e?"number"===typeof e?"".concat(e,"px"):e:null}},watch:{expanded:function(e){this.localExpanded=e},localExpanded:function(e){e?this.clampAt(this.text.length):this.update(),this.expanded!==e&&this.$emit("update:expanded",e)},isClamped:{handler:function(e){var t=this;this.$nextTick((function(){return t.$emit("clampchange",e)}))},immediate:!0}},mounted:function(){this.init(),this.$watch((function(e){return[e.maxLines,e.maxHeight,e.ellipsis,e.isClamped].join()}),this.update),this.$watch((function(e){return[e.tag,e.text,e.autoresize].join()}),this.init)},updated:function(){this.text=this.getText(),this.applyChange()},beforeDestroy:function(){this.cleanUp()},methods:{init:function(){var e=this,t=this.$slots.default;t&&(this.offset=this.text.length,this.cleanUp(),this.autoresize&&(S(this.$el,this.update),this.unregisterResizeCallback=function(){A(e.$el,e.update)}),this.update())},update:function(){this.localExpanded||(this.applyChange(),(this.isOverflow()||this.isClamped)&&this.search())},expand:function(){this.localExpanded=!0},collapse:function(){this.localExpanded=!1},toggle:function(){this.localExpanded=!this.localExpanded},getLines:function(){return this.$refs.content.getClientRects().length},isOverflow:function(){return!(!this.maxLines&&!this.maxHeight)&&(!!(this.maxLines&&this.getLines()>this.maxLines)||!!(this.maxHeight&&this.$el.scrollHeight>this.$el.offsetHeight))},getText:function(){var e=(this.$slots.default||[]).filter((function(e){return!e.tag&&!e.isComment})),t=u(e,1),r=t[0];return r?r.text:""},moveEdge:function(e){this.clampAt(this.offset+e)},clampAt:function(e){this.offset=e,this.applyChange()},applyChange:function(){this.$refs.text.textContent=this.realText},stepToFit:function(){this.fill(),this.clamp()},fill:function(){while((!this.isOverflow()||this.getLines()<2)&&this.offset<this.text.length)this.moveEdge(1)},clamp:function(){while(this.isOverflow()&&this.getLines()>1&&this.offset>0)this.moveEdge(-1)},search:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var i=t[0],n=void 0===i?0:i,o=t[1],s=void 0===o?this.offset:o;if(s-n<=3)this.stepToFit();else{var a=Math.floor((s+n)/2);this.clampAt(a),this.isOverflow()?this.search(n,a):this.search(a,s)}},cleanUp:function(){this.unregisterResizeCallback&&this.unregisterResizeCallback()}},render:function(e){var t=[e("span",{ref:"text",attrs:{"aria-label":this.text.trim()}},this.realText)],r=this.expand,i=this.collapse,n=this.toggle,o={expand:r,collapse:i,toggle:n,clamped:this.isClamped,expanded:this.localExpanded},s=this.$scopedSlots.before?this.$scopedSlots.before(o):this.$slots.before;s&&t.unshift.apply(t,c(Array.isArray(s)?s:[s]));var a=this.$scopedSlots.after?this.$scopedSlots.after(o):this.$slots.after;a&&t.push.apply(t,c(Array.isArray(a)?a:[a]));var l=[e("span",{style:{boxShadow:"transparent 0 0"},ref:"content"},t)];return e(this.tag,{style:{maxHeight:this.realMaxHeight,overflow:"hidden"}},l)}}},"498a":function(e,t,r){"use strict";var i=r("23e7"),n=r("58a8").trim,o=r("c8d2");i({target:"String",proto:!0,forced:o("trim")},{trim:function(){return n(this)}})},"4df4":function(e,t,r){"use strict";var i=r("0366"),n=r("7b0b"),o=r("9bdd"),s=r("e95a"),a=r("50c4"),c=r("8418"),l=r("35a1");e.exports=function(e){var t,r,d,f,u,h,_=n(e),p="function"==typeof this?this:Array,g=arguments.length,v=g>1?arguments[1]:void 0,m=void 0!==v,b=l(_),x=0;if(m&&(v=i(v,g>2?arguments[2]:void 0,2)),void 0==b||p==Array&&s(b))for(t=a(_.length),r=new p(t);t>x;x++)h=m?v(_[x],x):_[x],c(r,x,h);else for(f=b.call(_),u=f.next,r=new p;!(d=u.call(f)).done;x++)h=m?o(f,v,[d.value,x],!0):d.value,c(r,x,h);return r.length=x,r}},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var i=r("1d80"),n=r("5899"),o="["+n+"]",s=RegExp("^"+o+o+"*"),a=RegExp(o+o+"*$"),c=function(e){return function(t){var r=String(i(t));return 1&e&&(r=r.replace(s,"")),2&e&&(r=r.replace(a,"")),r}};e.exports={start:c(1),end:c(2),trim:c(3)}},6547:function(e,t,r){var i=r("a691"),n=r("1d80"),o=function(e){return function(t,r){var o,s,a=String(n(t)),c=i(r),l=a.length;return c<0||c>=l?e?"":void 0:(o=a.charCodeAt(c),o<55296||o>56319||c+1===l||(s=a.charCodeAt(c+1))<56320||s>57343?e?a.charAt(c):o:e?a.slice(c,c+2):s-56320+(o-55296<<10)+65536)}};e.exports={codeAt:o(!1),charAt:o(!0)}},7156:function(e,t,r){var i=r("861d"),n=r("d2bb");e.exports=function(e,t,r){var o,s;return n&&"function"==typeof(o=t.constructor)&&o!==r&&i(s=o.prototype)&&s!==r.prototype&&n(e,s),e}},"81d5":function(e,t,r){"use strict";var i=r("7b0b"),n=r("23cb"),o=r("50c4");e.exports=function(e){var t=i(this),r=o(t.length),s=arguments.length,a=n(s>1?arguments[1]:void 0,r),c=s>2?arguments[2]:void 0,l=void 0===c?r:n(c,r);while(l>a)t[a++]=e;return t}},a15b:function(e,t,r){"use strict";var i=r("23e7"),n=r("44ad"),o=r("fc6a"),s=r("a640"),a=[].join,c=n!=Object,l=s("join",",");i({target:"Array",proto:!0,forced:c||!l},{join:function(e){return a.call(o(this),void 0===e?",":e)}})},a434:function(e,t,r){"use strict";var i=r("23e7"),n=r("23cb"),o=r("a691"),s=r("50c4"),a=r("7b0b"),c=r("65f0"),l=r("8418"),d=r("1dde"),f=r("ae40"),u=d("splice"),h=f("splice",{ACCESSORS:!0,0:0,1:2}),_=Math.max,p=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!u||!h},{splice:function(e,t){var r,i,d,f,u,h,m=a(this),b=s(m.length),x=n(e,b),y=arguments.length;if(0===y?r=i=0:1===y?(r=0,i=b-x):(r=y-2,i=p(_(o(t),0),b-x)),b+r-i>g)throw TypeError(v);for(d=c(m,i),f=0;f<i;f++)u=x+f,u in m&&l(d,f,m[u]);if(d.length=i,r<i){for(f=x;f<b-i;f++)u=f+i,h=f+r,u in m?m[h]=m[u]:delete m[h];for(f=b;f>b-i+r;f--)delete m[f-1]}else if(r>i)for(f=b-i;f>x;f--)u=f+i-1,h=f+r-1,u in m?m[h]=m[u]:delete m[h];for(f=0;f<r;f++)m[f+x]=arguments[f+2];return m.length=b-i+r,d}})},a630:function(e,t,r){var i=r("23e7"),n=r("4df4"),o=r("1c7e"),s=!o((function(e){Array.from(e)}));i({target:"Array",stat:!0,forced:s},{from:n})},a9e3:function(e,t,r){"use strict";var i=r("83ab"),n=r("da84"),o=r("94ca"),s=r("6eeb"),a=r("5135"),c=r("c6b6"),l=r("7156"),d=r("c04e"),f=r("d039"),u=r("7c73"),h=r("241c").f,_=r("06cf").f,p=r("9bf2").f,g=r("58a8").trim,v="Number",m=n[v],b=m.prototype,x=c(u(b))==v,y=function(e){var t,r,i,n,o,s,a,c,l=d(e,!1);if("string"==typeof l&&l.length>2)if(l=g(l),t=l.charCodeAt(0),43===t||45===t){if(r=l.charCodeAt(2),88===r||120===r)return NaN}else if(48===t){switch(l.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+l}for(o=l.slice(2),s=o.length,a=0;a<s;a++)if(c=o.charCodeAt(a),c<48||c>n)return NaN;return parseInt(o,i)}return+l};if(o(v,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var z,w=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof w&&(x?f((function(){b.valueOf.call(r)})):c(r)!=v)?l(new m(y(t)),r,w):y(t)},S=i?h(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;S.length>A;A++)a(m,z=S[A])&&!a(w,z)&&p(w,z,_(m,z));w.prototype=b,b.constructor=w,s(n,v,w)}},c8d2:function(e,t,r){var i=r("d039"),n=r("5899"),o="​᠎";e.exports=function(e){return i((function(){return!!n[e]()||o[e]()!=o||n[e].name!==e}))}},c975:function(e,t,r){"use strict";var i=r("23e7"),n=r("4d64").indexOf,o=r("a640"),s=r("ae40"),a=[].indexOf,c=!!a&&1/[1].indexOf(1,-0)<0,l=o("indexOf"),d=s("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:c||!l||!d},{indexOf:function(e){return c?a.apply(this,arguments)||0:n(this,e,arguments.length>1?arguments[1]:void 0)}})},cb29:function(e,t,r){var i=r("23e7"),n=r("81d5"),o=r("44d2");i({target:"Array",proto:!0},{fill:n}),o("fill")},d28b:function(e,t,r){var i=r("746f");i("iterator")},ddb0:function(e,t,r){var i=r("da84"),n=r("fdbc"),o=r("e260"),s=r("9112"),a=r("b622"),c=a("iterator"),l=a("toStringTag"),d=o.values;for(var f in n){var u=i[f],h=u&&u.prototype;if(h){if(h[c]!==d)try{s(h,c,d)}catch(p){h[c]=d}if(h[l]||s(h,l,f),n[f])for(var _ in o)if(h[_]!==o[_])try{s(h,_,o[_])}catch(p){h[_]=o[_]}}}},e01a:function(e,t,r){"use strict";var i=r("23e7"),n=r("83ab"),o=r("da84"),s=r("5135"),a=r("861d"),c=r("9bf2").f,l=r("e893"),d=o.Symbol;if(n&&"function"==typeof d&&(!("description"in d.prototype)||void 0!==d().description)){var f={},u=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof u?new d(e):void 0===e?d():d(e);return""===e&&(f[t]=!0),t};l(u,d);var h=u.prototype=d.prototype;h.constructor=u;var _=h.toString,p="Symbol(test)"==String(d("test")),g=/^Symbol\((.*)\)[^)]+$/;c(h,"description",{configurable:!0,get:function(){var e=a(this)?this.valueOf():this,t=_.call(e);if(s(f,e))return"";var r=p?t.slice(7,-1):t.replace(g,"$1");return""===r?void 0:r}}),i({global:!0,forced:!0},{Symbol:u})}}}]);
//# sourceMappingURL=chunk-fc0f90de.bfcd9952.js.map