import{d as _,e as T,r as L,f as s,g as d,h as P,i as S,_ as X,u as M,j as o,A as R,k as V,l as D,m as F}from"./index-Cpj_313k.js";import{u as G}from"./useCSSVarCls-Cnpzgdut.js";import{g as K,m as Q}from"./genComponentStyleHook-BLUmqr6G.js";import{R as J}from"./LoadingOutlined-DfXZN2Wr.js";import{t as U}from"./toArray-DaCh-VYn.js";const y={all:["logs"],details:()=>[...y.all,"detail"],detail:e=>[...y.details(),e],pagination:e=>[...y.all,"pagination",e],infinite:()=>[...y.all,"infinite"]},Y=async()=>(await T.get("/logs")).data;function ce(){return _({queryKey:y.all,queryFn:Y})}const Z=e=>{const{componentCls:t,calc:r}=e;return{[t]:Object.assign(Object.assign({},L(e)),{margin:0,padding:0,listStyle:"none",[`${t}-item`]:{position:"relative",margin:0,paddingBottom:e.itemPaddingBottom,fontSize:e.fontSize,listStyle:"none","&-tail":{position:"absolute",insetBlockStart:e.itemHeadSize,insetInlineStart:r(r(e.itemHeadSize).sub(e.tailWidth)).div(2).equal(),height:`calc(100% - ${s(e.itemHeadSize)})`,borderInlineStart:`${s(e.tailWidth)} ${e.lineType} ${e.tailColor}`},"&-pending":{[`${t}-item-head`]:{fontSize:e.fontSizeSM,backgroundColor:"transparent"},[`${t}-item-tail`]:{display:"none"}},"&-head":{position:"absolute",width:e.itemHeadSize,height:e.itemHeadSize,backgroundColor:e.dotBg,border:`${s(e.dotBorderWidth)} ${e.lineType} transparent`,borderRadius:"50%","&-blue":{color:e.colorPrimary,borderColor:e.colorPrimary},"&-red":{color:e.colorError,borderColor:e.colorError},"&-green":{color:e.colorSuccess,borderColor:e.colorSuccess},"&-gray":{color:e.colorTextDisabled,borderColor:e.colorTextDisabled}},"&-head-custom":{position:"absolute",insetBlockStart:r(e.itemHeadSize).div(2).equal(),insetInlineStart:r(e.itemHeadSize).div(2).equal(),width:"auto",height:"auto",marginBlockStart:0,paddingBlock:e.customHeadPaddingVertical,lineHeight:1,textAlign:"center",border:0,borderRadius:0,transform:"translate(-50%, -50%)"},"&-content":{position:"relative",insetBlockStart:r(r(e.fontSize).mul(e.lineHeight).sub(e.fontSize)).mul(-1).add(e.lineWidth).equal(),marginInlineStart:r(e.margin).add(e.itemHeadSize).equal(),marginInlineEnd:0,marginBlockStart:0,marginBlockEnd:0,wordBreak:"break-word"},"&-last":{[`> ${t}-item-tail`]:{display:"none"},[`> ${t}-item-content`]:{minHeight:r(e.controlHeightLG).mul(1.2).equal()}}},[`&${t}-alternate,
        &${t}-right,
        &${t}-label`]:{[`${t}-item`]:{"&-tail, &-head, &-head-custom":{insetInlineStart:"50%"},"&-head":{marginInlineStart:r(e.marginXXS).mul(-1).equal(),"&-custom":{marginInlineStart:r(e.tailWidth).div(2).equal()}},"&-left":{[`${t}-item-content`]:{insetInlineStart:`calc(50% - ${s(e.marginXXS)})`,width:`calc(50% - ${s(e.marginSM)})`,textAlign:"start"}},"&-right":{[`${t}-item-content`]:{width:`calc(50% - ${s(e.marginSM)})`,margin:0,textAlign:"end"}}}},[`&${t}-right`]:{[`${t}-item-right`]:{[`${t}-item-tail,
            ${t}-item-head,
            ${t}-item-head-custom`]:{insetInlineStart:`calc(100% - ${s(r(r(e.itemHeadSize).add(e.tailWidth)).div(2).equal())})`},[`${t}-item-content`]:{width:`calc(100% - ${s(r(e.itemHeadSize).add(e.marginXS).equal())})`}}},[`&${t}-pending
        ${t}-item-last
        ${t}-item-tail`]:{display:"block",height:`calc(100% - ${s(e.margin)})`,borderInlineStart:`${s(e.tailWidth)} dotted ${e.tailColor}`},[`&${t}-reverse
        ${t}-item-last
        ${t}-item-tail`]:{display:"none"},[`&${t}-reverse ${t}-item-pending`]:{[`${t}-item-tail`]:{insetBlockStart:e.margin,display:"block",height:`calc(100% - ${s(e.margin)})`,borderInlineStart:`${s(e.tailWidth)} dotted ${e.tailColor}`},[`${t}-item-content`]:{minHeight:r(e.controlHeightLG).mul(1.2).equal()}},[`&${t}-label`]:{[`${t}-item-label`]:{position:"absolute",insetBlockStart:r(r(e.fontSize).mul(e.lineHeight).sub(e.fontSize)).mul(-1).add(e.tailWidth).equal(),width:`calc(50% - ${s(e.marginSM)})`,textAlign:"end"},[`${t}-item-right`]:{[`${t}-item-label`]:{insetInlineStart:`calc(50% + ${s(e.marginSM)})`,width:`calc(50% - ${s(e.marginSM)})`,textAlign:"start"}}},"&-rtl":{direction:"rtl",[`${t}-item-head-custom`]:{transform:"translate(50%, -50%)"}}})}},k=e=>({tailColor:e.colorSplit,tailWidth:e.lineWidthBold,dotBorderWidth:e.wireframe?e.lineWidthBold:e.lineWidth*3,dotBg:e.colorBgContainer,itemPaddingBottom:e.padding*1.25}),ee=K("Timeline",e=>{const t=Q(e,{itemHeadSize:10,customHeadPaddingVertical:e.paddingXXS,paddingInlineEnd:2});return[Z(t)]},k);var te=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(r[i[a]]=e[i[a]]);return r};const z=e=>{var{prefixCls:t,className:r,color:i="blue",dot:a,pending:h=!1,position:v,label:m,children:f}=e,$=te(e,["prefixCls","className","color","dot","pending","position","label","children"]);const{getPrefixCls:u}=d.useContext(P),n=u("timeline",t),b=S(`${n}-item`,{[`${n}-item-pending`]:h},r),g=/blue|red|green|gray/.test(i||"")?void 0:i,c=S(`${n}-item-head`,{[`${n}-item-head-custom`]:!!a,[`${n}-item-head-${i}`]:!g});return d.createElement("li",Object.assign({},$,{className:b}),m&&d.createElement("div",{className:`${n}-item-label`},m),d.createElement("div",{className:`${n}-item-tail`}),d.createElement("div",{className:c,style:{borderColor:g,color:g}},a),d.createElement("div",{className:`${n}-item-content`},f))};var w=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(r[i[a]]=e[i[a]]);return r};const ie=e=>{var{prefixCls:t,className:r,pending:i=!1,children:a,items:h,rootClassName:v,reverse:m=!1,direction:f,hashId:$,pendingDot:u,mode:n=""}=e,b=w(e,["prefixCls","className","pending","children","items","rootClassName","reverse","direction","hashId","pendingDot","mode"]);const g=(l,p)=>n==="alternate"?l==="right"?`${t}-item-right`:l==="left"?`${t}-item-left`:p%2===0?`${t}-item-left`:`${t}-item-right`:n==="left"?`${t}-item-left`:n==="right"?`${t}-item-right`:l==="right"?`${t}-item-right`:"",c=X(h||[]),C=typeof i=="boolean"?null:i;i&&c.push({pending:!!i,dot:u||d.createElement(J,null),children:C}),m&&c.reverse();const O=c.length,N=`${t}-item-last`,H=c.filter(l=>!!l).map((l,p)=>{var x;const E=p===O-2?N:"",A=p===O-1?N:"",{className:q}=l,W=w(l,["className"]);return d.createElement(z,Object.assign({},W,{className:S([q,!m&&i?E:A,g((x=l==null?void 0:l.position)!==null&&x!==void 0?x:"",p)]),key:(l==null?void 0:l.key)||p}))}),I=c.some(l=>!!(l!=null&&l.label)),B=S(t,{[`${t}-pending`]:!!i,[`${t}-reverse`]:!!m,[`${t}-${n}`]:!!n&&!I,[`${t}-label`]:I,[`${t}-rtl`]:f==="rtl"},r,v,$);return d.createElement("ul",Object.assign({},b,{className:B}),H)};function re(e,t){return e&&Array.isArray(e)?e:U(t).map(r=>{var i,a;return Object.assign({children:(a=(i=r==null?void 0:r.props)===null||i===void 0?void 0:i.children)!==null&&a!==void 0?a:""},r.props)})}var ae=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,i=Object.getOwnPropertySymbols(e);a<i.length;a++)t.indexOf(i[a])<0&&Object.prototype.propertyIsEnumerable.call(e,i[a])&&(r[i[a]]=e[i[a]]);return r};const j=e=>{const{getPrefixCls:t,direction:r,timeline:i}=d.useContext(P),{prefixCls:a,children:h,items:v,className:m,style:f}=e,$=ae(e,["prefixCls","children","items","className","style"]),u=t("timeline",a),n=G(u),[b,g,c]=ee(u,n),C=re(v,h);return b(d.createElement(ie,Object.assign({},$,{className:S(i==null?void 0:i.className,m,c,n),style:Object.assign(Object.assign({},i==null?void 0:i.style),f),prefixCls:u,direction:r,items:C,hashId:g})))};j.Item=z;function me({logs:e}){const{i18n:t}=M();return o.jsx("div",{className:"p-2",children:o.jsx(j,{children:e.map(r=>o.jsxs(j.Item,{children:[o.jsx("div",{className:"text-md",children:(r==null?void 0:r.action[t.language])||r.action.en}),o.jsxs("div",{className:"text-gray-500 dark:text-gray-400 flex justify-between",children:[o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsxs(R,{className:"w-[28px] h-[28px]",children:[o.jsx(V,{src:r==null?void 0:r.userAvatar,alt:"me"}),o.jsx(D,{children:"CN"})]})," ",o.jsxs("span",{className:"font-bold",children:[r.userFirstName," ",r.userLastName]})]}),o.jsx("span",{children:F(r.createdAt).fromNow()})]})]},r._id))})})}export{me as L,ce as u};
