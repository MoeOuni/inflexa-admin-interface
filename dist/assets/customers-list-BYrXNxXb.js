import{d as _,r as o,j as e,T as M}from"./index-3nPIAQnH.js";import{E as R,u as D,C as T,T as z,a as I,b as r,c as P,f as m,d as V,e as g,g as F,h as k,i as A,j as H}from"./table-D1Irnn66.js";import{B as i}from"./button-CtZ5qbJi.js";import{D as u,a as x,b as h,d as K,e as E,f as B}from"./dropdown-menu-DlVyJQqp.js";import{I as L}from"./input-CN_5s6Mi.js";import{A as O,a as W}from"./arrow-down-wide-narrow-DJ376HxP.js";import"./index-_x51y03b.js";import"./check-BMG6f9gN.js";import"./Combination-CsG-0PjX.js";function q({data:p}){var c,d;const{t:a}=_(),[j,C]=o.useState([]),[w,b]=o.useState([]),[N,S]=o.useState({}),[v,f]=o.useState({}),n=[{accessorKey:"customerID",header:a("customer_id_label"),cell:({row:s})=>e.jsx("div",{children:s.original.customerId})},{accessorKey:"name",header:a("customer_name_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.name})},{accessorKey:"email",header:a("customer_email_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.email})},{accessorKey:"phone",header:a("customer_phone_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.phone})},{accessorKey:"billingAddress",header:a("customer_billing_city_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.billingAddress})},{accessorKey:"totalSpent",header:a("customer_total_spent_label"),cell:({row:s})=>e.jsx("div",{className:"capitalize",children:s.original.totalSpent})},{id:"actions",enableHiding:!1,cell:()=>e.jsxs(u,{children:[e.jsx(x,{asChild:!0,children:e.jsxs(i,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:a("open_menu")}),e.jsx(R,{className:"h-4 w-4"})]})}),e.jsxs(h,{align:"end",children:[e.jsx(K,{children:a("actions")}),e.jsx(i,{size:"sm",variant:"ghost",className:"w-full flex justify-start",children:a("category_edit_button")}),e.jsx(E,{})]})]})}],t=D({data:p,columns:n,onSortingChange:C,onColumnFiltersChange:b,getCoreRowModel:F(),getPaginationRowModel:k(),getSortedRowModel:A(),getFilteredRowModel:H(),onColumnVisibilityChange:S,onRowSelectionChange:f,initialState:{pagination:{pageIndex:0,pageSize:6}},state:{sorting:j,columnFilters:w,columnVisibility:N,rowSelection:v}});return e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"flex items-center py-4",children:[e.jsx(L,{placeholder:a("search_customer"),value:((c=t.getColumn("name"))==null?void 0:c.getFilterValue())??"",onChange:s=>{var l;return(l=t.getColumn("name"))==null?void 0:l.setFilterValue(s.target.value)},className:"max-w-sm"}),e.jsxs(u,{children:[e.jsx(x,{asChild:!0,children:e.jsxs(i,{variant:"outline",className:"ml-auto",children:[a("columns")," ",e.jsx(T,{className:"ml-2 h-4 w-4"})]})}),e.jsx(h,{align:"end",children:t.getAllColumns().filter(s=>s.getCanHide()).map(s=>{var l;return e.jsx(B,{className:"capitalize",checked:s.getIsVisible(),onCheckedChange:y=>s.toggleVisibility(!!y),children:String((l=s.columnDef)==null?void 0:l.header)},s.id)})})]})]}),e.jsx("div",{className:"rounded-md border",children:e.jsxs(z,{children:[e.jsx(I,{children:t.getHeaderGroups().map(s=>e.jsx(r,{children:s.headers.map(l=>e.jsx(P,{children:l.isPlaceholder?null:e.jsxs("div",{className:l.column.getCanSort()?"cursor-pointer select-none flex items-center":"",onClick:l.column.getToggleSortingHandler(),children:[e.jsx(M,{title:l.column.getCanSort()?l.column.getNextSortingOrder()==="asc"?"Sort ascending":l.column.getNextSortingOrder()==="desc"?"Sort descending":"Clear sort":void 0,children:m(l.column.columnDef.header,l.getContext())}),{asc:e.jsx(O,{className:"h-4 w-4 ml-2"}),desc:e.jsx(W,{className:"h-4 w-4 ml-2"})}[l.column.getIsSorted()]??null]})},l.id))},s.id))}),e.jsx(V,{children:(d=t.getRowModel().rows)!=null&&d.length?t.getRowModel().rows.map(s=>e.jsx(r,{"data-state":s.getIsSelected()&&"selected",children:s.getVisibleCells().map(l=>e.jsx(g,{children:m(l.column.columnDef.cell,l.getContext())},l.id))},s.id)):e.jsx(r,{children:e.jsx(g,{colSpan:n==null?void 0:n.length,className:"h-24 text-center",children:"No results."})})})]})}),e.jsx("div",{className:"flex items-center justify-end space-x-2 py-4",children:e.jsxs("div",{className:"space-x-2",children:[e.jsx(i,{variant:"outline",size:"sm",onClick:()=>t.previousPage(),disabled:!t.getCanPreviousPage(),children:a("previous")}),e.jsx(i,{variant:"outline",size:"sm",onClick:()=>t.nextPage(),disabled:!t.getCanNextPage(),children:a("next")})]})})]})}const se=()=>e.jsx("div",{children:e.jsx(q,{data:[]})});export{se as default};
