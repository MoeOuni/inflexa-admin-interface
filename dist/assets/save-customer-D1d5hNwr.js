import{f as y,r as g,j as e,A as f}from"./index-3nPIAQnH.js";import{I as d}from"./input-CN_5s6Mi.js";import{C as F}from"./checkbox-DsnWyP3S.js";import{B as N}from"./button-CtZ5qbJi.js";import{C,a as b}from"./customer-BYiiW8fW.js";import{u as v,t as S,F as E,a as o,b as a,c as n,d as t,e as l,f as m}from"./index-CWNnVEfM.js";import{D as h,P as A}from"./phone-input-DB-SBfnx.js";import"./check-BMG6f9gN.js";import"./command-D_T3vcN9.js";import"./index-G51GvTtm.js";import"./Combination-CsG-0PjX.js";import"./label-3kCfBlTx.js";import"./popover-BxiKflDC.js";function I(){const{currency:c}=y(),[x,p]=g.useState({...C}),r=v({resolver:S(b),defaultValues:x,mode:"onChange"}),j=async s=>{p(s),f(e.jsx("pre",{className:"mt-2 w-[340px] rounded-md bg-slate-950 p-4",children:e.jsx("code",{className:"text-white",children:JSON.stringify(s,null,2)})}))};return e.jsx(E,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(j),className:"grid gap-4 md:gap-6 p-2 md:p-4 rounded-md border bg-muted/40",children:[e.jsx(h,{orientation:"left",children:"General Informations"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(o,{control:r.control,name:"name",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"name",children:"Customer Name"}),e.jsx(t,{children:e.jsx(d,{...s})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"email",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"email",children:"Email"}),e.jsx(t,{children:e.jsx(d,{...s,id:"email",type:"email",placeholder:"Enter email address",pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"})}),e.jsx(m,{children:"You don't have to provide your email, but if you do, we can create an account for you later to see your orders and purchases."}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"phone",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"phnoe",children:"Phone"}),e.jsx(t,{children:e.jsx(A,{defaultCountry:"TN",placeholder:"Enter a phone number",...s})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"fax",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"fax",children:"Fax"}),e.jsx(t,{children:e.jsx(d,{...s,id:"fax",type:"tel",placeholder:"Enter fax number",pattern:"^+?d{1,2}?[-s]?(?d{3})?[-s]?d{3}[-s]?d{4}$"})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"customerId",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"id",children:"Customer ID"}),e.jsx(t,{children:e.jsx(d,{id:"id",placeholder:"Enter customer ID",...s})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"creditLimit",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsxs(n,{htmlFor:"creditLimit",children:["Advance payment (",c==null?void 0:c.symbol,")"]}),e.jsx(t,{children:e.jsx(d,{id:"balance",type:"number",placeholder:"Enter balance",defaultValue:0,step:"0.01",min:0,...s,onChange:u=>{const i=parseFloat(u.target.value);s.onChange(typeof i=="number"&&i)}})}),e.jsx(l,{})]})})]}),e.jsx(h,{orientation:"left",className:"py-2",children:"Shipping Address"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(o,{control:r.control,name:"shippingAddress.street",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"street",children:"Street"}),e.jsx(t,{children:e.jsx(d,{id:"street",placeholder:"Enter street address",...s})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"shippingAddress.city",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"city",children:"City"}),e.jsx(t,{children:e.jsx(d,{id:"city",placeholder:"Enter city",...s})}),e.jsx(l,{})]})})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsx(o,{control:r.control,name:"shippingAddress.state",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"state",children:"State"}),e.jsx(t,{children:e.jsx(d,{id:"state",placeholder:"Enter state",...s})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"shippingAddress.postalCode",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"postalCode",children:"Postal Code"}),e.jsx(t,{children:e.jsx(d,{id:"postalCode",placeholder:"Enter postal code",...s})}),e.jsx(l,{})]})}),e.jsx(o,{control:r.control,name:"shippingAddress.country",render:({field:s})=>e.jsxs(a,{className:"space-y-2",children:[e.jsx(n,{htmlFor:"country",children:"Country"}),e.jsx(t,{children:e.jsx(d,{id:"country",placeholder:"Enter country",...s})}),e.jsx(l,{})]})})]}),e.jsx(o,{control:r.control,name:"identicalShippingAndBilling",render:({field:s})=>e.jsxs(a,{className:"flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",children:[e.jsx(t,{children:e.jsx(F,{checked:s.value,onCheckedChange:s.onChange})}),e.jsxs("div",{className:"space-y-1 leading-none",children:[e.jsx(n,{children:"Shipping address is the same as billing address"}),e.jsx(m,{children:"If your shipping address is identical to your billing address, you can check this box to save time. This way, you won't need to enter the same information twice."})]})]})}),e.jsx(N,{type:"submit",className:"ml-auto",children:"Save"})]})})}const O=()=>e.jsx(I,{});export{O as default};