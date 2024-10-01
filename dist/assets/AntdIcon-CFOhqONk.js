import{aO as W,ay as w,X as x,aC as c,bw as D,g as s,bx as N,by as L,aB as _,ax as S,aW as U,i as X,az as h,aw as q}from"./index-Cpj_313k.js";import{g as F}from"./shadow-smhd3i8u.js";function G(n){return n.replace(/-(.)/g,function(e,o){return o.toUpperCase()})}function H(n,e){W(n,"[@ant-design/icons] ".concat(e))}function k(n){return w(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(w(n.icon)==="object"||typeof n.icon=="function")}function I(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,o){var r=n[o];switch(o){case"class":e.className=r,delete e.class;break;default:delete e[o],e[G(o)]=r}return e},{})}function T(n,e,o){return o?x.createElement(n.tag,c(c({key:e},I(n.attrs)),o),(n.children||[]).map(function(r,a){return T(r,"".concat(e,"-").concat(n.tag,"-").concat(a))})):x.createElement(n.tag,c({key:e},I(n.attrs)),(n.children||[]).map(function(r,a){return T(r,"".concat(e,"-").concat(n.tag,"-").concat(a))}))}function z(n){return D(n)[0]}function E(n){return n?Array.isArray(n)?n:[n]:[]}var J=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,K=function(e){var o=s.useContext(N),r=o.csp,a=o.prefixCls,i=J;a&&(i=i.replace(/anticon/g,a)),s.useEffect(function(){var l=e.current,m=F(l);L(i,"@ant-design-icons",{prepend:!0,csp:r,attachTo:m})},[])},M=["icon","className","onClick","style","primaryColor","secondaryColor"],f={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Q(n){var e=n.primaryColor,o=n.secondaryColor;f.primaryColor=e,f.secondaryColor=o||z(e),f.calculated=!!o}function V(){return c({},f)}var d=function(e){var o=e.icon,r=e.className,a=e.onClick,i=e.style,l=e.primaryColor,m=e.secondaryColor,y=_(e,M),u=s.useRef(),C=f;if(l&&(C={primaryColor:l,secondaryColor:m||z(l)}),K(u),H(k(o),"icon should be icon definiton, but got ".concat(o)),!k(o))return null;var t=o;return t&&typeof t.icon=="function"&&(t=c(c({},t),{},{icon:t.icon(C.primaryColor,C.secondaryColor)})),T(t.icon,"svg-".concat(t.name),c(c({className:r,onClick:a,style:i,"data-icon":t.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},y),{},{ref:u}))};d.displayName="IconReact";d.getTwoToneColors=V;d.setTwoToneColors=Q;function R(n){var e=E(n),o=S(e,2),r=o[0],a=o[1];return d.setTwoToneColors({primaryColor:r,secondaryColor:a})}function Y(){var n=d.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var Z=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];R(U.primary);var v=s.forwardRef(function(n,e){var o=n.className,r=n.icon,a=n.spin,i=n.rotate,l=n.tabIndex,m=n.onClick,y=n.twoToneColor,u=_(n,Z),C=s.useContext(N),t=C.prefixCls,g=t===void 0?"anticon":t,j=C.rootClassName,A=X(j,g,h(h({},"".concat(g,"-").concat(r.name),!!r.name),"".concat(g,"-spin"),!!a||r.name==="loading"),o),p=l;p===void 0&&m&&(p=-1);var $=i?{msTransform:"rotate(".concat(i,"deg)"),transform:"rotate(".concat(i,"deg)")}:void 0,P=E(y),b=S(P,2),B=b[0],O=b[1];return s.createElement("span",q({role:"img","aria-label":r.name},u,{ref:e,tabIndex:p,onClick:m,className:A}),s.createElement(d,{icon:r,primaryColor:B,secondaryColor:O,style:$}))});v.displayName="AntdIcon";v.getTwoToneColor=Y;v.setTwoToneColor=R;export{v as I};
