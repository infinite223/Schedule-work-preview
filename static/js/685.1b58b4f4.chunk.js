"use strict";(self.webpackChunkpresent_app=self.webpackChunkpresent_app||[]).push([[685],{1685:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(4165),s=n(1413),i=n(5861),a=n(9439),d=n(2791),l=n(2898);function o(e){var t=e.getFullYear(),n=e.getMonth()+1;return new Date(t,n,0).getDate()}var c=n(2702),u=n(4420),f=n(9240),x=n(184),v=function(e){var t=e.id,n=e.isSelected,r=e.users,s=e.myId,i=e.today,a=(0,u.v9)(f.fI),d=r.find((function(e){return(null===e||void 0===e?void 0:e.userUid)===s&&!(null!==e&&void 0!==e&&e.remove)}));return(0,x.jsxs)("div",{className:"rounded-full w-10 h-10 font-bold flex items-center justify-center gap-1 flex-col ".concat(i?"dark:bg-zinc-800 bg-zinc-200":""),style:{borderColor:n?c.O.baseColor:"transparent",borderWidth:1},children:[(0,x.jsx)("div",{className:"text-[13px] ".concat(d?"text-green-500":"text-gray-700 dark:text-gray-300"),children:0!==t&&t}),(0,x.jsx)("div",{style:{flexDirection:"row",alignItems:"center",gap:5,display:"flex"},children:r.map((function(e,t){return!(null!==e&&void 0!==e&&e.remove)&&a.users.find((function(t){return t.uid===e.userUid}))&&t<2&&(0,x.jsx)("div",{className:"rounded-full w-1 h-1",style:{backgroundColor:(0,l.rC)(e)}},t)}))})]})},p=n(9214),m=n(71),h=n(5914),g=n(9132),b=function(e){var t,n,r,s,i=e.days,a=e.userUid,d=(0,l.Zg)(a,i);return(0,x.jsxs)("span",{className:"text-green-500 text-sm font-light",children:[(null===(t=d[a])||void 0===t?void 0:t.hours)>0&&(0,x.jsxs)("span",{children:[null===(n=d[a])||void 0===n?void 0:n.hours," h"]}),(null===(r=d[a])||void 0===r?void 0:r.minutes)>0&&(0,x.jsxs)("span",{children:[" ",null===(s=d[a])||void 0===s?void 0:s.minutes,"m"]})]})},w=new Date,j=function(e){var t=e.selectedDate,n=e.setSelectedDate,r=e.selectedMonth,s=e.setSelectedMonth,i=e.data,c=(0,d.useState)([]),f=(0,a.Z)(c,2),j=f[0],y=f[1],k=(0,g.Z)().user,N=(0,u.I0)();return(0,d.useEffect)((function(){N((0,h.Sv)(JSON.stringify(w))),y(function(e,t,n){for(var r=[],s=e.getFullYear(),i=e.getMonth(),a=new Date(s,i,0).getDay(),d=0;d<a;d++)r.push({id:0,noDay:!0,date:new Date(s+1,i,0),users:[]});for(var c=function(e){var n=t.filter((function(t){return(0,l.xH)(t.date.toDate())===(0,l.xH)(new Date(s,i,e))}));if(n&&n.length>0){var a=n.map((function(e){return{id:e.id,userUid:e.userUid,groupUid:e.groupUid,block:null===e||void 0===e?void 0:e.block,createdAt:e.createdAt,remove:null===e||void 0===e?void 0:e.remove,start:e.start,end:e.end,date:e.date}}));r.push({id:e,noDay:!1,date:new Date(s,i,e),users:a})}else r.push({id:e,noDay:!1,date:new Date(s,i,e),users:[]})},u=1;u<o(e)+1;u++)c(u);return r}(r,i))}),[r,i]),(0,d.useEffect)((function(){var e=j.find((function(e){return(0,l.xH)(e.date)===(0,l.xH)(t.date)})),s=j.find((function(e){return(0,l.xH)(e.date)===(0,l.xH)(new Date)})),i=j.find((function(e){return(0,l.xH)(e.date)===(0,l.xH)(r)}));i&&(null===i||void 0===i?void 0:i.date.getMonth())!==w.getMonth()?t.date.getMonth()===r.getMonth()&&e?(n({date:t.date,users:null===e||void 0===e?void 0:e.users}),N((0,h.Sv)(JSON.stringify(t.date)))):(n({date:r,users:null===i||void 0===i?void 0:i.users}),N((0,h.Sv)(JSON.stringify(r)))):e?(n({date:t.date,users:null===e||void 0===e?void 0:e.users}),N((0,h.Sv)(JSON.stringify(t.date)))):s&&n({date:w,users:null===s||void 0===s?void 0:s.users})}),[j]),(0,x.jsxs)("div",{className:"flex flex-col items-center w-full pt-2 rounded-md mb-2",children:[(0,x.jsxs)("div",{className:"flex flex-row items-center md:pr-5 md:pl-5 pr-1 pl-1 justify-between pb-2 w-full shadow-sm",children:[(0,x.jsx)("button",{style:{padding:"2px "},onClick:function(){return s((0,l._)(r,-1))},children:(0,x.jsx)(m.$Ku,{size:22,color:"var(--baseColor)"})}),(0,x.jsxs)("div",{className:"flex items-center gap-3",children:[(0,x.jsx)(b,{days:j,userUid:null===k||void 0===k?void 0:k.uid}),(0,x.jsxs)("span",{className:"text-sm text-gray-600 dark:text-gray-300",children:[p.l[r.getMonth()]," "+r.getFullYear()]})]}),(0,x.jsx)("button",{style:{padding:"2px"},onClick:function(){return s((0,l._)(r,1))},children:(0,x.jsx)(m.nQU,{size:22,color:"var(--baseColor)"})})]}),(0,x.jsxs)("div",{className:"w-full rounded-lg pt-4",children:[(0,x.jsx)("div",{className:"grid grid-cols-7 gap-2 mb-2 text-gray-500 dark:text-gray-400",children:p.G.map((function(e,t){return(0,x.jsx)("span",{className:"w-full flex justify-center text-xs font-light",children:e},t)}))}),(0,x.jsx)("div",{className:"grid grid-cols-7 gap-2 pt2 pb-2",children:j.map((function(e,r){var s=(0,l.xH)(new Date(e.date))===(0,l.xH)(new Date(t.date)),i=e.noDay;return(0,x.jsx)("button",{disabled:i,className:"w-full flex items-center justify-center",onClick:function(){n({date:e.date,users:e.users}),N((0,h.Sv)(JSON.stringify(e.date)))},children:(0,x.jsx)(v,{id:e.id,isSelected:s,users:e.users,myId:k.uid,today:(0,l.xH)(new Date)===(0,l.xH)(e.date)})},r)}))})]})]})},y=n(4706),k=n(2798),N=n(2481),D=n(6994),z=n(7689),S=n(1478),Z=n(9497),C=n(6355),H=function(e){var t=e.selectedDate,n=(0,z.s0)(),s=(0,S.zn)().notify,o=(0,u.v9)(f.fI),c=(0,u.I0)(),v=(0,d.useState)([]),m=(0,a.Z)(v,2),h=m[0],b=m[1],w=(0,u.v9)(k.K8),j=(0,g.Z)().user,y="admin"===(null===j||void 0===j?void 0:j.type);(0,d.useEffect)((function(){b(t.users.map((function(e){var t=o.users.find((function(t){return t.uid===e.userUid}));if(t)return{date:e.date,start:e.start,end:e.end,user:t,createdAt:e.createdAt,remove:null===e||void 0===e?void 0:e.remove,block:null===e||void 0===e?void 0:e.block,id:null===e||void 0===e?void 0:e.id}})))}),[t,w]);var H=function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t,i){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(j&&y&&t.id)){e.next=14;break}return e.prev=1,e.next=4,(0,N.r7)((0,N.JU)(D.db,"schedule",t.id),{block:i,remove:i});case 4:n("/"),s({status:"success",title:i?"Zablokowano ":"Odblokowano"+t.user.nick}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),s({status:"error",title:"Co\u015b posz\u0142o nie tak, spr\xf3buj od nowa za\u0142adowa\u0107 aplikacje"});case 11:c((0,Z.SV)(1)),e.next=15;break;case 14:s({status:"error",title:"Co\u015b posz\u0142o nie tak"});case 15:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}();return(0,x.jsxs)("div",{className:"flex text-black dark:text-white p-2 w-full h-fit",children:[(0,x.jsxs)("div",{className:"border-r-2 border-green-500 p-2 pr-5 pl-3 flex flex-col",children:[(0,x.jsx)("span",{className:"font-bold text-[16px]",children:t.date.getDate()}),(0,x.jsx)("span",{className:"font-light text-sm",children:p.G[t.date.getDay()?t.date.getDay()-1:6]})]}),(0,x.jsx)("div",{className:"flex flex-col pl-4 pr-2 w-full flex-grow overflow-auto",children:h.map((function(e,t){var n,r,s,i,a;return(0,x.jsx)("div",{children:null!==e&&void 0!==e&&e.user&&null!==e&&void 0!==e&&e.end&&null!==e&&void 0!==e&&e.start&&null!==e&&void 0!==e&&e.createdAt?(0,x.jsxs)("div",{className:"flex flex-col text-black dark:text-zinc-100 p-1 w-full justify-between \n            border-b-2 border-zinc-200 dark:border-zinc-900",style:null!==e&&void 0!==e&&e.remove?{opacity:.3}:{},children:[(0,x.jsxs)("div",{className:"flex items-center justify-between w-full text-sm",children:[(0,x.jsx)("div",{className:(null===e||void 0===e||null===(n=e.user)||void 0===n?void 0:n.uid)===j.uid?"text-green-500":"",children:null===e||void 0===e||null===(r=e.user)||void 0===r?void 0:r.nick}),(0,x.jsxs)("div",{className:"flex items-center gap-4",children:[(0,x.jsxs)("div",{className:"flex gap-4 items-center text-black dark:text-zinc-200",style:{color:(0,l.rC)(e)},children:[(0,x.jsxs)("div",{className:"",children:["od: ",null===e||void 0===e?void 0:e.start]}),(0,x.jsxs)("div",{children:["do: ",null===e||void 0===e?void 0:e.end]})]}),y&&e.user.uid!==j.uid&&(null!==e&&void 0!==e&&e.block?(0,x.jsx)(C.vc$,{onClick:function(){return H(e,!1)},className:"text-zinc-800 dark:text-zinc-100 cursor-pointer hover:text-green-600 transition-colors",size:16}):(0,x.jsx)(C.jcU,{onClick:function(){return H(e,!0)},className:"text-zinc-800 dark:text-zinc-100 cursor-pointer hover:text-red-600 transition-colors",size:16}))]})]}),(0,x.jsx)("div",{className:"flex pt-1 text-zinc-400",children:(0,x.jsxs)("div",{className:"text-[10px]",children:["Dodano:"," ",(0,l.xH)(new Date(1e3*(null===e||void 0===e||null===(s=e.createdAt)||void 0===s?void 0:s.seconds)))," ","o ",new Date(1e3*(null===e||void 0===e||null===(i=e.createdAt)||void 0===i?void 0:i.seconds)).getHours(),":",new Date(1e3*(null===e||void 0===e||null===(a=e.createdAt)||void 0===a?void 0:a.seconds)).getMinutes()]})})]},t):(0,x.jsx)(x.Fragment,{})},t)}))})]})},M=n(4043),U=n(3165),I=n(1372),A=function(){var e,t=(0,u.I0)(),n=(0,u.v9)(f.fI),o=(0,d.useState)(!1),c=(0,a.Z)(o,2),v=c[0],p=c[1],m=(0,d.useState)([]),h=(0,a.Z)(m,2),b=h[0],w=h[1],z=(0,d.useState)([]),C=(0,a.Z)(z,2),A=C[0],O=C[1],F=(0,g.Z)().user,J="admin"===(null===F||void 0===F?void 0:F.type),Y=(0,S.zn)().notify,E=(0,d.useState)(!1),_=(0,a.Z)(E,2),W=_[0],P=_[1],G=(0,d.useState)({date:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()),users:[]}),K=(0,a.Z)(G,2),V=K[0],$=K[1],B=(0,d.useState)(new Date((new Date).getFullYear(),(new Date).getMonth(),1)),Q=(0,a.Z)(B,2),X=Q[0],q=Q[1];(0,d.useEffect)((function(){if(n&&null!==n&&void 0!==n&&n.id){P(!0);var e=(0,N.hJ)(D.db,"schedule"),a=new Date(X.getFullYear(),X.getMonth(),1),d=(0,l._)(a,1),o=(0,N.IO)(e,(0,N.ar)("date",">=",a),(0,N.ar)("date","<",d),(0,N.ar)("groupUid","==",n.id)),c=(0,N.cf)(o,function(){var e=(0,i.Z)((0,r.Z)().mark((function e(n){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:w(n.docs.map((function(e,t){return(0,s.Z)((0,s.Z)({},e.data()),{},{id:e.id})}))),O(n.docs.map((function(e,t){return e.ref}))),t((0,Z.SV)(1)),P(!1);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());return t((0,k.Xb)(1)),function(){c()}}}),[X,n]);var L=b.find((function(e){return(0,l.xH)(e.date.toDate())===(0,l.xH)(null===V||void 0===V?void 0:V.date)&&!(null!==e&&void 0!==e&&e.remove)&&e.userUid===F.uid}))?"minus":"plus",R=!!b.find((function(e){return(0,l.xH)(e.date.toDate())===(0,l.xH)(null===V||void 0===V?void 0:V.date)&&e.userUid===F.uid&&e.block})),T=function(){try{A.forEach(function(){var e=(0,i.Z)((0,r.Z)().mark((function e(t){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,N.oe)(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Y({status:"success",title:"Uda\u0142o si\u0119 wyczy\u015bci\u0107 miesi\u0105c."}),p(!1)}catch(e){Y({status:"error",title:"Co\u015b posz\u0142o nie tak, spr\xf3buj p\xf3\u017aniej."})}};return(0,x.jsxs)("div",{className:"flex flex-col items-center  h-screen max-h-dvh  justify-between w-ful bg-white dark:bg-black",children:[(0,x.jsxs)("div",{className:"flex sm:flex-row flex-col w-full sm:flex-ro",children:[(0,x.jsxs)("div",{className:"flex flex-col sm:w-1/2 items-center w-full pr-2 pl-2 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-400/10 rounded-b-xl pb-2",children:[(0,x.jsxs)("div",{className:"flex items-center justify-between w-full",children:[(0,x.jsx)("h1",{className:"pt-4 pb-3 text-lg pl-2 self-start font-semibold text-zinc-900 dark:text-gray-100",children:null!==n&&void 0!==n&&n.name?null===n||void 0===n?void 0:n.name:"Brak grupy"}),J&&(0,x.jsx)("div",{onClick:function(){return p(!0)},className:"p-1 pl-3 pr-3 bg-zinc-200 dark:bg-zinc-600 rounded-md text-zinc-700 dark:text-white text-xs cursor-pointer transition-opacity hover:opacity-75",children:"Wyczy\u015b\u0107 miesi\u0105c"}),(0,x.jsx)("img",{src:U,alt:"logo",className:"w-[30px] pr-2"})]}),(0,x.jsx)(j,{selectedDate:V,setSelectedDate:$,selectedMonth:X,setSelectedMonth:q,data:b})]}),(0,x.jsx)(H,{selectedDate:V})]}),(0,x.jsx)(y.Z,{type:"Schedule",operation:L,blocked:R,dayId:null===(e=V.users.find((function(e){return e.userUid===F.uid})))||void 0===e?void 0:e.id}),W&&(0,x.jsx)(M.Z,{}),v&&(0,x.jsx)(I.w,{actions:function(){return(0,x.jsxs)("div",{className:"flex items-center gap-3",children:[(0,x.jsx)("button",{className:"button bg-zinc-700-600 text-zinc-700 dark:text-white font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm",onClick:function(){return p(!1)},children:"Wyjd\u017a"}),(0,x.jsx)("button",{className:"button bg-red-600 text-white pl-3 pr-3 font-bold hover:opacity-80 transition-opacity p-1.5 rounded-md text-sm",onClick:T,children:"Wyczy\u015b\u0107 dane"})]})},setShowPromptModal:p,text:"Czy na pewno chcesz wyczy\u015bci\u0107 grafik w tym miesi\u0105cu?",title:"Zatwierd\u017a opcje"})]})}},1372:function(e,t,n){n.d(t,{w:function(){return s}});var r=n(184),s=function(e){var t=e.actions,n=e.text,s=e.title,i=e.setShowPromptModal;return(0,r.jsx)("div",{className:"fixed bg-white/65 dark:bg-black/65 left-0 top-0 h-dvh w-screen flex flex-col items-center justify-center",onClick:function(e){return i(!1)},children:(0,r.jsxs)("div",{className:"h-fit w-11/12 sm:w-1/3 gap-2 min-w-3.5 flex flex-col justify-between text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 p-5 rounded-md",onClick:function(e){return e.stopPropagation()},children:[(0,r.jsx)("h2",{children:s}),(0,r.jsx)("p",{className:"text-sm mb-2",children:n}),t()]})})}}}]);
//# sourceMappingURL=685.1b58b4f4.chunk.js.map