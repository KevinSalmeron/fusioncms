(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{MwC5:function(e,a,i){"use strict";i.r(a);i("dhqo");var t={data:function(){return{collection:{}}},computed:{endpoint:function(){return this.collection.id?"/datatable/collections/"+this.collection.id:null},singular:function(){return this.collection?this.collection.name:""}},beforeRouteEnter:function(e,a,i){axios.get("/api/matrices/slug/"+e.params.collection).then(function(e){i(function(a){a.collection=e.data.data})})}},o=i("KHd+"),s=Object(o.a)(t,function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",[i("portal",{attrs:{to:"title"}},[i("app-title",{attrs:{icon:e.collection.icon}},[e._v(e._s(e.collection.name))])],1),e._v(" "),i("portal",{attrs:{to:"actions"}},[i("router-link",{staticClass:"button",attrs:{to:{name:"collections.create",params:{collection:e.collection.id}}}},[e._v("Create "+e._s(e.singular))])],1),e._v(" "),e.endpoint?i("div",{staticClass:"row"},[i("div",{staticClass:"content-container"},[i("p-datatable",{attrs:{name:"permissions",endpoint:e.endpoint,"sort-by":"name","per-page":10,"no-actions":""},scopedSlots:e._u([{key:"slug",fn:function(a){return[i("code",[e._v(e._s(a.record.slug))])]}},{key:"description",fn:function(a){return[i("span",{staticClass:"text-grey-darker text-sm"},[e._v(e._s(a.record.description))])]}}],null,!1,413546463)})],1)]):e._e()],1)},[],!1,null,null,null);a.default=s.exports},dhqo:function(e,a,i){e.exports=function(){var e=[],a=[],i={},t={},o={};function s(e){return"string"==typeof e?new RegExp("^"+e+"$","i"):e}function r(e,a){return e===a?a:e===e.toLowerCase()?a.toLowerCase():e===e.toUpperCase()?a.toUpperCase():e[0]===e[0].toUpperCase()?a.charAt(0).toUpperCase()+a.substr(1).toLowerCase():a.toLowerCase()}function n(e,a){return e.replace(a[0],function(i,t){var o,s,n=(o=a[1],s=arguments,o.replace(/\$(\d{1,2})/g,function(e,a){return s[a]||""}));return r(""===i?e[t-1]:i,n)})}function l(e,a,t){if(!e.length||i.hasOwnProperty(e))return a;for(var o=t.length;o--;){var s=t[o];if(s[0].test(a))return n(a,s)}return a}function u(e,a,i){return function(t){var o=t.toLowerCase();return a.hasOwnProperty(o)?r(t,o):e.hasOwnProperty(o)?r(t,e[o]):l(o,t,i)}}function c(e,a,i,t){return function(t){var o=t.toLowerCase();return!!a.hasOwnProperty(o)||!e.hasOwnProperty(o)&&l(o,o,i)===o}}function d(e,a,i){var t=1===a?d.singular(e):d.plural(e);return(i?a+" ":"")+t}return d.plural=u(o,t,e),d.isPlural=c(o,t,e),d.singular=u(t,o,a),d.isSingular=c(t,o,a),d.addPluralRule=function(a,i){e.push([s(a),i])},d.addSingularRule=function(e,i){a.push([s(e),i])},d.addUncountableRule=function(e){"string"!=typeof e?(d.addPluralRule(e,"$0"),d.addSingularRule(e,"$0")):i[e.toLowerCase()]=!0},d.addIrregularRule=function(e,a){a=a.toLowerCase(),e=e.toLowerCase(),o[e]=a,t[a]=e},[["I","we"],["me","us"],["he","they"],["she","they"],["them","them"],["myself","ourselves"],["yourself","yourselves"],["itself","themselves"],["herself","themselves"],["himself","themselves"],["themself","themselves"],["is","are"],["was","were"],["has","have"],["this","these"],["that","those"],["echo","echoes"],["dingo","dingoes"],["volcano","volcanoes"],["tornado","tornadoes"],["torpedo","torpedoes"],["genus","genera"],["viscus","viscera"],["stigma","stigmata"],["stoma","stomata"],["dogma","dogmata"],["lemma","lemmata"],["schema","schemata"],["anathema","anathemata"],["ox","oxen"],["axe","axes"],["die","dice"],["yes","yeses"],["foot","feet"],["eave","eaves"],["goose","geese"],["tooth","teeth"],["quiz","quizzes"],["human","humans"],["proof","proofs"],["carve","carves"],["valve","valves"],["looey","looies"],["thief","thieves"],["groove","grooves"],["pickaxe","pickaxes"],["passerby","passersby"]].forEach(function(e){return d.addIrregularRule(e[0],e[1])}),[[/s?$/i,"s"],[/[^\u0000-\u007F]$/i,"$0"],[/([^aeiou]ese)$/i,"$1"],[/(ax|test)is$/i,"$1es"],[/(alias|[^aou]us|t[lm]as|gas|ris)$/i,"$1es"],[/(e[mn]u)s?$/i,"$1s"],[/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i,"$1"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1i"],[/(alumn|alg|vertebr)(?:a|ae)$/i,"$1ae"],[/(seraph|cherub)(?:im)?$/i,"$1im"],[/(her|at|gr)o$/i,"$1oes"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,"$1a"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,"$1a"],[/sis$/i,"ses"],[/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i,"$1$2ves"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/([^ch][ieo][ln])ey$/i,"$1ies"],[/(x|ch|ss|sh|zz)$/i,"$1es"],[/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i,"$1ices"],[/\b((?:tit)?m|l)(?:ice|ouse)$/i,"$1ice"],[/(pe)(?:rson|ople)$/i,"$1ople"],[/(child)(?:ren)?$/i,"$1ren"],[/eaux$/i,"$0"],[/m[ae]n$/i,"men"],["thou","you"]].forEach(function(e){return d.addPluralRule(e[0],e[1])}),[[/s$/i,""],[/(ss)$/i,"$1"],[/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,"$1fe"],[/(ar|(?:wo|[ae])l|[eo][ao])ves$/i,"$1f"],[/ies$/i,"y"],[/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,"$1ie"],[/\b(mon|smil)ies$/i,"$1ey"],[/\b((?:tit)?m|l)ice$/i,"$1ouse"],[/(seraph|cherub)im$/i,"$1"],[/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,"$1"],[/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,"$1sis"],[/(movie|twelve|abuse|e[mn]u)s$/i,"$1"],[/(test)(?:is|es)$/i,"$1is"],[/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,"$1us"],[/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,"$1um"],[/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,"$1on"],[/(alumn|alg|vertebr)ae$/i,"$1a"],[/(cod|mur|sil|vert|ind)ices$/i,"$1ex"],[/(matr|append)ices$/i,"$1ix"],[/(pe)(rson|ople)$/i,"$1rson"],[/(child)ren$/i,"$1"],[/(eau)x?$/i,"$1"],[/men$/i,"man"]].forEach(function(e){return d.addSingularRule(e[0],e[1])}),["adulthood","advice","agenda","aid","aircraft","alcohol","ammo","analytics","anime","athletics","audio","bison","blood","bream","buffalo","butter","carp","cash","chassis","chess","clothing","cod","commerce","cooperation","corps","debris","diabetes","digestion","elk","energy","equipment","excretion","expertise","firmware","flounder","fun","gallows","garbage","graffiti","hardware","headquarters","health","herpes","highjinks","homework","housework","information","jeans","justice","kudos","labour","literature","machinery","mackerel","mail","media","mews","moose","music","mud","manga","news","only","personnel","pike","plankton","pliers","police","pollution","premises","rain","research","rice","salmon","scissors","series","sewage","shambles","shrimp","software","species","staff","swine","tennis","traffic","transportation","trout","tuna","wealth","welfare","whiting","wildebeest","wildlife","you",/pok[eé]mon$/i,/[^aeiou]ese$/i,/deer$/i,/fish$/i,/measles$/i,/o[iu]s$/i,/pox$/i,/sheep$/i].forEach(d.addUncountableRule),d}()}}]);