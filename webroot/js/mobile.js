!function(e){var t={};function s(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(o,n,function(t){return e[t]}.bind(null,n));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=12)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.qid=function(e){return document.getElementById(e)},t.qs=function(e,t=null){return t||(t=document),t.querySelector(e)},t.qsa=function(e,t=null){t||(t=document);const s=t.querySelectorAll(e);return Array.prototype.slice.call(s)}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(2),n=s(0);t.default=class extends o.default{constructor(e){super(e)}processPost(e){}onReady(){const e=n.qsa(".post"),t=e.length;for(let s=0;s<t;++s)this.processPost(e[s])}onPostInsert(e){this.processPost(e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.manager=e}onReady(){}onResize(){}onPostInsert(e){}onEvent(e,t){}}},function(e,t){e.exports=axios},function(e,t,s){"use strict";var o=this&&this.__awaiter||function(e,t,s,o){return new(s||(s=Promise))(function(n,r){function a(e){try{d(o.next(e))}catch(e){r(e)}}function i(e){try{d(o.throw(e))}catch(e){r(e)}}function d(e){e.done?n(e.value):new s(function(t){t(e.value)}).then(a,i)}d((o=o.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),r=s(0),a=s(3);t.default=class extends n.default{constructor(e){super(e),this.interval=15e3,this.latestPostId=0,this.intervalId=NaN,this.isLoadingPosts=!1}processPost(e){const t=+e.getAttribute("data-post-id");this.latestPostId=Math.max(this.latestPostId,t)}checkNewPosts(e){return o(this,void 0,void 0,function*(){if(this.isLoadingPosts)return;this.isLoadingPosts=!0;const t=+e.getAttribute("data-thread-id"),s=this.latestPostId,o=yield a.default.get(`${window.baseUrl}/ajax/mobile/thread/${t}?after=${s}`),n=r.qs(".thread__posts",e);if(n&&o.data&&o.data.length){n.insertAdjacentHTML("beforeend",o.data);const e=r.qsa(".post",n).filter(e=>+e.getAttribute("data-post-id")>s);e.forEach(e=>e.classList.add("fadable","fade")),setTimeout(()=>{e.forEach(e=>e.classList.remove("fade"))},100),this.manager.insertPosts(e);const t=r.qsa(".thread__post",n);for(let e=0;e<t.length-50;++e)t[e].remove()}this.isLoadingPosts=!1})}clearInterval(){NaN!==this.intervalId&&clearInterval(this.intervalId)}setInterval(){const e=r.qs(".thread");e&&0==+e.getAttribute("data-thread-page")&&(this.clearInterval(),this.checkNewPosts(e),this.intervalId=setInterval(()=>{this.checkNewPosts(e)},this.interval))}onReady(){super.onReady(),this.setInterval()}onEvent(e){"updateThread"===e&&this.setInterval()}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1),n=s(0);t.default=class extends o.default{constructor(e){super(e),this.user={},this.posts={},this.user.name=localStorage.getItem("user.name"),this.user.tripcode=localStorage.getItem("user.tripcode")}processPost(e){const t=+e.getAttribute("data-post-id");this.posts[t]=e;const s=n.qsa("a[data-target-post-id]",e).map(e=>({element:e,id:+e.getAttribute("data-target-post-id")})),o=s.filter((e,t)=>s.indexOf(e)===t).map(e=>this.posts[e.id]).filter(e=>e);s.forEach(e=>{const t=this.posts[e.id];if(!t)return;const s=n.qs(".post__name",t),o=s?s.innerHTML:"",r=n.qs(".post__tripcode",t),a=r?r.innerHTML:"";o.length||a.length?e.element.innerHTML=`<span class="post__reference-link-id">&gt;&gt;${e.id}</span>`+' <span class="post__reference-link-author">'+`(<span class="post__reference-link-name">${o}</span>`+`<span class="post__reference-link-tripcode">${a}</span>)`+"</span>":e.element.innerHTML=`<span class="post__reference-link-id">&gt;&gt;${e.id}</span>`});const r=n.qs(".post__name",e),a=r?r.textContent:"",i=n.qs(".post__tripcode",e),d=i?i.textContent:"";(this.user.tripcode&&this.user.tripcode.length&&this.user.tripcode===d||this.user.name&&this.user.name.length&&this.user.name===a)&&e.classList.add("post_own"),o.forEach(s=>{let o=n.qs(".post__footer",s);o||((o=document.createElement("div")).classList.add("post__footer"),s.appendChild(o));const r=document.createElement("a");r.classList.add("post__reference-link"),r.href=`#post_${t}`;const a=n.qs(".post__name",s),i=a?a.innerHTML:"",d=n.qs(".post__tripcode",s),c=d?d.innerHTML:"";(this.user.tripcode&&this.user.tripcode.length&&this.user.tripcode===c||this.user.name&&this.user.name.length&&this.user.name===i)&&e.classList.add("post_own-reply"),i.length||c.length?r.innerHTML=`<span class="post__reference-link-id">&gt;&gt;${t}</span>`+' <span class="post__reference-link-author">'+`(<span class="post__reference-link-name">${i}</span>`+`<span class="post__reference-link-tripcode">${c}</span>)`+"</span>":r.innerHTML=`<span class="post__reference-link-id">&gt;&gt;${t}</span>`,o.appendChild(r)})}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1),n=s(0);t.default=class extends o.default{constructor(e){super(e)}processPost(e){const t=n.qs(".post__id-link",e);t&&t.addEventListener("click",e=>{e.preventDefault();const s=t.getAttribute("data-post-id");return this.manager.emit("insertMarkup",[`>>${s}\n`,"",!0]),!1})}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1),n=s(0);t.default=class extends o.default{constructor(e){super(e),this.scale=1,this.offsetX=0,this.offsetY=0,this.dragStartOffsetX=0,this.dragStartOffsetY=0,this.dragStartMouseX=0,this.dragStartMouseY=0}closeModal(e){this.scale=1,this.offsetX=0,this.offsetY=0,e.classList.add("fade"),setTimeout(()=>{e.remove()},333)}transformModal(e){n.qs(".modal__image",e).style.transform=`translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`}openModal(e){let t;const s=e.getAttribute("data-file-type");if("video"===s){const s=document.createElement("video"),o=e.getAttribute("data-file-width"),n=e.getAttribute("data-file-height");s.classList.add("modal__video"),s.setAttribute("controls","controls"),s.setAttribute("preload","metadata"),s.setAttribute("width",o),s.setAttribute("height",n),s.src=e.href,t=s}else if("audio"===s){const s=document.createElement("audio");s.classList.add("modal__audio"),s.setAttribute("controls","controls"),s.setAttribute("preload","metadata"),s.src=e.href,t=s}else{const s=document.createElement("img");s.classList.add("modal__image"),s.src=e.href,t=s}t.addEventListener("dragstart",e=>(e.preventDefault(),!1)),t.addEventListener("click",e=>(e.preventDefault(),e.stopPropagation(),!1)),t.addEventListener("mousedown",e=>{e.preventDefault(),this.dragStartOffsetX=this.offsetX,this.dragStartOffsetY=this.offsetY,this.dragStartMouseX=e.pageX,this.dragStartMouseY=e.pageY;const s=e=>{e.preventDefault();const t=e.pageX-this.dragStartMouseX,s=e.pageY-this.dragStartMouseY;return this.offsetX=this.dragStartOffsetX+t,this.offsetY=this.dragStartOffsetY+s,this.transformModal(o),!1},n=e=>(e.preventDefault(),document.removeEventListener("mousemove",s),t.removeEventListener("mouseup",n),(Math.abs(this.offsetX-this.dragStartOffsetX)<.01||Math.abs(this.offsetY-this.dragStartOffsetY)<.01)&&this.closeModal(o),!1);return document.addEventListener("mousemove",s),t.addEventListener("mouseup",n),!1});const o=document.createElement("div");o.classList.add("layout__modal","modal"),o.appendChild(t),o.addEventListener("click",e=>(e.preventDefault(),this.closeModal(o),!1)),o.addEventListener("wheel",e=>(e.preventDefault(),this.scale=(1-.1*Math.sign(e.deltaY))*this.scale,this.transformModal(o),!1)),e.parentElement.appendChild(o),o.classList.add("fadable","fade"),setTimeout(()=>{o.classList.remove("fade")},100)}processPost(e){const t=n.qs(".post__thumbnail-link",e);t&&t.addEventListener("click",e=>(e.preventDefault(),this.openModal(t),!1))}}},function(e,t,s){"use strict";var o=this&&this.__awaiter||function(e,t,s,o){return new(s||(s=Promise))(function(n,r){function a(e){try{d(o.next(e))}catch(e){r(e)}}function i(e){try{d(o.throw(e))}catch(e){r(e)}}function d(e){e.done?n(e.value):new s(function(t){t(e.value)}).then(a,i)}d((o=o.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=s(2),r=s(0);t.default=class extends n.default{constructor(e){super(e)}insertMarkup(e,t,s,o=!1){const n=e.value,r=e.selectionStart,a=e.selectionEnd,i=n.substring(0,r),d=n.substring(r,a),c=n.substring(a);o&&i.length&&!i.endsWith("\n")&&(t=`\n${t}`),e.value=[i,t,d,s,c].join(""),e.focus(),e.selectionStart=r+t.length,e.selectionEnd=r+t.length+(a-r)}insertBBCode(e,t){return this.insertMarkup(e,`[${t}]`,`[/${t}]`)}onReady(){const e=r.qid("postform");if(!e)return void console.warn("#postform is not found.");const t=r.qs("#subject",e);if(t){const e=localStorage.getItem("postform.subject");e&&(t.value=e),t.addEventListener("change",e=>{localStorage.setItem("postform.subject",t.value)})}const s=r.qs("#name",e);if(s){const e=localStorage.getItem("postform.name");e&&(s.value=e),s.addEventListener("change",e=>{localStorage.setItem("postform.name",s.value)})}const n=r.qs("#email",e);if(n){const e=localStorage.getItem("postform.email");e&&(n.value=e),n.addEventListener("change",e=>{localStorage.setItem("postform.email",n.value)})}const a=r.qs("#message",e);if(a){const t={"postform-markup-bold":e=>this.insertBBCode(a,"b"),"postform-markup-italic":e=>this.insertBBCode(a,"i"),"postform-markup-underline":e=>this.insertBBCode(a,"u"),"postform-markup-strike":e=>this.insertBBCode(a,"s"),"postform-markup-sup":e=>this.insertBBCode(a,"sup"),"postform-markup-sub":e=>this.insertBBCode(a,"sub"),"postform-markup-spoiler":e=>this.insertBBCode(a,"spoiler"),"postform-markup-rp":e=>this.insertBBCode(a,"rp"),"postform-markup-code":e=>this.insertBBCode(a,"code"),"postform-markup-quote":e=>this.insertMarkup(a,">","",!0)};Object.keys(t).forEach(s=>{const o=r.qs(`#${s}`,e);o&&o.addEventListener("click",t[s])})}const i=r.qsa("#file",e);i.forEach(e=>{e.addEventListener("change",t=>{if(e.files&&e.files.length){const t=new FileReader;t.addEventListener("load",t=>{const s=e.parentElement;let o=r.qs(".form__file-preview",s);o||((o=document.createElement("img")).classList.add("form__file-preview"),s.appendChild(o)),o.src=t.target.result}),t.readAsDataURL(e.files[0])}})}),e.addEventListener("submit",t=>o(this,void 0,void 0,function*(){t.preventDefault();const s=new FormData(e),o=yield fetch(`${window.baseUrl}/ajax/mobile/post/create`,{method:"POST",body:s});if(0===r.qsa(".thread").length&&o.headers.has("Location")&&(window.location.href=o.headers.get("Location")),o.status<400){a.value="",i.forEach(e=>{e.type="text",e.value="",e.type="file"}),r.qsa(".form__file-preview",e).forEach(e=>e.remove());const t=yield o.json();t.name?localStorage.setItem("user.name",t.name):localStorage.removeItem("user.name"),t.tripcode?localStorage.setItem("user.tripcode",t.tripcode):localStorage.removeItem("user.tripcode"),this.manager.emit("updateThread")}else console.error(o)}))}onEvent(e,t){if("insertMarkup"===e){const e=r.qid("postform");if(!e)return void console.warn("#postform is not found.");const s=r.qs("#message",e);if(!s)return void console.warn("#message is not found.");t.unshift(s),this.insertMarkup.apply(this,t)}}}},function(e,t){e.exports=luxon},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(1),n=s(0),r=s(9);t.default=class extends o.default{constructor(e){super(e)}processPost(e){const t=n.qs(".post__date",e);if(t){const e=t.getAttribute("datetime"),s=r.DateTime.fromISO(e);t.textContent=s.toLocaleString(r.DateTime.DATETIME_MED_WITH_SECONDS)}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(0);t.default=class{constructor(e=!1){if(this.modules={},e){const e=new MutationObserver(e=>{const t=e.map(e=>{const t=e.addedNodes;return Array.prototype.slice.call(t).filter(e=>e.nodeType===Node.ELEMENT_NODE).map(e=>e.classList.contains("post")?[e]:o.qsa(".post",e)).reduce((e,t)=>e.concat(t),[])}).reduce((e,t)=>e.concat(t),[]);t.length>0&&this.insertPosts(t)});document.addEventListener("DOMContentLoaded",()=>{e.observe(document.body,{childList:!0,subtree:!0})})}document.addEventListener("DOMContentLoaded",()=>{this.forEachModule((e,t)=>new Promise((s,o)=>{try{t.onReady()}catch(t){console.error(`Error in ${e}.onReady(): ${t}`),o(t)}s()}))}),window.addEventListener("resize",()=>{this.forEachModule((e,t)=>new Promise(()=>{try{t.onResize()}catch(t){console.error(`Error in ${e}.onResize(): ${t}`)}}))})}forEachModule(e){return Object.keys(this.modules).map(t=>{const s=this.modules[t];return e(t,s)})}addModule(e,t){this.modules[e]=t}emit(e,t){this.forEachModule((s,o)=>new Promise(()=>{try{o.onEvent(e,t)}catch(t){console.error(`Error in ${s}.onEvent(${e}): ${t}`)}}))}insertPosts(e){console.debug("Inserted posts: ",e),this.forEachModule((t,s)=>new Promise((o,n)=>{try{e.forEach(e=>s.onPostInsert(e))}catch(e){console.error(`Error in ${t}.onPostInsert(): ${e}`),n(e)}o()}))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=s(11),n=s(10),r=s(8),a=s(7),i=s(6),d=s(5),c=s(4),l=new o.default;l.addModule("PostCorrectTime",new n.default(l)),l.addModule("PostForm",new r.default(l)),l.addModule("PostImagePopup",new a.default(l)),l.addModule("PostQuote",new i.default(l)),l.addModule("PostReferenceMap",new d.default(l)),l.addModule("ThreadUpdater",new c.default(l)),window.tinyib={},window.tinyib.moduleManager=l}]);