import{r as s,at as i,aW as b,aO as $,c as h}from"./index-3nPIAQnH.js";const p=b.useId||(()=>{});let C=0;function x(e){const[c,n]=s.useState(p());return i(()=>{e||n(t=>t??String(C++))},[e]),e||(c?`radix-${c}`:"")}function P({prop:e,defaultProp:c,onChange:n=()=>{}}){const[t,o]=v({defaultProp:c,onChange:n}),a=e!==void 0,l=a?e:t,f=$(n),d=s.useCallback(r=>{if(a){const u=typeof r=="function"?r(e):r;u!==e&&f(u)}else o(r)},[a,e,o,f]);return[l,d]}function v({defaultProp:e,onChange:c}){const n=s.useState(e),[t]=n,o=s.useRef(t),a=$(c);return s.useEffect(()=>{o.current!==t&&(a(t),o.current=t)},[t,o,a]),n}/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=h("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);export{P as $,k as C,x as a};
