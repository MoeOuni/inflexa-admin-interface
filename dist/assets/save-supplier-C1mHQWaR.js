import{g as v,A as g,m as F,d as C,R as k,j as s}from"./index-3nPIAQnH.js";import{z as o,u as E,F as A,a as d,b as t,c,d as m,e as x,t as w}from"./index-CWNnVEfM.js";import{I as j}from"./input-CN_5s6Mi.js";import{T as y}from"./textarea-DKckVzxn.js";import{B as I}from"./button-CtZ5qbJi.js";import{D as f,P as Q}from"./phone-input-DB-SBfnx.js";import{i as T}from"./command-D_T3vcN9.js";import{u as N}from"./useMutation-D9iDBiiT.js";import{s as h}from"./supplier-query-keys-DIv9u3_S.js";import{a as p,u as K}from"./api-clients-BUUlQTs0.js";import"./label-3kCfBlTx.js";import"./popover-BxiKflDC.js";import"./Combination-CsG-0PjX.js";import"./check-BMG6f9gN.js";import"./index-G51GvTtm.js";function D({status:a}){const n=v();return N({mutationFn:async i=>await p.put(`/suppliers/${i._id}`,i),onMutate:async()=>{await n.cancelQueries({queryKey:[h.all,a]})},onSuccess:()=>{g.success("Supplier updated successfully")},onError:i=>{var u,b;g.error(((b=(u=i==null?void 0:i.response)==null?void 0:u.data)==null?void 0:b.message)||"An error occurred. Please try again.")},onSettled:()=>{n.invalidateQueries({queryKey:[h.all,a]})}})}function L(){const{id:a}=F(),n=async()=>{if(a){const{data:e}=await p.get(`/suppliers/${a}`);return e}};return K({queryKey:h.detail(a),queryFn:n,retry:1})}const M=async a=>await p.post("/suppliers",a);function R(){const a=v();return N({mutationFn:M,onSuccess:()=>{a.invalidateQueries({queryKey:h.all}),g.success("Supplier created successfully ")},onError:n=>{var e,i;g.error(((i=(e=n==null?void 0:n.response)==null?void 0:e.data)==null?void 0:i.message)||"An error occurred. Please try again.")}})}const $=o.object({supplierCode:o.string().min(1,"Supplier code is required"),email:o.string().email("Invalid email address").optional(),companyName:o.string().min(1,"Company name is required"),taxNumber:o.string().min(1,"Tax Number is required"),representative:o.string().optional(),phoneNumber:o.string().refine(T,{message:"Invalid phone number"}).optional(),address:o.string().optional(),description:o.string().optional(),logo:o.string().optional(),proficPic:o.string().optional(),banque:o.object({_rib:o.string().optional(),_iban:o.string().optional(),_bic:o.string().optional(),_representative:o.string().optional(),_agency:o.string().optional()}).optional()});function P({editValues:a}){const n=R(),e=D({status:"ACTIVE"}),{t:i}=C(),[u,b]=k.useState(a||void 0),l=E({resolver:w($),defaultValues:u,mode:"onChange"});async function q(r){let _;a?(await e.mutateAsync({_id:a==null?void 0:a._id,...r}),_=e.status):(await n.mutateAsync({...r}),_=n.status),_==="success"&&(b(void 0),l.reset())}return s.jsx(A,{...l,children:s.jsxs("form",{onSubmit:l.handleSubmit(q),className:"grid gap-6 p-4 rounded-md border bg-muted/40",children:[s.jsx(f,{orientation:"left",children:i("supplier_general_information_label")}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[s.jsx(d,{control:l.control,name:"companyName",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_company_name_label")}),s.jsx(m,{children:s.jsx(j,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"supplierCode",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_code_label")}),s.jsx(m,{children:s.jsx(j,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"taxNumber",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_tax_number_label")}),s.jsx(m,{children:s.jsx(j,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"representative",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_representative_label")}),s.jsx(m,{children:s.jsx(j,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"phoneNumber",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_phone_label")}),s.jsx(m,{children:s.jsx(Q,{disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending),defaultCountry:"TN",placeholder:"Enter a phone number",...r})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"email",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_email_label")}),s.jsx(m,{children:s.jsx(j,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending),placeholder:"Enter Email"})}),s.jsx(x,{})]})})]}),s.jsx(d,{control:l.control,name:"address",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_address_label")}),s.jsx(m,{children:s.jsx(y,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"description",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_description_label")}),s.jsx(m,{children:s.jsx(y,{...r,disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx("div",{className:"grid gap-4",children:s.jsxs("div",{className:"grid gap-6",children:[s.jsx(f,{orientation:"left",children:i("supplier_bank_info_label_optional")}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[s.jsx(d,{control:l.control,name:"banque._rib",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_bank_rib_label")}),s.jsx(m,{children:s.jsx(j,{id:"rib",...r,placeholder:i("supplier_bank_rib_placeholder"),disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"banque._iban",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_bank_iban_label")}),s.jsx(m,{children:s.jsx(j,{id:"iban",...r,placeholder:i("supplier_bank_iban_placeholder"),disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"banque._bic",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_bank_bic_label")}),s.jsx(m,{children:s.jsx(j,{id:"bic",...r,placeholder:i("supplier_bank_bic_placeholder"),disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})}),s.jsx(d,{control:l.control,name:"banque._representative",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_bank_representative_label")}),s.jsx(m,{children:s.jsx(j,{id:"representative",...r,placeholder:i("supplier_bank_representative_placeholder"),disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})})]}),s.jsx("div",{className:"grid gap-6",children:s.jsx(d,{control:l.control,name:"banque._agency",render:({field:r})=>s.jsxs(t,{children:[s.jsx(c,{children:i("supplier_bank_agency_label")}),s.jsx(m,{children:s.jsx(j,{...r,id:"agency",placeholder:i("supplier_bank_agency_placeholder"),disabled:(n==null?void 0:n.isPending)||(e==null?void 0:e.isPending)})}),s.jsx(x,{})]})})})]})}),s.jsx("div",{className:"flex justify-end",children:s.jsx(I,{type:"submit",children:i(a?"supplier_edit_button":"supplier_save_button")})})]})})}const es=()=>{var e;const a=L(),{id:n}=F();return s.jsxs(s.Fragment,{children:[a.isLoading&&s.jsx("div",{children:"Loading..."}),a.isSuccess&&s.jsx(P,{editValues:a!=null&&a.data?(e=a==null?void 0:a.data)==null?void 0:e.supplier:void 0}),!n&&s.jsx(P,{editValues:void 0})]})};export{es as default};