import{J as B,K as T,M as _,e as P,V as q,d as X,r as J,f as p,g as f,h as V,i as Y,u as U,X as Z,G as ee,j as e,B as z,C as k,a as F,b as M,c as E,I as j}from"./index-Cpj_313k.js";import{u as ne,F as se,a as l,b as d,c,d as h,e as m,t as ie}from"./index-Bir7vsR2.js";import{T as I}from"./textarea-CmUeH0Hs.js";import{P as re}from"./phone-input-Cm94bRnn.js";import{s as y}from"./supplier-query-keys-DIv9u3_S.js";import{B as ae}from"./back-button-D-5gooSg.js";import{S as te}from"./store-Bt4IQKUI.js";import{C as oe,S as le}from"./save-BqmzOMAP.js";import{g as de,m as ce}from"./genComponentStyleHook-BLUmqr6G.js";import"./command-BLH0lZHp.js";import"./popover-DROVBhEs.js";import"./index-BdQq_4o_.js";function he({status:r}){const n=B();return T({mutationFn:async i=>await P.patch(`/suppliers/${i._id}`,i),onMutate:async()=>{await n.cancelQueries({queryKey:[y.all,r]})},onSuccess:()=>{_.success("Supplier updated successfully")},onError:i=>{var o,b;_.error(((b=(o=i==null?void 0:i.response)==null?void 0:o.data)==null?void 0:b.message)||"An error occurred. Please try again.")},onSettled:()=>{n.invalidateQueries({queryKey:[y.all,r]})}})}function me(){const{id:r}=q(),n=async()=>{if(r){const{data:s}=await P.get(`/supplier/${r}`);return s}};return X({queryKey:y.detail(r),queryFn:n,retry:1})}const xe=async r=>await P.post("/suppliers",r);function ge(){const r=B();return T({mutationFn:xe,onSuccess:()=>{r.invalidateQueries({queryKey:y.all}),_.success("Supplier created successfully ")},onError:n=>{var s,i;_.error(((i=(s=n==null?void 0:n.response)==null?void 0:s.data)==null?void 0:i.message)||"An error occurred. Please try again.")}})}const je=r=>{const{componentCls:n,sizePaddingEdgeHorizontal:s,colorSplit:i,lineWidth:o,textPaddingInline:b,orientationMargin:t,verticalMarginInline:x}=r;return{[n]:Object.assign(Object.assign({},J(r)),{borderBlockStart:`${p(o)} solid ${i}`,"&-vertical":{position:"relative",top:"-0.06em",display:"inline-block",height:"0.9em",marginInline:x,marginBlock:0,verticalAlign:"middle",borderTop:0,borderInlineStart:`${p(o)} solid ${i}`},"&-horizontal":{display:"flex",clear:"both",width:"100%",minWidth:"100%",margin:`${p(r.dividerHorizontalGutterMargin)} 0`},[`&-horizontal${n}-with-text`]:{display:"flex",alignItems:"center",margin:`${p(r.dividerHorizontalWithTextGutterMargin)} 0`,color:r.colorTextHeading,fontWeight:500,fontSize:r.fontSizeLG,whiteSpace:"nowrap",textAlign:"center",borderBlockStart:`0 ${i}`,"&::before, &::after":{position:"relative",width:"50%",borderBlockStart:`${p(o)} solid transparent`,borderBlockStartColor:"inherit",borderBlockEnd:0,transform:"translateY(50%)",content:"''"}},[`&-horizontal${n}-with-text-left`]:{"&::before":{width:`calc(${t} * 100%)`},"&::after":{width:`calc(100% - ${t} * 100%)`}},[`&-horizontal${n}-with-text-right`]:{"&::before":{width:`calc(100% - ${t} * 100%)`},"&::after":{width:`calc(${t} * 100%)`}},[`${n}-inner-text`]:{display:"inline-block",paddingBlock:0,paddingInline:b},"&-dashed":{background:"none",borderColor:i,borderStyle:"dashed",borderWidth:`${p(o)} 0 0`},[`&-horizontal${n}-with-text${n}-dashed`]:{"&::before, &::after":{borderStyle:"dashed none none"}},[`&-vertical${n}-dashed`]:{borderInlineStartWidth:o,borderInlineEnd:0,borderBlockStart:0,borderBlockEnd:0},[`&-plain${n}-with-text`]:{color:r.colorText,fontWeight:"normal",fontSize:r.fontSize},[`&-horizontal${n}-with-text-left${n}-no-default-orientation-margin-left`]:{"&::before":{width:0},"&::after":{width:"100%"},[`${n}-inner-text`]:{paddingInlineStart:s}},[`&-horizontal${n}-with-text-right${n}-no-default-orientation-margin-right`]:{"&::before":{width:"100%"},"&::after":{width:0},[`${n}-inner-text`]:{paddingInlineEnd:s}}})}},be=r=>({textPaddingInline:"1em",orientationMargin:.05,verticalMarginInline:r.marginXS}),ue=de("Divider",r=>{const n=ce(r,{dividerHorizontalWithTextGutterMargin:r.margin,dividerHorizontalGutterMargin:r.marginLG,sizePaddingEdgeHorizontal:0});return[je(n)]},be,{unitless:{orientationMargin:!0}});var pe=function(r,n){var s={};for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&n.indexOf(i)<0&&(s[i]=r[i]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,i=Object.getOwnPropertySymbols(r);o<i.length;o++)n.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(r,i[o])&&(s[i[o]]=r[i[o]]);return s};const fe=r=>{const{getPrefixCls:n,direction:s,divider:i}=f.useContext(V),{prefixCls:o,type:b="horizontal",orientation:t="center",orientationMargin:x,className:v,rootClassName:a,children:u,dashed:H,plain:W,style:A}=r,G=pe(r,["prefixCls","type","orientation","orientationMargin","className","rootClassName","children","dashed","plain","style"]),g=n("divider",o),[L,K,Q]=ue(g),D=t.length>0?`-${t}`:t,$=!!u,w=t==="left"&&x!=null,C=t==="right"&&x!=null,R=Y(g,i==null?void 0:i.className,K,Q,`${g}-${b}`,{[`${g}-with-text`]:$,[`${g}-with-text${D}`]:$,[`${g}-dashed`]:!!H,[`${g}-plain`]:!!W,[`${g}-rtl`]:s==="rtl",[`${g}-no-default-orientation-margin-left`]:w,[`${g}-no-default-orientation-margin-right`]:C},v,a),N=f.useMemo(()=>typeof x=="number"?x:/^\d+$/.test(x)?Number(x):x,[x]),S=Object.assign(Object.assign({},w&&{marginLeft:N}),C&&{marginRight:N});return L(f.createElement("div",Object.assign({className:R,style:Object.assign(Object.assign({},i==null?void 0:i.style),A)},G,{role:"separator"}),u&&b!=="vertical"&&f.createElement("span",{className:`${g}-inner-text`,style:S},u)))};function O({editValues:r}){const n=ge(),s=he({status:"ACTIVE"}),{t:i}=U(),[o,b]=Z.useState(r||void 0),t=ne({resolver:ie(te),defaultValues:o,mode:"onChange"});async function x(a){let u;r?(await s.mutateAsync({_id:r==null?void 0:r._id,...a}),u=s.status):(await n.mutateAsync({...a}),u=n.status),u==="success"&&(b(void 0),t.reset())}const v=ee();return e.jsx(se,{...t,children:e.jsxs("form",{onSubmit:t.handleSubmit(x),className:"grid gap-6 ",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(ae,{onClick:()=>{v("/suppliers")}}),e.jsx("h1",{className:"flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0",children:"Save Supplier"}),e.jsxs("div",{className:"hidden items-center gap-2 md:ml-auto md:flex",children:[e.jsxs(z,{type:"button",variant:"outline",size:"sm",className:"h-8 gap-1",onClick:()=>{t.reset({})},children:[e.jsx(oe,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:"Discard"})]}),e.jsxs(z,{type:"submit",size:"sm",disabled:n.isPending,className:"h-8 gap-1",children:[e.jsx(le,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:i(r?"supplier_edit_button":"supplier_save_button")})]})]})]}),e.jsxs(k,{children:[e.jsx(F,{children:e.jsxs(M,{children:[" ",i("supplier_general_information_label")]})}),e.jsxs(E,{className:"grid gap-6",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsx(l,{control:t.control,name:"companyName",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_company_name_label")}),e.jsx(h,{children:e.jsx(j,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"supplierCode",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_code_label")}),e.jsx(h,{children:e.jsx(j,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"taxNumber",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_tax_number_label")}),e.jsx(h,{children:e.jsx(j,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"representative",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_representative_label")}),e.jsx(h,{children:e.jsx(j,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"phoneNumber",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_phone_label")}),e.jsx(h,{children:e.jsx(re,{disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending),defaultCountry:"TN",placeholder:"Enter a phone number",...a})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"email",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_email_label")}),e.jsx(h,{children:e.jsx(j,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending),placeholder:"Enter Email"})}),e.jsx(m,{})]})})]}),e.jsx(l,{control:t.control,name:"address",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_address_label")}),e.jsx(h,{children:e.jsx(I,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"description",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_description_label")}),e.jsx(h,{children:e.jsx(I,{...a,disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})})]})]}),e.jsxs(k,{children:[e.jsx(F,{children:e.jsx(M,{children:i("supplier_bank_info_label_optional")})}),e.jsxs(E,{className:"grid gap-6",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsx(l,{control:t.control,name:"banque._rib",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_bank_rib_label")}),e.jsx(h,{children:e.jsx(j,{id:"rib",...a,placeholder:i("supplier_bank_rib_placeholder"),disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"banque._iban",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_bank_iban_label")}),e.jsx(h,{children:e.jsx(j,{id:"iban",...a,placeholder:i("supplier_bank_iban_placeholder"),disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"banque._bic",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_bank_bic_label")}),e.jsx(h,{children:e.jsx(j,{id:"bic",...a,placeholder:i("supplier_bank_bic_placeholder"),disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})}),e.jsx(l,{control:t.control,name:"banque._representative",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_bank_representative_label")}),e.jsx(h,{children:e.jsx(j,{id:"representative",...a,placeholder:i("supplier_bank_representative_placeholder"),disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})})]}),e.jsx(l,{control:t.control,name:"banque._agency",render:({field:a})=>e.jsxs(d,{children:[e.jsx(c,{children:i("supplier_bank_agency_label")}),e.jsx(h,{children:e.jsx(j,{...a,id:"agency",placeholder:i("supplier_bank_agency_placeholder"),disabled:(n==null?void 0:n.isPending)||(s==null?void 0:s.isPending)})}),e.jsx(m,{})]})})]})]}),e.jsx("div",{className:"grid gap-4",children:e.jsx("div",{className:"grid gap-6",children:e.jsx(fe,{orientation:"left"})})})]})})}const Ee=()=>{var s;const r=me(),{id:n}=q();return console.log(r.data),e.jsxs(e.Fragment,{children:[r.isLoading&&e.jsx("div",{children:"Loading..."}),r.isSuccess&&e.jsx(O,{editValues:r!=null&&r.data?(s=r==null?void 0:r.data)==null?void 0:s.data:void 0}),!n&&e.jsx(O,{editValues:void 0})]})};export{Ee as default};
