import{ap as ee,R as S,as as F,aN as de,r as t,_ as v,aO as $e,$ as A,aq as g,au as Ce,ar as te,av as He,aw as qe,aP as Me,ax as Re,ay as Qe,aQ as Ze}from"./index-3nPIAQnH.js";import{$ as pe,a as W}from"./check-BMG6f9gN.js";import{$ as Ie,a as Je,h as et,b as tt,c as nt,R as ot}from"./Combination-CsG-0PjX.js";function Pe(e){const o=e+"CollectionProvider",[n,c]=ee(o),[r,a]=n(o,{collectionRef:{current:null},itemMap:new Map}),u=m=>{const{scope:i,children:_}=m,h=S.useRef(null),x=S.useRef(new Map).current;return S.createElement(r,{scope:i,itemMap:x,collectionRef:h},_)},d=e+"CollectionSlot",f=S.forwardRef((m,i)=>{const{scope:_,children:h}=m,x=a(d,_),E=F(i,x.collectionRef);return S.createElement(de,{ref:E},h)}),$=e+"CollectionItemSlot",l="data-radix-collection-item",s=S.forwardRef((m,i)=>{const{scope:_,children:h,...x}=m,E=S.useRef(null),D=F(i,E),R=a($,_);return S.useEffect(()=>(R.itemMap.set(E,{ref:E,...x}),()=>void R.itemMap.delete(E))),S.createElement(de,{[l]:"",ref:D},h)});function b(m){const i=a(e+"CollectionConsumer",m);return S.useCallback(()=>{const h=i.collectionRef.current;if(!h)return[];const x=Array.from(h.querySelectorAll(`[${l}]`));return Array.from(i.itemMap.values()).sort((R,U)=>x.indexOf(R.ref.current)-x.indexOf(U.ref.current))},[i.collectionRef,i.itemMap])}return[{Provider:u,Slot:f,ItemSlot:s},b,c]}const ue="rovingFocusGroup.onEntryFocus",ct={bubbles:!1,cancelable:!0},be="RovingFocusGroup",[ie,Se,rt]=Pe(be),[at,De]=ee(be,[rt]),[st,ut]=at(be),dt=t.forwardRef((e,o)=>t.createElement(ie.Provider,{scope:e.__scopeRovingFocusGroup},t.createElement(ie.Slot,{scope:e.__scopeRovingFocusGroup},t.createElement(it,v({},e,{ref:o}))))),it=t.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,orientation:c,loop:r=!1,dir:a,currentTabStopId:u,defaultCurrentTabStopId:d,onCurrentTabStopIdChange:f,onEntryFocus:$,...l}=e,s=t.useRef(null),b=F(o,s),m=Ie(a),[i=null,_]=pe({prop:u,defaultProp:d,onChange:f}),[h,x]=t.useState(!1),E=$e($),D=Se(n),R=t.useRef(!1),[U,B]=t.useState(0);return t.useEffect(()=>{const w=s.current;if(w)return w.addEventListener(ue,E),()=>w.removeEventListener(ue,E)},[E]),t.createElement(st,{scope:n,orientation:c,dir:m,loop:r,currentTabStopId:i,onItemFocus:t.useCallback(w=>_(w),[_]),onItemShiftTab:t.useCallback(()=>x(!0),[]),onFocusableItemAdd:t.useCallback(()=>B(w=>w+1),[]),onFocusableItemRemove:t.useCallback(()=>B(w=>w-1),[])},t.createElement(A.div,v({tabIndex:h||U===0?-1:0,"data-orientation":c},l,{ref:b,style:{outline:"none",...e.style},onMouseDown:g(e.onMouseDown,()=>{R.current=!0}),onFocus:g(e.onFocus,w=>{const ce=!R.current;if(w.target===w.currentTarget&&ce&&!h){const N=new CustomEvent(ue,ct);if(w.currentTarget.dispatchEvent(N),!N.defaultPrevented){const y=D().filter(T=>T.focusable),re=y.find(T=>T.active),V=y.find(T=>T.id===i),Y=[re,V,...y].filter(Boolean).map(T=>T.ref.current);Te(Y)}}R.current=!1}),onBlur:g(e.onBlur,()=>x(!1))})))}),ft="RovingFocusGroupItem",lt=t.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,focusable:c=!0,active:r=!1,tabStopId:a,...u}=e,d=W(),f=a||d,$=ut(ft,n),l=$.currentTabStopId===f,s=Se(n),{onFocusableItemAdd:b,onFocusableItemRemove:m}=$;return t.useEffect(()=>{if(c)return b(),()=>m()},[c,b,m]),t.createElement(ie.ItemSlot,{scope:n,id:f,focusable:c,active:r},t.createElement(A.span,v({tabIndex:l?0:-1,"data-orientation":$.orientation},u,{ref:o,onMouseDown:g(e.onMouseDown,i=>{c?$.onItemFocus(f):i.preventDefault()}),onFocus:g(e.onFocus,()=>$.onItemFocus(f)),onKeyDown:g(e.onKeyDown,i=>{if(i.key==="Tab"&&i.shiftKey){$.onItemShiftTab();return}if(i.target!==i.currentTarget)return;const _=bt(i,$.orientation,$.dir);if(_!==void 0){i.preventDefault();let x=s().filter(E=>E.focusable).map(E=>E.ref.current);if(_==="last")x.reverse();else if(_==="prev"||_==="next"){_==="prev"&&x.reverse();const E=x.indexOf(i.currentTarget);x=$.loop?mt(x,E+1):x.slice(E+1)}setTimeout(()=>Te(x))}})})))}),$t={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function pt(e,o){return o!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function bt(e,o,n){const c=pt(e.key,n);if(!(o==="vertical"&&["ArrowLeft","ArrowRight"].includes(c))&&!(o==="horizontal"&&["ArrowUp","ArrowDown"].includes(c)))return $t[c]}function Te(e){const o=document.activeElement;for(const n of e)if(n===o||(n.focus(),document.activeElement!==o))return}function mt(e,o){return e.map((n,c)=>e[(o+c)%e.length])}const vt=dt,gt=lt,fe=["Enter"," "],_t=["ArrowDown","PageUp","Home"],Oe=["ArrowUp","PageDown","End"],xt=[..._t,...Oe],Et={ltr:[...fe,"ArrowRight"],rtl:[...fe,"ArrowLeft"]},ht={ltr:["ArrowLeft"],rtl:["ArrowRight"]},ne="Menu",[z,wt,Ct]=Pe(ne),[K,ye]=ee(ne,[Ct,Ce,De]),oe=Ce(),Fe=De(),[Ae,k]=K(ne),[Mt,q]=K(ne),Rt=e=>{const{__scopeMenu:o,open:n=!1,children:c,dir:r,onOpenChange:a,modal:u=!0}=e,d=oe(o),[f,$]=t.useState(null),l=t.useRef(!1),s=$e(a),b=Ie(r);return t.useEffect(()=>{const m=()=>{l.current=!0,document.addEventListener("pointerdown",i,{capture:!0,once:!0}),document.addEventListener("pointermove",i,{capture:!0,once:!0})},i=()=>l.current=!1;return document.addEventListener("keydown",m,{capture:!0}),()=>{document.removeEventListener("keydown",m,{capture:!0}),document.removeEventListener("pointerdown",i,{capture:!0}),document.removeEventListener("pointermove",i,{capture:!0})}},[]),t.createElement(Re,d,t.createElement(Ae,{scope:o,open:n,onOpenChange:s,content:f,onContentChange:$},t.createElement(Mt,{scope:o,onClose:t.useCallback(()=>s(!1),[s]),isUsingKeyboardRef:l,dir:b,modal:u},c)))},ke=t.forwardRef((e,o)=>{const{__scopeMenu:n,...c}=e,r=oe(n);return t.createElement(Qe,v({},r,c,{ref:o}))}),Ne="MenuPortal",[It,Le]=K(Ne,{forceMount:void 0}),Pt=e=>{const{__scopeMenu:o,forceMount:n,children:c,container:r}=e,a=k(Ne,o);return t.createElement(It,{scope:o,forceMount:n},t.createElement(te,{present:n||a.open},t.createElement(Je,{asChild:!0,container:r},c)))},P="MenuContent",[St,me]=K(P),Dt=t.forwardRef((e,o)=>{const n=Le(P,e.__scopeMenu),{forceMount:c=n.forceMount,...r}=e,a=k(P,e.__scopeMenu),u=q(P,e.__scopeMenu);return t.createElement(z.Provider,{scope:e.__scopeMenu},t.createElement(te,{present:c||a.open},t.createElement(z.Slot,{scope:e.__scopeMenu},u.modal?t.createElement(Tt,v({},r,{ref:o})):t.createElement(Ot,v({},r,{ref:o})))))}),Tt=t.forwardRef((e,o)=>{const n=k(P,e.__scopeMenu),c=t.useRef(null),r=F(o,c);return t.useEffect(()=>{const a=c.current;if(a)return et(a)},[]),t.createElement(ve,v({},e,{ref:r,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:g(e.onFocusOutside,a=>a.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)}))}),Ot=t.forwardRef((e,o)=>{const n=k(P,e.__scopeMenu);return t.createElement(ve,v({},e,{ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)}))}),ve=t.forwardRef((e,o)=>{const{__scopeMenu:n,loop:c=!1,trapFocus:r,onOpenAutoFocus:a,onCloseAutoFocus:u,disableOutsidePointerEvents:d,onEntryFocus:f,onEscapeKeyDown:$,onPointerDownOutside:l,onFocusOutside:s,onInteractOutside:b,onDismiss:m,disableOutsideScroll:i,..._}=e,h=k(P,n),x=q(P,n),E=oe(n),D=Fe(n),R=wt(n),[U,B]=t.useState(null),w=t.useRef(null),ce=F(o,w,h.onContentChange),N=t.useRef(0),y=t.useRef(""),re=t.useRef(0),V=t.useRef(null),ae=t.useRef("right"),Y=t.useRef(0),T=i?ot:t.Fragment,We=i?{as:de,allowPinchZoom:!0}:void 0,ze=p=>{var C,I;const L=y.current+p,X=R().filter(O=>!O.disabled),se=document.activeElement,xe=(C=X.find(O=>O.ref.current===se))===null||C===void 0?void 0:C.textValue,Q=X.map(O=>O.textValue),j=qt(Q,L,xe),Ee=(I=X.find(O=>O.textValue===j))===null||I===void 0?void 0:I.ref.current;(function O(he){y.current=he,window.clearTimeout(N.current),he!==""&&(N.current=window.setTimeout(()=>O(""),1e3))})(L),Ee&&setTimeout(()=>Ee.focus())};t.useEffect(()=>()=>window.clearTimeout(N.current),[]),tt();const G=t.useCallback(p=>{var C,I;return ae.current===((C=V.current)===null||C===void 0?void 0:C.side)&&Zt(p,(I=V.current)===null||I===void 0?void 0:I.area)},[]);return t.createElement(St,{scope:n,searchRef:y,onItemEnter:t.useCallback(p=>{G(p)&&p.preventDefault()},[G]),onItemLeave:t.useCallback(p=>{var C;G(p)||((C=w.current)===null||C===void 0||C.focus(),B(null))},[G]),onTriggerLeave:t.useCallback(p=>{G(p)&&p.preventDefault()},[G]),pointerGraceTimerRef:re,onPointerGraceIntentChange:t.useCallback(p=>{V.current=p},[])},t.createElement(T,We,t.createElement(nt,{asChild:!0,trapped:r,onMountAutoFocus:g(a,p=>{var C;p.preventDefault(),(C=w.current)===null||C===void 0||C.focus()}),onUnmountAutoFocus:u},t.createElement(He,{asChild:!0,disableOutsidePointerEvents:d,onEscapeKeyDown:$,onPointerDownOutside:l,onFocusOutside:s,onInteractOutside:b,onDismiss:m},t.createElement(vt,v({asChild:!0},D,{dir:x.dir,orientation:"vertical",loop:c,currentTabStopId:U,onCurrentTabStopIdChange:B,onEntryFocus:g(f,p=>{x.isUsingKeyboardRef.current||p.preventDefault()})}),t.createElement(qe,v({role:"menu","aria-orientation":"vertical","data-state":Ye(h.open),"data-radix-menu-content":"",dir:x.dir},E,_,{ref:ce,style:{outline:"none",..._.style},onKeyDown:g(_.onKeyDown,p=>{const I=p.target.closest("[data-radix-menu-content]")===p.currentTarget,L=p.ctrlKey||p.altKey||p.metaKey,X=p.key.length===1;I&&(p.key==="Tab"&&p.preventDefault(),!L&&X&&ze(p.key));const se=w.current;if(p.target!==se||!xt.includes(p.key))return;p.preventDefault();const Q=R().filter(j=>!j.disabled).map(j=>j.ref.current);Oe.includes(p.key)&&Q.reverse(),zt(Q)}),onBlur:g(e.onBlur,p=>{p.currentTarget.contains(p.target)||(window.clearTimeout(N.current),y.current="")}),onPointerMove:g(e.onPointerMove,H(p=>{const C=p.target,I=Y.current!==p.clientX;if(p.currentTarget.contains(C)&&I){const L=p.clientX>Y.current?"right":"left";ae.current=L,Y.current=p.clientX}}))})))))))}),yt=t.forwardRef((e,o)=>{const{__scopeMenu:n,...c}=e;return t.createElement(A.div,v({role:"group"},c,{ref:o}))}),Ft=t.forwardRef((e,o)=>{const{__scopeMenu:n,...c}=e;return t.createElement(A.div,v({},c,{ref:o}))}),le="MenuItem",we="menu.itemSelect",ge=t.forwardRef((e,o)=>{const{disabled:n=!1,onSelect:c,...r}=e,a=t.useRef(null),u=q(le,e.__scopeMenu),d=me(le,e.__scopeMenu),f=F(o,a),$=t.useRef(!1),l=()=>{const s=a.current;if(!n&&s){const b=new CustomEvent(we,{bubbles:!0,cancelable:!0});s.addEventListener(we,m=>c==null?void 0:c(m),{once:!0}),Ze(s,b),b.defaultPrevented?$.current=!1:u.onClose()}};return t.createElement(Ke,v({},r,{ref:f,disabled:n,onClick:g(e.onClick,l),onPointerDown:s=>{var b;(b=e.onPointerDown)===null||b===void 0||b.call(e,s),$.current=!0},onPointerUp:g(e.onPointerUp,s=>{var b;$.current||(b=s.currentTarget)===null||b===void 0||b.click()}),onKeyDown:g(e.onKeyDown,s=>{const b=d.searchRef.current!=="";n||b&&s.key===" "||fe.includes(s.key)&&(s.currentTarget.click(),s.preventDefault())})}))}),Ke=t.forwardRef((e,o)=>{const{__scopeMenu:n,disabled:c=!1,textValue:r,...a}=e,u=me(le,n),d=Fe(n),f=t.useRef(null),$=F(o,f),[l,s]=t.useState(!1),[b,m]=t.useState("");return t.useEffect(()=>{const i=f.current;if(i){var _;m(((_=i.textContent)!==null&&_!==void 0?_:"").trim())}},[a.children]),t.createElement(z.ItemSlot,{scope:n,disabled:c,textValue:r??b},t.createElement(gt,v({asChild:!0},d,{focusable:!c}),t.createElement(A.div,v({role:"menuitem","data-highlighted":l?"":void 0,"aria-disabled":c||void 0,"data-disabled":c?"":void 0},a,{ref:$,onPointerMove:g(e.onPointerMove,H(i=>{c?u.onItemLeave(i):(u.onItemEnter(i),i.defaultPrevented||i.currentTarget.focus())})),onPointerLeave:g(e.onPointerLeave,H(i=>u.onItemLeave(i))),onFocus:g(e.onFocus,()=>s(!0)),onBlur:g(e.onBlur,()=>s(!1))}))))}),At=t.forwardRef((e,o)=>{const{checked:n=!1,onCheckedChange:c,...r}=e;return t.createElement(Ue,{scope:e.__scopeMenu,checked:n},t.createElement(ge,v({role:"menuitemcheckbox","aria-checked":J(n)?"mixed":n},r,{ref:o,"data-state":_e(n),onSelect:g(r.onSelect,()=>c==null?void 0:c(J(n)?!0:!n),{checkForDefaultPrevented:!1})})))}),kt="MenuRadioGroup",[An,Nt]=K(kt,{value:void 0,onValueChange:()=>{}}),Lt="MenuRadioItem",Kt=t.forwardRef((e,o)=>{const{value:n,...c}=e,r=Nt(Lt,e.__scopeMenu),a=n===r.value;return t.createElement(Ue,{scope:e.__scopeMenu,checked:a},t.createElement(ge,v({role:"menuitemradio","aria-checked":a},c,{ref:o,"data-state":_e(a),onSelect:g(c.onSelect,()=>{var u;return(u=r.onValueChange)===null||u===void 0?void 0:u.call(r,n)},{checkForDefaultPrevented:!1})})))}),Ge="MenuItemIndicator",[Ue,Gt]=K(Ge,{checked:!1}),Ut=t.forwardRef((e,o)=>{const{__scopeMenu:n,forceMount:c,...r}=e,a=Gt(Ge,n);return t.createElement(te,{present:c||J(a.checked)||a.checked===!0},t.createElement(A.span,v({},r,{ref:o,"data-state":_e(a.checked)})))}),Bt=t.forwardRef((e,o)=>{const{__scopeMenu:n,...c}=e;return t.createElement(A.div,v({role:"separator","aria-orientation":"horizontal"},c,{ref:o}))}),Be="MenuSub",[Vt,Ve]=K(Be),Yt=e=>{const{__scopeMenu:o,children:n,open:c=!1,onOpenChange:r}=e,a=k(Be,o),u=oe(o),[d,f]=t.useState(null),[$,l]=t.useState(null),s=$e(r);return t.useEffect(()=>(a.open===!1&&s(!1),()=>s(!1)),[a.open,s]),t.createElement(Re,u,t.createElement(Ae,{scope:o,open:c,onOpenChange:s,content:$,onContentChange:l},t.createElement(Vt,{scope:o,contentId:W(),triggerId:W(),trigger:d,onTriggerChange:f},n)))},Z="MenuSubTrigger",Xt=t.forwardRef((e,o)=>{const n=k(Z,e.__scopeMenu),c=q(Z,e.__scopeMenu),r=Ve(Z,e.__scopeMenu),a=me(Z,e.__scopeMenu),u=t.useRef(null),{pointerGraceTimerRef:d,onPointerGraceIntentChange:f}=a,$={__scopeMenu:e.__scopeMenu},l=t.useCallback(()=>{u.current&&window.clearTimeout(u.current),u.current=null},[]);return t.useEffect(()=>l,[l]),t.useEffect(()=>{const s=d.current;return()=>{window.clearTimeout(s),f(null)}},[d,f]),t.createElement(ke,v({asChild:!0},$),t.createElement(Ke,v({id:r.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":r.contentId,"data-state":Ye(n.open)},e,{ref:Me(o,r.onTriggerChange),onClick:s=>{var b;(b=e.onClick)===null||b===void 0||b.call(e,s),!(e.disabled||s.defaultPrevented)&&(s.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:g(e.onPointerMove,H(s=>{a.onItemEnter(s),!s.defaultPrevented&&!e.disabled&&!n.open&&!u.current&&(a.onPointerGraceIntentChange(null),u.current=window.setTimeout(()=>{n.onOpenChange(!0),l()},100))})),onPointerLeave:g(e.onPointerLeave,H(s=>{var b;l();const m=(b=n.content)===null||b===void 0?void 0:b.getBoundingClientRect();if(m){var i;const _=(i=n.content)===null||i===void 0?void 0:i.dataset.side,h=_==="right",x=h?-5:5,E=m[h?"left":"right"],D=m[h?"right":"left"];a.onPointerGraceIntentChange({area:[{x:s.clientX+x,y:s.clientY},{x:E,y:m.top},{x:D,y:m.top},{x:D,y:m.bottom},{x:E,y:m.bottom}],side:_}),window.clearTimeout(d.current),d.current=window.setTimeout(()=>a.onPointerGraceIntentChange(null),300)}else{if(a.onTriggerLeave(s),s.defaultPrevented)return;a.onPointerGraceIntentChange(null)}})),onKeyDown:g(e.onKeyDown,s=>{const b=a.searchRef.current!=="";if(!(e.disabled||b&&s.key===" ")&&Et[c.dir].includes(s.key)){var m;n.onOpenChange(!0),(m=n.content)===null||m===void 0||m.focus(),s.preventDefault()}})})))}),jt="MenuSubContent",Wt=t.forwardRef((e,o)=>{const n=Le(P,e.__scopeMenu),{forceMount:c=n.forceMount,...r}=e,a=k(P,e.__scopeMenu),u=q(P,e.__scopeMenu),d=Ve(jt,e.__scopeMenu),f=t.useRef(null),$=F(o,f);return t.createElement(z.Provider,{scope:e.__scopeMenu},t.createElement(te,{present:c||a.open},t.createElement(z.Slot,{scope:e.__scopeMenu},t.createElement(ve,v({id:d.contentId,"aria-labelledby":d.triggerId},r,{ref:$,align:"start",side:u.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:l=>{var s;u.isUsingKeyboardRef.current&&((s=f.current)===null||s===void 0||s.focus()),l.preventDefault()},onCloseAutoFocus:l=>l.preventDefault(),onFocusOutside:g(e.onFocusOutside,l=>{l.target!==d.trigger&&a.onOpenChange(!1)}),onEscapeKeyDown:g(e.onEscapeKeyDown,l=>{u.onClose(),l.preventDefault()}),onKeyDown:g(e.onKeyDown,l=>{const s=l.currentTarget.contains(l.target),b=ht[u.dir].includes(l.key);if(s&&b){var m;a.onOpenChange(!1),(m=d.trigger)===null||m===void 0||m.focus(),l.preventDefault()}})})))))});function Ye(e){return e?"open":"closed"}function J(e){return e==="indeterminate"}function _e(e){return J(e)?"indeterminate":e?"checked":"unchecked"}function zt(e){const o=document.activeElement;for(const n of e)if(n===o||(n.focus(),document.activeElement!==o))return}function Ht(e,o){return e.map((n,c)=>e[(o+c)%e.length])}function qt(e,o,n){const r=o.length>1&&Array.from(o).every($=>$===o[0])?o[0]:o,a=n?e.indexOf(n):-1;let u=Ht(e,Math.max(a,0));r.length===1&&(u=u.filter($=>$!==n));const f=u.find($=>$.toLowerCase().startsWith(r.toLowerCase()));return f!==n?f:void 0}function Qt(e,o){const{x:n,y:c}=e;let r=!1;for(let a=0,u=o.length-1;a<o.length;u=a++){const d=o[a].x,f=o[a].y,$=o[u].x,l=o[u].y;f>c!=l>c&&n<($-d)*(c-f)/(l-f)+d&&(r=!r)}return r}function Zt(e,o){if(!o)return!1;const n={x:e.clientX,y:e.clientY};return Qt(n,o)}function H(e){return o=>o.pointerType==="mouse"?e(o):void 0}const Jt=Rt,en=ke,tn=Pt,nn=Dt,on=yt,cn=Ft,rn=ge,an=At,sn=Kt,un=Ut,dn=Bt,fn=Yt,ln=Xt,$n=Wt,Xe="DropdownMenu",[pn,kn]=ee(Xe,[ye]),M=ye(),[bn,je]=pn(Xe),mn=e=>{const{__scopeDropdownMenu:o,children:n,dir:c,open:r,defaultOpen:a,onOpenChange:u,modal:d=!0}=e,f=M(o),$=t.useRef(null),[l=!1,s]=pe({prop:r,defaultProp:a,onChange:u});return t.createElement(bn,{scope:o,triggerId:W(),triggerRef:$,contentId:W(),open:l,onOpenChange:s,onOpenToggle:t.useCallback(()=>s(b=>!b),[s]),modal:d},t.createElement(Jt,v({},f,{open:l,onOpenChange:s,dir:c,modal:d}),n))},vn="DropdownMenuTrigger",gn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,disabled:c=!1,...r}=e,a=je(vn,n),u=M(n);return t.createElement(en,v({asChild:!0},u),t.createElement(A.button,v({type:"button",id:a.triggerId,"aria-haspopup":"menu","aria-expanded":a.open,"aria-controls":a.open?a.contentId:void 0,"data-state":a.open?"open":"closed","data-disabled":c?"":void 0,disabled:c},r,{ref:Me(o,a.triggerRef),onPointerDown:g(e.onPointerDown,d=>{!c&&d.button===0&&d.ctrlKey===!1&&(a.onOpenToggle(),a.open||d.preventDefault())}),onKeyDown:g(e.onKeyDown,d=>{c||(["Enter"," "].includes(d.key)&&a.onOpenToggle(),d.key==="ArrowDown"&&a.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(d.key)&&d.preventDefault())})})))}),_n=e=>{const{__scopeDropdownMenu:o,...n}=e,c=M(o);return t.createElement(tn,v({},c,n))},xn="DropdownMenuContent",En=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=je(xn,n),a=M(n),u=t.useRef(!1);return t.createElement(nn,v({id:r.contentId,"aria-labelledby":r.triggerId},a,c,{ref:o,onCloseAutoFocus:g(e.onCloseAutoFocus,d=>{var f;u.current||(f=r.triggerRef.current)===null||f===void 0||f.focus(),u.current=!1,d.preventDefault()}),onInteractOutside:g(e.onInteractOutside,d=>{const f=d.detail.originalEvent,$=f.button===0&&f.ctrlKey===!0,l=f.button===2||$;(!r.modal||l)&&(u.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),hn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(on,v({},r,c,{ref:o}))}),wn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(cn,v({},r,c,{ref:o}))}),Cn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(rn,v({},r,c,{ref:o}))}),Mn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(an,v({},r,c,{ref:o}))}),Rn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(sn,v({},r,c,{ref:o}))}),In=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(un,v({},r,c,{ref:o}))}),Pn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(dn,v({},r,c,{ref:o}))}),Sn=e=>{const{__scopeDropdownMenu:o,children:n,open:c,onOpenChange:r,defaultOpen:a}=e,u=M(o),[d=!1,f]=pe({prop:c,defaultProp:a,onChange:r});return t.createElement(fn,v({},u,{open:d,onOpenChange:f}),n)},Dn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement(ln,v({},r,c,{ref:o}))}),Tn=t.forwardRef((e,o)=>{const{__scopeDropdownMenu:n,...c}=e,r=M(n);return t.createElement($n,v({},r,c,{ref:o,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}}))}),Nn=mn,Ln=gn,Kn=_n,Gn=En,Un=hn,Bn=wn,Vn=Cn,Yn=Mn,Xn=Rn,jn=In,Wn=Pn,zn=Sn,Hn=Dn,qn=Tn;export{Bn as $,Hn as a,qn as b,Kn as c,Gn as d,Vn as e,Yn as f,jn as g,Xn as h,Wn as i,Nn as j,Ln as k,Un as l,zn as m};
