import{d as n,e as i,N as r,j as s,S as d,L as x}from"./index-Cpj_313k.js";import{o as h}from"./order-query-keys-CKvnANFa.js";import{S as c}from"./separator-CbIO-aeg.js";function m({params:a}){const t=async()=>(await i.get(`/orders${a!=null&&a.status?`?status=${a.status}`:""}`)).data;return n({queryKey:a!=null&&a.status?h.status(a==null?void 0:a.status):h.all,queryFn:t})}function u(a){const t=async()=>(await i.get(`/orders/${a}`)).data;return n({queryKey:h.detail(a),queryFn:t})}/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=r("Archive",[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=r("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=r("FileDown",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=r("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);function e({className:a,...t}){return s.jsx("div",{className:d("animate-pulse rounded-md bg-primary/10",a),...t})}const g=()=>s.jsxs("div",{className:"flex flex-col p-7 min-h-[600px]",children:[s.jsx(x,{className:"mr-2 h-5 w-5 animate-spin mb-4"}),s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsx(e,{className:"h-8 w-[60%]"}),s.jsx(e,{className:"h-5 w-[25%]"})]}),s.jsx(e,{className:"h-5 w-[50%] my-2"}),s.jsx(c,{}),s.jsxs("div",{className:"grid gap-2 my-4",children:[s.jsx(e,{className:"h-8 w-[50%]"}),s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"})]}),s.jsx(c,{}),s.jsxs("div",{className:"grid gap-2 my-4",children:[s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"})]}),s.jsx(c,{}),s.jsxs("div",{className:"grid gap-2 my-4 grid-cols-2",children:[s.jsx(e,{className:"h-6 w-[70%]"}),s.jsx(e,{className:"h-6 w-[70%]"}),s.jsx(e,{className:"h-20 w-[100%]"}),s.jsx(e,{className:"h-20 w-[100%]"})]}),s.jsx(c,{}),s.jsxs("div",{className:"grid gap-2 my-4 ",children:[s.jsx(e,{className:"h-8 w-[50%]"}),s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"}),s.jsx(e,{className:"h-5 w-[100%]"})]})]});export{w as A,N as C,p as F,g as O,v as R,m as a,u};
