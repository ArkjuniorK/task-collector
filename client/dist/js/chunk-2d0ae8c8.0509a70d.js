(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae8c8"],{"0b11":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"flex items-center w-full p-3 search font-display bg-light-200 rounded-md",class:e.srClass},[r("div",{staticClass:"w-4 ml-2 mr-3 icon text-dark-300 xxl:w-5"},[e._t("icon")],2),r("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"w-full bg-light-200 text-display placeholder-dark-100",attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.search},on:{click:function(t){return e.$emit("clicked")},input:function(t){t.target.composing||(e.search=t.target.value)}}})])},n=[],s=(r("ac1f"),r("841c"),r("96cf"),r("1da1")),c=r("2ef0"),i=r.n(c),u={name:"Search",props:["placeholder","srClass","routeName"],data:function(){return{search:""}},methods:{},watch:{search:i.a.debounce(function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r={name:this.routeName},this.search){e.next=3;break}return e.abrupt("return",this.$router.push(r));case 3:""!==this.search&&(r.query={search:this.search}),this.$router.push(r);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),1e3),"$route.query.search":{immediate:!0,handler:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e;case 2:t.search=r.sent;case 3:case"end":return r.stop()}}),r)})))()}}}},o=u,l=r("2877"),h=Object(l["a"])(o,a,n,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0ae8c8.0509a70d.js.map