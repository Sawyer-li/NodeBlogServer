webpackJsonp([1],{"/jFu":function(e,t){},"1uuo":function(e,t){},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var n=r("VU/8")({name:"App"},a,!1,function(e){r("gsu9")},null,null).exports,o=r("/ocq"),l={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"hello"},[r("h1",[e._v(e._s(e.msg))]),e._v(" "),r("h2",[e._v("Essential Links")]),e._v(" "),e._m(0),e._v(" "),r("h2",[e._v("Ecosystem")]),e._v(" "),e._m(1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[e._v("\n        Core Docs\n      ")])]),e._v(" "),r("li",[r("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[e._v("\n        Forum\n      ")])]),e._v(" "),r("li",[r("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[e._v("\n        Community Chat\n      ")])]),e._v(" "),r("li",[r("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[e._v("\n        Twitter\n      ")])]),e._v(" "),r("br"),e._v(" "),r("li",[r("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[e._v("\n        Docs for This Template\n      ")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[t("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};r("VU/8")({name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},l,!1,function(e){r("1uuo")},"data-v-d8ec41bc",null).exports;var u={name:"register",data:function(){var e=this;return{ruleForm2:{name:"",pass:"",checkPass:""},rules2:{pass:[{validator:function(t,r,s){""===r?s(new Error("请输入密码")):""!==e.ruleForm2.checkPass&&e.$refs.ruleForm2.validateField("checkPass"),s()},trigger:"blur"}],checkPass:[{validator:function(t,r,s){""===r?s(new Error("请输入密码")):r!==e.ruleForm2.pass?s(new Error("两次密码不一致")):s()},trigger:"blur"}]}}},mounted:function(){}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"regBox"},[r("h2",[e._v("注册页")]),e._v(" "),r("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm2,"status-icon":"",rules:e.rules2,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"年龄"}},[r("el-input",{model:{value:e.ruleForm2.name,callback:function(t){e.$set(e.ruleForm2,"name",e._n(t))},expression:"ruleForm2.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"密码",prop:"pass"}},[r("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm2.pass,callback:function(t){e.$set(e.ruleForm2,"pass",t)},expression:"ruleForm2.pass"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[r("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.ruleForm2.checkPass,callback:function(t){e.$set(e.ruleForm2,"checkPass",t)},expression:"ruleForm2.checkPass"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm2")}}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("ruleForm2")}}},[e._v("重置")])],1)],1)],1)},staticRenderFns:[]};var c=r("VU/8")(u,i,!1,function(e){r("/jFu")},null,null).exports;s.default.use(o.a);var v=new o.a({routes:[{path:"/",name:"Register",component:c}]}),m=r("zL8q"),p=r.n(m);r("tvR6");s.default.config.productionTip=!1,s.default.use(p.a),new s.default({el:"#app",router:v,components:{App:n},template:"<App/>"})},gsu9:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.ef41c2bf0e7957a391e8.js.map