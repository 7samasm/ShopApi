(function(t){function e(e){for(var r,a,c=e[0],i=e[1],s=e[2],l=0,d=[];l<c.length;l++)a=c[l],o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);p&&p(e);while(d.length)d.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var t,e=0;e<u.length;e++){for(var n=u[e],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},o={app:0},u=[];function c(t){return i.p+"js/"+({about:"about"}[t]||t)+"."+{about:"8ab9324d"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={about:1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var r="css/"+({about:"about"}[t]||t)+"."+{about:"be41d314"}[t]+".css",o=i.p+r,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var s=u[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return e()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],l=s.getAttribute("data-href");if(l===r||l===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,u=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[t],p.parentNode.removeChild(p),n(u)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)}).then(function(){a[t]=0}));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var u=new Promise(function(e,n){r=o[t]=[e,n]});e.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(t),s=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,u=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");u.type=r,u.request=a,n[1](u)}o[t]=void 0}};var d=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var d=0;d<s.length;d++)e(s[d]);var p=l;u.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("1356"),a=n.n(r);a.a},1356:function(t,e,n){},"1b16":function(t,e,n){"use strict";n.d(e,"a",function(){return d});n("96cf");var r=n("3b8d"),a=n("795b"),o=n.n(a),u=n("d225"),c=n("b0b4"),i=n("bc3a"),s=n.n(i),l=(n("c9b3"),"/api"),d=function(){function t(){Object(u["a"])(this,t)}return Object(c["a"])(t,null,[{key:"getProducts",value:function(){return new o.a(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("".concat(l));case 3:r=t.sent,a=r.data,e(a),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),n(t.t0.message);case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(e,n){return t.apply(this,arguments)}}())}},{key:"getProductById",value:function(t){return new o.a(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(n,r){var a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("".concat(l,"/products/").concat(t));case 3:a=e.sent,o=a.data,n(o),console.log(o),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),r(e.t0.message);case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t,n){return e.apply(this,arguments)}}())}},{key:"insertProduct",value:function(t){return s.a.post("".concat(l,"/admin/add-product"),t)}},{key:"deleteProduct",value:function(t){return s.a.post("".concat(l,"/admin/delete-product"),t)}},{key:"editProduct",value:function(t){return s.a.post("".concat(l,"/admin/edit-product"),t)}},{key:"getCart",value:function(){return new o.a(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("".concat(l,"/cart"));case 3:r=t.sent,a=r.data,e(a),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),n(t.t0.message);case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(e,n){return t.apply(this,arguments)}}())}},{key:"insertCartItem",value:function(t){return new o.a(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(n,r){var a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.post("".concat(l,"/cart"),t);case 3:a=e.sent,o=a.data,n(o),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),r(e.t0);case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t,n){return e.apply(this,arguments)}}())}},{key:"deleteCartItem",value:function(t){return s.a.post("".concat(l,"/cart-delete-item"),t)}}]),t}()},"3faa":function(t,e,n){"use strict";n.d(e,"a",function(){return d});n("96cf");var r=n("3b8d"),a=n("795b"),o=n.n(a),u=n("d225"),c=n("b0b4"),i=n("bc3a"),s=n.n(i),l="/api/admin",d=function(){function t(){Object(u["a"])(this,t)}return Object(c["a"])(t,null,[{key:"getUser",value:function(t){return new o.a(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(n,r){var a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("".concat(l,"products/").concat(t));case 3:a=e.sent,o=a.data,n(o),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),r(e.t0.message);case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t,n){return e.apply(this,arguments)}}())}},{key:"login",value:function(t,e){return new o.a(function(){var n=Object(r["a"])(regeneratorRuntime.mark(function n(r,a){var o,u;return regeneratorRuntime.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s.a.post("".concat(l,"/login"),{email:t,password:e});case 3:o=n.sent,u=o.data,r(u),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),a(n.t0);case 11:case"end":return n.stop()}},n,null,[[0,8]])}));return function(t,e){return n.apply(this,arguments)}}())}},{key:"signUp",value:function(t,e,n){return new o.a(function(){var a=Object(r["a"])(regeneratorRuntime.mark(function r(a,o){var u,c;return regeneratorRuntime.wrap(function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,s.a.post("".concat(l,"/signup"),{name:t,email:e,password:n});case 3:u=r.sent,c=u.data,a(c),r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](0),o(r.t0.message);case 11:case"end":return r.stop()}},r,null,[[0,8]])}));return function(t,e){return a.apply(this,arguments)}}())}},{key:"getProducts",value:function(){return new o.a(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("".concat(l,"/products"));case 3:r=t.sent,a=r.data,e(a),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),n(t.t0.message);case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(e,n){return t.apply(this,arguments)}}())}},{key:"userInfos",value:function(){return new o.a(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(e,n){var r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("".concat(l,"/user-info"));case 3:r=t.sent,a=r.data,e(a),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),n(t.t0.message);case 11:case"end":return t.stop()}},t,null,[[0,8]])}));return function(e,n){return t.apply(this,arguments)}}())}},{key:"getProduct",value:function(t){return new o.a(function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(n,r){var a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("".concat(l,"/products/").concat(t));case 3:a=e.sent,o=a.data,n(o),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),r(e.t0.message);case 11:case"end":return e.stop()}},e,null,[[0,8]])}));return function(t,n){return e.apply(this,arguments)}}())}}]),t}()},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=n("1dce"),o=n.n(a),u=n("bc3a"),c=n.n(u),i=(n("d1e7"),n("bb71"));n("da64");r["a"].use(i["a"],{iconfont:"md",rtl:!1});var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("appHeader"),n("v-content",[n("v-container",{staticClass:"mt-4",attrs:{"grid-list-md":""}},[n("router-view")],1)],1)],1)},l=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-side-icon",{on:{click:t.openDrawer}}),n("v-toolbar-title",[t._v(t._s(this.$route.name))]),n("v-spacer"),n("v-toolbar-items",[n("router-link",{staticClass:"v-btn v-btn--flat theme--light hidden-sm-and-down",attrs:{to:"/",tag:"button"}},[t._v("Home")]),t.isLoggedIn?n("router-link",{staticClass:"v-btn v-btn--flat theme--light hidden-sm-and-down",attrs:{to:"/admin/my-product",tag:"button"}},[t._v("My Products")]):t._e(),t.isLoggedIn?n("router-link",{staticClass:"v-btn v-btn--flat theme--light",attrs:{to:"/admin/cart",tag:"button"}},[n("v-badge",{attrs:{color:"#ff3a7d"},scopedSlots:t._u([{key:"badge",fn:function(){return[t._v(t._s(t.totalCartItems))]},proxy:!0}],null,!1,1299446133)},[n("v-icon",{attrs:{color:"purple"}},[t._v("shopping_cart")])],1)],1):t._e()],1)],1),n("drawer")],1)},p=[],f=n("cebc"),m=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{staticStyle:{height:"100%"},attrs:{wrap:""}},[r("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",{staticClass:"pa-1"},[r("v-list-tile",{attrs:{avatar:""}},[r("v-list-tile-avatar",[r("img",{attrs:{src:n("cf05")}})]),r("v-list-tile-content",[r("v-list-tile-title",[t._v(t._s(t.user.name))])],1),t.isLoggedIn?r("v-list-tile-action",[r("v-icon",{attrs:{color:"pink"},on:{click:t.logout}},[t._v("logout")])],1):r("router-link",{staticClass:"v-list__tile__action",attrs:{tag:"div",to:"/admin/login"}},[r("v-icon",{attrs:{color:"pink"},on:{click:function(e){t.drawer=!1}}},[t._v("exit_to_app")])],1)],1)],1),r("v-list",{staticClass:"pt-0",attrs:{dense:""}},[r("v-divider"),t._l(t.items,function(e){return r("router-link",{key:e.title,staticClass:"v-list__tile v-list__tile--link theme--light",attrs:{tag:"a",to:e.link}},[r("v-list-tile",[r("v-list-tile-action",[r("v-icon",{attrs:{color:"pink"}},[t._v(t._s(e.icon))])],1),r("v-list-tile-content",[r("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)],1)})],2)],1)],1)},v=[],h=n("2f62"),g={data:function(){return{drawer:!1,items:[{title:"Home",icon:"home",link:"/"},{title:"add product",icon:"add",link:"/admin/add-product"},{title:"Oclocks",icon:"alarm",link:"/oclocks"}]}},computed:Object(f["a"])({},Object(h["c"])(["isLoggedIn","user"])),methods:{logout:function(){var t=this;this.$store.dispatch("logout").then(function(){t.$router.push("/admin/login")})}},created:function(){var t=this;st.$on("openDrawer",function(e){t.drawer=e})}},b=g,w=n("2877"),k=n("6544"),y=n.n(k),_=n("ce7e6"),x=n("132d"),O=n("a722"),j=n("8860"),C=n("ba95"),I=n("40fe"),P=n("c954"),R=n("5d23"),S=n("f774"),L=Object(w["a"])(b,m,v,!1,null,null,null),V=L.exports;y()(L,{VDivider:_["a"],VIcon:x["a"],VLayout:O["a"],VList:j["a"],VListTile:C["a"],VListTileAction:I["a"],VListTileAvatar:P["a"],VListTileContent:R["a"],VListTileTitle:R["b"],VNavigationDrawer:S["a"]});var A=n("1b16"),T={computed:Object(f["a"])({},Object(h["c"])(["totalCartItems","isLoggedIn"])),components:{drawer:V},methods:{openDrawer:function(){st.$emit("openDrawer",!0)}}},E=T,D=n("4ca6"),$=n("9910"),q=n("71d9"),U=n("2a7f"),B=n("706c"),H=Object(w["a"])(E,d,p,!1,null,null,null),N=H.exports;y()(H,{VBadge:D["a"],VIcon:x["a"],VSpacer:$["a"],VToolbar:q["a"],VToolbarItems:U["a"],VToolbarSideIcon:B["a"],VToolbarTitle:U["b"]});var M={name:"App",components:{appHeader:N},created:function(){this.$store.dispatch("resetUCP")}},J=M,W=(n("034f"),n("7496")),F=n("a523"),K=n("549c"),z=Object(w["a"])(J,s,l,!1,null,null,null),G=z.exports;y()(z,{VApp:W["a"],VContainer:F["a"],VContent:K["a"]});n("759f");var Q=n("8c4f"),X=(n("6b54"),n("87b3"),n("20d6"),n("96cf"),n("3b8d")),Y=n("795b"),Z=n.n(Y),tt=n("3faa"),et={status:"",token:localStorage.getItem("token")||"",user:{},cart:{},myProducts:[]},nt={user:function(t){return t.user},isLoggedIn:function(t){return!!t.token},token:function(t){return t.token},authStatus:function(t){return t.status},myProducts:function(t){return t.myProducts||{}},cart:function(t){return t.cart.products||[]},totalPrice:function(t){return t.cart.totalPrice||0},totalCartItems:function(t){return t.cart.totalItems||0}},rt={set_user:function(t,e){var n=e.user;t.user=n},set_cart:function(t,e){t.cart=e},set_my_products:function(t,e){var n=e.products;t.myProducts=n},auth_request:function(t){t.status="loading"},auth_success:function(t,e){t.status="success",t.token=e},auth_error:function(t){t.status="error"},logout:function(t){t.status="",t.token="",t.user={},t.cart={},t.myProducts=[]}},at={login:function(t,e){var n=t.commit,r=t.dispatch,a=e.email,o=e.password;return new Z.a(function(){var t=Object(X["a"])(regeneratorRuntime.mark(function t(e,u){var c,i,s,l;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n("auth_request"),t.next=4,tt["a"].login(a,o);case 4:c=t.sent,i=c.token,localStorage.setItem("token",i),n("auth_success",i),r("resetUCP"),e(c),t.next=19;break;case 12:t.prev=12,t.t0=t["catch"](0),n("auth_error"),localStorage.removeItem("token"),s=Object(f["a"])({},t.t0),l="Wrong password!"===s.response.data.error?"Wrong password!":"A user with this email not be found.",u({showDialog:!0,message:l});case 19:case"end":return t.stop()}},t,null,[[0,12]])}));return function(e,n){return t.apply(this,arguments)}}())},logout:function(t){var e=t.commit;return new Z.a(function(t,n){e("logout"),localStorage.removeItem("token"),delete c.a.defaults.headers.common["x-Auth"],t()})},removeCartItem:function(){var t=Object(X["a"])(regeneratorRuntime.mark(function t(e,n){var r,a,o,u;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(r=e.commit,a=e.state,u=a.cart.products.findIndex(function(t){return t.productId._id.toString()===n.toString()}),!(u>=0)){t.next=13;break}return t.next=5,A["a"].deleteCartItem({productId:n});case 5:return t.t0=r,t.next=8,A["a"].getCart();case 8:t.t1=t.sent,(0,t.t0)("set_cart",t.t1),o=!0,t.next=14;break;case 13:o=!1;case 14:return t.abrupt("return",o);case 15:case"end":return t.stop()}},t)}));function e(e,n){return t.apply(this,arguments)}return e}(),resetUCP:function(){var t=Object(X["a"])(regeneratorRuntime.mark(function t(e){var n,r,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.commit,r=e.getters,r.isLoggedIn){t.next=3;break}return t.abrupt("return");case 3:return c.a.defaults.headers.common["x-Auth"]=r.token,t.next=6,tt["a"].userInfos();case 6:return a=t.sent,n("set_user",a),n("set_my_products",a),t.t0=n,t.next=12,A["a"].getCart();case 12:t.t1=t.sent,(0,t.t0)("set_cart",t.t1);case 14:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()},ot={state:et,getters:nt,mutations:rt,actions:at};r["a"].use(h["a"]);var ut=new h["a"].Store({modules:{user:ot}});r["a"].use(Q["a"]);var ct=new Q["a"]({mode:"history",base:"/",routes:[{path:"/admin/register",name:"register",component:function(){return n.e("about").then(n.bind(null,"9507"))}},{path:"/admin/login",name:"Login",component:function(){return n.e("about").then(n.bind(null,"35b0"))}},{path:"/",name:"Home",component:function(){return n.e("about").then(n.bind(null,"bb51"))}},{path:"/product-details/:id",name:"Product Details",component:function(){return n.e("about").then(n.bind(null,"5a7e"))}},{path:"/admin/my-product",name:"my products",meta:{requiresAuth:!0},component:function(){return n.e("about").then(n.bind(null,"9d54"))}},{path:"/admin/add-product",name:"Add product",meta:{requiresAuth:!0},component:function(){return n.e("about").then(n.bind(null,"880d"))}},{path:"/admin/edit-product/:id",name:"Update product",meta:{requiresAuth:!0},component:function(){return n.e("about").then(n.bind(null,"9bcf"))}},{path:"/admin/cart",name:"Cart",meta:{requiresAuth:!0},component:function(){return n.e("about").then(n.bind(null,"eebd"))}},{path:"/oclocks",name:"Oclocks",component:function(){return n.e("about").then(n.bind(null,"57ba"))}}]});ct.beforeEach(function(t,e,n){if(t.matched.some(function(t){return t.meta.requiresAuth})){if(ut.getters.isLoggedIn)return void n();n("/admin/login")}else n()});var it=ct;n.d(e,"eventBus",function(){return st}),r["a"].use(o.a),r["a"].config.productionTip=!1;var st=new r["a"];new r["a"]({store:ut,router:it,render:function(t){return t(G)}}).$mount("#app")},cf05:function(t,e,n){t.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.933d73a7.js.map