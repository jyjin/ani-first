(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{202:function(e,t,a){e.exports=a(445)},219:function(e,t,a){},280:function(e,t,a){var n=a(281).auto,r=a(284),o=r.cloneDeep,s=r.has,i=(a(285),a(304));e.exports=function(e){var t={};return e.map(function(e){t[e.name]=function(t,a,r){n({request:function(a){var n=o(t),l=!1;if((~e.url.indexOf(":")||~e.url.indexOf("\uff1a"))&&(e.url=e.url.replace(/:([A-Za-z_\$][A-Za-z0-9_\$]*)/g,function(e,a){return s(n,a)?t[a]:(l=!0,"undefined")}),l))return a("lack necessary Params");!function(e,t){var a=localStorage.getItem("ANF_TOKEN")||"",n={headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded",token:a},method:e.method,url:i.siteUrl+e.url,params:e.query,data:e.data};function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;for(var n in e)t[a++]=[n,e[n]];return new URLSearchParams(t).toString()}var o={};if("GET"===(e=Object.assign({},n)).method){e.params?e.params.token=a:e.params={token:a};var s=r(e.params);e.url+="?"+s,o={method:e.method,credentials:"include",mode:"cors"}}else o={method:e.method,credentials:"include",mode:"cors",headers:new Headers(e.headers),body:r(e.data)};console.log("send fetch request... "),fetch(e.url,o).then(function(e){return e.json()}).then(function(e){t(null,e)}).catch(function(e){e.response?(console.log("[ Http response error ]"),console.log("[ - data ]",e.response.data),console.log("[ - status ]",e.response.status),console.log("[ - headers ]",e.response.headers),t("Http response error")):e.request?(console.log("[ Http request error ]"),console.log("[ - request ]",e.request),t(" Http request error ")):(console.log("[ Http error  ]"),console.log("[ - message ]",e.message),t(" Http error "))})}({url:e.url,method:e.isPost?"POST":"GET",data:t,query:r},a)}},function(e,t){a(e,t.request)})}}),Object.getOwnPropertyNames(t).map(function(e){t[e]=function(e,t){return function(){var a=arguments;return new Promise(function(n,r){e.apply(t,[].concat(a[0],[function(e,t){return e?r(e):n(t)}],a[1]))})}}(t[e],t)}),t}},304:function(e,t){e.exports={siteUrl:"http://jianleking.com:80",timeout:"5000"}},34:function(e,t){t.ADD_USER="add_user",t.DEL_USER="del_user",t.SIGN_IN="sign_in",t.TOKEN_SIGN_IN="token_sign_in",t.TOKEN_SIGN_IN_LOADING="token_sign_in_loading"},439:function(e,t,a){},445:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),s=a.n(o),i=a(114),l=a(64),c=a(190),u=a(191),p=a(34),d={user:{},token:"",loading:!0},m=function(e){return localStorage.setItem("ANF_TOKEN",e)},h=Object(l.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0,a=JSON.parse(JSON.stringify(e));switch(t.type){case p.ADD_USER:a.token=t.payload.token,m(t.payload.token);break;case p.DEL_USER:break;case p.SIGN_IN:a.user=t.payload.user,m(t.payload.token),a.loading=!1;break;case p.TOKEN_SIGN_IN_LOADING:a.loading=!0;break;case p.TOKEN_SIGN_IN:a.user=t.payload.user||{},a.loading=!1}return a}}),f=Object(u.createLogger)(),g=Object(l.d)(h,Object(l.a)(c.a,f)),E=(a(211),a(37)),b=a(13),v=a(14),y=a(17),O=a(15),j=a(16),N=(a(76),a(33)),S=(a(154),a(115)),k=(a(155),a(57)),A=(a(120),a(11)),I=(a(156),a(27)),T=(a(219),a(107)),x=a(280)([{name:"test",url:"/user/test"},{name:"signIn",url:"/user/signIn",isPost:!0},{name:"signOut",url:"/user/offline",isPost:!0},{name:"register",url:"/user/register",isPost:!0},{name:"queryUserList",url:"/user/queryUserList"},{name:"authByToken",url:"/user/authByToken/:token"},{name:"hangupFriends",url:"/user/chatHangup",isPost:!0},{name:"changeFriends",url:"/user/chatSwitch",isPost:!0}]),C={title:{fontSize:"30px",padding:"5% 0 20px",color:"#27b764",textAlign:"center"}},_=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).validateToPhone=function(e,t,a){Object(T.isMobilePhone)(t)?a():a("\u8bf7\u8f93\u516511\u4f4d\u624b\u673a\u53f7")},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFields(function(e,t){e||(console.log("from data: ",t),a.apiLogin(t))})},a.state={},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"apiLogin",value:function(e){var t=this,a=this.props.loading("\u767b\u5f55\u4e2d...");x.signIn(e).then(function(e){e.res>0?(a.then(function(){t.props.success("\u767b\u5f55\u6210\u529f")}),t.props.dispatch(p.SIGN_IN,{user:e.data.user,token:e.data.token}),t.onNav("/")):a.then(function(){t.props.success(e.i18n[t.props.local])})})}},{key:"onNav",value:function(e){var t={pathname:e,state:{fromDashboard:!0}};this.props.history.push(t)}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a=this.props.i18n,n=a.APP_NAME,o=a.ACCOUNT,s=a.PASSWORD,i=a.REMEMBER_ME,l=a.FORGET_PASSWORD,c=a.LOGIN_IN,u=a.REGISTER;return r.a.createElement("div",{style:{padding:"20px"}},r.a.createElement(I.a,{onSubmit:this.handleSubmit,className:"login-form"},r.a.createElement(I.a.Item,null,r.a.createElement("div",{style:C.title},n," ")),r.a.createElement(I.a.Item,null,t("phone",{rules:[{required:!0,message:"\u8bf7\u8f93\u516511\u4f4d\u624b\u673a\u53f7!"},{validator:this.validateToPhone}]})(r.a.createElement(k.a,{prefix:r.a.createElement(A.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:o}))),r.a.createElement(I.a.Item,null,t("password",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801!"}]})(r.a.createElement(k.a,{prefix:r.a.createElement(A.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:s}))),r.a.createElement(I.a.Item,null,t("remember",{valuePropName:"checked",initialValue:!0})(r.a.createElement(S.a,null,i)),r.a.createElement("a",{className:"login-form-forgot",href:""},l),r.a.createElement(N.a,{type:"primary",htmlType:"submit",className:"login-form-button"},c),r.a.createElement("a",{href:"javascript:null",onClick:function(){e.onNav("register")}},u))))}}]),t}(n.Component),w=I.a.create({name:"normal_login"})(_),D=(a(146),a(72)),P=(a(147),a(42)),R=(a(186),a(56));var L=function(e){return{dispatch:function(t,a){return e(function(e,t){return function(a,n){a({type:e,payload:t})}}(t,a))}}},U=function(e,t){return Object(i.b)(function(e){return e?function(t){var a={};for(var n in e)a[n]=t[e[n]][n];return a}:null}(e),L)(t)},H={title:{fontSize:"30px",padding:"5% 0 20px",color:"#27b764",textAlign:"center"}},F=R.a.Option,M=function(e){function t(){var e,a;Object(b.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(y.a)(this,(e=Object(O.a)(t)).call.apply(e,[this].concat(r)))).state={confirmDirty:!1},a.handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){e||(console.log("from data: ",t),a.apiRegister(t))})},a.handleConfirmBlur=function(e){var t=e.target.value;a.setState({confirmDirty:a.state.confirmDirty||!!t})},a.validateToPhone=function(e,t,a){Object(T.isMobilePhone)(t)?a():a("\u8bf7\u8f93\u516511\u4f4d\u624b\u673a\u53f7")},a.compareToFirstPassword=function(e,t,n){var r=a.props.form;t&&t!==r.getFieldValue("password")?n("\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4!"):n()},a.validateToNextPassword=function(e,t,n){var r=a.props.form;t&&a.state.confirmDirty&&r.validateFields(["confirm"],{force:!0}),n()},a.validateToCaptcha=function(e,t,a){t&&4!==t.length?a("\u8bf7\u8f93\u51654\u4f4d\u9a8c\u8bc1\u7801"):a()},a.validateToAgreement=function(e,t,a){t?a():a("\u8bf7\u4ed4\u7ec6\u9605\u8bfb\u534f\u8bae\u6761\u6b3e\uff0c\u540c\u610f\u540e\u624d\u53ef\u6ce8\u518c")},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"apiRegister",value:function(e){var t=this;x.register(e).then(function(e){e.res>0?(t.props.dispatch(p.ADD_USER,{token:e.data.token}),t.props.info(t.props.i18n.SUCCESS.TO.SAVE),t.onNav("login")):t.props.info(e.i18n[t.props.local])})}},{key:"onNav",value:function(e){var t={pathname:e,state:{fromDashboard:!0}};this.props.history.push(t)}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,a={wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},n=t("prefix",{initialValue:"86"})(r.a.createElement(R.a,{style:{width:70}},r.a.createElement(F,{value:"86"},"+86"),r.a.createElement(F,{value:"87"},"+87"))),o=this.props.i18n,s=o.APP_NAME,i=o.PASSWORD,l=o.LOGIN_IN,c=o.REGISTER,u=o.CONFIRM_PASSWORD,p=o.PHONE,d=o.CAPTCHA,m=o.I_HAVE_READ,h=o.AGREEMENT,f=o.INPUT_PASSWORD,g=o.INPUT_CONFIRM_PASSWORD,E=o.INPUT_PHONE,b=o.INPUT_CAPTCHA,v=o.EXTRA_CAPTCHA,y=o.GET_CAPTCHA,O=o.HAVE_ACCOUNT;return r.a.createElement(I.a,Object.assign({className:"register-form"},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit}),r.a.createElement("div",{style:H.title},s+" "+c," "),r.a.createElement(I.a.Item,a,O,r.a.createElement("a",{href:"javascript:null",onClick:function(){e.onNav("login")}},l)),r.a.createElement(I.a.Item,{label:p},t("phone",{rules:[{required:!0,message:E},{validator:this.validateToPhone}]})(r.a.createElement(k.a,{addonBefore:n,style:{width:"100%"}}))),r.a.createElement(I.a.Item,{label:i},t("password",{rules:[{required:!0,message:f},{validator:this.validateToNextPassword}]})(r.a.createElement(k.a,{type:"password"}))),r.a.createElement(I.a.Item,{label:u},t("confirm",{rules:[{required:!0,message:g},{validator:this.compareToFirstPassword}]})(r.a.createElement(k.a,{type:"password",onBlur:this.handleConfirmBlur}))),r.a.createElement(I.a.Item,{label:d,extra:v},r.a.createElement(D.a,{gutter:8},r.a.createElement(P.a,{span:12},t("captcha",{rules:[{required:!0,message:b},{validator:this.validateToCaptcha}]})(r.a.createElement(k.a,null))),r.a.createElement(P.a,{span:12},r.a.createElement(N.a,null,y)))),r.a.createElement(I.a.Item,a,t("agreement",{valuePropName:"checked",rules:[{validator:this.validateToAgreement}]})(r.a.createElement(S.a,null,m," ",r.a.createElement("a",{href:"javascript:null"},h)))),r.a.createElement(I.a.Item,a,r.a.createElement(N.a,{type:"primary",htmlType:"submit"},c)))}}]),t}(n.Component),G=U(null,I.a.create({name:"register"})(M)),B=(a(447),a(89)),q=(a(82),a(48)),W=(a(83),a(26)),K=a(65),V=W.a.Footer,z={footer:{padding:"10px 0",textAlign:"center",background:"#fff"},row:{margin:0,padding:"0"},icon:{fontSize:"20px",padding:"5px",cursor:"pointer"},iconHover:{fontSize:"20px",color:"#25b864",padding:"5px",cursor:"pointer"},loading:{position:"absolute",left:"50%",top:"50%",margin:"-18.5px -16px"}},Q=function(e){function t(){return Object(b.a)(this,t),Object(y.a)(this,Object(O.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(v.a)(t,[{key:"onNav",value:function(e){var t=this.props.history;console.log("jyjin ",this.props);var a={pathname:e,state:{fromDashboard:!0}};t.push(a)}},{key:"setIconStyle",value:function(e){return"outlined"}},{key:"setStyle",value:function(e){return this.props.history.location.pathname===e?z.iconHover:z.icon}},{key:"render",value:function(){var e=this;return r.a.createElement(V,{style:z.footer},r.a.createElement(D.a,{gutter:16,style:z.row},r.a.createElement(P.a,{className:"gutter-row",span:6},r.a.createElement("div",{className:"gutter-box"},r.a.createElement(A.a,{onClick:function(){return e.onNav("/")},style:this.setStyle("/"),type:"home",theme:this.setIconStyle("/")}))),r.a.createElement(P.a,{className:"gutter-row",span:6},r.a.createElement("div",{className:"gutter-box"},r.a.createElement(A.a,{onClick:function(){return e.onNav("ani")},style:this.setStyle("/ani"),type:"thunderbolt",theme:this.setIconStyle("/ani")}))),r.a.createElement(P.a,{className:"gutter-row",span:6},r.a.createElement("div",{className:"gutter-box"},r.a.createElement(A.a,{onClick:function(){return e.onNav("find")},style:this.setStyle("/find"),type:"deployment-unit",theme:this.setIconStyle("/find")}))),r.a.createElement(P.a,{className:"gutter-row",span:6},r.a.createElement("div",{className:"gutter-box"},r.a.createElement(A.a,{onClick:function(){return e.onNav("user")},style:this.setStyle("/user"),type:"user",theme:this.setIconStyle("/user")})))))}}]),t}(n.Component),Y=Object(K.e)(Q),J=W.a.Header,Z=W.a.Content,X={header:{padding:"0 12px",background:"#fff"},row:{margin:"0",padding:"0",background:"#fff",borderBottom:"1px solid #e8e8e8"},content:{padding:"0 50px",minHeight:"calc(100vh - 66px - 52.5px )"},loading:{position:"absolute",left:"50%",top:"50%",margin:"-18.5px -16px"}},$=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"onNav",value:function(e){var t=this.props.history;console.log("jyjin ",this.props);var a={pathname:e,state:{fromDashboard:!0}};t.push(a)}},{key:"render",value:function(){return localStorage.getItem("ANF_TOKEN")||""||this.onNav("login"),this.props.loading?r.a.createElement("div",{style:X.loading},r.a.createElement(q.a,{size:"large"})):(this.props.user._id||this.onNav("login"),r.a.createElement(W.a,null,r.a.createElement(J,{style:X.header},r.a.createElement(D.a,{gutter:{xs:8,sm:16,md:24},style:X.row},r.a.createElement(P.a,{className:"gutter-row",xs:21,sm:22,md:22,lg:23,xl:23,xxl:23},r.a.createElement(B.a,{mode:"horizontal",defaultSelectedKeys:["1"],style:{lineHeight:"64px",border:"none"}},r.a.createElement(B.a.Item,{key:"1"},"\u70ed\u95e8"),r.a.createElement(B.a.Item,{key:"2"},"\u7cbe\u9009"),r.a.createElement(B.a.Item,{key:"3"},"\u9644\u8fd1"))),r.a.createElement(P.a,{className:"gutter-row",xs:3,sm:2,md:2,lg:1,xl:1,xxl:1}))),r.a.createElement(Z,{style:X.content},this.props.children),r.a.createElement(Y,null)))}}]),t}(n.Component),ee=U({token:"user",user:"user",loading:"user"},Object(K.e)($)),te=function(e){function t(e,a){var n;return Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e)),console.log("...props: ",n.props),n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement(ee,null,r.a.createElement("div",{style:{padding:"20px 0"}},this.props.i18n.DESC))}}]),t}(n.Component),ae=(a(435),a(152)),ne=(W.a.Header,W.a.Content),re={header:{padding:"0 12px",background:"#fff"},row:{margin:"0",padding:"0",background:"#fff",borderBottom:"1px solid #e8e8e8"},content:{padding:"0",minHeight:"calc(100vh - 52.5px )"},loading:{position:"absolute",left:"50%",top:"50%",margin:"-18.5px -16px"}},oe=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"onNav",value:function(e){var t=this.props.history;console.log("jyjin ",this.props);var a={pathname:e,state:{fromDashboard:!0}};t.push(a)}},{key:"render",value:function(){return localStorage.getItem("ANF_TOKEN")||""||this.onNav("login"),this.props.loading?r.a.createElement("div",{style:re.loading},r.a.createElement(q.a,{size:"large"})):(this.props.user._id||this.onNav("login"),r.a.createElement(W.a,null,r.a.createElement(ne,{style:re.content},this.props.children),r.a.createElement(Y,null)))}}]),t}(n.Component),se=U({token:"user",user:"user",loading:"user"},Object(K.e)(oe)),ie=function(e){function t(e,a){var n;return Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e)),console.log("...props: ",n.props),n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"sendRequest",value:function(){for(var e=0;e<3;e++)x.getUserList().then(function(e){console.log("=== i === ",e)})}},{key:"render",value:function(){return r.a.createElement("div",null,"\u7cbe\u9009")}}]),t}(n.Component),le=(a(84),a(30)),ce=a(87),ue=function(e){function t(e,a){var n;return Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e)),console.log("...props: ",n.props),n.state={msgList:[]},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"sendRequest",value:function(){for(var e=this,t=this.state.msgList,a=0;a<1001;a++)!function(a){console.log("send === ",a),x.queryUserList().then(function(n){console.log("recv === ".concat(a," "),n),n.res>0?t.push({i:a,msg:n.msg,result:n.data}):t.push({i:a,msg:n.msg,result:""}),e.setState({msgList:t})})}(a)}},{key:"render",value:function(){var e,t=this;return r.a.createElement("div",null,r.a.createElement(N.a,{type:"primary",style:{marginTop:"24px",width:"100%"},onClick:function(){return t.sendRequest()}},"\u53d1\u9001\u6279\u91cf\u8bf7\u6c42"),r.a.createElement(N.a,{type:"primary",style:{marginTop:"24px",width:"100%"},onClick:function(){return t.setState({msgList:[]})}},"\u6e05\u7a7a"),r.a.createElement(le.a,{style:(e={marginTop:"24px",width:"100%",background:"#fff"},Object(ce.a)(e,"marginTop","0px"),Object(ce.a)(e,"borderRadius","0"),e),bordered:!0,dataSource:this.state.msgList,renderItem:function(e){return r.a.createElement(le.a.Item,null,"\u7b2c".concat(e.i,"\u6b21\u8bf7\u6c42\u7ed3\u679c == ")+e.msg)}}))}}]),t}(n.Component),pe=(a(439),{red:15,yellow:3,green:15}),de=function(e){function t(e,a){var n;return Object(b.a)(this,t),(n=Object(y.a)(this,Object(O.a)(t).call(this,e))).setLight=function(e,t){return new Promise(function(a){n.timeTick(e,t),setTimeout(function(){a({color:e,time:t})},1e3*t)})},n.timeTick=function(e,t){var a=t,r=setInterval(function(){0!=a?(console.log("Traffic light: ".concat(e," == ").concat(a,"s")),n.setStyle(e,a--)):clearInterval(r)},1e3)},n.setStyle=function(e,t){(t+="")/10<1&&(t="0"+t);var a=n.state,r=a.red,o=a.yellow,s=a.green;r="",o="",s="","red"===e?r=t:"yellow"===e?o=t:s=t,n.setState({red:r,yellow:o,green:s})},n.TrafficLight=function(){n.setLight("red",pe.red).then(function(e){return n.setLight("yellow",pe.yellow)}).then(function(e){return n.setLight("green",pe.green)}).then(function(e){n.TrafficLight()})},n.getStyle=function(e){return e?{opacity:1}:{opacity:.5}},n.state={red:"",yellow:"",green:""},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"componentDidMount",value:function(){this.TrafficLight()}},{key:"sendRequest",value:function(){for(var e=0;e<3;e++)x.getUserList().then(function(e){console.log("=== i === ",e)})}},{key:"render",value:function(){return r.a.createElement("div",{className:"traffic-wrap"},r.a.createElement("div",{className:"traffic-light"},r.a.createElement("div",{className:"red-light",style:this.getStyle(this.state.red)},this.state.red),r.a.createElement("div",{className:"yellow-light",style:this.getStyle(this.state.yellow)},this.state.yellow),r.a.createElement("div",{className:"green-light",style:this.getStyle(this.state.green)},this.state.green)),r.a.createElement("div",{className:"hoz-line"}),r.a.createElement("div",{className:"vet-line"}))}}]),t}(n.Component),me=ae.a.TabPane;function he(e){console.log(e)}var fe={header:{padding:"0 12px",background:"#fff"},row:{margin:"0",padding:"0",background:"#fff",borderBottom:"1px solid #e8e8e8"},content:{padding:"0 50px",minHeight:"calc(100vh - 52.5px )"},tabs:{background:"#fff",minHeight:"calc(100vh - 52.5px)"},tabPane:{padding:"20px",background:"none"}},ge=function(e){function t(e,a){var n;return Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e)),console.log("...props: ",n.props),n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement(se,null,r.a.createElement(ae.a,{defaultActiveKey:"1",onChange:he,style:fe.tabs},r.a.createElement(me,{style:fe.tabPane,tab:"\u70ed\u95e8",key:"1"},r.a.createElement(ue,this.props)),r.a.createElement(me,{style:fe.tabPane,tab:"\u7cbe\u9009",key:"2"},r.a.createElement(ie,this.props)),r.a.createElement(me,{style:fe.tabPane,tab:"\u9644\u8fd1",key:"3"},r.a.createElement(de,this.props))))}}]),t}(n.Component),Ee=W.a.Header,be=W.a.Content,ve={header:{padding:0,background:"#fff",textAlign:"center"},headerBar:{fontWeight:"bold",fontSize:"16px",color:"rgba(0, 0, 0, 0.85)"},content:{padding:"0 50px",minHeight:"calc(100vh - 66px - 52.5px )"},loading:{position:"absolute",left:"50%",top:"50%",margin:"-18.5px -16px"}},ye=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"onNav",value:function(e){var t=this.props.history;console.log("jyjin ",this.props);var a={pathname:e,state:{fromDashboard:!0}};t.push(a)}},{key:"render",value:function(){return localStorage.getItem("ANF_TOKEN")||""||this.onNav("login"),this.props.loading?r.a.createElement("div",{style:ve.loading},r.a.createElement(q.a,{size:"large"})):(this.props.user._id||this.onNav("login"),r.a.createElement(W.a,null,r.a.createElement(Ee,{theme:"light",style:ve.header},r.a.createElement("div",{style:ve.headerBar},"\u53d1\u73b0")),r.a.createElement(be,{style:ve.content},this.props.children),r.a.createElement(Y,null)))}}]),t}(n.Component),Oe=U({token:"user",user:"user",loading:"user"},Object(K.e)(ye)),je=function(e){function t(e,a){var n;return Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e)),console.log("...props: ",n.props),n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement(Oe,null,r.a.createElement("div",{style:{padding:"20px 0"}},"\u6211\u60f3\u5728\u8fd9\u505a\u4e2a\u76c6\u53cb\u5708"))}}]),t}(n.Component),Ne=(a(440),a(200)),Se=(a(446),a(199)),ke=W.a.Header,Ae=W.a.Content,Ie={header:{padding:0,background:"#fff",textAlign:"center"},headerBar:{fontWeight:"bold",fontSize:"16px",color:"rgba(0, 0, 0, 0.85)"},content:{padding:"0",minHeight:"calc(100vh - 66px - 52.5px )"},icon:{fontSize:"20px",color:"#25b864",padding:"5px",cursor:"pointer"},loading:{position:"absolute",left:"50%",top:"50%",margin:"-18.5px -16px"}},Te=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"onNav",value:function(e){var t=this.props.history;console.log("jyjin ",this.props);var a={pathname:e,state:{fromDashboard:!0}};t.push(a)}},{key:"render",value:function(){return localStorage.getItem("ANF_TOKEN")||""||this.onNav("login"),this.props.loading?r.a.createElement("div",{style:Ie.loading},r.a.createElement(q.a,{size:"large"})):(this.props.user._id||this.onNav("login"),r.a.createElement(W.a,null,r.a.createElement(ke,{theme:"light",style:Ie.header},r.a.createElement("div",{style:Ie.headerBar},"\u4e2a\u4eba\u4e2d\u5fc3")),r.a.createElement(Ae,{style:Ie.content},this.props.children),r.a.createElement(Y,null)))}}]),t}(n.Component),xe=U({token:"user",user:"user",loading:"user"},Object(K.e)(Te)),Ce=function(e){function t(e,a){var n;return Object(b.a)(this,t),(n=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"onNav",value:function(e){var t={pathname:e,state:{fromDashboard:!0}};this.props.history.push(t)}},{key:"render",value:function(){var e=this;console.log("=== user: ",this.props.user);var t=this.props.user,a=[];return a.push("\u7528\u6237\u540d\uff1a"+(t.username||"")),a.push("\u624b\u673a\u53f7\u7801\uff1a"+(t.phone||"")),a.push("\u90ae\u7bb1\uff1a"+(t.email||"")),a.push("\u6027\u522b\uff1a"+(t.gender||"")),r.a.createElement("div",null,r.a.createElement(le.a,{style:{width:"100%",background:"#fff",marginTop:"0px",borderRadius:"0"},bordered:!0,dataSource:a,renderItem:function(e){return r.a.createElement(le.a.Item,null,e)}}),r.a.createElement(N.a,{type:"primary",style:{marginTop:"24px",width:"100%"},onClick:function(){localStorage.removeItem("ANF_TOKEN"),e.onNav("/")}},"\u9000\u51fa\u767b\u5f55"))}}]),t}(n.Component),_e=Object(K.e)(Ce),we=function(e){function t(e,a){var n;return Object(b.a)(this,t),(n=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(le.a,{style:{width:"100%",background:"#fff",marginTop:"0px",borderRadius:"0"},bordered:!0,dataSource:["\u6682\u65e0\u6570\u636e"],renderItem:function(e){return r.a.createElement(le.a.Item,null,e)}}))}}]),t}(n.Component),De=function(e){function t(e,a){var n;return Object(b.a)(this,t),(n=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(le.a,{style:{width:"100%",background:"#fff",marginTop:"0px",borderRadius:"0"},bordered:!0,dataSource:["\u6682\u65e0\u6570\u636e"],renderItem:function(e){return r.a.createElement(le.a.Item,null,e)}}))}}]),t}(n.Component),Pe=[{key:"account",text:"\u8d26\u53f7"},{key:"collection",text:"\u6536\u85cf"},{key:"draft",text:"\u8349\u7a3f\u7bb1"}],Re=function(e){function t(e,a){var n;return Object(b.a)(this,t),(n=Object(y.a)(this,Object(O.a)(t).call(this,e))).handleClick=function(e){console.log("key == ",e),n.setState({key:e,visible:!0,title:Pe.find(function(t){return t.key===e}).text})},n.onClose=function(){n.setState({visible:!1})},n.state={title:"",visible:!1,child:null},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"navRoute",value:function(e){this.props.history.push({pathname:"/about",state:{fromDashboard:!0}})}},{key:"getChild",value:function(){var e=null;switch(this.state.key){case"account":e=r.a.createElement(_e,this.props);break;case"collection":e=r.a.createElement(we,this.props);break;case"draft":e=r.a.createElement(De,this.props);break;default:e=null}return e}},{key:"render",value:function(){var e=this;return r.a.createElement(xe,null,r.a.createElement(le.a,{style:{width:"100%",background:"#fff",marginTop:"10px",borderRadius:"0"},bordered:!0,dataSource:Pe,renderItem:function(t){return r.a.createElement(le.a.Item,{style:{display:"flex",justifyContent:"space-between",cursor:"pointer"},actions:[r.a.createElement(A.a,{type:"right",style:{padding:"5px 10px"}})],onClick:function(){e.handleClick(t.key)}},t.text)}}),r.a.createElement(Ne.a,{className:"user-drawer",title:r.a.createElement(Se.a,{onBack:function(){e.onClose()},title:this.state.title}),width:"100%",placement:"right",closable:!1,onClose:this.onClose,visible:this.state.visible},this.getChild()))}}]),t}(n.Component),Le=function(e){function t(){return Object(b.a)(this,t),Object(y.a)(this,Object(O.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{margin:"10px",marginLeft:"10px"}},"About")}}]),t}(n.Component),Ue=function(e){function t(e,a){var n;return Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e)),console.log("...props: ",n.props),n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{padding:"20px 0",textAlign:"center"}},r.a.createElement("h1",{style:{color:"#27b764"}},"404 Not Found"),r.a.createElement("div",{style:{color:"#ddd"}},"\u60a8\u8bbf\u95ee\u7684\u9875\u9762\u4f3c\u4e4e\u4e0d\u5b58\u5728\uff0c\u8bf7\u68c0\u67e5\u68c0\u67e5\u9875\u9762\u5730\u5740 ",r.a.createElement("code",{style:{textDecoration:"underline",color:"#27b764",cursor:"pointer"}},'"',window.location.origin+this.props.location.pathname,'"')))}}]),t}(n.Component),He=a(49),Fe=a(198),Me=Object(K.e)(function(e){var t=e.component,a=Object(Fe.a)(e,["component"]);return r.a.createElement(K.a,Object.assign({},a,{render:function(e){return console.log("...props of app and Route: ",a),console.log("...props of routeProps: ",e),function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),n=1;n<t;n++)a[n-1]=arguments[n];var o=Object.assign.apply(Object,[{}].concat(a));return r.a.createElement(e,o)}(t,e,a)}}))}),Ge=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(O.a)(t).call(this,e))).state={},a}return Object(j.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return console.log("...props of app custom: ",this.props),r.a.createElement(He.a,null,r.a.createElement(K.c,null,r.a.createElement(Me,Object.assign({},this.props,{exact:!0,path:"/login",component:w})),r.a.createElement(Me,Object.assign({},this.props,{exact:!0,path:"/register",component:G})),r.a.createElement(Me,Object.assign({},this.props,{exact:!0,path:"/",component:te})),r.a.createElement(Me,Object.assign({},this.props,{exact:!0,path:"/ani",component:ge})),r.a.createElement(Me,Object.assign({},this.props,{exact:!0,path:"/find",component:je})),r.a.createElement(Me,Object.assign({},this.props,{exact:!0,path:"/user",component:Re})),r.a.createElement(Me,Object.assign({},this.props,{path:"/about",component:Le})),r.a.createElement(Me,Object.assign({},this.props,{component:Ue}))))}}]),t}(n.Component),Be=a(74),qe={ADD:"\u6dfb\u52a0\u6210\u529f",REMOVE:"\u5220\u9664\u6210\u529f",MODIFY:"\u4fee\u6539\u6210\u529f",QUERY:"\u67e5\u8be2\u6210\u529f",SAVE:"\u4fdd\u5b58\u6210\u529f",UPLOAD:"\u4e0a\u4f20\u6210\u529f",DOWNLOAD:"Download\u6210\u529f"},We={ADD:"\u6dfb\u52a0\u5931\u8d25",REMOVE:"\u5220\u9664\u5931\u8d25",MODIFY:"\u4fee\u6539\u5931\u8d25",QUERY:"\u67e5\u8be2\u5931\u8d25",SAVE:"\u4fdd\u5b58\u5931\u8d25",UPLOAD:"\u4e0a\u4f20\u5931\u8d25",DOWNLOAD:"\u4e0b\u8f7d\u5931\u8d25"},Ke={SUCCESS:Object(Be.a)({},qe,{TO:qe}),FAILED:Object(Be.a)({},We,{TO:We}),APP_NAME:"AniFirst",ACCOUNT:"\u8d26\u53f7",PASSWORD:"\u5bc6\u7801",REMEMBER_ME:"\u4e0b\u6b21\u81ea\u52a8\u767b\u5f55",FORGET_PASSWORD:"\u5fd8\u8bb0\u5bc6\u7801",LOGIN_IN:"\u767b\u5f55",REGISTER:"\u65b0\u7528\u6237\u6ce8\u518c",EMAIL:"\u90ae\u7bb1",CONFIRM_PASSWORD:"\u786e\u8ba4\u5bc6\u7801",NICKNAME:"\u6635\u79f0",ADDRESS:"\u5e38\u4f4f\u5730\u5740",PHONE:"\u624b\u673a\u53f7",WEBSITE:"\u4e2a\u4eba\u7f51\u7ad9",CAPTCHA:"\u9a8c\u8bc1\u7801",I_HAVE_READ:"\u6211\u5df2\u9605\u8bfb",AGREEMENT:"\u534f\u8bae",INPUT_EAMAIL:"\u8bf7\u8f93\u5165\u90ae\u7bb1",INPUT_PASSWORD:"\u8bf7\u8f93\u5165\u5bc6\u7801",INPUT_CONFIRM_PASSWORD:"\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801",INPUT_PHONE:"\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801",INPUT_NICKNAME:"\u8bf7\u8f93\u5165\u6635\u79f0",SELECT_ADDRESS:"\u8bf7\u9009\u62e9\u5e38\u4f4f\u5730\u5740",INPUT_CAPTCHA:"\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",INPUT_WEBSITE:"\u8bf7\u586b\u5199\u4e2a\u4eba\u7f51\u7ad9\u5730\u5740",EXTRA_CAPTCHA:"\u6211\u4eec\u5fc5\u987b\u786e\u8ba4\u60a8\u662f\u672c\u4eba",GET_CAPTCHA:"\u83b7\u53d6\u9a8c\u8bc1\u7801",HAVE_ACCOUNT:"\u5df2\u6709\u8d26\u53f7\uff0c\u76f4\u63a5",HOME:"\u4e3b\u9875",ABOUT:"\u5173\u4e8e",QUIT:"\u9000\u51fa",ZH:"\u4e2d\u6587",EN:"EN",SEND:"\u53d1\u9001",SIGN_TITLE:"\u6b22\u8fce\u4f7f\u7528",SIGN_IN:"\u5f00\u59cb\u7834\u5427",CLEAR:"\u6e05\u7a7a",CONTROL:"\u63a7\u5236\u5668",DO_SUCCESS:"\u64cd\u4f5c\u6210\u529f",DESC:"\u53e4\u91d1\uff0c\u8bf7\u7ee7\u7eed\u5b8c\u5584\u6211\u5427\uff0c\u52a0\u6cb9\uff01"},Ve={ADD:"Add success",REMOVE:"Remove success",MODIFY:"Modify success",QUERY:"Query success",SAVE:"Save success",UPLOAD:"Upload success",DOWNLOAD:"Download success"},ze={ADD:"Add failed",REMOVE:"Remove failed",MODIFY:"Modify failed",QUERY:"Query failed",SAVE:"Save failed",UPLOAD:"Upload failed",DOWNLOAD:"download failed"},Qe={SUCCESS:Object(Be.a)({},Ve,{TO:Ve}),FAILED:Object(Be.a)({},ze,{TO:ze}),QUIT:"Quit",ZH:"\u4e2d\u6587",EN:"EN",APP_NAME:"Ani-First",SEND:"Send",SIGN_TITLE:"Sign in",SIGN_IN:"Sign in for Ani-First",ACCOUNT:"Account",PASSWORD:"Password",CLEAR:"Clear",CONTROL:"Control",HOME:"Home",ABOUT:"About",DO_SUCCESS:"do success"},Ye=a(1),Je=a.n(Ye),Ze=function(e){function t(e,a){var n;Object(b.a)(this,t),n=Object(y.a)(this,Object(O.a)(t).call(this,e,a));var r=localStorage.getItem("LOCAL")||"cn";return n.state={local:r,appInfo:{version:"0.0.1",title:"Ani First",subTitle:"\u72d7\u72d7\u662f\u7f8e\u597d\u5bb6\u5ead\u7684\u7075\u9b42\uff0c\u732b\u54aa\u662f\u72ec\u8eab\u7684\u5b8c\u7f8e\u966a\u4f34",author:"jyjin",design:"jyjin",createAt:"2019-3-20"}},n}return Object(j.a)(t,e),Object(v.a)(t,[{key:"getChildContext",value:function(){var e=this.state;return{local:e.local,appInfo:e.appInfo}}},{key:"componentDidMount",value:function(){this.authByToken()}},{key:"authByToken",value:function(){var e=this,t=localStorage.getItem("ANF_TOKEN")||"";t&&(this.props.dispatch(p.TOKEN_SIGN_IN_LOADING,{loading:!0}),x.authByToken({token:t}).then(function(t){t.res>0?e.props.dispatch(p.TOKEN_SIGN_IN,{user:t.data.user,loading:!1}):(e.props.dispatch(p.TOKEN_SIGN_IN,{user:null,loading:!1}),e.info("\u8eab\u4efd\u5df2\u8fc7\u671f\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55"))}))}},{key:"info",value:function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return(e=E.a.info).call.apply(e,[E.a].concat(a))}},{key:"success",value:function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return(e=E.a.success).call.apply(e,[E.a].concat(a))}},{key:"error",value:function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return(e=E.a.error).call.apply(e,[E.a].concat(a))}},{key:"warn",value:function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return(e=E.a.warn).call.apply(e,[E.a].concat(a))}},{key:"warning",value:function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return(e=E.a.warning).call.apply(e,[E.a].concat(a))}},{key:"loading",value:function(){for(var e,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return(e=E.a.loading).call.apply(e,[E.a].concat(a))}},{key:"render",value:function(){return console.log("render app ..."),r.a.createElement(Ge,Object.assign({},this.props,this.state,{i18n:(e=this.state.local,"cn"===e?Ke:"en"===e?Qe:Ke),info:this.info.bind(this),success:this.success.bind(this),error:this.error.bind(this),warn:this.warn.bind(this),warning:this.warning.bind(this),loading:this.loading.bind(this)}));var e}}]),t}(n.Component);Ze.childContextTypes={local:Je.a.string,appInfo:Je.a.object};var Xe=U({token:"user",user:"user"},Ze);s.a.render(r.a.createElement(i.a,{store:g},r.a.createElement(Xe,null)),document.getElementById("root"))}},[[202,1,2]]]);
//# sourceMappingURL=main.2e612327.chunk.js.map