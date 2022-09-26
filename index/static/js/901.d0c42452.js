"use strict";(self["webpackChunkregistration"]=self["webpackChunkregistration"]||[]).push([[901],{9367:function(e,t,l){l.d(t,{Z:function(){return p}});var d=l(3396),a=l(9242);const i={class:"fixed z-10 left-0 top-0 w-full h-full overflow-scroll bg-black bg-opacity-40"},n={class:"box-border w-inherit sm:w-sm bg-white relative mx-auto w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 my-12 p-5 sm:px-10 sm:py-5 rounded",style:{"min-height":"100px"}},s={class:"flex items-center"},o={class:"flex-grow"};function u(e,t,l,u,r,_){return(0,d.wg)(),(0,d.j4)(a.uT,{name:"modal"},{default:(0,d.w5)((()=>[(0,d._)("div",i,[(0,d._)("div",n,[(0,d._)("div",s,[(0,d._)("div",o,[(0,d.WI)(e.$slots,"title")]),(0,d._)("div",{class:"text-4xl text-gray-300 hover:text-gray-500 cursor-pointer duration-300 font-light",onClick:t[0]||(t[0]=(...t)=>e.closeModal&&e.closeModal(...t))},"×")]),(0,d.WI)(e.$slots,"content")])])])),_:3})}var r=(0,d.aZ)({setup(e,t){function l(){t.emit("close_modal")}return{closeModal:l}}}),_=l(89);const c=(0,_.Z)(r,[["render",u]]);var p=c},6901:function(e,t,l){l.r(t),l.d(t,{default:function(){return el}});var d=l(3396),a=l(7139),i=l(9242);const n=e=>((0,d.dD)("data-v-08a33f0f"),e=e(),(0,d.Cn)(),e),s={class:"mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2"},o={class:"box-section"},u={class:"box-section"},r=n((()=>(0,d._)("div",{class:"title"},"本單位選手列表",-1))),_=n((()=>(0,d._)("hr",null,null,-1))),c={class:"athlete-list"},p=n((()=>(0,d._)("th",{class:"w-[20%]"},"身分證字號",-1))),g=n((()=>(0,d._)("th",{class:"w-[20%]"},"學校/團體",-1))),h=n((()=>(0,d._)("th",{class:"w-[20%]"},"系所",-1))),m=n((()=>(0,d._)("th",{class:"w-[15%]"},"姓名",-1))),w=n((()=>(0,d._)("th",{class:"w-[10%]"},"性別",-1))),y={class:"w-[15%]"},b={class:"w-[20%] truncate max-w-0"},k={class:"w-[20%] truncate max-w-0"},v={class:"w-[15%] truncate max-w-0"},f={key:0},U={key:1},D=["onClick"],x={class:"box-section"},L=n((()=>(0,d._)("div",{class:"title"},"跨單位選手列表",-1))),V=n((()=>(0,d._)("hr",null,null,-1))),A={class:"athlete-list"},H=n((()=>(0,d._)("th",{class:"w-[20%]"},"身分證字號",-1))),q=n((()=>(0,d._)("th",{class:"w-[20%]"},"學校/團體",-1))),C=n((()=>(0,d._)("th",{class:"w-[20%]"},"系所",-1))),z=n((()=>(0,d._)("th",{class:"w-[15%]"},"姓名",-1))),E=n((()=>(0,d._)("th",{class:"w-[10%]"},"性別",-1))),M={class:"w-[15%]"},Y={class:"w-[20%] truncate max-w-0"},$={class:"w-[20%] truncate max-w-0"},G={class:"w-[15%] truncate max-w-0"},O={key:0},S={key:1},j=["onClick"],W={class:"text-2xl"},I={key:0},Z={key:1},N=n((()=>(0,d._)("hr",{class:"my-2"},null,-1)));function T(e,t,l,n,T,R){const P=(0,d.up)("AddAthlete"),J=(0,d.up)("EditAthlete"),F=(0,d.up)("SmallModal");return(0,d.wg)(),(0,d.iD)(d.HY,null,[(0,d._)("div",s,[(0,d._)("div",o,[(0,d._)("div",{class:"text-xl text-gray-400 cursor-pointer",onClick:t[0]||(t[0]=t=>e.$router.go(-1))},"回上頁")]),(0,d._)("div",u,[r,_,(0,d._)("table",c,[(0,d._)("tr",null,[p,g,h,m,w,(0,d._)("th",y,[(0,d._)("button",{class:"button",onClick:t[1]||(t[1]=t=>e.displayModal=1)},"新增")])]),((0,d.wg)(!0),(0,d.iD)(d.HY,null,(0,d.Ko)(e.athleteList.home,((t,l)=>((0,d.wg)(),(0,d.iD)("tr",{key:l},[(0,d._)("td",null,(0,a.zw)(t.unified_id),1),(0,d._)("td",b,(0,a.zw)(t.org_ch),1),(0,d._)("td",k,(0,a.zw)(t.dept_ch),1),(0,d._)("td",v,(0,a.zw)(t.name),1),(0,d._)("td",null,[1==t.sex?((0,d.wg)(),(0,d.iD)("span",f,"男")):(0,d.kq)("",!0),2==t.sex?((0,d.wg)(),(0,d.iD)("span",U,"女")):(0,d.kq)("",!0)]),(0,d._)("td",null,[(0,d._)("button",{class:"button",onClick:l=>e.editAthlete(t)},"顯示",8,D)])])))),128))])]),(0,d._)("div",x,[L,V,(0,d._)("table",A,[(0,d._)("tr",null,[H,q,C,z,E,(0,d._)("th",M,[(0,d._)("button",{class:"button",onClick:t[2]||(t[2]=t=>e.displayModal=1)},"新增")])]),((0,d.wg)(!0),(0,d.iD)(d.HY,null,(0,d.Ko)(e.athleteList.other,((t,l)=>((0,d.wg)(),(0,d.iD)("tr",{key:l},[(0,d._)("td",null,(0,a.zw)(t.unified_id),1),(0,d._)("td",Y,(0,a.zw)(t.org_ch),1),(0,d._)("td",$,(0,a.zw)(t.dept_ch),1),(0,d._)("td",G,(0,a.zw)(t.name),1),(0,d._)("td",null,[1==t.sex?((0,d.wg)(),(0,d.iD)("span",O,"男")):(0,d.kq)("",!0),2==t.sex?((0,d.wg)(),(0,d.iD)("span",S,"女")):(0,d.kq)("",!0)]),(0,d._)("td",null,[(0,d._)("button",{class:"button",onClick:l=>e.editAthlete(t,"lookup")},"顯示",8,j)])])))),128))])])]),(0,d.wy)((0,d.Wm)(F,{onClose_modal:t[5]||(t[5]=t=>e.displayModal=0)},{title:(0,d.w5)((()=>[(0,d._)("div",W,[1==e.displayModal?((0,d.wg)(),(0,d.iD)("div",I,"新增選手")):(0,d.kq)("",!0),2==e.displayModal?((0,d.wg)(),(0,d.iD)("div",Z,"選手資訊")):(0,d.kq)("",!0)])])),content:(0,d.w5)((()=>[N,1==e.displayModal?((0,d.wg)(),(0,d.j4)(P,{key:0,onClose_modal:t[3]||(t[3]=t=>e.displayModal=0),onRefresh:e.getAthleteList},null,8,["onRefresh"])):(0,d.kq)("",!0),2==e.displayModal?((0,d.wg)(),(0,d.j4)(J,{key:1,"edit-type":e.editType,onClose_modal:t[4]||(t[4]=t=>e.displayModal=0),onRefresh:e.getAthleteList,"athlete-data":e.selected},null,8,["edit-type","onRefresh","athlete-data"])):(0,d.kq)("",!0)])),_:1},512),[[i.F8,e.displayModal>0]])],64)}var R=l(4870),P=l(9367),J=l(3927);const F=e=>((0,d.dD)("data-v-427c9ed0"),e=e(),(0,d.Cn)(),e),K={class:"athlete-table"},B=F((()=>(0,d._)("td",{class:"w-[20%]"},"身分證字號*",-1))),Q={class:"w-[80%]"},X={key:0,class:"warning"},ee=F((()=>(0,d._)("td",null,"姓名*",-1))),te=F((()=>(0,d._)("td",null,"性別*",-1))),le=F((()=>(0,d._)("option",{value:"1"},"生理男",-1))),de=F((()=>(0,d._)("option",{value:"2"},"生理女",-1))),ae=[le,de],ie=F((()=>(0,d._)("td",null,[(0,d.Uk)("是否為大專"),(0,d._)("br"),(0,d.Uk)("院校學生*")],-1))),ne=["disabled"],se=F((()=>(0,d._)("span",null,"是",-1))),oe=["disabled"],ue=F((()=>(0,d._)("span",null,"否",-1))),re=F((()=>(0,d._)("td",null,"學校*",-1))),_e=(0,d.Uk)("找不到 "),ce=(0,d.Uk)("。"),pe={key:1,class:"opacity-50"},ge=F((()=>(0,d._)("td",null,"系所",-1))),he={key:0},me=(0,d.Uk)("找不到 "),we=(0,d.Uk)("。 "),ye={key:1,class:"opacity-50"},be={key:2,class:"opacity-50"},ke={key:1},ve=F((()=>(0,d._)("td",null,"團體*",-1))),fe=(0,d.Uk)("找不到 "),Ue=(0,d.Uk)("。"),De={key:1,class:"opacity-50"},xe=F((()=>(0,d._)("td",null,"身份*",-1))),Le=F((()=>(0,d._)("option",{value:"0"},"隊員",-1))),Ve=F((()=>(0,d._)("option",{value:"1"},"隊長",-1))),Ae=[Le,Ve],He={key:2},qe=F((()=>(0,d._)("td",null,"學號",-1))),Ce=F((()=>(0,d._)("td",null,"生日*",-1))),ze=F((()=>(0,d._)("td",null,"手機",-1))),Ee={class:"text-right"};function Me(e,t,l,n,s,o){const u=(0,d.up)("v-select");return(0,d.wg)(),(0,d.iD)("div",null,[(0,d._)("table",K,[(0,d._)("tr",null,[B,(0,d._)("td",Q,[(0,d.wy)((0,d._)("input",{type:"text",maxlength:"10","onUpdate:modelValue":t[0]||(t[0]=t=>e.data.unified_id=t),onBlur:t[1]||(t[1]=(...t)=>e.exist&&e.exist(...t))},null,544),[[i.nr,e.data.unified_id]]),e.data.unified_id.length>0&&!e.errorList.unified_id.unique?((0,d.wg)(),(0,d.iD)("div",X,"身分證字號已存在")):(0,d.kq)("",!0)])]),(0,d._)("tr",null,[ee,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=t=>e.data.name=t)},null,512),[[i.nr,e.data.name]])])]),(0,d._)("tr",null,[te,(0,d._)("td",null,[(0,d.wy)((0,d._)("select",{"onUpdate:modelValue":t[3]||(t[3]=t=>e.data.sex=t)},ae,512),[[i.bM,e.data.sex]])])]),(0,d._)("tr",null,[ie,(0,d._)("td",null,[(0,d._)("label",null,[(0,d.wy)((0,d._)("input",{type:"radio",value:"1",disabled:e.lockList.student,"onUpdate:modelValue":t[4]||(t[4]=t=>e.data.student=t),onChange:t[5]||(t[5]=t=>e.changeOrg(1))},null,40,ne),[[i.G2,e.data.student]]),se]),(0,d._)("label",null,[(0,d.wy)((0,d._)("input",{type:"radio",value:"0",disabled:e.lockList.student,"onUpdate:modelValue":t[6]||(t[6]=t=>e.data.student=t),onChange:t[7]||(t[7]=t=>e.changeOrg(0))},null,40,oe),[[i.G2,e.data.student]]),ue])])]),1==e.data.student?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[(0,d._)("tr",null,[re,(0,d._)("td",null,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.org_id,clearable:!1,options:e.univList,reduce:e=>e.univ_id,modelValue:e.data.org_id,"onUpdate:modelValue":t[8]||(t[8]=t=>e.data.org_id=t),onInput:e.resetSelect},{"no-options":(0,d.w5)((({search:e,searching:t})=>[t?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[_e,(0,d._)("em",null,(0,a.zw)(e),1),ce],64)):((0,d.wg)(),(0,d.iD)("div",pe,"請輸入或選擇學校"))])),_:1},8,["disabled","options","reduce","modelValue","onInput"])])]),(0,d._)("tr",null,[ge,(0,d._)("td",null,[e.deptList.length>0?((0,d.wg)(),(0,d.iD)("div",he,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.dept_id,clearable:!1,options:e.deptList,reduce:e=>e.dept_id,modelValue:e.data.dept_id,"onUpdate:modelValue":t[9]||(t[9]=t=>e.data.dept_id=t),label:"label"},{"no-options":(0,d.w5)((({search:t,searching:l})=>[l?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[me,(0,d._)("em",null,(0,a.zw)(t),1),we],64)):e.data.org_id.length>0?((0,d.wg)(),(0,d.iD)("div",ye,"載入中")):((0,d.wg)(),(0,d.iD)("div",be,"請選擇學校"))])),_:1},8,["disabled","options","reduce","modelValue"])])):(0,d.kq)("",!0)])])],64)):((0,d.wg)(),(0,d.iD)("tr",ke,[ve,(0,d._)("td",null,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.org_id,clearable:!1,options:e.orgList,reduce:e=>e.org_id,modelValue:e.data.org_id,"onUpdate:modelValue":t[10]||(t[10]=t=>e.data.org_id=t),label:"name_ch_full"},{"no-options":(0,d.w5)((({search:e,searching:t})=>[t?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[fe,(0,d._)("em",null,(0,a.zw)(e),1),Ue],64)):((0,d.wg)(),(0,d.iD)("div",De,"請輸入或選擇團體"))])),_:1},8,["disabled","options","reduce","modelValue"])])])),(0,d._)("tr",null,[xe,(0,d._)("td",null,[(0,d.wy)((0,d._)("select",{"onUpdate:modelValue":t[11]||(t[11]=t=>e.data.role=t)},Ae,512),[[i.bM,e.data.role]])])]),1==e.data.student?((0,d.wg)(),(0,d.iD)("tr",He,[qe,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"text","onUpdate:modelValue":t[12]||(t[12]=t=>e.data.student_id=t)},null,512),[[i.nr,e.data.student_id]])])])):(0,d.kq)("",!0),(0,d._)("tr",null,[Ce,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"date","onUpdate:modelValue":t[13]||(t[13]=t=>e.data.birthday=t)},null,512),[[i.nr,e.data.birthday]])])]),(0,d._)("tr",null,[ze,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"text","onUpdate:modelValue":t[14]||(t[14]=t=>e.data.phone=t)},null,512),[[i.nr,e.data.phone]])])])]),(0,d._)("div",Ee,[(0,d._)("button",{class:"button",onClick:t[15]||(t[15]=(...t)=>e.submitAll&&e.submitAll(...t))},"新增")])])}var Ye=l(4226),$e=l.n(Ye),Ge=(0,d.aZ)({setup(e,t){const l=new J.L,a=new J._,i=(0,R.qj)({unified_id:"",name:"",org_id:"",dept_id:"",sex:1,student:1,student_id:"",birthday:"",phone:"",role:0,avatar:"",remark:"{}"}),n=(0,R.qj)({org_id:!1,dept_id:!1,student:!1}),s=(0,R.iH)([]);function o(){l.Url("organization/list").GetAll(s)}o();const u=(0,R.iH)([]);l.Url("univ-list").GetAll(u).then((()=>{for(let e=0;e<u.value.length;e++)u.value[e].label=`${u.value[e].univ_name_ch_full} (${u.value[e].univ_name_en})`}));const r=(0,R.iH)([]);function _(){r.value=[],l.Url(`dept-list/${i.org_id}`).Get().then((e=>{let t={};for(let l=0;l<e.length;l++)t=e[l],t.label=`[${e[l].college_ch}] ${e[l].dept_ch}`,r.value.push(t)}))}function c(){l.Url("auth/user/info").Get().then((e=>{i.org_id=e.org_id,i.dept_id="U"===e.org_id.substr(0,1)?e.dept_id:"","U"===e.org_id.substr(0,1)&&_(),2===e.permission?(n.org_id=!0,n.student=!0,i.student="U"===e.org_id.substr(0,1)?1:0):1===e.permission?(n.org_id=!0,n.dept_id=!0,n.student=!0,i.student="U"===e.org_id.substr(0,1)?1:0):(n.org_id=!1,n.dept_id=!1,n.student=!1)}))}c();const p=(0,R.qj)({unified_id:{filled:!1,unique:!0},name:{filled:!1},org_id:{filled:!1},birthday:{filled:!1}});function g(){l.Url(`athlete/exist/${i.unified_id}`).Get().then((e=>{!0===e.message?p.unified_id.unique=!1:p.unified_id.unique=!0}))}function h(){for(const t of Object.entries(p))for(const e of Object.entries(t[1]))if(!1===e[1])return void("filled"===e[0]?a.Alert("請確認所有欄位皆已填寫"):a.Alert("請確認輸入的內容"));const e=JSON.parse(JSON.stringify(i));l.Url("athlete/add").Post(e).then((e=>{"done"===e.message&&(a.Alert("新增成功"),t.emit("refresh"),t.emit("close_modal"),i.unified_id="",i.name="",i.dept_id="",i.student_id="",i.birthday="",i.phone="")}))}return(0,d.YP)(i,(()=>{p.unified_id.filled=i.unified_id.length>0,p.name.filled=i.name.length>0,p.org_id.filled=i.org_id.length>0,p.birthday.filled=i.birthday.length>0})),{orgList:s,univList:u,deptList:r,data:i,errorList:p,lockList:n,submitAll:h,exist:g,resetSelect:()=>{i.dept_id=""},changeOrg:e=>{1===e&&"U"!==i.org_id.substring(0,1)&&(i.org_id=""),0===e&&"U"===i.org_id.substring(0,1)&&(i.org_id="")}}},components:{"v-select":$e()}}),Oe=l(89);const Se=(0,Oe.Z)(Ge,[["render",Me],["__scopeId","data-v-427c9ed0"]]);var je=Se;const We=e=>((0,d.dD)("data-v-0caa31a6"),e=e(),(0,d.Cn)(),e),Ie=We((()=>(0,d._)("div",{class:"text-gray-400"},"系所管理員僅可編輯本系選手",-1))),Ze={class:"athlete-table"},Ne=We((()=>(0,d._)("td",{class:"w-[20%]"},"身分證字號",-1))),Te={class:"w-[80%]"},Re=We((()=>(0,d._)("td",null,"姓名*",-1))),Pe=["readonly"],Je=We((()=>(0,d._)("td",null,"性別*",-1))),Fe=["disabled"],Ke=We((()=>(0,d._)("option",{value:"1"},"生理男",-1))),Be=We((()=>(0,d._)("option",{value:"2"},"生理女",-1))),Qe=[Ke,Be],Xe=We((()=>(0,d._)("td",null,[(0,d.Uk)("是否為大專"),(0,d._)("br"),(0,d.Uk)("院校學生*")],-1))),et=["disabled"],tt=We((()=>(0,d._)("span",null,"是",-1))),lt=["disabled"],dt=We((()=>(0,d._)("span",null,"否",-1))),at=We((()=>(0,d._)("td",null,"主要學校*",-1))),it=(0,d.Uk)("找不到 "),nt=(0,d.Uk)("。"),st={key:1,class:"opacity-50"},ot=We((()=>(0,d._)("td",null,"主要系所",-1))),ut={key:0},rt=(0,d.Uk)("找不到 "),_t=(0,d.Uk)("。 "),ct={key:1,class:"opacity-50"},pt={key:2,class:"opacity-50"},gt={key:1},ht=We((()=>(0,d._)("td",null,"主要團體*",-1))),mt=(0,d.Uk)("找不到 "),wt=(0,d.Uk)("。"),yt={key:1,class:"opacity-50"},bt=We((()=>(0,d._)("td",null,"兼任學校",-1))),kt=(0,d.Uk)("找不到 "),vt=(0,d.Uk)("。"),ft={key:1,class:"opacity-50"},Ut=We((()=>(0,d._)("td",null,"兼任系所",-1))),Dt={key:0},xt=(0,d.Uk)("找不到 "),Lt=(0,d.Uk)("。 "),Vt={key:1,class:"opacity-50"},At={key:2,class:"opacity-50"},Ht={key:3},qt=We((()=>(0,d._)("td",null,"兼任團體",-1))),Ct=(0,d.Uk)("找不到 "),zt=(0,d.Uk)("。"),Et={key:1,class:"opacity-50"},Mt=We((()=>(0,d._)("td",null,"身份*",-1))),Yt=["disabled"],$t=We((()=>(0,d._)("option",{value:"0"},"隊員",-1))),Gt=We((()=>(0,d._)("option",{value:"1"},"隊長",-1))),Ot=[$t,Gt],St={key:4},jt=We((()=>(0,d._)("td",null,"學號",-1))),Wt=["readonly"],It=We((()=>(0,d._)("td",null,"生日*",-1))),Zt=["readonly"],Nt=We((()=>(0,d._)("td",null,"手機",-1))),Tt=["readonly"],Rt={key:0,class:"text-right"};function Pt(e,t,l,n,s,o){const u=(0,d.up)("v-select");return(0,d.wg)(),(0,d.iD)("div",null,[Ie,(0,d._)("table",Ze,[(0,d._)("tr",null,[Ne,(0,d._)("td",Te,(0,a.zw)(e.data.unified_id),1)]),(0,d._)("tr",null,[Re,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{readonly:!e.isEdit,type:"text","onUpdate:modelValue":t[0]||(t[0]=t=>e.data.name=t)},null,8,Pe),[[i.nr,e.data.name]])])]),(0,d._)("tr",null,[Je,(0,d._)("td",null,[(0,d.wy)((0,d._)("select",{disabled:!e.isEdit,"onUpdate:modelValue":t[1]||(t[1]=t=>e.data.sex=t)},Qe,8,Fe),[[i.bM,e.data.sex]])])]),(0,d._)("tr",null,[Xe,(0,d._)("td",null,[(0,d._)("label",null,[(0,d.wy)((0,d._)("input",{type:"radio",value:"1",disabled:e.lockList.student||!e.isEdit,"onUpdate:modelValue":t[2]||(t[2]=t=>e.data.student=t),onChange:t[3]||(t[3]=t=>e.changeOrg(1))},null,40,et),[[i.G2,e.data.student]]),tt]),(0,d._)("label",null,[(0,d.wy)((0,d._)("input",{type:"radio",value:"0",disabled:e.lockList.student||!e.isEdit,"onUpdate:modelValue":t[4]||(t[4]=t=>e.data.student=t),onChange:t[5]||(t[5]=t=>e.changeOrg(0))},null,40,lt),[[i.G2,e.data.student]]),dt])])]),1==e.data.student?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[(0,d._)("tr",null,[at,(0,d._)("td",null,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.org_id||!e.isEdit,clearable:!1,options:e.univList,reduce:e=>e.univ_id,modelValue:e.data.org_id,"onUpdate:modelValue":t[6]||(t[6]=t=>e.data.org_id=t),onInput:e.resetSelect},{"no-options":(0,d.w5)((({search:e,searching:t})=>[t?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[it,(0,d._)("em",null,(0,a.zw)(e),1),nt],64)):((0,d.wg)(),(0,d.iD)("div",st,"請輸入或選擇學校"))])),_:1},8,["disabled","options","reduce","modelValue","onInput"])])]),(0,d._)("tr",null,[ot,(0,d._)("td",null,[e.deptList.length>0?((0,d.wg)(),(0,d.iD)("div",ut,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.dept_id||!e.isEdit,clearable:!1,options:e.deptList,reduce:e=>e.dept_id,modelValue:e.data.dept_id,"onUpdate:modelValue":t[7]||(t[7]=t=>e.data.dept_id=t),label:"label"},{"no-options":(0,d.w5)((({search:t,searching:l})=>[l?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[rt,(0,d._)("em",null,(0,a.zw)(t),1),_t],64)):e.data.org_id.length>0?((0,d.wg)(),(0,d.iD)("div",ct,"載入中")):((0,d.wg)(),(0,d.iD)("div",pt,"請選擇學校"))])),_:1},8,["disabled","options","reduce","modelValue"])])):(0,d.kq)("",!0)])])],64)):((0,d.wg)(),(0,d.iD)("tr",gt,[ht,(0,d._)("td",null,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.org_id||!e.isEdit,clearable:!1,options:e.orgList,reduce:e=>e.org_id,modelValue:e.data.org_id,"onUpdate:modelValue":t[8]||(t[8]=t=>e.data.org_id=t),label:"name_ch_full"},{"no-options":(0,d.w5)((({search:e,searching:t})=>[t?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[mt,(0,d._)("em",null,(0,a.zw)(e),1),wt],64)):((0,d.wg)(),(0,d.iD)("div",yt,"請輸入或選擇團體"))])),_:1},8,["disabled","options","reduce","modelValue"])])])),1==e.data.student?((0,d.wg)(),(0,d.iD)(d.HY,{key:2},[(0,d._)("tr",null,[bt,(0,d._)("td",null,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.sec_org_id||!e.isEdit,clearable:!1,options:e.univList,reduce:e=>e.univ_id,modelValue:e.data.sec_org_id,"onUpdate:modelValue":t[9]||(t[9]=t=>e.data.sec_org_id=t),onInput:e.resetSelectSec},{"no-options":(0,d.w5)((({search:e,searching:t})=>[t?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[kt,(0,d._)("em",null,(0,a.zw)(e),1),vt],64)):((0,d.wg)(),(0,d.iD)("div",ft,"請輸入或選擇學校"))])),_:1},8,["disabled","options","reduce","modelValue","onInput"])])]),(0,d._)("tr",null,[Ut,(0,d._)("td",null,[e.deptList.length>0?((0,d.wg)(),(0,d.iD)("div",Dt,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.sec_dept_id||!e.isEdit,clearable:!1,options:e.deptList,reduce:e=>e.dept_id,modelValue:e.data.sec_dept_id,"onUpdate:modelValue":t[10]||(t[10]=t=>e.data.sec_dept_id=t),label:"label"},{"no-options":(0,d.w5)((({search:t,searching:l})=>[l?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[xt,(0,d._)("em",null,(0,a.zw)(t),1),Lt],64)):e.data.org_id.length>0?((0,d.wg)(),(0,d.iD)("div",Vt,"載入中")):((0,d.wg)(),(0,d.iD)("div",At,"請選擇學校"))])),_:1},8,["disabled","options","reduce","modelValue"])])):(0,d.kq)("",!0)])])],64)):((0,d.wg)(),(0,d.iD)("tr",Ht,[qt,(0,d._)("td",null,[(0,d.Wm)(u,{class:"cursor-pointer",disabled:e.lockList.sec_org_id||!e.isEdit,clearable:!1,options:e.orgList,reduce:e=>e.org_id,modelValue:e.data.sec_org_id,"onUpdate:modelValue":t[11]||(t[11]=t=>e.data.sec_org_id=t),label:"name_ch_full"},{"no-options":(0,d.w5)((({search:e,searching:t})=>[t?((0,d.wg)(),(0,d.iD)(d.HY,{key:0},[Ct,(0,d._)("em",null,(0,a.zw)(e),1),zt],64)):((0,d.wg)(),(0,d.iD)("div",Et,"請輸入或選擇團體"))])),_:1},8,["disabled","options","reduce","modelValue"])])])),(0,d._)("tr",null,[Mt,(0,d._)("td",null,[(0,d.wy)((0,d._)("select",{disabled:!e.isEdit,"onUpdate:modelValue":t[12]||(t[12]=t=>e.data.role=t)},Ot,8,Yt),[[i.bM,e.data.role]])])]),1==e.data.student?((0,d.wg)(),(0,d.iD)("tr",St,[jt,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"text",readonly:!e.isEdit,"onUpdate:modelValue":t[13]||(t[13]=t=>e.data.student_id=t)},null,8,Wt),[[i.nr,e.data.student_id]])])])):(0,d.kq)("",!0),(0,d._)("tr",null,[It,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"date",readonly:!e.isEdit,"onUpdate:modelValue":t[14]||(t[14]=t=>e.data.birthday=t)},null,8,Zt),[[i.nr,e.data.birthday]])])]),(0,d._)("tr",null,[Nt,(0,d._)("td",null,[(0,d.wy)((0,d._)("input",{type:"text",readonly:!e.isEdit,"onUpdate:modelValue":t[15]||(t[15]=t=>e.data.phone=t)},null,8,Tt),[[i.nr,e.data.phone]])])])]),"lookup"!=e.editType?((0,d.wg)(),(0,d.iD)("div",Rt,[e.isEdit?((0,d.wg)(),(0,d.iD)("button",{key:0,class:"button button-red",onClick:t[16]||(t[16]=(...t)=>e.deleteAll&&e.deleteAll(...t))},"刪除")):(0,d.kq)("",!0),e.isEdit?((0,d.wg)(),(0,d.iD)("button",{key:1,class:"button",onClick:t[17]||(t[17]=(...t)=>e.submitAll&&e.submitAll(...t))},"儲存")):((0,d.wg)(),(0,d.iD)("button",{key:2,class:"button",onClick:t[18]||(t[18]=t=>e.isEdit=!0)},"編輯"))])):(0,d.kq)("",!0)])}var Jt=l(65),Ft=(0,d.aZ)({props:["athleteData","editType"],setup(e,t){const l=new J.L,a=new J._,i=(0,Jt.oR)(),n=(0,R.iH)(!1),s=(0,R.iH)(e.editType),o=(0,R.qj)({unified_id:e.athleteData.unified_id,name:e.athleteData.name,org_id:e.athleteData.org_id,sec_org_id:e.athleteData.sec_org_id,dept_id:e.athleteData.dept_id,sec_dept_id:e.athleteData.sec_dept_id,sex:Number(e.athleteData.sex),student:Number(e.athleteData.student),student_id:e.athleteData.student_id,birthday:e.athleteData.birthday,phone:e.athleteData.phone,role:Number(e.athleteData.role),avatar:e.athleteData.avatar,remark:e.athleteData.remark}),u=(0,R.qj)({org_id:!1,sec_org_id:!1,dept_id:!1,sec_dept_id:!1,student:!1}),r=(0,R.iH)([]);function _(){l.Url("organization/list").GetAll(r)}_();const c=(0,R.iH)([]);l.Url("univ-list").GetAll(c).then((()=>{for(let e=0;e<c.value.length;e++)c.value[e].label=`${c.value[e].univ_name_ch_full} (${c.value[e].univ_name_en})`}));const p=(0,R.iH)([]);function g(){p.value=[],l.Url(`dept-list/${o.org_id}`).Get().then((e=>{let t={};for(let l=0;l<e.length;l++)t=e[l],t.label=`[${e[l].college_ch}] ${e[l].dept_ch}`,p.value.push(t)}))}function h(){l.Url("auth/user/info").Get().then((e=>{"U"===e.org_id.substr(0,1)&&g(),2===e.permission?(u.org_id=!0,u.student=!0,o.student="U"===e.org_id.substr(0,1)?1:0):1===e.permission?(u.org_id=!0,u.sec_org_id=!0,u.dept_id=!0,u.student=!0,o.student="U"===e.org_id.substr(0,1)?1:0,o.sec_org_id=o.org_id):(u.org_id=!1,u.sec_org_id=!1,u.dept_id=!1,u.sec_dept_id=!1,u.student=!1)}))}h();const m=(0,R.qj)({name:{filled:!1},org_id:{filled:!1},birthday:{filled:!1}});function w(){m.name.filled=o.name.length>0,m.org_id.filled=o.org_id.length>0,m.birthday.filled=o.birthday.length>0}function y(){for(const e of Object.entries(m))for(const t of Object.entries(e[1]))if(!1===t[1])return void("filled"===t[0]?a.Alert("請確認所有欄位皆已填寫"):a.Alert("請確認輸入的內容"));if(o.org_id===o.sec_org_id&&o.dept_id===o.sec_dept_id)return void a.Alert("兼任校系不得與主要校系相同");if(o.org_id===o.sec_org_id&&0===o.sec_dept_id.length)return void a.Alert("兼任學校/團體不得與主要學校/團體相同");const d=JSON.parse(JSON.stringify(o));l.Url("athlete/edit").Patch(e.athleteData.athlete_id,d).then((e=>{"done"===e.message&&(a.Alert("編輯成功"),t.emit("refresh"),t.emit("close_modal"),o.unified_id="",o.name="",o.dept_id="",o.student_id="",o.birthday="",o.phone="")}))}function b(){a.Confirm("確定要刪除嗎？")}w(),(0,d.YP)(o,(()=>{w()}));const k=(0,d.Fl)((()=>i.state.confirmAnswer));return(0,d.YP)(k,(d=>{"y"===d&&l.Url("athlete/delete").Delete(e.athleteData.athlete_id).then((e=>{"done"===e.message&&(a.Alert("已刪除選手"),t.emit("close_modal"),t.emit("refresh"))})),"n"===d&&a.Alert("取消刪除"),a.ResetConfirm()})),{orgList:r,univList:c,deptList:p,data:o,errorList:m,lockList:u,submitAll:y,deleteAll:b,resetSelect:()=>{o.dept_id=""},resetSelectSec:()=>{o.sec_dept_id=""},changeOrg:e=>{1===e&&"U"!==o.org_id.substring(0,1)&&(o.org_id=""),0===e&&"U"===o.org_id.substring(0,1)&&(o.org_id="")},isEdit:n,displayType:s}},components:{"v-select":$e()}});const Kt=(0,Oe.Z)(Ft,[["render",Pt],["__scopeId","data-v-0caa31a6"]]);var Bt=Kt,Qt=(0,d.aZ)({setup(){const e=new J.L,t=(0,R.iH)(0),l=(0,R.iH)({}),d=(0,R.iH)({}),a=(0,R.iH)({}),i=(0,R.iH)(void 0),n=(0,R.iH)([]);function s(){2===a.value.permission?e.Url(`athlete/get/org/${a.value.org_id}/second`).GetAll(n):e.Url(`athlete/get/org/${a.value.org_id}/second/${a.value.dept_id}`).GetAll(n)}function o(){e.Url("auth/user/info").GetAll(a).then((()=>{s()}))}return o(),{displayModal:t,gameData:d,athleteList:n,getAthleteList:s,selected:l,editAthlete:(e,d)=>{l.value=e,t.value=2,i.value=d},editType:i}},components:{SmallModal:P.Z,AddAthlete:je,EditAthlete:Bt}});const Xt=(0,Oe.Z)(Qt,[["render",T],["__scopeId","data-v-08a33f0f"]]);var el=Xt}}]);
//# sourceMappingURL=901.d0c42452.js.map