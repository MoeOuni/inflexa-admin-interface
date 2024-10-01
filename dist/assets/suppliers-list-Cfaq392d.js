import{J as V,K as k,M as y,e as I,u as M,G as K,j as e,D,n as E,B as h,o as T,p as z,q,s as m,t as p,v as u,w as j,x as t,y as v,g as C,I as O,E as U,F as w,L as W,C as X,a as Y,b as Z,H as ee,c as se}from"./index-Cpj_313k.js";import{u as ae}from"./use-supplier-BIoiUAGX.js";import{E as ne,u as le,f as F,g as re,a as ie,b as ce,c as te}from"./index-BQcsQ1J8.js";import{T as oe,a as de,b as S,c as he,d as xe,e as P}from"./table-CP6PtkBs.js";import{s as x}from"./supplier-query-keys-DIv9u3_S.js";import{F as b}from"./file-text-D4otMC9N.js";import{U as g,S as A}from"./user-DAfLxH3c.js";import{C as f}from"./clipboard-list-BjL4G2Ay.js";import{C as me}from"./circle-check-big-CWDsQ4M3.js";import{S as pe}from"./square-plus-BaUgSyD7.js";import{L as ue,F as je}from"./list-filter-CdU8SF-_.js";function ge({status:a}){const l=V();return k({mutationFn:async n=>await I.patch(`/suppliers/${n}/archive`),onSuccess:()=>{l.invalidateQueries({queryKey:[x.all,a]}),y.success("Supplier archived successfully")},onMutate:async()=>{await l.cancelQueries({queryKey:[x.all,a]})},onError:n=>{var r,c;y.error(((c=(r=n==null?void 0:n.response)==null?void 0:r.data)==null?void 0:c.message)||"An error occurred. Please try again.")},onSettled:()=>{l.invalidateQueries({queryKey:[x.all,a]})}})}function Ce({status:a}){const l=V();return k({mutationFn:async n=>await I.patch(`/suppliers/${n}/restore`),onSuccess:()=>{l.invalidateQueries({queryKey:[x.all,a]}),y.success("Supplier restored successfully")},onMutate:async()=>{await l.cancelQueries({queryKey:[x.all,a]})},onError:n=>{var r,c;y.error(((c=(r=n==null?void 0:n.response)==null?void 0:r.data)==null?void 0:c.message)||"An error occurred. Please try again.")},onSettled:()=>{l.invalidateQueries({queryKey:[x.all,a]})}})}function Ne({supplier:a,status:l}){const{t:d}=M(),n=ge({status:l}),r=Ce({status:l}),c=K();return e.jsxs(D,{children:[e.jsx(E,{asChild:!0,children:e.jsxs(h,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:d("open_menu")}),e.jsx(ne,{className:"h-4 w-4"})]})}),e.jsxs(T,{className:"w-64",children:[e.jsx(z,{children:"Supplier Actions"}),e.jsx(q,{}),e.jsxs(m,{children:[e.jsxs(p,{children:[e.jsx(b,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Exports"})]}),e.jsx(u,{children:e.jsxs(j,{children:[e.jsxs(t,{children:[e.jsx(b,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Export Profiles"})]}),e.jsxs(t,{children:[e.jsx(b,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Export Transactions"})]})]})})]}),e.jsxs(m,{children:[e.jsxs(p,{children:[e.jsx(g,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Profile Management"})]}),e.jsx(u,{children:e.jsxs(j,{children:[e.jsxs(t,{children:[e.jsx(g,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"View Profile"})]}),e.jsxs(t,{onClick:()=>c(`/suppliers/save/${(a==null?void 0:a._id)||""}`),children:[e.jsx(g,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Edit Profile"})]}),e.jsxs(t,{children:[e.jsx(g,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Delete Profile"})]}),e.jsxs(t,{onClick:()=>{l==="ACTIVE"?n.mutate((a==null?void 0:a._id)||""):r.mutate((a==null?void 0:a._id)||"")},children:[e.jsx(g,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:l==="ACTIVE"?"Archive Profile":"Restore Profile"})]})]})})]}),e.jsxs(m,{children:[e.jsxs(p,{children:[e.jsx(f,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Orders"})]}),e.jsx(u,{children:e.jsxs(j,{children:[e.jsxs(t,{children:[e.jsx(f,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"View Order History"})]}),e.jsxs(t,{children:[e.jsx(f,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Process Return"})]})]})})]}),e.jsxs(m,{children:[e.jsxs(p,{children:[e.jsx(v,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Reports and Analytics"})]}),e.jsx(u,{children:e.jsxs(j,{children:[e.jsxs(t,{children:[e.jsx(v,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Generate Performance Report"})]}),e.jsxs(t,{children:[e.jsx(v,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Analyze Supply Trends"})]})]})})]}),e.jsxs(m,{children:[e.jsxs(p,{children:[e.jsx(A,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Supplier Verification"})]}),e.jsx(u,{children:e.jsxs(j,{children:[e.jsxs(t,{children:[e.jsx(A,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Verify Contact Information"})]}),e.jsxs(t,{children:[e.jsx(me,{className:"mr-2 h-4 w-4"}),e.jsx("span",{children:"Validate Credentials"})]})]})})]})]})]})}const we=({data:a,status:l,loading:d})=>{var R,_;const{t:n}=M(),[r,c]=C.useState([]),[H,L]=C.useState([]),[Q,B]=C.useState({}),[$,G]=C.useState({}),N=[{accessorKey:"Supplier code",header:n("supplier_code_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.supplierCode})},{accessorKey:"companyName",header:n("supplier_company_name_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.companyName})},{accessorKey:"Address",header:n("supplier_address_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.address})},{accessorKey:"Telephone",header:n("supplier_phone_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.phoneNumber})},{accessorKey:"Tax number",header:n("supplier_tax_number_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.taxNumber})},{accessorKey:"Representative/trustee",header:n("supplier_representative_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.representative})},{id:"actions",enableHiding:!1,cell:({row:s})=>e.jsx(Ne,{supplier:s==null?void 0:s.original,status:l})}],o=le({data:a,columns:N,onSortingChange:c,onColumnFiltersChange:L,getCoreRowModel:re(),getPaginationRowModel:ie(),getSortedRowModel:ce(),getFilteredRowModel:te(),onColumnVisibilityChange:B,onRowSelectionChange:G,state:{sorting:r,columnFilters:H,columnVisibility:Q,rowSelection:$}});return e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"flex items-center pb-4",children:[e.jsx(O,{placeholder:"Search supplier...",value:((R=o.getColumn("companyName"))==null?void 0:R.getFilterValue())??"",onChange:s=>{var i;return(i=o.getColumn("companyName"))==null?void 0:i.setFilterValue(s.target.value)},className:"max-w-sm"}),e.jsxs(D,{children:[e.jsx(E,{asChild:!0,children:e.jsxs(h,{variant:"outline",className:"ml-auto",children:["Columns ",e.jsx(U,{className:"ml-2 h-4 w-4"})]})}),e.jsx(T,{align:"end",children:o.getAllColumns().filter(s=>s.getCanHide()).map(s=>{var i;return e.jsx(w,{className:"capitalize",checked:s.getIsVisible(),onCheckedChange:J=>s.toggleVisibility(!!J),children:String((i=s.columnDef)==null?void 0:i.header)},s.id)})})]})]}),e.jsx("div",{className:"rounded-md border",children:e.jsxs(oe,{children:[e.jsx(de,{children:o.getHeaderGroups().map(s=>e.jsx(S,{children:s.headers.map(i=>e.jsx(he,{children:i.isPlaceholder?null:F(i.column.columnDef.header,i.getContext())},i.id))},s.id))}),e.jsx(xe,{children:(_=o.getRowModel().rows)!=null&&_.length?o.getRowModel().rows.map(s=>e.jsx(S,{"data-state":s.getIsSelected()&&"selected",children:s.getVisibleCells().map(i=>e.jsx(P,{children:F(i.column.columnDef.cell,i.getContext())},i.id))},s.id)):e.jsx(S,{children:e.jsx(P,{colSpan:N==null?void 0:N.length,className:"h-24 text-center",children:d?e.jsx("div",{className:"flex justify-center",children:e.jsx(W,{className:"mr-2 h-5 w-5 animate-spin"})}):n("no_result")})})})]})}),e.jsx("div",{className:"flex items-center justify-end space-x-2 py-4",children:e.jsxs("div",{className:"space-x-2",children:[e.jsx(h,{variant:"outline",size:"sm",onClick:()=>o.previousPage(),disabled:!o.getCanPreviousPage(),children:n("previous")}),e.jsx(h,{variant:"outline",size:"sm",onClick:()=>o.nextPage(),disabled:!o.getCanNextPage(),children:n("next")})]})})]})},Fe=()=>{var c;const[a,l]=C.useState("ACTIVE"),{t:d}=M(),n=K(),r=ae({status:a});return e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center pb-3",children:[e.jsxs(h,{size:"sm",className:"h-8 gap-1",onClick:()=>n("/suppliers/save"),children:[e.jsx(pe,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:d("supplier_add_button")})]}),e.jsxs("div",{className:"ml-auto flex items-center gap-2",children:[e.jsxs(D,{children:[e.jsx(E,{asChild:!0,children:e.jsxs(h,{variant:"outline",size:"sm",className:"h-8 gap-1",children:[e.jsx(ue,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:"Filter"})]})}),e.jsxs(T,{align:"end",children:[e.jsx(z,{children:"Filter by"}),e.jsx(q,{}),e.jsx(w,{onClick:()=>{l("ACTIVE")},checked:a==="ACTIVE",children:"Active"}),e.jsx(w,{onClick:()=>{l("DELETED")},checked:a==="DELETED",children:"Deleted"}),e.jsx(w,{onClick:()=>{l("ARCHIVED")},checked:a==="ARCHIVED",children:"Archived"})]})]}),e.jsxs(h,{size:"sm",variant:"outline",className:"h-8 gap-1",children:[e.jsx(je,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:"Export"})]})]})]}),e.jsxs(X,{"x-chunk":"dashboard-06-chunk-0",children:[e.jsxs(Y,{children:[e.jsx(Z,{children:d("suppliers")}),e.jsx(ee,{children:d("suppliers_table_description")})]}),e.jsx(se,{children:e.jsx(we,{data:((c=r==null?void 0:r.data)==null?void 0:c.data)??[],status:a,loading:r==null?void 0:r.isLoading})})]})]})};export{Fe as default};
