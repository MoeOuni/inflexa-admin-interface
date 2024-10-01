import{J as U,K as W,M as _,e as Y,Z as xe,a6 as ne,g as l,j as e,a7 as pe,a1 as fe,a2 as y,a3 as je,a4 as Ce,a8 as ve,a9 as ye,aa as be,$ as we,ab as Ne,S as _e,u as A,B as j,m as Se,D as Z,n as ee,o as se,p as Pe,q as Re,I as S,E as Te,F as Ee,L as Fe,X as I,C as q,a as K,b as B,c as $,ac as De,H as He}from"./index-Cpj_313k.js";import{E as Me,u as ke,f as te,g as Oe,a as Ae,b as ze,c as Le}from"./index-BQcsQ1J8.js";import{T as re,a as oe,b as P,c as Q,d as ie,e as R}from"./table-CP6PtkBs.js";import{P as Ve,a as Ie,b as qe,c as Ke}from"./popover-DROVBhEs.js";import{c as N,u as Be}from"./category-query-keys-CRQZUgJa.js";import{z as v,u as $e,t as Qe,g as Ue,F as We,a as F,b as D,c as ae,d as H,e as M}from"./index-Bir7vsR2.js";import{B as Ye}from"./back-button-D-5gooSg.js";import{C as Ge,S as Je}from"./save-BqmzOMAP.js";import{T as Xe}from"./trash-2-BMyQxXfG.js";import{C as Ze}from"./circle-plus-B5cNmlKB.js";import{S as es}from"./square-plus-BaUgSyD7.js";function ss(){const s=U();return W({mutationFn:async a=>await Y.patch(`/categories/${a._id}`,a),onMutate:async()=>{await s.cancelQueries({queryKey:N.all})},onSuccess:()=>{_.success("Category updated successfully")},onError:a=>{var t,o;_.error(((o=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:o.message)||"An error occurred. Please try again.")},onSettled:()=>{s.invalidateQueries({queryKey:N.all})}})}const ts=async s=>await Y.post("/categories",s);function as(){const s=U();return W({mutationFn:ts,onSuccess:()=>{s.invalidateQueries({queryKey:N.all}),_.success("Category created successfully")},onError:n=>{var a,t;_.error(((t=(a=n==null?void 0:n.response)==null?void 0:a.data)==null?void 0:t.message)||"An error occurred. Please try again.")}})}function ns(){const s=U();return W({mutationFn:async a=>await Y.delete(`/categories/${a}`),onSuccess:()=>{s.invalidateQueries({queryKey:N.all}),_.success("Category deleted successfully")},onMutate:async()=>{await s.cancelQueries({queryKey:N.all})},onError:a=>{var t,o;_.error(((o=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:o.message)||"An error occurred. Please try again.")},onSettled:()=>{s.invalidateQueries({queryKey:N.all})}})}var V,G="HoverCard",[le,Fs]=xe(G,[ne]),z=ne(),[rs,J]=le(G),ce=s=>{const{__scopeHoverCard:n,children:a,open:t,defaultOpen:o,onOpenChange:m,openDelay:p=700,closeDelay:c=300}=s,d=z(n),C=l.useRef(0),f=l.useRef(0),b=l.useRef(!1),u=l.useRef(!1),[g=!1,r]=we({prop:t,defaultProp:o,onChange:m}),h=l.useCallback(()=>{clearTimeout(f.current),C.current=window.setTimeout(()=>r(!0),p)},[p,r]),w=l.useCallback(()=>{clearTimeout(C.current),!b.current&&!u.current&&(f.current=window.setTimeout(()=>r(!1),c))},[c,r]),T=l.useCallback(()=>r(!1),[r]);return l.useEffect(()=>()=>{clearTimeout(C.current),clearTimeout(f.current)},[]),e.jsx(rs,{scope:n,open:g,onOpenChange:r,onOpen:h,onClose:w,onDismiss:T,hasSelectionRef:b,isPointerDownOnContentRef:u,children:e.jsx(Ne,{...d,children:a})})};ce.displayName=G;var de="HoverCardTrigger",ue=l.forwardRef((s,n)=>{const{__scopeHoverCard:a,...t}=s,o=J(de,a),m=z(a);return e.jsx(pe,{asChild:!0,...m,children:e.jsx(fe.a,{"data-state":o.open?"open":"closed",...t,ref:n,onPointerEnter:y(s.onPointerEnter,O(o.onOpen)),onPointerLeave:y(s.onPointerLeave,O(o.onClose)),onFocus:y(s.onFocus,o.onOpen),onBlur:y(s.onBlur,o.onClose),onTouchStart:y(s.onTouchStart,p=>p.preventDefault())})})});ue.displayName=de;var os="HoverCardPortal",[Ds,is]=le(os,{forceMount:void 0}),k="HoverCardContent",me=l.forwardRef((s,n)=>{const a=is(k,s.__scopeHoverCard),{forceMount:t=a.forceMount,...o}=s,m=J(k,s.__scopeHoverCard);return e.jsx(je,{present:t||m.open,children:e.jsx(ls,{"data-state":m.open?"open":"closed",...o,onPointerEnter:y(s.onPointerEnter,O(m.onOpen)),onPointerLeave:y(s.onPointerLeave,O(m.onClose)),ref:n})})});me.displayName=k;var ls=l.forwardRef((s,n)=>{const{__scopeHoverCard:a,onEscapeKeyDown:t,onPointerDownOutside:o,onFocusOutside:m,onInteractOutside:p,...c}=s,d=J(k,a),C=z(a),f=l.useRef(null),b=Ce(n,f),[u,g]=l.useState(!1);return l.useEffect(()=>{if(u){const r=document.body;return V=r.style.userSelect||r.style.webkitUserSelect,r.style.userSelect="none",r.style.webkitUserSelect="none",()=>{r.style.userSelect=V,r.style.webkitUserSelect=V}}},[u]),l.useEffect(()=>{if(f.current){const r=()=>{g(!1),d.isPointerDownOnContentRef.current=!1,setTimeout(()=>{var w;((w=document.getSelection())==null?void 0:w.toString())!==""&&(d.hasSelectionRef.current=!0)})};return document.addEventListener("pointerup",r),()=>{document.removeEventListener("pointerup",r),d.hasSelectionRef.current=!1,d.isPointerDownOnContentRef.current=!1}}},[d.isPointerDownOnContentRef,d.hasSelectionRef]),l.useEffect(()=>{f.current&&us(f.current).forEach(h=>h.setAttribute("tabindex","-1"))}),e.jsx(ve,{asChild:!0,disableOutsidePointerEvents:!1,onInteractOutside:p,onEscapeKeyDown:t,onPointerDownOutside:o,onFocusOutside:y(m,r=>{r.preventDefault()}),onDismiss:d.onDismiss,children:e.jsx(ye,{...C,...c,onPointerDown:y(c.onPointerDown,r=>{r.currentTarget.contains(r.target)&&g(!0),d.hasSelectionRef.current=!1,d.isPointerDownOnContentRef.current=!0}),ref:b,style:{...c.style,userSelect:u?"text":void 0,WebkitUserSelect:u?"text":void 0,"--radix-hover-card-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-hover-card-content-available-width":"var(--radix-popper-available-width)","--radix-hover-card-content-available-height":"var(--radix-popper-available-height)","--radix-hover-card-trigger-width":"var(--radix-popper-anchor-width)","--radix-hover-card-trigger-height":"var(--radix-popper-anchor-height)"}})})}),cs="HoverCardArrow",ds=l.forwardRef((s,n)=>{const{__scopeHoverCard:a,...t}=s,o=z(a);return e.jsx(be,{...o,...t,ref:n})});ds.displayName=cs;function O(s){return n=>n.pointerType==="touch"?void 0:s()}function us(s){const n=[],a=document.createTreeWalker(s,NodeFilter.SHOW_ELEMENT,{acceptNode:t=>t.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});for(;a.nextNode();)n.push(a.currentNode);return n}var ms=ce,hs=ue,he=me;const gs=ms,xs=hs,ge=l.forwardRef(({className:s,align:n="center",sideOffset:a=4,...t},o)=>e.jsx(he,{ref:o,align:n,sideOffset:a,className:_e("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...t}));ge.displayName=he.displayName;const ps=s=>{const{t:n}=A();return e.jsxs(Ve,{children:[e.jsx(Ie,{asChild:!0,children:s.children}),e.jsx(qe,{className:"w-80",children:e.jsxs("div",{className:"grid gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h4",{className:"font-medium leading-none",children:s==null?void 0:s.confirmTitle}),e.jsx("p",{className:"text-sm text-muted-foreground",children:s==null?void 0:s.confirmText})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(Ke,{asChild:!0,children:e.jsx(j,{variant:"outline",size:"sm",children:n("confirm_cancel")})}),e.jsx(j,{size:"sm",onClick:s==null?void 0:s.confirmFunction,children:n("confirm_yes")})]})]})})]})};function fs({data:s,handleEdit:n,loading:a}){var w,T;const{t}=A(),o=ns(),[m,p]=l.useState([]),[c,d]=l.useState([]),[C,f]=l.useState({}),[b,u]=l.useState({}),g=async i=>{await o.mutateAsync(i)},r=[{accessorKey:"name",header:t("category_name_label"),cell:({row:i})=>e.jsx("div",{className:"capitalize",children:i.getValue("name")})},{accessorKey:"createdAt",header:t("category_created_at_label"),cell:({row:i})=>e.jsx("div",{className:"lowercase",children:Se(i.getValue("createdAt")).format("DD/MM/YYYY")})},{accessorKey:"subCategory",header:t("category_sub_category_key"),cell:({row:i})=>{var E,X;const x=(E=i.original.subCategories)==null?void 0:E.length;return e.jsxs(gs,{children:[e.jsx(xs,{asChild:!0,children:e.jsxs(j,{variant:"link",className:"font-medium",children:[x," ",t("category_sub_category_mini_unit")]})}),e.jsx(ge,{className:"w-80",children:e.jsx("ul",{className:"my-2 ml-5 list-disc [&>li]:mt-2",children:(X=i.original.subCategories)==null?void 0:X.map(L=>e.jsxs("li",{children:[e.jsx("div",{className:"capitalize",children:L.name}),e.jsx("div",{className:"text-sm text-muted-foreground",children:L.description})]},L._id))})})]})}},{id:"actions",enableHiding:!1,cell:({row:i})=>e.jsxs(Z,{children:[e.jsx(ee,{asChild:!0,children:e.jsxs(j,{variant:"ghost",className:"h-8 w-8 p-0",children:[e.jsx("span",{className:"sr-only",children:t("open_menu")}),e.jsx(Me,{className:"h-4 w-4"})]})}),e.jsxs(se,{align:"end",children:[e.jsx(Pe,{children:t("actions")}),e.jsx(j,{size:"sm",variant:"ghost",className:"w-full flex justify-start",onClick:()=>{n(i.original)},children:t("category_edit_button")}),e.jsx(Re,{}),e.jsx(ps,{confirmFunction:()=>g(String(i.original._id)),confirmTitle:t("category_delete_confirm_title"),confirmText:t("category_delete_confirm_text"),children:e.jsx(j,{size:"sm",variant:"ghost",className:"w-full flex justify-start",children:t("category_delete_button")})})]})]})}],h=ke({data:s,columns:r,onSortingChange:p,onColumnFiltersChange:d,getCoreRowModel:Oe(),getPaginationRowModel:Ae(),getSortedRowModel:ze(),getFilteredRowModel:Le(),onColumnVisibilityChange:f,onRowSelectionChange:u,initialState:{pagination:{pageIndex:0,pageSize:10}},state:{sorting:m,columnFilters:c,columnVisibility:C,rowSelection:b}});return e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"flex items-center pb-4",children:[e.jsx(S,{placeholder:t("search_category"),value:((w=h.getColumn("name"))==null?void 0:w.getFilterValue())??"",onChange:i=>{var x;return(x=h.getColumn("name"))==null?void 0:x.setFilterValue(i.target.value)},className:"max-w-sm"}),e.jsxs(Z,{children:[e.jsx(ee,{asChild:!0,children:e.jsxs(j,{variant:"outline",className:"ml-auto",children:[t("columns")," ",e.jsx(Te,{className:"ml-2 h-4 w-4"})]})}),e.jsx(se,{align:"end",children:h.getAllColumns().filter(i=>i.getCanHide()).map(i=>{var x;return e.jsx(Ee,{className:"capitalize",checked:i.getIsVisible(),onCheckedChange:E=>i.toggleVisibility(!!E),children:String((x=i.columnDef)==null?void 0:x.header)},i.id)})})]})]}),e.jsx("div",{className:"rounded-md border",children:e.jsxs(re,{children:[e.jsx(oe,{children:h.getHeaderGroups().map(i=>e.jsx(P,{children:i.headers.map(x=>e.jsx(Q,{children:x.isPlaceholder?null:te(x.column.columnDef.header,x.getContext())},x.id))},i.id))}),e.jsx(ie,{children:(T=h.getRowModel().rows)!=null&&T.length?h.getRowModel().rows.map(i=>e.jsx(P,{"data-state":i.getIsSelected()&&"selected",children:i.getVisibleCells().map(x=>e.jsx(R,{children:te(x.column.columnDef.cell,x.getContext())},x.id))},i.id)):e.jsx(P,{children:e.jsx(R,{colSpan:r==null?void 0:r.length,className:"h-24 text-center",children:a?e.jsx("div",{className:"flex justify-center",children:e.jsx(Fe,{className:"mr-2 h-5 w-5 animate-spin"})}):t("no_result")})})})]})}),e.jsx("div",{className:"flex items-center justify-end space-x-2 py-4",children:e.jsxs("div",{className:"space-x-2",children:[e.jsx(j,{variant:"outline",size:"sm",onClick:()=>h.previousPage(),disabled:!h.getCanPreviousPage(),children:t("previous")}),e.jsx(j,{variant:"outline",size:"sm",onClick:()=>h.nextPage(),disabled:!h.getCanNextPage(),children:t("next")})]})})]})}const js=v.object({name:v.string().min(2,{message:"Name is required"}),description:v.string().optional(),image:v.string().optional(),subCategories:v.array(v.object({name:v.string().nonempty("Name is required"),description:v.string().optional(),image:v.string().optional()})).optional()});function Cs({selectedCategory:s,handleChangeView:n}){const{t:a}=A(),t=as(),o=ss(),[m,p]=I.useState(s||void 0),c=$e({resolver:Qe(js),defaultValues:m,mode:"onChange"}),{fields:d,append:C,remove:f}=Ue({name:"subCategories",control:c.control});async function b(u){p(u);let g;s?(o.mutate({...u,_id:s==null?void 0:s._id}),g=o.status):(t.mutate(u),g=t.status),g==="success"&&(p(void 0),d.forEach((r,h)=>f(h)),c.reset())}return e.jsx("div",{className:"pb-2",children:e.jsx(We,{...c,children:e.jsxs("form",{onSubmit:c.handleSubmit(b),className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(Ye,{onClick:n}),e.jsx("h1",{className:"flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0",children:"New Category"}),e.jsxs("div",{className:"hidden items-center gap-2 md:ml-auto md:flex",children:[e.jsxs(j,{type:"button",variant:"outline",size:"sm",className:"h-8 gap-1",onClick:()=>{p(void 0),d.forEach((u,g)=>f(g)),c.reset({name:"",description:"",image:""})},children:[e.jsx(Ge,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:"Discard"})]}),e.jsxs(j,{type:"submit",size:"sm",disabled:t.isPending,className:"h-8 gap-1",children:[e.jsx(Je,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:a("save_category_button")})]})]})]}),e.jsxs(q,{children:[e.jsx(K,{children:e.jsx(B,{children:"Parent Category"})}),e.jsxs($,{children:[e.jsx(F,{control:c.control,name:"name",render:({field:u})=>e.jsxs(D,{children:[e.jsx(ae,{children:a("category_name_label")}),e.jsx(H,{children:e.jsx(S,{...u,disabled:t.isPending})}),e.jsx(M,{})]})}),e.jsx(F,{control:c.control,name:"description",render:({field:u})=>e.jsxs(D,{children:[e.jsx(ae,{children:a("category_description_label")}),e.jsx(H,{children:e.jsx(S,{...u,disabled:t.isPending})}),e.jsx(M,{})]})})]})]}),e.jsxs(q,{children:[e.jsx(K,{children:e.jsx(B,{children:a("category_sub_category_key")})}),e.jsx($,{children:e.jsxs(re,{children:[e.jsx(oe,{children:e.jsxs(P,{children:[e.jsx(Q,{children:a("category_name_label")}),e.jsx(Q,{children:a("category_description_label")})]})}),e.jsx(ie,{children:d.map((u,g)=>e.jsxs(P,{children:[e.jsx(R,{children:e.jsx(F,{control:c.control,name:`subCategories.${g}.name`,render:({field:r})=>e.jsxs(D,{children:[e.jsx(H,{children:e.jsx(S,{...r,disabled:t.isPending})}),e.jsx(M,{})]})})}),e.jsx(R,{children:e.jsx(F,{control:c.control,name:`subCategories.${g}.description`,render:({field:r})=>e.jsxs(D,{children:[e.jsx(H,{children:e.jsx(S,{...r,disabled:t.isPending})}),e.jsx(M,{})]})})}),e.jsx(R,{children:e.jsx(j,{variant:"ghost",onClick:()=>f(g),className:"",size:"sm",disabled:t.isPending,children:e.jsx(Xe,{className:"h-5"})})})]}))})]})}),e.jsx(De,{className:"justify-center border-t p-4",children:e.jsxs(j,{size:"sm",type:"button",variant:"ghost",disabled:t.isPending,onClick:()=>C({name:"",description:"",image:""}),className:"gap-1",children:[e.jsx(Ze,{className:"h-3.5 w-3.5"}),a("category_sub_category_add_button")]})})]})]})})})}const Hs=()=>{var d;const{t:s}=A(),n=Be(),[a,t]=I.useState("table"),[o,m]=I.useState(null),p=()=>{t(a==="table"?"form":"table")},c=C=>{m(C||null),C&&t("form")};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"pb-3",children:a==="table"&&e.jsx("div",{className:"justify-between w-full flex items-center gap-2",children:e.jsxs(j,{size:"sm",className:"h-8 gap-1",onClick:p,children:[e.jsx(es,{className:"h-3.5 w-3.5"}),e.jsx("span",{className:"sr-only sm:not-sr-only sm:whitespace-nowrap",children:s("category_add_button")})]})})}),a!=="table"?e.jsx(Cs,{selectedCategory:o,setSelectedCategory:m,handleChangeView:p}):e.jsxs(q,{"x-chunk":"dashboard-04-chunk-1",children:[e.jsxs(K,{children:[e.jsx(B,{children:s("categories")}),e.jsx(He,{children:s("categories_table_description")})]}),e.jsx($,{children:e.jsx(fs,{data:((d=n==null?void 0:n.data)==null?void 0:d.data)??[],handleEdit:c,loading:n.isLoading})})]})]})};export{Hs as default};
