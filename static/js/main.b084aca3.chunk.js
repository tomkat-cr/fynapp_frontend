(this.webpackJsonpfynapp_frontend=this.webpackJsonpfynapp_frontend||[]).push([[0],{252:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(35),s=n.n(a),o=n(5),l=n(6),c=n(10),u=n(11),d=n(260),h=n(264),m=n(261),p=n(266),b=n(262),f=n(7);function j(e){!0===function(){"undefined"===typeof window.fynapp_local_debug&&(Object({NODE_ENV:"production",PUBLIC_URL:"/fynapp_frontend",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_DEBUG:"0",REACT_APP_API_URL:"https://fynapp-staging-tomkat-cr.vercel.app"}).hasOwnProperty("REACT_APP_DEBUG"),window.fynapp_local_debug=!1);return window.fynapp_local_debug}()&&console.log(e)}var v="token is invalid",y="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==",O="Wait...",A="create",g="read",x="update",w="delete",k="list",_="Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.",C="Create",E="Update",S="Delete",D="Cancel",N="Select an option...",U=new(n(263).a)(JSON.parse(localStorage.getItem("currentUser"))),F={login:function(e,t){var n={method:"POST",headers:{Authorization:"Basic "+btoa(e+":"+t)}},r=new R({url:"users"});return fetch("".concat("https://fynapp-staging-tomkat-cr.vercel.app","/users/login"),n).then(P,T).then((function(e){if(e.error)return Promise.reject(e.message);var t={id:r.convertId(e.resultset._id),username:e.resultset.username,email:e.resultset.email,firstName:e.resultset.firstname,lastName:e.resultset.lastname,token:e.resultset.token};return localStorage.setItem("currentUser",JSON.stringify(t)),U.next(t),t}))},logout:function(){localStorage.removeItem("currentUser"),U.next(null)},currentUser:U.asObservable(),get currentUserValue(){return U.value}};function P(e){return e.text().then((function(t){if(!function(e){try{JSON.parse(e)}catch(t){return!1}return!0}(t))return Promise.reject(t);var n=t&&JSON.parse(t);if(!e.ok){-1!==[401,403].indexOf(e.status)&&(F.logout(),window.location.reload(!0));var r=n&&n.message||e.statusText;return Promise.reject(r)}return"undefined"==typeof n.error&&(n.error=!1),"undefined"!=typeof n.error_message&&(n.message=n.error_message),"undefined"!=typeof n.resultset&&"object"!=typeof n.resultset&&(n.resultset=JSON.parse(n.resultset)),n}))}function T(e){return{error:!0,message:"Connection failure",reason:e}}var R=function(){function e(t){Object(o.a)(this,e),this.props=null,this.apiUrl="https://fynapp-staging-tomkat-cr.vercel.app",this.props=t,this.props.authHeader=function(){var e=F.currentUserValue;return e&&e.token?{"x-access-tokens":e.token}:{}}(),this.props.authAndJsonHeader=Object.assign({},{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},this.props.authHeader)}return Object(l.a)(e,[{key:"paramsToUrlQuery",value:function(e){var t="";return Object.entries(e).map((function(e){var n=Object(f.a)(e,2),r=n[0],i=n[1];return t+=(""===t?"?":"&")+r+"="+i})),t}},{key:"getAll",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t={method:"GET",headers:this.props.authHeader},n=this.paramsToUrlQuery(e),r=fetch("".concat(this.apiUrl,"/").concat(this.props.url).concat(n),t).then(P,T);return r}},{key:"getOne",value:function(e){var t={method:"GET",headers:this.props.authHeader},n=this.paramsToUrlQuery(e);return fetch("".concat(this.apiUrl,"/").concat(this.props.url).concat(n),t).then(P,T)}},{key:"createUpdateDelete",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];switch(e){case A:return this.createRow(n,r);case x:return this.updateRow(t,n,r);case w:return this.deleteRow(t,n,r);default:return T("Error CUD-1 - Invalid action: "+e)}}},{key:"createRow",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=this.paramsToUrlQuery(t),r={method:"POST",headers:this.props.authAndJsonHeader,body:JSON.stringify(e)},i=fetch("".concat(this.apiUrl,"/").concat(this.props.url).concat(n),r).then(P,T);return i}},{key:"updateRow",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=this.paramsToUrlQuery(n);null!==e&&(t.id=e);var i={method:"PUT",headers:this.props.authAndJsonHeader,body:JSON.stringify(t)},a=fetch("".concat(this.apiUrl,"/").concat(this.props.url).concat(r),i).then(P,T);return a}},{key:"deleteRow",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=this.paramsToUrlQuery(n);null!==e&&(r+=(""===r?"?":"&")+"id=".concat(e));var i={method:"DELETE",headers:this.props.authAndJsonHeader,body:JSON.stringify(t)};j("dbServices::deleteRow() - id: "+e),j("dbServices::deleteRow() - urlQuery: "+r),j("dbServices::deleteRow() - data:"),j(t),j("dbServices::deleteRow() - requestOptions:"),j(i);var a=fetch("".concat(this.apiUrl,"/").concat(this.props.url).concat(r),i).then(P,T);return a}},{key:"convertId",value:function(e){return null===e||""===e||"string"===typeof e?e:e.$oid}}]),e}();var I=n(15),M=[{title:"Kg",value:"kg"},{title:"Pounds",value:"lb"}],Q=[{title:"Meters",value:"m"},{title:"Inches",value:"i"}],H=n(265),K=n(21),q=n(49),B=n(259),J=n(73),G=n(138),W=n(50),V=n(1);G.a.library.add(W.e,W.c,W.b,W.f,W.a,W.d);var L=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var r;Object(o.a)(this,n),(r=t.call(this,e)).dbService=null,r.editor=null,r.componentSelectFieldsOptionsPromises=null,r.handleReadClick=function(e){var t=e.currentTarget.value;"undefined"===typeof t&&(t=e.target.value),"undefined"===typeof t?r.setNewError("ID not found..."):r.setNewAction(g,e.currentTarget.value)},r.handleNewClick=function(e){r.setNewAction(A,null)},r.handleEditClick=function(e){r.setNewAction(x,e.currentTarget.value)},r.handleDeleteClick=function(e){r.setNewAction(w,e.currentTarget.value)},r.handleSaveClick=function(e){r.setNewAction("save",e.currentTarget.value)},r.handleCancelClick=function(e){r.setNewAction(k,null)},r.editor=r.getEditorData(),r.editor.urlParams=ce(r.props);var i="undefined"===typeof r.editor.urlParams.id?null:r.editor.urlParams.id,a="undefined"===typeof r.editor.urlParams.action?k:r.editor.urlParams.action,s="";"undefined"==typeof r.editor.childComponents&&(r.editor.childComponents=[]),"undefined"==typeof r.editor.primaryKeyName&&(r.editor.primaryKeyName="id"),"undefined"==typeof r.editor.parentKeyNames&&(r.editor.parentKeyNames=[]),"undefined"==typeof r.editor.type&&(r.editor.type="master_listing"),"undefined"==typeof r.editor.subType&&(r.editor.subType="table"),"undefined"==typeof r.editor.array_name&&"array"===r.editor.subType&&(s='Missing "array_name" parameter. It must be specified for subType "array".');var l={};return"undefined"!==typeof r.props.parentData&&(l=r.props.parentData),r.setParentData(l),r.getComponentSelectFieldsOptions(r.editor.fieldElements),r.state=r.initialState({id:i,action:a,editor:r.editor,error:s}),r.dbService=new R({url:r.editor.dbApiUrl}),j("Constructor | "+r.editor.name+" |"),j("this.props:"),j(r.props),j("this.editor:"),j(r.editor),r}return Object(l.a)(n,[{key:"getEditorData",value:function(){return{}}},{key:"initialState",value:function(e){var t={currentUser:F.currentUserValue,id:e.id,action:e.action,editor:e.editor,error:(e.error,e.error),showModalPopUp:!0,listingDataset:null,currentRowDataset:null};return t}},{key:"getEditorFlags",value:function(e){var t=e.toString().toLowerCase(),n={};return n.isEdit=t===x||t===A,n.isCreate=t===A,n.isRead=t===g,n.isUpdate=t===x,n.isDelete=t===w,n}},{key:"getErrorMessage",value:function(e,t){return e&&e.error?e.message:t||(e===v?e:null)}},{key:"setNewError",value:function(e){this.setState({error:e},(function(){}))}},{key:"setNewAction",value:function(e,t){var n=this;this.setState({action:e,id:t},(function(){n.state.action!==A&&n.dbRetrieve(n.state)}))}},{key:"componentDidMount",value:function(){this.dbRetrieve(this.state)}},{key:"componentDidCatch",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"shouldComponentUpdate",value:function(e,t){return!(t===this.state)||!!t.error}},{key:"dbRetrieve",value:function(e){var t=this,n=this.state.editor;switch(e.action){case g:case x:case w:var r={};r[n.primaryKeyName]=e.id,r=Object.assign({},r,n.parentFilter),this.dbService.getOne(r).then((function(e){return t.setState({currentRowDataset:e})}),(function(e){return t.setState({error:e})}));break;case k:var i={};i=Object.assign({},i,n.parentFilter),this.dbService.getAll(i).then((function(e){return t.setState({listingDataset:e})}),(function(e){return t.setState({error:e})})),this.setState({currentRowDataset:null})}}},{key:"showWaitAnimation",value:function(){return Object(V.jsx)("div",{children:Object(V.jsx)("center",{children:Object(V.jsx)("img",{src:y,alt:O})})})}},{key:"render",value:function(){var e=this.state,t=e.action,n=e.currentRowDataset,r=e.listingDataset,i=e.error,a=this.getErrorMessage(t===k?r:n,i);if(a)return re(a);if(t!==k&&t!==A&&null===n)return this.showWaitAnimation();if(t===k&&(null===r||"undefined"===typeof r.resultset||!Array.isArray(r.resultset)))return this.showWaitAnimation();switch(t){case g:return this.readAction();case A:return this.newAction();case x:return this.updateAction();case w:return this.deleteAction();case k:return this.listAction()}}},{key:"newAction",value:function(){return this.editAction("New",A)}},{key:"readAction",value:function(){return this.editAction("View",g)}},{key:"updateAction",value:function(){return this.editAction("Edit",x)}},{key:"deleteAction",value:function(){return this.editAction(S,w)}},{key:"listAction",value:function(){var e=this,t=this.state,n=t.listingDataset,r=t.error,i=t.editor,a=this.getErrorMessage(n,r),s=1,o=null;return Object(V.jsxs)("div",{children:[Object(V.jsx)("h3",{children:i.title+" - Listing"}),a&&re(a),!a&&n&&Object(V.jsxs)(B.a,{striped:!0,bordered:!0,hover:!0,children:[Object(V.jsx)("thead",{children:Object(V.jsxs)("tr",{children:[Object(V.jsx)("th",{children:"#"},"#"),Object.entries(i.fieldElements).filter((function(e){var t=e[1];return"undefined"!==typeof t.listing&&!!t.listing})).map((function(e){var t=e[1];return Object(V.jsx)("th",{children:t.label},t.name)})),Object(V.jsx)("th",{colSpan:"2"}),Object(V.jsx)("td",{children:Object(V.jsx)("button",{className:"btn btn-primary",onClick:this.handleNewClick,children:Object(V.jsx)(J.a,{icon:"plus"})})},"CreateButton")]})}),Object(V.jsx)("tbody",{children:n.resultset.map((function(t){return(o="undefined"===typeof t._id?t[i.primaryKeyName]:e.dbService.convertId(t._id))&&Object(V.jsxs)("tr",{children:[Object(V.jsx)("td",{children:s++},"#"),Object.entries(i.fieldElements).filter((function(e){var t=e[1];return"undefined"!==typeof t.listing&&!!t.listing})).map((function(e){var n=e[1];return Object(V.jsx)("td",{children:X(n,t)},n.name)})),Object(V.jsx)("td",{children:Object(V.jsx)("button",{className:"btn btn-primary",onClick:e.handleReadClick,value:o,children:Object(V.jsx)(J.a,{icon:"eye"})})},"ReadButton"),Object(V.jsx)("td",{children:Object(V.jsx)("button",{className:"btn btn-primary",onClick:e.handleEditClick,value:o,children:Object(V.jsx)(J.a,{icon:"edit"})})},"EditButton"),Object(V.jsx)("td",{children:Object(V.jsx)("button",{className:"btn btn-primary",onClick:e.handleDeleteClick,value:o,children:Object(V.jsx)(J.a,{icon:"trash"})})},"DeleteButton")]},o)}))})]})]})}},{key:"editAction",value:function(e,t){var n=this.state.editor,r=this.getEditorFlags(t),i={resultset:this.getFieldElementsDbValues({})},a=null,s=null;return r.isCreate||(i=this.state.currentRowDataset,a=this.state.error,s=this.getErrorMessage(i,a)),Object(V.jsxs)("div",{children:[Object(V.jsx)("h3",{children:n.title+" - "+e}),s&&re(s),!s&&i&&this.editForm_Fornik_Final(t,i.resultset),!s&&i&&!r.isCreate&&this.iterateChildComponents(i.resultset)]})}},{key:"setShowModalWindow",value:function(e){this.setState({showModalPopUp:e})}},{key:"editForm_Fornik_Modal",value:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=this.state.editor;if("child_listing"!==i.type)return this.editForm_Fornik_Final(e,t,r);this.setShowModalWindow(!0);var a=function(){return n.setShowModalWindow(!1)},s=i.title+" Popup";return Object(V.jsx)(V.Fragment,{children:Object(V.jsxs)(H.a,{show:this.state.showModalPopUp,onHide:a,children:[Object(V.jsx)(H.a.Title,{children:s}),Object(V.jsxs)(H.a.Body,{children:[Object(V.jsx)("iframe",{style:{width:"100%",height:"400px"},title:s}),this.editForm_Fornik_Final(e,t,r="")]}),Object(V.jsx)(H.a.Footer,{children:Object(V.jsx)("button",{variant:"secondary",onClick:a,children:"Close"})})]})})}},{key:"editForm_Fornik_Final",value:function(e,t){var n=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=this.state.editor,a=this.getEditorFlags(e),s=this.getFieldElementsDbValues(t),o=s[i.primaryKeyName];a.isDelete&&(r=(r?"<br/>":"")+_);var l={};return this.componentSelectFieldsOptionsPromises.map((function(e){return e.promiseResult.then((function(t){j(">> componentSelectFieldsOptions["+e.name+"] | options_array = "),j(t),l[e.name]=t})),null})),j(">> componentSelectFieldsOptions"),j(l),Object(V.jsx)(K.d,{enableReinitialize:!0,initialValues:s,validationSchema:q.a().shape(this.getFieldElementsRequiredYupStype(a)),onSubmit:function(t,r){var i=r.setStatus,l=r.setSubmitting;i(),a.isCreate&&"undefined"!==typeof t.id&&delete t.id,n.saveRowToDatabase(e,o,t,s).then((function(e){e&&e.error?(l(!1),i(e)):n.setNewAction(k,null)}),(function(e){l(!1),i(e)}))},children:function(e){var t=e.errors,s=e.status,o=e.touched,c=e.isSubmitting;return Object(V.jsxs)(K.c,{children:[r&&Object(V.jsx)("div",{className:"alert alert-danger",children:r},"AlertMessageOnTop"),Object.entries(i.fieldElements).map((function(e){return $(e,l,a,t,o)})),Object(V.jsx)(B.a,{children:Object(V.jsx)("tbody",{children:Object(V.jsxs)("tr",{children:[!a.isRead&&Object(V.jsxs)("td",{align:"left",children:[Object(V.jsx)("button",{type:"submit",className:"btn btn-primary",disabled:c,children:a.isCreate?C:a.isDelete?S:E},"SubmitButton"),c&&Object(V.jsx)("img",{src:y,alt:O})]}),Object(V.jsx)("td",{align:"left",children:Object(V.jsx)("button",{type:"button",className:"btn btn-primary",disabled:c,onClick:n.handleCancelClick,children:D},"CancelButton")})]})})}),s&&Object(V.jsx)("div",{className:"alert alert-danger",children:s}),Object(V.jsx)("div",{})]})}})}},{key:"iterateChildComponents",value:function(e){var t=this.getFieldElementsDbValues(e),n=this.showChildComponents;return Object.entries(this.state.editor.childComponents).map((function(e){var r=e[1];return n(t,r)}))}},{key:"showChildComponents",value:function(e,t){return t.name,""}},{key:"saveRowToDatabase",value:function(e,t,n,r){var i=this.state.editor,a=n;return"child_listing"===i.type&&(t=null,a={},i.parentKeyNames.map((function(e){return a[e.parameterName]=i.parentData[e.parentElementName],null})),a[i.array_name]=n,a[i.array_name+"_old"]=r),this.dbService.createUpdateDelete(e,t,a)}},{key:"getFieldElementsListObj",value:function(){return Object.entries(this.state.editor.fieldElements).map((function(e){return e[1].name}))}},{key:"getComponentSelectFieldsOptions",value:function(e){this.componentSelectFieldsOptionsPromises=Object.entries(e).filter((function(e){var t=e[1];return"select_component"===t.type&&"undefined"!==typeof t.dataPopulator})).map((function(e){var t=e[1],n=new t.dataPopulator;return{name:t.name,promiseResult:n.getData().then((function(e){return e}))}}))}},{key:"getFieldElementsDbValues",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.state.editor,r={};"child_listing"!==n.type?r=Object.assign({},r,e):"array"===n.subType&&(r=Object.assign({},r,e[0]));var i=this.dbService,a=this.verifyElementExistence,s={};return Object.entries(n.fieldElements).map((function(e){var n=e[1];return"_id"===n.type?a(r,"_"+n.name)?s[n.name]=i.convertId(r["_"+n.name]):t&&(s[n.name]=0):a(r,n.name)?s[n.name]=r[n.name]:t&&(s[n.name]="number"===n.type?0:""),null})),s}},{key:"verifyElementExistence",value:function(e,t){return"undefined"!==typeof e[t]}},{key:"getFieldElementsRequiredYupStype",value:function(e){if(e.isDelete)return{};var t={};return Object.entries(this.state.editor.fieldElements).map((function(e){var n=e[1];return n.required&&(t[n.name]=q.b().required(n.label+" is required")),null})),t}},{key:"setParentData",value:function(e){var t={};this.editor.parentKeyNames.map((function(n){return t[n.parameterName]=e[n.parentElementName]})),this.editor.parentFilter=t,this.editor.parentData=e}}]),n}(i.a.Component),Y=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).editor=null,r.dbService=null,r.editor=r.getEditorData(),r.state=r.initialState(),r.dbService=new R({url:r.editor.dbApiUrl}),r}return Object(l.a)(n,[{key:"getEditorData",value:function(){return{}}},{key:"initialState",value:function(){return{db_rows:null,filter:"undefined"!==typeof this.props.filter?this.props.filter:null,show_description:"undefined"!==typeof this.props.show_description&&this.props.show_description,editor:this.editor}}},{key:"componentDidMount",value:function(){var e=this;this.dbService.getAll().then((function(t){e.setState({db_rows:t})})).catch((function(t){j(e.state.editor.title+"-Select | error object:"),j(t)}))}},{key:"render",value:function(){if(null===this.state.db_rows)return"";var e=[{_id:null,name:N}].concat(Object(I.a)(this.state.db_rows.resultset)),t=this.dbService,n=this.state,r=n.filter,i=n.show_description;return e.filter((function(e){return null===r||t.convertId(e._id)===r})).map((function(e){return i?e.name:Object(V.jsx)("option",{value:t.convertId(e._id),children:e.name},t.convertId(e._id))}))}}]),n}(i.a.Component),z=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(o.a)(this,e),this.editor=null,this.dbService=null,this.props=null,this.props=t,this.editor=this.getEditorData(),this.state=this.initialState(),this.dbService=new R({url:this.editor.dbApiUrl})}return Object(l.a)(e,[{key:"getEditorData",value:function(){return{}}},{key:"initialState",value:function(){return{db_rows:null,filter:"undefined"!==typeof this.props.filter?this.props.filter:null,editor:this.editor,title_field_name:"undefined"!==typeof this.props.title_field_name?this.props.show_description:"title",value_field_name:"undefined"!==typeof this.props.value_field_name?this.props.value_field_name:"value"}}},{key:"getData",value:function(){var e=this;return this.dbService.getAll().then((function(t){return e.state.db_rows=t,e.returnData()})).catch((function(t){return j(e.state.editor.title+"-Select | error object:"),j(t),!1}))}},{key:"returnData",value:function(){var e=this.dbService,t=this.state,n=t.filter,r=t.title_field_name,i=t.value_field_name,a=t.db_rows,s=[],o=0;return a.resultset.filter((function(t){return null===n||e.convertId(t._id)===n})).map((function(t){var n={};return n[r]=t.name,n[i]=e.convertId(t._id),s[o++]=n,null})),s}}]),e}();function Z(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"title",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"value",r={};r[t]=N,r[n]=null;var i=[r].concat(Object(I.a)(e));return i.map((function(e){return Object(V.jsx)("option",{value:e[n],children:e[t]},e[n])}))}function X(e,t){return"select_component"===e.type?Object(V.jsx)(e.component,{filter:t[e.name].toString(),show_description:!0}):"select"===e.type?e.select_elements.filter((function(n){return n.value===t[e.name].toString()})).map((function(e){return e.title})):t[e.name].toString()}function $(e,t,n,r,i){var a=e[1],s=!n.isEdit||"undefined"!==typeof a.readonly&&a.readonly;switch(a.type){case"select_component":var o=[];return"undefined"!==typeof a.dataPopulator&&"undefined"!==typeof t[a.name]&&(o=t[a.name]),Object(V.jsxs)("div",{className:"form-group",children:[Object(V.jsx)("label",{htmlFor:a.name,children:a.label}),Object(V.jsx)(K.b,{name:a.name,as:"select",disabled:s,className:"form-control"+(r[a.name]&&i[a.name]?" is-invalid":""),children:"undefined"!==typeof a.dataPopulator?Z(o):Object(V.jsx)(a.component,{})}),Object(V.jsx)(K.a,{name:a.name,component:"div",className:"invalid-feedback"})]},a.name);case"select":return Object(V.jsxs)("div",{className:"form-group",children:[Object(V.jsx)("label",{htmlFor:a.name,children:a.label}),Object(V.jsx)(K.b,{name:a.name,as:"select",disabled:s,className:"form-control"+(r[a.name]&&i[a.name]?" is-invalid":""),children:Z(a.select_elements)}),Object(V.jsx)(K.a,{name:a.name,component:"div",className:"invalid-feedback"})]},a.name);default:return Object(V.jsxs)("div",{className:"form-group",children:[Object(V.jsx)("label",{htmlFor:a.name,children:a.label}),Object(V.jsx)(K.b,{name:a.name,type:a.type,disabled:s,className:"form-control"+(r[a.name]&&i[a.name]?" is-invalid":"")},a.name),Object(V.jsx)(K.a,{name:a.name,component:"div",className:"invalid-feedback"})]},a.name)}}var ee=n(139);function te(){F.logout(),le.push("/login?redirect="+window.location.pathname)}function ne(){window.location.reload()}function re(e){return Object(V.jsxs)("div",{children:[ae(e),ie(e)]})}function ie(e){return e!==v?Object(V.jsx)("div",{}):Object(V.jsxs)("div",{children:[Object(V.jsx)("br",{}),Object(V.jsx)(ee.a,{onClick:te,children:"Click here to login again."})]})}function ae(e){return Object(V.jsxs)("div",{children:[se(e===v?"Session expired.":e),Object(V.jsx)("br",{}),Object(V.jsx)(ee.a,{onClick:ne,children:"Click here to retry"})]})}function se(e){return Object(V.jsx)("div",{className:"alert alert-danger",children:e})}var oe=n(38),le=Object(oe.a)();function ce(e){var t={};if(e.hasOwnProperty("location")){if(e.location.hasOwnProperty("search")&&""!==e.location.search){var n=e.location.search;"?"===n.substring(0,1)&&(n=e.location.search.slice(1));var r=n.split("&");Array.isArray(r)&&r.map((function(e){var n=e.split("=");return t[n[0]]="undefined"===typeof n[1]?"":n[1],null}))}}else e.hasOwnProperty("match")&&e.match.hasOwnProperty("params")&&(t=e.match.params);return t}var ue=n(2),de=n(3),he=["component"],me=function(e){var t=e.component,n=Object(de.a)(e,he);return Object(V.jsx)(d.b,Object(ue.a)(Object(ue.a)({},n),{},{render:function(e){return F.currentUserValue?Object(V.jsx)(t,Object(ue.a)({},e)):(j("PrivateRoute Not Authorized..."),Object(V.jsx)(d.a,{to:{pathname:"/login",state:{from:e.location}}}))}}))},pe=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).state={currentUser:F.currentUserValue,error:null},r}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state,t=e.currentUser,n=e.error;return Object(V.jsxs)("div",{children:[Object(V.jsxs)("h1",{children:["Hi ",t.firstName,"!"]}),n&&re(n)]})}}]),n}(i.a.Component);function be(){return{baseUrl:"food_moments",title:"Food Moments",name:"Food Moment",component:fe,dbApiUrl:"food_moments",fieldElements:[{name:"id",required:!0,label:"ID",type:"_id",readonly:!0},{name:"name",required:!0,label:"Name",type:"text",readonly:!1,listing:!0}]}}var fe=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getEditorData",value:function(){return be()}}]),n}(L),je=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getEditorData",value:function(){return be()}}]),n}(Y),ve=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getEditorData",value:function(){return be()}}]),n}(z);var ye=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getEditorData",value:function(){return{baseUrl:"food_times",title:"Food Times",name:"Food Time",component:ye,dbApiUrl:"users/user-food-times",type:"child_listing",subType:"array",array_name:"food_times",parentKeyNames:[{parameterName:"user_id",parentElementName:"id"}],primaryKeyName:"food_moment_id",fieldElements:[{name:"food_moment_id",label:"Type",required:!0,type:"select_component",dataPopulator:ve,component:je,listing:!0},{name:"food_time",required:!0,label:"Time",type:"text",readonly:!1,listing:!0}]}}}]),n}(L);var Oe=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getEditorData",value:function(){return{baseUrl:"user_history",title:"User History",name:"User History",component:Oe,dbApiUrl:"users/user-user-history",type:"child_listing",subType:"array",array_name:"user_history",parentKeyNames:[{parameterName:"user_id",parentElementName:"id"}],primaryKeyName:"date",fieldElements:[{name:"date",label:"Date",required:!0,type:"date",listing:!0},{name:"goals",required:!0,label:"Goals",type:"text",readonly:!1,listing:!0},{name:"weight",required:!0,label:"Weight",type:"number",readonly:!1,listing:!0},{name:"weight_unit",required:!0,label:"Weight Unit",type:"select",select_elements:M,readonly:!1,listing:!0}]}}}]),n}(L);function Ae(){return{baseUrl:"users",title:"Users",name:"User",component:ge,dbApiUrl:"users",fieldElements:[{name:"id",required:!0,label:"ID",type:"_id",readonly:!0},{name:"firstname",required:!0,label:"First Name",type:"text",readonly:!1,listing:!0},{name:"lastname",required:!0,label:"Last Name",type:"text",readonly:!1,listing:!0},{name:"email",required:!0,label:"Email",type:"email",readonly:!1,listing:!0},{name:"training_days",required:!0,label:"Training Days",type:"text",readonly:!1},{name:"training_hour",required:!0,label:"Training Hour",type:"text",readonly:!1},{name:"birthday",required:!0,label:"Birthday",type:"date",readonly:!1},{name:"height",required:!0,label:"Height",type:"number",readonly:!1,listing:!0},{name:"height_unit",required:!0,label:"Height Unit",type:"select",select_elements:Q,readonly:!1,listing:!0},{name:"weight",required:!0,label:"Weight",type:"number",readonly:!1},{name:"weight_unit",required:!0,label:"Weight Unit",type:"select",select_elements:M,readonly:!1},{name:"creation_date",required:!0,label:"Creation Date",type:"date",readonly:!1,hidden:!0,default_value:"current_timestamp",listing:!0}],childComponents:[{name:"UsersFoodTimes"},{name:"UsersUserHistory"}]}}var ge=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getEditorData",value:function(){return Ae()}},{key:"showChildComponents",value:function(e,t){switch(j("USERS showChildComponents | childElement.name: "+t.name),t.name){case"UsersFoodTimes":return Object(V.jsx)(ye,{parentData:e,childElementData:t},"UsersFoodTimes");case"UsersUserHistory":return Object(V.jsx)(Oe,{parentData:e,childElementData:t},"UsersUserHistory");default:return""}}}]),n}(L),xe=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).urlParams={},r.urlParams=ce(e),"undefined"===typeof r.urlParams.redirect&&(r.urlParams.redirect="/"),F.currentUserValue&&r.props.history.push(r.urlParams.redirect),r}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(V.jsxs)("div",{children:[Object(V.jsx)("div",{className:"alert alert-info",children:"FynApp"}),Object(V.jsx)("h2",{children:"Login"}),Object(V.jsx)(K.d,{initialValues:{username:"",password:""},validationSchema:q.a().shape({username:q.b().required("Username is required"),password:q.b().required("Password is required")}),onSubmit:function(t,n){var r=t.username,i=t.password,a=n.setStatus,s=n.setSubmitting;a(),F.login(r,i).then((function(t){var n=(e.props.location.state||{from:{pathname:e.urlParams.redirect}}).from;e.props.history.push(n)}),(function(e){s(!1),j(e),a(e)}))},children:function(e){var t=e.errors,n=e.status,r=e.touched,i=e.isSubmitting;return Object(V.jsxs)(K.c,{children:[Object(V.jsxs)("div",{className:"form-group",children:[Object(V.jsx)("label",{htmlFor:"username",children:"Username"}),Object(V.jsx)(K.b,{name:"username",type:"text",className:"form-control"+(t.username&&r.username?" is-invalid":"")}),Object(V.jsx)(K.a,{name:"username",component:"div",className:"invalid-feedback"})]}),Object(V.jsxs)("div",{className:"form-group",children:[Object(V.jsx)("label",{htmlFor:"password",children:"Password"}),Object(V.jsx)(K.b,{name:"password",type:"password",className:"form-control"+(t.password&&r.password?" is-invalid":"")}),Object(V.jsx)(K.a,{name:"password",component:"div",className:"invalid-feedback"})]}),Object(V.jsxs)("div",{className:"form-group",children:[Object(V.jsx)("button",{type:"submit",className:"btn btn-primary",disabled:i,children:"Login"}),i&&Object(V.jsx)("img",{src:y,alt:"Wait..."})]}),n&&Object(V.jsx)("div",{className:"alert alert-danger",children:n})]})}})]})}}]),n}(i.a.Component),we=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(o.a)(this,n),(r=t.call(this,e)).state={currentUser:null},r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;F.currentUser.subscribe((function(t){return e.setState({currentUser:t})}))}},{key:"logout",value:function(){F.logout(),le.push("/login")}},{key:"render",value:function(){var e=this.state.currentUser;return Object(V.jsxs)(d.c,{history:le,children:[Object(V.jsx)("div",{children:e&&Object(V.jsx)(h.a,{className:"navbar-dark bg-dark",expand:"lg",children:Object(V.jsxs)(m.a,{children:[Object(V.jsx)(h.a.Brand,{href:"/",children:"FynApp"}),Object(V.jsx)(h.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(V.jsx)(h.a.Collapse,{id:"basic-navbar-nav",children:Object(V.jsxs)(p.a,{className:"me-auto",children:[Object(V.jsx)(p.a.Link,{href:"/",children:"Home"}),Object(V.jsxs)(b.a,{title:"Admin",id:"basic-nav-dropdown",children:[_e(Ae()),_e(be())]})]})}),Object(V.jsxs)(h.a.Collapse,{id:"current-user-navbar-nav",className:"justify-content-end",children:[Object(V.jsx)(h.a.Text,{children:"Signed in as:"}),Object(V.jsxs)(b.a,{title:e.firstName,id:"basic-nav-dropdown",children:[Object(V.jsx)(b.a.Item,{href:"#profile",children:"Profile"}),Object(V.jsx)(b.a.Item,{href:"#preferences",children:"Preferences"}),Object(V.jsx)(b.a.Divider,{}),Object(V.jsx)(b.a.Item,{onClick:this.logout,children:"Logout"})]})]})]})})}),Object(V.jsx)("div",{children:Object(V.jsx)("div",{className:"jumbotron",children:Object(V.jsx)("div",{className:"container",children:Object(V.jsx)("div",{className:"row",children:Object(V.jsxs)("div",{className:"col-md-6",children:[Object(V.jsx)("div",{children:Object(V.jsx)(me,{exact:!0,path:"/",component:pe})}),Object(V.jsx)("div",{}),Object(V.jsx)("div",{children:Object(V.jsx)(d.b,{path:"/login",component:xe})}),ke(Ae()),ke(be())]})})})})})]})}}]),n}(i.a.Component);function ke(e){return Object(V.jsx)("div",{children:Object(V.jsx)(me,{exact:!0,path:"/"+e.baseUrl,component:e.component})})}function _e(e){return Object(V.jsx)("div",{children:Object(V.jsx)(b.a.Item,{href:"/"+e.baseUrl,children:e.title})})}var Ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,267)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),i(e),a(e),s(e)}))};s.a.render(Object(V.jsx)(i.a.StrictMode,{children:Object(V.jsx)(we,{})}),document.getElementById("root")),Ce()}},[[252,1,2]]]);
//# sourceMappingURL=main.b084aca3.chunk.js.map