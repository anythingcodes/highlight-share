!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.ShareThis=t()}(this,function(){"use strict";function e(e){var t=e.document.body;return("static"===e.getComputedStyle(t).position?t.parentNode:t).getBoundingClientRect()}function t(e,t){return h||(h=o(e)),e[h](t)}function n(e,n){for(var r=e;r&&(1!==r.nodeType||!t(r,n));)r=r.parentNode;return r}function r(e,t){var n=e.compareDocumentPosition(t);return!n||(16&n)>0}function o(e){for(var t="atchesSelector",n=["matches","m"+t,"webkitM"+t,"mozM"+t,"msM"+t,"oM"+t],r=0;r<n.length;r++){var o=n[r];if(e[o])return o}}function i(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.name===t)return r}}function a(e,t){if(t&&"object"===(void 0===t?"undefined":m(t)))for(var n in t)e[n]=t[n];return e}function c(e){return"function"==typeof e}function u(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function f(e){if(e.isCollapsed)return!0;var t=e.anchorNode.compareDocumentPosition(e.focusNode);return t?(4&t)>0:e.anchorOffset<e.focusOffset}function l(e,t){var n=void 0,r=e.getClientRects(),o=[].slice.bind(r);if(t){for(var i=1/0,a=r.length;a--;){var c=r[a];if(c.left>i)break;i=c.left}n=o(a+1)}else{for(var f=-1/0,l=0;l<r.length;l++){var s=r[l];if(s.right<f)break;f=s.right}n=o(0,l)}return{top:Math.min.apply(Math,u(n.map(function(e){return e.top}))),bottom:Math.max.apply(Math,u(n.map(function(e){return e.bottom}))),left:n[0].left,right:n[n.length-1].right}}function s(e,t){var o=e.cloneRange();if(e.collapsed||!t)return o;var i=n(e.startContainer,t);return i?r(i,e.endContainer)||o.setEnd(i,i.childNodes.length):(i=n(e.endContainer,t),i?o.setStart(i,0):o.collapse()),o}function p(t,n,r){var o=r.document,i=o.defaultView,a=i.getSelection(),c=f(a),u=l(n,c),s=e(i),p=t.style;c?p.right=o.documentElement.clientWidth-(u.right+s.left)+"px":p.left=u.left-s.left+"px",p.width=u.right-u.left+"px",p.height=u.bottom-u.top+"px",p.top=u.top-s.top+"px",p.position="absolute",t.className=r.popoverClass}function d(e,t){var r=n(t.target,"["+g+"]");if(r){var o=r.getAttribute(g),a=i(e,o);a&&c(a.action)&&a.action(t,r)}}function v(e){return{createPopover:function(){var t=e.createElement("div");return t.addEventListener("click",function(e){d(this.sharers,e)}),t},attachPopover:function(t){e.body.appendChild(t)},removePopover:function(e){var t=e.parentNode;t&&t.removeChild(e)}}}var h=void 0,m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g="data-share-via",y=function(e,t,n,r){var o=e.shareUrl||e.document.defaultView.location;return"<ul>"+t.map(function(e){return'<li data-share-via="'+e.name+'">'+e.render.call(e,n,r,o)+"</li>"}).join("")+"</ul>"},b=void 0,C=["selectionchange","mouseup","touchend","touchcancel"];return function(e){function t(e){g.addEventListener(e,o)}function n(e){g.removeEventListener(e,o)}function r(){E&&p(E,i(),d)}function o(e){var t=e.type;!E!=("selectionchange"===t)&&setTimeout(function(){var e=i();e?u(e):f()},10)}function i(){var e=S.getSelection(),t=e.rangeCount&&e.getRangeAt(0);if(t){var n=s(t,d.selector);if(!n.collapsed&&n.getClientRects().length)return n}}function u(e){var t=!E,n=e.toString(),r=d.transformer(n),o=d.sharers.filter(l.bind(null,r,n));if(!o.length)return void(E&&f());t&&(E=M.createPopover()),E.sharers=o,E.innerHTML=y(d,o,r,n),p(E,e,d),t&&(M.attachPopover(E),c(d.onOpen)&&d.onOpen(E,r,n))}function f(){E&&(M.removePopover(E),E=b,c(d.onClose)&&d.onClose())}function l(e,t,n){var r=n.active;return c(r)?r(e,t):r===b||r}var d=(Object.assign||a)({document:document,selector:"body",sharers:[],popoverClass:"share-this-popover",transformer:function(e){return e.trim().replace(/\s+/g," ")}},e||{}),h=!1,m=!1,g=b,S=b,E=b,M=b;return{init:function(){return!h&&(g=d.document,S=g.defaultView,S.getSelection?(C.forEach(t),S.addEventListener("resize",r),M=v(g),h=!0):(console.warn("share-this: Selection API isn't supported"),!1))},destroy:function(){return!(!h||m)&&(C.forEach(n),S.removeEventListener("resize",r),f(),g=b,S=b,m=!0)}}}});