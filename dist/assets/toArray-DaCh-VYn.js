import{X as s,bN as o}from"./index-Cpj_313k.js";function t(a){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=[];return s.Children.forEach(a,function(r){r==null&&!n.keepEmpty||(Array.isArray(r)?e=e.concat(t(r)):o.isFragment(r)&&r.props?e=e.concat(t(r.props.children,n)):e.push(r))}),e}export{t};
