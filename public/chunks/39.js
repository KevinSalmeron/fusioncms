(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{EACl:function(e,l,n){"use strict";l.a={props:{value:{required:!0}},watch:{value:{deep:!0,handler:function(e){this.$emit("input",e)}}}}},zzBO:function(e,l,n){"use strict";n.r(l);var i={name:"radio-fieldtype",mixins:[n("EACl").a],props:{field:{type:Object,required:!0},value:{required:!1,default:null}}},t=n("KHd+"),a=Object(t.a)(i,(function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("div",[n("p-radio-group",{attrs:{name:e.field.name,label:e.field.name,help:e.field.help,inline:"row"==e.field.settings.display}},e._l(e.field.settings.options,(function(l){return n("p-radio",{key:e.field.name+l.label,attrs:{name:e.field.name,id:l.value,value:l.value,checked:l.value==e.value},on:{input:function(n){return e.$emit("input",l.value)}}},[e._v("\n                "+e._s(l.label)+"\n            ")])})),1)],1)}),[],!1,null,null,null);l.default=a.exports}}]);