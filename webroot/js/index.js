!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=15)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.qid=function(e){return document.getElementById(e)},t.qs=function(e,t=null){return t||(t=document),t.querySelector(e)},t.qsa=function(e,t=null){t||(t=document);const s=t.querySelectorAll(e);return Array.prototype.slice.call(s)}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.manager=e}onReady(){}onResize(){}onPostInsert(e){}onEvent(e,t){}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.get=function(e,t=null){const s=`; ${document.cookie}`.split(`; ${e}=`);if(2===s.length){const e=s.pop().split(";").shift();return decodeURIComponent(e)}return t},t.set=function(e,t,s){const n=encodeURIComponent(t),i=s.toUTCString();document.cookie=`${e}=${n}; path=/; expires=${i}`}},function(e,t){e.exports=luxon},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(3);t.default=class{static format(e,t){const s=t.time_locale,i=t.time_locale_custom_value,o=t.time_zone,r=t.time_zone_fixed_offset,a=t.time_format,c=t.time_format_custom_value;if("custom"===s&&(e=e.setLocale(i)),"fixed"===o){const t="UTC"+(r>=0?"+":"")+r.toString();e=e.setZone(t)}if("custom"===a)return e.toFormat(c);{const t=Object.assign({},n.DateTime.DATETIME_FULL_WITH_SECONDS);return t.timeZone=void 0,t.timeZoneName=void 0,e.toLocaleString(t)}}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0),o=s(2);t.default=class extends n.default{constructor(e){super(e),this.styles={},i.qsa("link[title]").forEach(e=>{const t=e.title,s=e.getAttribute("href");this.styles[t]=s,e.remove()});const t=o.get("tinyib_style","Synthwave");this.setStyle(t)}onReady(){const e=i.qid("style-switcher");if(e){const t=Object.keys(this.styles);for(let s=0;s<t.length;++s){const n=t[s];e.innerHTML+=`<option class="style-switcher__option" value="${n}">${n}</option>`}e.addEventListener("change",()=>{this.setStyle(e.value)})}const t=o.get("tinyib_style","Synthwave");window.dataLayer.push({theme:t})}setStyle(e){const t=i.qs("head");if(!t)return;const s=i.qs("link[data-selected]");if(s){if(s.title===e)return;s.remove()}const n=this.styles[e],r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.href=n,r.setAttribute("data-selected","true"),r.addEventListener("load",()=>{this.manager.emit("style loaded")}),t.appendChild(r);const a=new Date;a.setTime(a.getTime()+31536e6),o.set("tinyib_style",e,a),this.manager.emit("style changed")}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0),o=s(2),r=s(4),a=s(3);t.default=class extends n.default{constructor(e){super(e),this.settings=JSON.parse(o.get("tinyib_settings","{}"))}getFormValues(){const e=i.qs('input[name="form_preview_align"]:checked'),t=i.qs('input[name="time_locale"]:checked'),s=i.qid("time_locale_custom_value"),n=i.qs('input[name="time_format"]:checked'),o=i.qid("time_format_custom_value"),r=i.qs('input[name="time_zone"]:checked'),a=i.qid("time_zone_fixed_offset");return{form_preview_align:e.value,time_locale:t.value,time_locale_custom_value:s.value,time_zone:r.value,time_zone_fixed_offset:Number(a.value),time_format:n.value,time_format_custom_value:o.value}}onReady(){const e=i.qid("settings_form");if(!e)return;const t=i.qid("status"),s=i.qid("time_locale_custom"),n=i.qid("time_locale_custom_value"),c=i.qid("time_format_custom"),u=i.qid("time_format_custom_value"),d=i.qid("time_zone_fixed"),l=i.qid("time_zone_fixed_offset"),m=i.qid("time_current_format");if(this.settings.form_preview_align){const e=i.qs(`input[name="form_preview_align"][value="${this.settings.form_preview_align}"]`);e&&(e.checked=!0)}if(this.settings.time_locale){const e=i.qs(`input[name="time_locale"][value="${this.settings.time_locale}"]`);e&&(e.checked=!0)}if(this.settings.time_format){const e=i.qs(`input[name="time_format"][value="${this.settings.time_format}"]`);e&&(e.checked=!0)}if(this.settings.time_zone){const e=i.qs(`input[name="time_zone"][value="${this.settings.time_zone}"]`);e&&(e.checked=!0)}n.value=this.settings.time_locale_custom_value||"",u.value=this.settings.time_format_custom_value||"",l.value=(this.settings.time_zone_fixed_offset||0).toString(),s&&n&&n.addEventListener("click",e=>{s.checked=!0}),c&&u&&u.addEventListener("click",e=>{c.checked=!0}),d&&l&&l.addEventListener("click",e=>{d.checked=!0}),e.addEventListener("submit",e=>{e.preventDefault();const s=new Date;s.setTime(s.getTime()+31536e6);const n=this.getFormValues();return o.set("tinyib_settings",JSON.stringify(n),s),t&&(t.innerHTML="",setTimeout(()=>{t.innerHTML="Settings saved."},1e3/3)),!1});const f=()=>{if(m)try{const e=a.DateTime.fromJSDate(new Date),t=this.getFormValues();m.innerHTML=r.default.format(e,t)}catch(e){m.innerHTML="Invalid format"}};f(),setInterval(f,1e3)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0);t.default=class extends n.default{constructor(e){super(e)}onReady(){const e=window.location.hash;if(e){const t=e.match(/^#q\d+$/i);if(null!==t){const e=Number(t[0].substr(2));this.quotePost(e)}}i.qsa(".post-header__reflink").forEach(e=>{const t=Number(e.getAttribute("data-id"));e.addEventListener("click",()=>this.quotePost(t))})}quotePost(e){const t=i.qid("message");return t.value=`${t.value}>>${e}\n`,t.focus(),!1}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0);t.default=class extends n.default{constructor(e){super(e)}processPost(e){}onReady(){const e=i.qsa(".post"),t=e.length;for(let s=0;s<t;++s)this.processPost(e[s])}onPostInsert(e){this.processPost(e)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(8),i=s(0);t.default=class extends n.default{constructor(e){super(e),this.posts={}}getPostRefLinkHtml(e){const t=+e.getAttribute("data-post-id"),s=i.qs(".post-header__name",e),n=i.qs(".post-header__tripcode",e),o=s?s.innerHTML:"",r=n?n.innerHTML:"";return o.length||r.length?`&gt;&gt;${t}`+' <span class="post__reference-link-author">'+`(<span class="post__reference-link-name">${o}</span>`+`<span class="post__reference-link-tripcode">${r}</span>)`+"</span>":`&gt;&gt;${t}`}processPost(e){const t=+e.getAttribute("data-post-id");this.posts[t]=e,i.qsa("a[data-target-post-id]",e).map(e=>({element:e,id:+e.getAttribute("data-target-post-id")})).forEach(e=>{const t=this.posts[e.id];t&&(e.element.innerHTML=this.getPostRefLinkHtml(t))})}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0),o=s(2);t.default=class extends n.default{constructor(e){super(e),this.resize_width=!1,this.resize_height=!1,this.beginResize=(e=>{const t=document.body.getBoundingClientRect(),s=this.form.getBoundingClientRect(),n=e.pageX-(s.left-t.left),i=e.pageY-(s.top-t.top);this.resize_width=n>this.form.clientWidth-10,this.resize_height=i>this.form.clientHeight-10,window.addEventListener("mousemove",this.resize),window.addEventListener("mouseup",this.endResize)}),this.resize=(e=>{const t=document.body.getBoundingClientRect(),s=this.form.getBoundingClientRect(),n=e.pageX-(s.left-t.left),i=e.pageY-(s.top-t.top);this.resize_width&&(this.form.style.width=`${n}px`),this.resize_height&&(this.form.style.height=`${i}px`),(this.resize_width||this.resize_height)&&(e.preventDefault(),e.stopPropagation())}),this.endResize=(e=>{window.removeEventListener("mousemove",this.resize),window.removeEventListener("mouseup",this.endResize)}),this.settings=JSON.parse(o.get("tinyib_settings","{}")),this.form=null}insertMarkup(e,t){const s=i.qid("message");if(s){const n=s.value,i=s.selectionStart,o=s.selectionEnd;s.value=[n.substring(0,i),e,n.substring(i,o),t,n.substring(o)].join(""),s.focus(),s.selectionStart=i+e.length,s.selectionEnd=i+e.length+(o-i)}return!1}insertBBCode(e){return this.insertMarkup(`[${e}]`,`[/${e}]`)}setupMarkupButtons(){const e={markup_quote:()=>this.insertMarkup(">",""),markup_b:()=>this.insertBBCode("b"),markup_i:()=>this.insertBBCode("i"),markup_u:()=>this.insertBBCode("u"),markup_s:()=>this.insertBBCode("s"),markup_sup:()=>this.insertBBCode("sup"),markup_sub:()=>this.insertBBCode("sub"),markup_spoiler:()=>this.insertBBCode("spoiler"),markup_code:()=>this.insertBBCode("code"),markup_rp:()=>this.insertBBCode("rp")};Object.keys(e).forEach(t=>{const s=i.qid(t);s&&s.addEventListener("click",e[t])})}onReady(){if(this.form=i.qid("postform"),!this.form)return;const e=i.qid("name");e&&(e.value=o.get("tinyib_name",""),e.addEventListener("change",()=>{const t=new Date;t.setTime(t.getTime()+31536e6),o.set("tinyib_name",e.value,t)})),this.setupMarkupButtons();const t=i.qid("message");t&&(t.setAttribute("style",""),t.classList.remove("de-textarea"));const s=i.qid("de-resizer-text");s&&s.setAttribute("style","display: none !important;");const n=i.qs(".de-file",this.form);if(n){const e=i.qs(".postform__inner",this.form);e&&(this.form.insertBefore(n,e),"left"===this.settings.form_preview_align?(n.style.cssFloat="left",n.style.marginRight="0.5em"):(n.style.cssFloat="right",n.style.marginLeft="0.5em"))}this.form.style.width=`${this.form.clientWidth}px`,this.form.style.height=`${this.form.clientHeight}px`;const r=i.qid("newpostpassword");r&&(r.value=o.get("tinyib_password"),r.addEventListener("change",()=>{const e=new Date;e.setTime(e.getTime()+31536e6),o.set("tinyib_password",r.value,e)})),this.form.addEventListener("mousedown",this.beginResize)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0),o=s(2);t.default=class extends n.default{constructor(e){super(e)}onReady(){if(!i.qid("delform"))return;const e=i.qid("deletepostpassword");e&&(e.value=o.get("tinyib_password"))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(3),i=s(1),o=s(0),r=s(2),a=s(4);t.default=class extends i.default{constructor(e){super(e),this.settings=JSON.parse(r.get("tinyib_settings","{}"))}correctTime(e){const t=e.getAttribute("datetime");if(!t)return;const s=n.DateTime.fromISO(t);e.textContent=a.default.format(s,this.settings)}onReady(){o.qsa(".post-header__datetime").forEach(e=>this.correctTime(e))}onPostInsert(e){const t=o.qs(".post-header__datetime",e);t&&this.correctTime(t)}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(1),i=s(0);t.default=class extends n.default{constructor(e){super(e),this.original_src=""}onReady(){const e=i.qid("captchaimage");e&&(this.original_src=e.src,e.addEventListener("click",()=>this.reload()))}reload(){const e=i.qid("captcha");return e.value="",e.focus(),i.qid("captchaimage").src=`${this.original_src}#${(new Date).getTime()}`,!1}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(0);t.default=class{constructor(e=!1){if(this.modules={},e){const e=new MutationObserver(e=>{const t=e.map(e=>{const t=e.addedNodes;return Array.prototype.slice.call(t).filter(e=>e.nodeType===Node.ELEMENT_NODE).map(e=>e.classList.contains("post")?[e]:n.qsa(".post",e)).reduce((e,t)=>e.concat(t),[])}).reduce((e,t)=>e.concat(t),[]);t.length>0&&this.insertPosts(t)});document.addEventListener("DOMContentLoaded",()=>{e.observe(document.body,{childList:!0,subtree:!0})})}document.addEventListener("DOMContentLoaded",()=>{this.forEachModule((e,t)=>new Promise((s,n)=>{try{t.onReady()}catch(t){console.error(`Error in ${e}.onReady(): ${t}`),n(t)}s()}))}),window.addEventListener("resize",()=>{this.forEachModule((e,t)=>new Promise(()=>{try{t.onResize()}catch(t){console.error(`Error in ${e}.onResize(): ${t}`)}}))})}forEachModule(e){return Object.keys(this.modules).map(t=>{const s=this.modules[t];return e(t,s)})}addModule(e,t){this.modules[e]=t}emit(e,t){this.forEachModule((s,n)=>new Promise(()=>{try{n.onEvent(e,t)}catch(t){console.error(`Error in ${s}.onEvent(${e}): ${t}`)}}))}insertPosts(e){console.debug("Inserted posts: ",e),this.forEachModule((t,s)=>new Promise((n,i)=>{try{e.forEach(e=>s.onPostInsert(e))}catch(e){console.error(`Error in ${t}.onPostInsert(): ${e}`),i(e)}n()}))}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=s(14),i=s(13),o=s(12),r=s(11),a=s(10),c=s(9),u=s(7),d=s(6),l=s(5),m=new n.default(!0);m.addModule("Captcha",new i.default(m)),m.addModule("CorrectTime",new o.default(m)),m.addModule("DeleteForm",new r.default(m)),m.addModule("PostForm",new a.default(m)),m.addModule("PostReferenceMap",new c.default(m)),m.addModule("QuotePost",new u.default(m)),m.addModule("Settings",new d.default(m)),m.addModule("StyleSwitcher",new l.default(m)),window.tinyib={},window.tinyib.moduleManager=m}]);