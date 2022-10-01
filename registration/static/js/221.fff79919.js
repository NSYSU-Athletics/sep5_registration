"use strict";(self["webpackChunkregistration"]=self["webpackChunkregistration"]||[]).push([[221],{2221:function(e,i,t){t.r(i),t.d(i,{default:function(){return ee}});var l=t(3396),a=t(7139),n=t(9242);const g=e=>((0,l.dD)("data-v-270d24b9"),e=e(),(0,l.Cn)(),e),d={class:"mx-auto w-full p-5 sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2"},u={class:"box-section"},s=(0,l.Uk)("回上頁"),r=(0,l.Uk)("Back"),o={class:"box-section"},_={class:"title"},k=(0,l.Uk)("隊伍報名"),v=(0,l.Uk)("Group events"),m=g((()=>(0,l._)("hr",null,null,-1))),c={class:"athlete-table"},w=(0,l.Uk)("隊名"),p=(0,l.Uk)("Team Name"),y={colspan:"3"},D=["value"],h=(0,l.Uk)("報名組別"),U=(0,l.Uk)("Division"),H=["value"],f=(0,l.Uk)("報名項目"),$=(0,l.Uk)("Event"),Y=["value"],q={class:"text-right"},b=(0,l.Uk)("新增"),A=(0,l.Uk)("Add"),x={class:"box-section"},L={class:"title"},C=(0,l.Uk)("報名項目"),G=(0,l.Uk)("Registered"),P=g((()=>(0,l._)("hr",null,null,-1))),z={class:"register-table"},j=(0,l.Uk)("隊伍"),E=(0,l.Uk)("Team"),K=(0,l.Uk)("組別"),O=(0,l.Uk)("Division"),R=(0,l.Uk)("項目"),S=(0,l.Uk)("Event"),M=g((()=>(0,l._)("th",null,null,-1))),T=["onClick"],V=(0,l.Uk)("刪除"),F=(0,l.Uk)("Delete");function Z(e,i,t,g,Z,B){return(0,l.wg)(),(0,l.iD)("div",d,[(0,l._)("div",u,[(0,l._)("div",{class:"text-xl text-gray-400 cursor-pointer",onClick:i[0]||(i[0]=i=>e.$router.go(-1))},["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[s],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[r],64)):(0,l.kq)("",!0)])]),(0,l._)("div",o,[(0,l._)("div",_,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[k],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[v],64)):(0,l.kq)("",!0)]),m,(0,l._)("table",c,[(0,l._)("tr",null,[(0,l._)("td",null,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[w],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[p],64)):(0,l.kq)("",!0)]),(0,l._)("td",y,[(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":i[1]||(i[1]=i=>e.data.team_id=i)},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.teamList,((e,i)=>((0,l.wg)(),(0,l.iD)("option",{key:i,value:e.team_id},(0,a.zw)(e.team_name),9,D)))),128))],512),[[n.bM,e.data.team_id]])])]),(0,l._)("tr",null,[(0,l._)("td",null,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[h],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[U],64)):(0,l.kq)("",!0)]),(0,l._)("td",null,[(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":i[2]||(i[2]=i=>e.data.game_division_id=i)},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.divisionList,((i,t)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:t},[e.groupSex(i.sex)||0==i.sex?((0,l.wg)(),(0,l.iD)("option",{key:0,value:i.game_division_id},(0,a.zw)(i.ch),9,H)):(0,l.kq)("",!0)],64)))),128))],512),[[n.bM,e.data.game_division_id]])]),(0,l._)("td",null,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[f],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[$],64)):(0,l.kq)("",!0)]),(0,l._)("td",null,[(0,l.wy)((0,l._)("select",{"onUpdate:modelValue":i[3]||(i[3]=i=>e.data.event_id=i)},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.paramsList,((i,t)=>((0,l.wg)(),(0,l.iD)(l.HY,{key:t},[1==i.multiple&&i.game_division_id==e.data.game_division_id?((0,l.wg)(),(0,l.iD)("option",{key:0,value:i.event_id},(0,a.zw)(i[`event_${e.language}`]),9,Y)):(0,l.kq)("",!0)],64)))),128))],512),[[n.bM,e.data.event_id]])])])]),(0,l._)("div",q,[(0,l._)("button",{class:"button",onClick:i[4]||(i[4]=(...i)=>e.submitAll&&e.submitAll(...i))},["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[b],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[A],64)):(0,l.kq)("",!0)])])]),(0,l._)("div",x,[(0,l._)("div",L,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[C],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[G],64)):(0,l.kq)("",!0)]),P,(0,l._)("table",z,[(0,l._)("tr",null,[(0,l._)("th",null,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[j],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[E],64)):(0,l.kq)("",!0)]),(0,l._)("th",null,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[K],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[O],64)):(0,l.kq)("",!0)]),(0,l._)("th",null,["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[R],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[S],64)):(0,l.kq)("",!0)]),M]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.registerList,((i,t)=>((0,l.wg)(),(0,l.iD)("tr",{key:t},[(0,l._)("td",null,(0,a.zw)(i.team_name),1),(0,l._)("td",null,(0,a.zw)(i.ch),1),(0,l._)("td",null,(0,a.zw)(i.event_ch),1),(0,l._)("td",null,[(0,l._)("button",{class:"button button-red",onClick:t=>e.remove(i)},["ch"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[V],64)):(0,l.kq)("",!0),"en"==e.language?((0,l.wg)(),(0,l.iD)(l.HY,{key:1},[F],64)):(0,l.kq)("",!0)],8,T)])])))),128))])])])}var B=t(4870),I=t(3927),N=t(678),J=t(65),Q=(0,l.aZ)({setup(){const e=new I.L,i=new I._,t=(0,N.yj)(),a=(0,J.oR)(),n=(0,B.iH)({}),g=(0,B.qj)({team_id:"",game_division_id:0,event_id:""}),d=(0,B.iH)({}),u=(0,B.iH)([]),s=(0,B.iH)([]);function r(){e.Url(`games/${t.params.game_id}`).GetAll(d).then((()=>{const t=i.SportPrefix(d.value.type);e.Url(`${t}/event-params/${d.value.game_id}`).GetAll(u),e.Url(`${t}/game-division/${d.value.game_id}`).GetAll(s)}))}r();const o=(0,B.iH)([]);function _(){let i="";i=2===n.value.permission?`register/grp/team/${d.value.type}/${d.value.game_id}/${n.value.org_id}`:`register/grp/team/${d.value.type}/${d.value.game_id}/${n.value.org_id}/${n.value.dept_id}`,e.Url(i).GetAll(o).then((()=>{g.team_id=o.value[0].team_id}))}function k(){e.Url("auth/user/info").GetAll(n)}k();const v=(0,B.iH)([]);function m(){2===n.value.permission?e.Url(`register/grp/get/org/${d.value.type}/${d.value.game_id}/${n.value.org_id}`).GetAll(v):e.Url(`register/grp/get/dept/${d.value.type}/${d.value.game_id}/${n.value.dept_id}`).GetAll(v)}(0,l.YP)([d,n],(()=>{d.value.hasOwnProperty("game_id")&&n.value.hasOwnProperty("org_id")&&(_(),m())}));const c=(0,B.qj)({team_id:{filled:!1},game_division_id:{filled:!1},event_id:{filled:!1}});function w(){for(const e of Object.entries(c))for(const t of Object.entries(e[1]))if(!1===t[1])return void("filled"===t[0]?i.Alert("不得送出空報名內容"):i.Alert("請確認輸入的內容"));e.Url(`register/grp/exist/${d.value.type}/${d.value.game_id}/${g.team_id}/${g.game_division_id}/${g.event_id}`).Get().then((t=>{!0===t.message?i.Alert("該隊伍已報名過此組別項目"):e.Url(`register/grp/add/${d.value.type}/${d.value.game_id}`).Post(g).then((e=>{"done"===e.message&&(i.Alert("新增成功"),g.game_division_id=0,g.event_id="",m())}))}))}(0,l.YP)(g,(()=>{c.team_id.filled=String(g.team_id).length>0,c.game_division_id.filled=g.game_division_id>0,c.event_id.filled=g.event_id.length>0}));let p={};function y(e){i.Confirm("確定要刪除嗎？"),p=e}const D=(0,l.Fl)((()=>a.state.confirmAnswer));return(0,l.YP)(D,(t=>{"y"===t&&e.Url(`register/grp/delete/${d.value.type}/${d.value.game_id}`).Delete(`${p.team_id}/${p.game_division_id}/${p.event_id}`).then((e=>{"done"===e.message&&(i.Alert("已刪除該報名項目"),m())})),"n"===t&&i.Alert("取消刪除"),i.ResetConfirm()})),{data:g,teamList:o,divisionList:s,paramsList:u,getTeamList:_,registerList:v,groupSex:e=>{let i=!0;return o.value.forEach((t=>{t.team_id===g.team_id&&t.member_data_list.forEach((t=>{t.sex!==e&&(i=!1)}))})),i},remove:y,submitAll:w,language:(0,l.Fl)((()=>(0,J.oR)().state.language))}}}),W=t(89);const X=(0,W.Z)(Q,[["render",Z],["__scopeId","data-v-270d24b9"]]);var ee=X}}]);
//# sourceMappingURL=221.fff79919.js.map