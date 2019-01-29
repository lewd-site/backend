/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/api.ts":
/*!*******************!*\
  !*** ./ts/api.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Api {
    static createPost(request, onProgress) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const url = `${window.baseUrl}/ajax/post/create`;
                const data = new FormData();
                data.append('parent', request.parent.toString());
                data.append('subject', request.subject);
                data.append('name', request.name);
                data.append('message', request.message);
                data.append('file', request.file);
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.withCredentials = true;
                if (onProgress) {
                    xhr.upload.addEventListener('progress', onProgress.bind(this));
                }
                xhr.addEventListener('readystatechange', e => {
                    if (xhr.readyState !== XMLHttpRequest.DONE) {
                        return;
                    }
                    if (xhr.status === 201) {
                        resolve(xhr.getResponseHeader('Location'));
                    }
                    else {
                        const data = JSON.parse(xhr.responseText);
                        if (data && data.error) {
                            reject(data.error);
                        }
                        else {
                            reject(`${xhr.status} ${xhr.statusText}`);
                        }
                    }
                });
                xhr.send(data);
            });
        });
    }
}
exports.Api = Api;


/***/ }),

/***/ "./ts/app.ts":
/*!*******************!*\
  !*** ./ts/app.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! . */ "./ts/index.ts");
const components_1 = __webpack_require__(/*! ./components */ "./ts/components/index.ts");
const settings_1 = __webpack_require__(/*! ./settings */ "./ts/settings.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./ts/utils/index.ts");
new components_1.Captcha();
new components_1.CorrectTime();
new components_1.DeleteForm();
new components_1.NewPostsDetector();
new components_1.Post();
new components_1.PostingForm();
new components_1.PostReferenceMap();
new components_1.Settings();
new components_1.StyleSwitch();
document.addEventListener('DOMContentLoaded', e => {
    _1.eventBus.$emit(_1.Events.Ready);
    const settings = settings_1.SettingsManager.load();
    if (settings.common.smoothScroll) {
        document.body.classList.add('smooth-scroll');
    }
    const layout = utils_1.DOM.qs('.layout');
    if (layout) {
        layout.classList.add('layout--' + settings.common.layout);
        if (!settings.common.showPostHeaderReflinkIcon) {
            layout.classList.add('layout--hide-post-header-reflink-icon');
        }
        if (!settings.common.showPostReflinkIcon) {
            layout.classList.add('layout--hide-post-reflink-icon');
        }
    }
    const formWrapper = utils_1.DOM.qs('.content__posting-form-wrapper');
    if (formWrapper) {
        formWrapper.classList.add('content__posting-form-wrapper--' + settings.form.align);
    }
});


/***/ }),

/***/ "./ts/components/captcha.ts":
/*!**********************************!*\
  !*** ./ts/components/captcha.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class Captcha {
    constructor() {
        this.originalSrc = '';
        __1.eventBus.$on(__1.Events.Ready, this.onReady.bind(this));
    }
    onReady() {
        const image = utils_1.DOM.qid('captchaimage');
        if (image) {
            this.originalSrc = image.src;
            image.addEventListener('click', this.reload.bind(this));
        }
    }
    reload() {
        const captcha = utils_1.DOM.qid('captcha');
        captcha.value = '';
        captcha.focus();
        const image = utils_1.DOM.qid('captchaimage');
        image.src = `${this.originalSrc}#${new Date().getTime()}`;
        return false;
    }
}
exports.Captcha = Captcha;


/***/ }),

/***/ "./ts/components/correct-time.ts":
/*!***************************************!*\
  !*** ./ts/components/correct-time.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = __webpack_require__(/*! luxon */ "luxon");
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class CorrectTime {
    constructor() {
        this.settings = __1.SettingsManager.load();
        __1.eventBus.$on(__1.Events.PostsInserted, this.onPostsInserted.bind(this));
    }
    onPostsInserted(posts) {
        posts.forEach(this.onPostInserted.bind(this));
    }
    onPostInserted(post) {
        const timeElements = utils_1.DOM.qsa('.post time', post);
        timeElements.forEach(this.correctTime.bind(this));
    }
    correctTime(el) {
        const time_str = el.getAttribute('datetime');
        if (!time_str) {
            return;
        }
        const time = luxon_1.DateTime.fromISO(time_str);
        el.textContent = utils_1.Time.format(time, this.settings);
    }
}
exports.CorrectTime = CorrectTime;


/***/ }),

/***/ "./ts/components/delete-form.ts":
/*!**************************************!*\
  !*** ./ts/components/delete-form.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class DeleteForm {
    constructor() {
        __1.eventBus.$on(__1.Events.Ready, this.onReady.bind(this));
    }
    onReady() {
        const form = utils_1.DOM.qid('delform');
        if (!form) {
            return;
        }
        const delete_post_password = utils_1.DOM.qid('deletepostpassword');
        if (delete_post_password) {
            // Load delete post password.
            delete_post_password.value = utils_1.Cookie.get('tinyib_password');
        }
    }
}
exports.DeleteForm = DeleteForm;


/***/ }),

/***/ "./ts/components/draggable.ts":
/*!************************************!*\
  !*** ./ts/components/draggable.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const pointerEvents = 'PointerEvent' in window;
const touchEvents = 'ontouchstart' in window;
exports.draggable = {
    mounted() {
        const handle = this.getDragHandle();
        if (!handle) {
            return;
        }
        this.draggableResize = this.onDraggableResize.bind(this);
        this.draggableMouseDown = this.onDraggableMouseDown.bind(this);
        window.addEventListener('resize', this.draggableResize);
        if (pointerEvents) {
            handle.addEventListener('pointerdown', this.draggableMouseDown);
        }
        else {
            if (touchEvents) {
                handle.addEventListener('touchstart', this.draggableMouseDown);
            }
            handle.addEventListener('mousedown', this.draggableMouseDown);
        }
        //this.setPosition(this.checkBounds(this.getPosition()));
    },
    beforeDestroy() {
        if (this.draggableResize) {
            window.removeEventListener('resize', this.draggableResize);
        }
        const handle = this.getDragHandle();
        if (handle) {
            if (pointerEvents) {
                handle.removeEventListener('pointerdown', this.draggableMouseDown);
            }
            else {
                if (touchEvents) {
                    handle.removeEventListener('touchstart', this.draggableMouseDown);
                }
                handle.removeEventListener('mousedown', this.draggableMouseDown);
            }
        }
    },
    methods: {
        getDragHandle() {
            return null;
        },
        getDraggable() {
            return null;
        },
        getPosition() {
            const draggable = this.getDraggable();
            if (!draggable) {
                return { x: 0, y: 0 };
            }
            return {
                x: draggable.offsetLeft,
                y: draggable.offsetTop,
            };
        },
        setPosition(coords) {
            const draggable = this.getDraggable();
            if (!draggable) {
                return;
            }
            draggable.style.left = `${coords.x}px`;
            draggable.style.top = `${coords.y}px`;
        },
        checkBounds({ x, y }) {
            const draggable = this.getDraggable();
            if (!draggable) {
                return { x, y };
            }
            const rect = draggable.getBoundingClientRect();
            const minX = 0;
            const minY = 0;
            const maxX = document.body.clientWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            return {
                x: Math.min(Math.max(minX, x), maxX),
                y: Math.max(Math.min(maxY, y), minY),
            };
        },
        onDraggableResize() {
            this.setPosition(this.checkBounds(this.getPosition()));
        },
        onDraggableMouseDown(e) {
            const draggable = this.getDraggable();
            if (!draggable) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this._draggablePosition = this.getPosition();
            if (e instanceof MouseEvent
                || pointerEvents && e instanceof PointerEvent) {
                this._dragStart = {
                    x: e.clientX,
                    y: e.clientY,
                };
            }
            else if (touchEvents && e instanceof TouchEvent) {
                const touch = e.touches[0];
                this._dragStart = {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
            if (!this.draggableMouseMove) {
                this.draggableMouseMove = this.onDraggableMouseMove.bind(this);
                if (pointerEvents) {
                    window.addEventListener('pointermove', this.draggableMouseMove);
                }
                else {
                    if (touchEvents) {
                        window.addEventListener('touchmove', this.draggableMouseMove);
                    }
                    window.addEventListener('mousemove', this.draggableMouseMove);
                }
            }
            if (!this.draggableMouseUp) {
                this.draggableMouseUp = this.onDraggableMouseUp.bind(this);
                if (pointerEvents) {
                    window.addEventListener('pointerup', this.draggableMouseUp);
                    window.addEventListener('pointercancel', this.draggableMouseUp);
                }
                else {
                    if (touchEvents) {
                        window.addEventListener('touchend', this.draggableMouseUp);
                        window.addEventListener('touchcancel', this.draggableMouseUp);
                    }
                    window.addEventListener('mouseup', this.draggableMouseUp);
                }
            }
        },
        onDraggableMouseMove(e) {
            const draggable = this.getDraggable();
            if (!draggable) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            let deltaX = 0;
            let deltaY = 0;
            if (e instanceof MouseEvent
                || pointerEvents && e instanceof PointerEvent) {
                deltaX = e.clientX - this._dragStart.x;
                deltaY = e.clientY - this._dragStart.y;
            }
            else if (touchEvents && e instanceof TouchEvent) {
                const touch = e.touches[0];
                deltaX = touch.clientX - this._dragStart.x;
                deltaY = touch.clientY - this._dragStart.y;
            }
            this.setPosition(this.checkBounds({
                x: this._draggablePosition.x + deltaX,
                y: this._draggablePosition.y + deltaY,
            }));
        },
        onDraggableMouseUp(e) {
            if (this.draggableMouseMove) {
                if (pointerEvents) {
                    window.removeEventListener('pointermove', this.draggableMouseMove);
                }
                else {
                    if (touchEvents) {
                        window.removeEventListener('touchmove', this.draggableMouseMove);
                    }
                    window.removeEventListener('mousemove', this.draggableMouseMove);
                }
            }
            if (this.draggableMouseUp) {
                if (pointerEvents) {
                    window.removeEventListener('pointerup', this.draggableMouseUp);
                    window.removeEventListener('pointercancel', this.draggableMouseUp);
                }
                else {
                    if (touchEvents) {
                        window.removeEventListener('touchend', this.draggableMouseUp);
                        window.removeEventListener('touchcancel', this.draggableMouseUp);
                    }
                    window.removeEventListener('mouseup', this.draggableMouseUp);
                }
            }
            this.draggableMouseMove = null;
            this.draggableMouseUp = null;
        },
    },
};


/***/ }),

/***/ "./ts/components/file-preview.ts":
/*!***************************************!*\
  !*** ./ts/components/file-preview.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(/*! vue */ "vue"));
exports.FilePreview = vue_1.default.extend({
    template: `
<div class="file-preview"
  v-on:click="onClick($event)"
  v-on:dragenter.stop.prevent
  v-on:dragleave.stop.prevent
  v-on:dragover.stop.prevent
  v-on:drop.stop.prevent="onDrop($event)">
  <span class="file-preview__info"
    v-if="type">{{ info }}</span>

  <img class="file-preview__content"
    v-bind:src="src"
    v-bind:title="info"
    v-if="type === 'image' && src" />
  <video class="file-preview__content" autoplay loop muted
    v-bind:src="src"
    v-bind:title="info"
    v-else-if="type === 'video' && src"></video>
  <span class="file-preview__label"
    v-else>Upload file</span>

  <slot></slot>
</div>`,
    props: ['file'],
    data() {
        return {
            src: null,
        };
    },
    computed: {
        name() {
            if (!this.file || !this.file.name) {
                return '';
            }
            return this.file.name;
        },
        size() {
            if (!this.file) {
                return 0;
            }
            return this.file.size;
        },
        sizeFormatted() {
            const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
            let size = this.size;
            let i = 0;
            for (; i < units.length && size >= 1000; ++i) {
                size /= 1000;
            }
            return `${size.toFixed(2)} ${units[i]}`;
        },
        info() {
            return this.name
                ? `${this.name}, ${this.sizeFormatted}`
                : this.sizeFormatted;
        },
        type() {
            if (!this.file) {
                return null;
            }
            const type = this.file.type;
            if (type) {
                if (type.startsWith('video/')) {
                    return 'video';
                }
                else if (type.startsWith('audio/')) {
                    return 'audio';
                }
                else {
                    return 'image';
                }
            }
            const name = this.name;
            if (name.endsWith('.webm') || name.endsWith('.mp4')) {
                return 'video';
            }
            else if (name.endsWith('.mp3')) {
                return 'audio';
            }
            return 'image';
        },
    },
    watch: {
        file(value) {
            if (!value) {
                this.src = null;
                return;
            }
            const reader = new FileReader();
            reader.addEventListener('load', e => {
                this.src = e.target.result;
            });
            reader.readAsDataURL(value);
        },
    },
    methods: {
        onClick(e) {
            this.$emit('click', e);
        },
        onDrop(e) {
            this.$emit('drop', e);
        },
    },
});


/***/ }),

/***/ "./ts/components/index.ts":
/*!********************************!*\
  !*** ./ts/components/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var captcha_1 = __webpack_require__(/*! ./captcha */ "./ts/components/captcha.ts");
exports.Captcha = captcha_1.Captcha;
var correct_time_1 = __webpack_require__(/*! ./correct-time */ "./ts/components/correct-time.ts");
exports.CorrectTime = correct_time_1.CorrectTime;
var delete_form_1 = __webpack_require__(/*! ./delete-form */ "./ts/components/delete-form.ts");
exports.DeleteForm = delete_form_1.DeleteForm;
var draggable_1 = __webpack_require__(/*! ./draggable */ "./ts/components/draggable.ts");
exports.draggable = draggable_1.draggable;
var file_preview_1 = __webpack_require__(/*! ./file-preview */ "./ts/components/file-preview.ts");
exports.FilePreview = file_preview_1.FilePreview;
var new_posts_detector_1 = __webpack_require__(/*! ./new-posts-detector */ "./ts/components/new-posts-detector.ts");
exports.NewPostsDetector = new_posts_detector_1.NewPostsDetector;
var post_1 = __webpack_require__(/*! ./post */ "./ts/components/post.ts");
exports.Post = post_1.Post;
var posting_form_1 = __webpack_require__(/*! ./posting-form */ "./ts/components/posting-form.ts");
exports.PostingForm = posting_form_1.PostingForm;
var post_reference_map_1 = __webpack_require__(/*! ./post-reference-map */ "./ts/components/post-reference-map.ts");
exports.PostReferenceMap = post_reference_map_1.PostReferenceMap;
var settings_1 = __webpack_require__(/*! ./settings */ "./ts/components/settings.ts");
exports.Settings = settings_1.Settings;
var style_switch_1 = __webpack_require__(/*! ./style-switch */ "./ts/components/style-switch.ts");
exports.StyleSwitch = style_switch_1.StyleSwitch;


/***/ }),

/***/ "./ts/components/new-posts-detector.ts":
/*!*********************************************!*\
  !*** ./ts/components/new-posts-detector.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class NewPostsDetector {
    constructor() {
        /** @todo: remove MutationObserver ASAP, with integrated thread updating. */
        const observer = new MutationObserver(mutations => {
            const posts = mutations
                // Get added posts, if any.
                .map(mutation => {
                const nodeList = mutation.addedNodes;
                const nodes = Array.prototype.slice.call(nodeList);
                const elements = nodes.filter(node => node.nodeType === Node.ELEMENT_NODE);
                return elements
                    // If element is post itself, return it,
                    // else query for element children.
                    .map(element => element.classList.contains('post')
                    ? [element]
                    : utils_1.DOM.qsa('.post', element))
                    // Flatten posts array.
                    .reduce((total, current) => total.concat(current), []);
            })
                // Flatten posts array.
                .reduce((total, current) => total.concat(current), []);
            if (posts.length > 0) {
                __1.eventBus.$emit(__1.Events.PostsInserted, posts);
            }
        });
        __1.eventBus.$on(__1.Events.Ready, () => {
            // Setup MutationObserver.
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
            const posts = utils_1.DOM.qsa('.post');
            if (posts.length > 0) {
                __1.eventBus.$emit(__1.Events.PostsInserted, posts);
            }
        });
    }
}
exports.NewPostsDetector = NewPostsDetector;


/***/ }),

/***/ "./ts/components/post-reference-map.ts":
/*!*********************************************!*\
  !*** ./ts/components/post-reference-map.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class PostReferenceMap {
    constructor() {
        this.posts = {};
        __1.eventBus.$on(__1.Events.PostsInserted, (posts) => posts.forEach(this.onPostInsert.bind(this)));
    }
    onPostInsert(post) {
        const postId = +post.getAttribute('data-post-id');
        // Store post.
        this.posts[postId] = post;
        // Get references.
        const referenceElements = utils_1.DOM.qsa('a[data-target-post-id]', post);
        const references = referenceElements.map(element => {
            return {
                element,
                id: +element.getAttribute('data-target-post-id'),
            };
        });
        // Append the author name of the referenced post to the reference link text.
        references.forEach(reference => {
            const post = this.posts[reference.id];
            if (!post) {
                return;
            }
            const referenceAuthor = document.createElement('span');
            referenceAuthor.classList.add('post__reference-link-author');
            referenceAuthor.innerHTML = this.getPostRefLinkAuthorHtml(post);
            const parent = reference.element.parentElement;
            const nextSibling = reference.element.nextSibling;
            parent.insertBefore(referenceAuthor, nextSibling);
        });
    }
    getPostRefLinkAuthorHtml(post) {
        const nameEl = utils_1.DOM.qs('.post-header__name', post);
        const tripcodeEl = utils_1.DOM.qs('.post-header__tripcode', post);
        const name = nameEl ? nameEl.innerHTML : '';
        const tripcode = tripcodeEl ? tripcodeEl.innerHTML : '';
        if (name.length || tripcode.length) {
            return `(<span class="post__reference-link-name">${name}</span>`
                + `<span class="post__reference-link-tripcode">${tripcode}</span>)`;
        }
        else {
            return ``;
        }
    }
}
exports.PostReferenceMap = PostReferenceMap;


/***/ }),

/***/ "./ts/components/post.ts":
/*!*******************************!*\
  !*** ./ts/components/post.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
const vue_1 = __importDefault(__webpack_require__(/*! vue */ "vue"));
const draggable_1 = __webpack_require__(/*! ./draggable */ "./ts/components/draggable.ts");
;
class Post {
    constructor() {
        __1.eventBus.$on(__1.Events.Ready, this.onReady.bind(this));
        __1.eventBus.$on(__1.Events.PostsInserted, this.onPostsInserted.bind(this));
    }
    onReady() {
        const popup = document.createElement('div');
        popup.id = 'popup';
        popup.classList.add('popup', 'hidden');
        document.body.insertBefore(popup, null);
        const self = this;
        this.popupViewModel = new vue_1.default({
            template: `
<div class="popup" id="popup" v-show="!hidden" ref="popup">
  <div class="popup__header" ref="header">
    <span class="popup__title">{{ title }}</span>

    <span class="popup__header-buttons">
      <span class="popup__close"
        v-on:click.stop="onCloseClick()"
        title="Close popup"></span>
    </span>
  </div>

  <div class="popup__body" v-html="content">
  </div>
</div>`,
            mixins: [draggable_1.draggable],
            el: '#popup',
            data() {
                return {
                    hidden: true,
                    type: 'coub',
                    title: null,
                    content: null,
                };
            },
            methods: {
                getDragHandle() {
                    return this.$refs.header;
                },
                getDraggable() {
                    return this.$refs.popup;
                },
                onCloseClick() {
                    self.closePopup();
                },
            },
        });
    }
    onPostsInserted(posts) {
        posts.forEach(this.processOEmbedLinks.bind(this));
    }
    processOEmbedLinks(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const postContent = utils_1.DOM.qs('.post__content', post);
            if (!postContent) {
                return;
            }
            const postMessage = utils_1.DOM.qs('.post__message', post);
            const links = utils_1.DOM.qsa('a[href]', post);
            links.filter(link => !link.hasAttribute('data-processed'))
                .map(link => {
                link.setAttribute('data-processed', 'true');
                return link.getAttribute('href');
            })
                .map(url => url.match('^https?:\/\/(?:www\.)?coub\.com\/view\/([0-9a-z]+)$'))
                .filter(matches => matches && matches.length >= 1)
                .forEach((matches) => __awaiter(this, void 0, void 0, function* () {
                const coubUrl = `https://coub.com/api/v2/coubs/${matches[1]}`;
                const url = `${window.baseUrl}/api/embed?url=${encodeURIComponent(coubUrl)}`;
                try {
                    const response = yield fetch(url, {
                        credentials: 'same-origin',
                    });
                    if (response.status !== 200) {
                        console.warn(`Can\'t load coub '${matches[0]}':`, response.status, response.statusText);
                        return;
                    }
                    const coub = yield response.json();
                    const thumbnailUrl = coub.image_versions.template.replace('%{version}', 'small');
                    const thumbnail = document.createElement('div');
                    thumbnail.classList.add('post__file', 'file');
                    thumbnail.innerHTML = `
<div class="post__file-info file-info filesize">
  <a class="file-info__link" href="https://coub.com/view/${coub.permalink}" target="_blank">Coub</a>
  <span class="file-info__size"></span>
</div>

<a class="file__thumbnail thumbnail thumbnail--video" href="https://coub.com/view/${coub.permalink}" target="_blank">
  <img class="thumbnail__content thumbnail__content_image" src="${thumbnailUrl}" />
</a>`;
                    thumbnail.style.maxHeight = '250px';
                    thumbnail.style.maxWidth = '250px';
                    postContent.insertBefore(thumbnail, postMessage);
                    const link = utils_1.DOM.qs('.thumbnail', thumbnail);
                    link.addEventListener('click', e => {
                        e.preventDefault();
                        this.openCoubInPopup(coub);
                    });
                }
                catch (e) {
                    console.warn(`Can\'t load coub '${matches[0]}':`, e);
                }
            }));
        });
    }
    openCoubInPopup(coub) {
        return __awaiter(this, void 0, void 0, function* () {
            const coubUrl = `https://coub.com/view/${coub.permalink}`;
            const oEmbedUrl = `https://coub.com/api/oembed.json?url=${encodeURIComponent(coubUrl)}&autoplay=true`;
            const url = `${window.baseUrl}/api/embed?url=${encodeURIComponent(oEmbedUrl)}`;
            try {
                const response = yield fetch(url, {
                    credentials: 'same-origin',
                });
                if (response.status !== 200) {
                    console.warn(`Can\'t load coub 'https://coub.com/view/${coub.permalink}':`, response.status, response.statusText);
                    return;
                }
                const json = yield response.json();
                this.popupViewModel.title = 'Coub — ' + coub.title;
                this.popupViewModel.content = json.html;
                this.popupViewModel.setPosition({
                    x: Math.max(0, window.innerWidth / 2 - json.width / 2),
                    y: Math.max(0, window.innerHeight / 2 - json.height / 2),
                });
                this.popupViewModel.hidden = false;
            }
            catch (e) {
                console.warn(`Can\'t load coub 'https://coub.com/view/${coub.permalink}':`, e);
            }
        });
    }
    closePopup() {
        this.popupViewModel.hidden = true;
        this.popupViewModel.content = null;
    }
}
exports.Post = Post;


/***/ }),

/***/ "./ts/components/posting-form.ts":
/*!***************************************!*\
  !*** ./ts/components/posting-form.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(/*! vue */ "vue"));
const _1 = __webpack_require__(/*! . */ "./ts/components/index.ts");
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const api_1 = __webpack_require__(/*! ../api */ "./ts/api.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class PostingForm {
    constructor() {
        this.isInThread = false;
        this.settings = __1.SettingsManager.load();
        __1.eventBus.$on(__1.Events.Ready, this.onReady.bind(this));
        __1.eventBus.$on(__1.Events.PostsInserted, this.onPostsInserted.bind(this));
    }
    onReady() {
        const form = utils_1.DOM.qid('posting-form');
        if (!form) {
            return;
        }
        const match = window.location.href.match(/\/res\/(\d+)/i);
        const isInThread = !!match;
        const threadId = isInThread ? +match[1] : 0;
        this.isInThread = isInThread;
        const component = this;
        this.viewModel = new vue_1.default({
            el: form,
            template: `
<form class="content__posting-form posting-form" id="posting-form"
  v-bind:class="{ 'posting-form--floating': position == 'float' }"
  v-on:submit.prevent="onSubmit()" v-show="!hidden"
  ref="form">
  <div class="posting-form__header" ref="header">
    <span class="posting-form__title">{{
      threadId ? 'Reply to thread #' + threadId : 'Create thread'
    }}</span>

    <span class="posting-form__header-buttons">
      <span class="posting-form__reset"
        v-on:click.stop="resetFields()" title="Clear form"></span>

      <span class="posting-form__float"
        v-if="position !== 'float' && mode !== 'mobile'"
        v-on:click.stop="makeFloating()" title="Floating form"></span>

      <span class="posting-form__restore"
        v-if="position === 'float' && mode !== 'mobile'"
        v-on:click.stop="moveToBottom()" title="Move form to bottom"></span>

      <span class="posting-form__close"
        v-on:click.stop="onCloseClick()" title="Close form"></span>
    </span>
  </div>

  <div class="posting-form__content">
    <x-file-preview class="posting-form__preview"
      v-bind:class="{
        'posting-form__preview--right': mode == 'default'
          && settings.previewAlign == 'right',
      }"
      v-bind:file="file"
      v-on:click="showFileDialog()"
      v-on:drop="onFileDrop($event)"
      v-show="mode == 'default' || file">
      <span class="posting-form__preview-remove"
        v-if="file" v-on:click.stop="file = null"></span>
    </x-file-preview>

    <div class="posting-form__main">
      <div class="posting-form__row">
        <input type="text" class="input posting-form__subject" placeholder="Subject"
          v-model="fields.subject"
          v-bind:disabled="disabled"
          v-on:change="onSubjectChange()" />

        <input type="text" class="input posting-form__name" placeholder="Name"
          v-model="fields.name"
          v-bind:disabled="disabled"
          v-on:change="onNameChange()" />

        <label class="posting-form__attachment" v-show="mode == 'mobile'">
          <input type="file" class="posting-form__attachment-input"
            v-model="fields.file" v-bind:disabled="disabled"
            v-on:change="onFileChange($event.target.files)"
            ref="file" />
        </label>

        <button type="submit" class="button posting-form__submit"
          v-if="mode == 'default'" v-bind:disabled="disabled">Reply</button>
      </div>

      <div class="posting-form__markup-row markup"
        v-show="(mode === 'mobile') && settings.showMarkupMobile
          || (mode !== 'mobile') && settings.showMarkup">
        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('b')">
          <strong>b</strong>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('i')">
          <em>i</em>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('u')">
          <span class="markup__underline">u</span>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('s')">
          <del>s</del>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('sub')">
          <sub>sub</sub>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('sup')">
          <sup>sup</sup>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('code')">
          <code>code</code>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('spoiler')">
          <span class="markup__spoiler markup__spoiler--visible">sp</span>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertMarkup('rp')">
          <span class="markup__rp markup__rp--visible">rp</span>
        </button>

        <button type="button" class="button posting-form__markup-button"
          v-on:click.prevent="insertQuote()">
          <span class="markup__quote">&gt;</span>
        </button>
      </div>

      <div class="posting-form__row">
        <textarea class="input posting-form__message" placeholder="Message"
          v-model="fields.message" v-bind:disabled="disabled"
          v-on:keydown="onMessageKeyDown($event)"
          v-on:paste="onMessagePaste($event)"
          ref="message"></textarea>
      </div>

      <div v-if="status" class="posting-form__status">{{ status }}</div>

      <button type="submit" class="posting-form__submit  posting-form__submit--mobile"
        v-if="mode == 'mobile'" v-bind:disabled="disabled">Reply</button>
    </div>
  </div>
</form>`,
            data() {
                return {
                    fields: {
                        subject: '',
                        name: '',
                        file: '',
                        message: '',
                    },
                    file: null,
                    disabled: false,
                    status: '',
                    hidden: true,
                    position: component.settings.form.saveFormState
                        && component.settings.form.float
                        ? 'float' : 'bottom',
                    mode: 'mobile',
                };
            },
            computed: {
                threadId() {
                    return threadId;
                },
                settings() {
                    return component.settings.form;
                },
            },
            created() {
                if (component.settings.form.saveSubject) {
                    // Load saved subject.
                    const subject = localStorage['posting-form.subject'];
                    if (subject) {
                        this.fields.subject = subject;
                    }
                }
                if (component.settings.form.saveName) {
                    // Load saved name.
                    const name = localStorage['posting-form.name'];
                    if (name) {
                        this.fields.name = name;
                    }
                }
                this.updateMode();
                this._resize = this.updateMode.bind(this);
                window.addEventListener('resize', this._resize);
            },
            mounted() {
                if (this.position === 'float') {
                    const position = component.settings.form.floatPosition;
                    this.setPosition(this.checkBounds(position));
                }
            },
            destroyed() {
                if (this._resize) {
                    window.removeEventListener('resize', this._resize);
                    this._resize = null;
                }
            },
            components: {
                'x-file-preview': _1.FilePreview,
            },
            mixins: [
                _1.draggable,
            ],
            methods: {
                getDragHandle() {
                    return this.$refs.header;
                },
                getDraggable() {
                    if (this.position !== 'float') {
                        return null;
                    }
                    return this.$refs.form;
                },
                setPosition(coords) {
                    const draggable = this.getDraggable();
                    if (!draggable) {
                        return;
                    }
                    draggable.style.left = `${coords.x}px`;
                    draggable.style.top = `${coords.y}px`;
                    component.settings.form.floatPosition = coords;
                    __1.SettingsManager.save(component.settings);
                },
                onDraggableResize() {
                    if (this.hidden) {
                        return;
                    }
                    this.setPosition(this.checkBounds(this.getPosition()));
                },
                resetFields() {
                    if (!component.settings.form.saveSubject) {
                        this.fields.subject = '';
                    }
                    if (!component.settings.form.saveName) {
                        this.fields.name = '';
                    }
                    this.fields.message = '';
                    this.fields.file = '';
                    this.file = null;
                },
                makeFloating() {
                    component.makeFloating();
                },
                moveToBottom() {
                    component.moveToBottom();
                },
                showFileDialog() {
                    if (this.$refs.file) {
                        this.$refs.file.click();
                    }
                },
                updateMode() {
                    this.mode = window.innerWidth < 600 ? 'mobile' : 'default';
                    if (this.mode === 'mobile' && this.position === 'float') {
                        component.moveToBottom();
                    }
                },
                onCloseClick() {
                    component.hide();
                    component.updateReplyButton();
                },
                onSubjectChange() {
                    // Save subject.
                    localStorage['posting-form.subject'] = this.fields.subject;
                },
                onNameChange() {
                    // Save name.
                    localStorage['posting-form.name'] = this.fields.name;
                },
                onFileDrop(e) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const file = e.dataTransfer.files[0];
                        if (file) {
                            this.file = file;
                        }
                        else {
                            const text = e.dataTransfer.getData('text');
                            if (text && text.match(/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,}\.[a-z]{2,}\b[-a-zA-Z0-9@:%_\+.~#?&\/=]*/)) {
                                const xhr = new XMLHttpRequest();
                                xhr.open('GET', text, true);
                                xhr.responseType = 'blob';
                                xhr.addEventListener('readystatechange', e => {
                                    if (xhr.readyState !== XMLHttpRequest.DONE) {
                                        return;
                                    }
                                    if (xhr.status < 400) {
                                        this.status = '';
                                        this.file = xhr.response;
                                    }
                                    else {
                                        this.status = `Error: ${xhr.status} ${xhr.statusText}`;
                                        this.file = null;
                                    }
                                });
                                xhr.send();
                            }
                        }
                    });
                },
                onFileChange(files) {
                    this.file = files.length ? files[0] : null;
                },
                onMessageKeyDown(e) {
                    // Submit form on Ctrl+Enter in the message field.
                    if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                        this.onSubmit();
                    }
                },
                onMessagePaste(e) {
                    // Paste file.
                    const data = e.clipboardData || e.originalEvent.clipboardData;
                    const items = Array.prototype.slice.call(data.items);
                    const item = items.filter(item => {
                        return item.type.startsWith('image/')
                            || item.type.startsWith('audio/')
                            || item.type.startsWith('video/');
                    })[0];
                    if (item) {
                        this.file = item.getAsFile();
                    }
                },
                insertMarkup(tag) {
                    const messageEl = this.$refs.message;
                    const selection = {
                        begin: messageEl.selectionStart,
                        end: messageEl.selectionEnd,
                        length: messageEl.selectionEnd - messageEl.selectionStart,
                    };
                    const message = this.fields.message;
                    const openingTag = `[${tag}]`;
                    const closingTag = `[/${tag}]`;
                    if (selection.length || component.settings.form.insertTagsInPairs) {
                        // If text is selected, wrap it in a tag pair.
                        this.fields.message = [
                            message.substring(0, selection.begin),
                            openingTag,
                            message.substring(selection.begin, selection.end),
                            closingTag,
                            message.substring(selection.end),
                        ].join('');
                        // Restore selection.
                        this.$nextTick(() => {
                            messageEl.focus();
                            messageEl.selectionStart = selection.begin + openingTag.length;
                            messageEl.selectionEnd = selection.end + openingTag.length;
                        });
                    }
                    else {
                        if (message.lastIndexOf(openingTag, selection.begin) > message.lastIndexOf(closingTag, selection.begin)) {
                            this.fields.message = [
                                message.substring(0, selection.begin),
                                closingTag,
                                message.substring(selection.end),
                            ].join('');
                            // Restore selection.
                            this.$nextTick(() => {
                                messageEl.focus();
                                messageEl.selectionStart = selection.begin + closingTag.length;
                                messageEl.selectionEnd = selection.end + closingTag.length;
                            });
                        }
                        else {
                            this.fields.message = [
                                message.substring(0, selection.begin),
                                openingTag,
                                message.substring(selection.end),
                            ].join('');
                            // Restore selection.
                            this.$nextTick(() => {
                                messageEl.focus();
                                messageEl.selectionStart = selection.begin + openingTag.length;
                                messageEl.selectionEnd = selection.end + openingTag.length;
                            });
                        }
                    }
                },
                insertQuote() {
                    const messageEl = this.$refs.message;
                    const selection = {
                        begin: messageEl.selectionStart,
                        end: messageEl.selectionEnd,
                        length: messageEl.selectionEnd - messageEl.selectionStart,
                    };
                    const message = this.fields.message;
                    const before = message.substring(0, selection.begin);
                    const after = message.substring(selection.end);
                    const newLineBefore = before.length && !before.endsWith('\n') ? '\n' : '';
                    const newLineAfter = !after.length || !after.startsWith('\n') ? '\n' : '';
                    const quoteText = window.getSelection().toString();
                    const quote = `${newLineBefore}> ${quoteText}${newLineAfter}`;
                    this.fields.message = [
                        before,
                        quote,
                        after,
                    ].join('');
                    this.$nextTick(() => {
                        messageEl.focus();
                        messageEl.selectionStart = selection.begin + quote.length;
                        messageEl.selectionEnd = selection.begin + quote.length;
                    });
                },
                onSubmit() {
                    return __awaiter(this, void 0, void 0, function* () {
                        this.disabled = true;
                        // Apply replaces to the message.
                        const replaces = component.settings.form.replaces;
                        const message = replaces.reduce((message, item) => {
                            const regexp = new RegExp(item.pattern, 'gm');
                            return message.replace(regexp, item.replace);
                        }, this.fields.message);
                        try {
                            const location = yield api_1.Api.createPost({
                                parent: threadId,
                                subject: this.fields.subject,
                                name: this.fields.name,
                                message: message,
                                file: this.file,
                            }, e => {
                                const progressPercent = Math.ceil(e.loaded / e.total * 100);
                                this.status = `Uploading... ${progressPercent}%`;
                            });
                            this.resetFields();
                            this.status = '';
                            if (this.position !== 'float') {
                                // Move form to the initial location.
                                component.moveToBottom();
                            }
                            if (isInThread) {
                                // Trigger DE thread update.
                                const updater = utils_1.DOM.qs('.de-thr-updater-link');
                                if (updater) {
                                    updater.click();
                                }
                            }
                            else {
                                // Redirect to thread.
                                if (location) {
                                    window.location.href = location;
                                }
                            }
                        }
                        catch (e) {
                            this.status = `Error: ${e}`;
                        }
                        this.disabled = false;
                        if (component.settings.form.scrollBottom) {
                            // Scroll to the last post.
                            setTimeout(() => {
                                const el = utils_1.DOM.qs('.post:nth-last-of-type(1)');
                                if (el) {
                                    el.scrollIntoView(true);
                                }
                            }, 300);
                        }
                    });
                },
            },
        });
        const showButton = utils_1.DOM.qid('posting-form-show');
        if (showButton) {
            showButton.addEventListener('click', () => {
                this.moveToBottom();
            });
        }
        const content = utils_1.DOM.qs('.layout__content');
        if (content) {
            content.addEventListener('click', e => {
                const target = e.target;
                if (!target.getAttribute('data-reflink')) {
                    return;
                }
                e.preventDefault();
                const vm = this.viewModel;
                const messageEl = vm.$refs.message;
                const selection = {
                    begin: messageEl.selectionStart,
                    end: messageEl.selectionEnd,
                    length: messageEl.selectionEnd - messageEl.selectionStart,
                };
                const message = vm.fields.message;
                const before = message.substring(0, selection.begin);
                const after = message.substring(selection.end);
                const newLineBefore = before.length && !before.endsWith('\n') ? '\n' : '';
                const newLineAfter = !after.length || !after.startsWith('\n') ? '\n' : '';
                const id = target.getAttribute('data-reflink');
                const quoteText = window.getSelection().toString();
                const lastQuoteIndex = message.lastIndexOf('>>', selection.begin);
                const quoteSamePost = lastQuoteIndex !== -1
                    && message.lastIndexOf(`>>${id}`, selection.begin) >= lastQuoteIndex;
                // If quoting the same post again, not insert id.
                let quote = '';
                if (quoteSamePost) {
                    quote = quoteText
                        ? `${newLineBefore}> ${quoteText}${newLineAfter}`
                        : '';
                }
                else {
                    quote = quoteText
                        ? `${newLineBefore}>>${id}\n> ${quoteText}${newLineAfter}`
                        : `${newLineBefore}>>${id}${newLineAfter}`;
                }
                // Insert reply markup.
                vm.fields.message = [
                    before,
                    quote,
                    after,
                ].join('');
                if (this.isInThread) {
                    if (quoteSamePost && !quoteText && !vm.hidden && vm.position !== 'bottom') {
                        this.hide();
                    }
                    else {
                        if (vm.position !== 'float') {
                            // Move form to the post.
                            const post = target.closest('.post');
                            if (post) {
                                this.moveToPost(post);
                            }
                            else {
                                this.moveToBottom();
                            }
                        }
                        else {
                            this.show();
                        }
                    }
                }
                vm.$nextTick(() => {
                    messageEl.focus();
                    messageEl.selectionStart = selection.begin + quote.length;
                    messageEl.selectionEnd = selection.begin + quote.length;
                });
            });
        }
    }
    onPostsInserted(posts) {
        if (this.settings.common.scrollToNewPosts) {
            const scrollingEl = document.scrollingElement || document.body;
            const postsHeight = posts.reduce((total, post) => {
                const style = document.defaultView.getComputedStyle(post, '');
                const margin = parseInt(style.getPropertyValue('margin-top'))
                    + parseInt(style.getPropertyValue('margin-bottom'));
                return total + post.offsetHeight + margin;
            }, 0);
            // If in the bottom area.
            const bottomOffset = scrollingEl.scrollHeight - scrollingEl.scrollTop;
            const bottomArea = postsHeight + 1.5 * window.innerHeight;
            if (bottomOffset < bottomArea) {
                // Scroll to the last post.
                setTimeout(() => {
                    const el = utils_1.DOM.qs('.post:nth-last-of-type(1)');
                    if (el) {
                        el.scrollIntoView(true);
                    }
                }, 300);
            }
        }
        if (this.settings.common.movePostHeaderReflinkIconToDE) {
            posts.forEach(post => {
                // Move reply icon after DE hide icon.
                const replyIcon = utils_1.DOM.qs('.post-header__reflink-wrapper > .post-header__reflink-icon', post);
                const deHide = utils_1.DOM.qs('.de-btn-hide', post);
                if (replyIcon && deHide) {
                    deHide.parentElement.insertBefore(replyIcon, deHide.nextSibling);
                }
            });
        }
    }
    updateReplyButton() {
        const showButton = utils_1.DOM.qid('posting-form-show');
        if (!showButton) {
            return;
        }
        if (this.viewModel.hidden || this.viewModel.position !== 'bottom') {
            showButton.classList.remove('hidden');
        }
        else {
            showButton.classList.add('hidden');
        }
    }
    hide() {
        this.viewModel.hidden = true;
    }
    show() {
        this.viewModel.hidden = false;
    }
    makeFloating() {
        this.show();
        const vm = this.viewModel;
        vm.position = 'float';
        this.settings.form.float = true;
        __1.SettingsManager.save(this.settings);
        const position = this.settings.form.floatPosition;
        vm.setPosition(vm.checkBounds(position));
        this.updateReplyButton();
    }
    moveToPost(post, focus = false) {
        const form = utils_1.DOM.qid('posting-form');
        if (form) {
            post.parentElement.insertBefore(form, post.nextSibling);
        }
        this.show();
        const vm = this.viewModel;
        vm.position = 'post';
        this.settings.form.float = false;
        __1.SettingsManager.save(this.settings);
        const showButton = utils_1.DOM.qid('posting-form-show');
        if (showButton) {
            showButton.classList.remove('hidden');
        }
        this.updateReplyButton();
        if (focus) {
            vm.$nextTick(() => {
                const message = vm.$refs.message;
                if (message) {
                    message.focus();
                }
            });
        }
    }
    moveToBottom(focus = false) {
        const form = utils_1.DOM.qid('posting-form');
        const wrapper = utils_1.DOM.qid('posting-form-wrapper');
        if (form && wrapper) {
            wrapper.insertBefore(form, null);
        }
        this.show();
        const vm = this.viewModel;
        vm.position = 'bottom';
        this.settings.form.float = false;
        __1.SettingsManager.save(this.settings);
        this.updateReplyButton();
        if (focus) {
            vm.$nextTick(() => {
                const message = vm.$refs.message;
                if (message) {
                    message.focus();
                }
            });
        }
    }
}
exports.PostingForm = PostingForm;


/***/ }),

/***/ "./ts/components/settings.ts":
/*!***********************************!*\
  !*** ./ts/components/settings.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = __webpack_require__(/*! luxon */ "luxon");
const vue_1 = __importDefault(__webpack_require__(/*! vue */ "vue"));
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class Settings {
    constructor() {
        __1.eventBus.$on(__1.Events.Ready, this.onReady.bind(this));
    }
    onReady() {
        const settingsForm = utils_1.DOM.qid('settings_form');
        if (!settingsForm) {
            return;
        }
        const Checkbox = vue_1.default.extend({
            template: `
<div class="settings-form__row">
  <label class="settings-form__label">
    <input type="checkbox" class="settings-form__checkbox"
      :value="value"
      :checked="checked"
      @change="onInput" />
    <slot></slot>
  </label>
</div>`,
            model: {
                prop: 'checked',
                event: 'change',
            },
            props: {
                value: {
                    type: Boolean,
                    default: true,
                },
                checked: {
                    type: Boolean,
                    default: false,
                },
            },
            methods: {
                onInput(e) {
                    this.$emit('change', !this.checked);
                },
            },
        });
        const RadioButton = vue_1.default.extend({
            template: `
<div class="settings-form__row">
  <label class="settings-form__label">
    <input type="radio" class="settings-form__radio"
      :value="value"
      :checked="value == selectedValue"
      @change="onInput" />
    <slot></slot>
  </label>
</div>`,
            model: {
                prop: 'selectedValue',
                event: 'change',
            },
            props: {
                value: String,
                selectedValue: String,
            },
            methods: {
                onInput(e) {
                    this.$emit('change', this.value);
                },
            },
        });
        this.viewModel = new vue_1.default({
            el: '#settings_form',
            template: `
<div class="content__settings-form settings-form" id="settings_form">
  <ul class="settings-form__tabs">
    <li class="settings-form__tab"
      :class="{ 'settings-form__tab--active': tab === 'common' }"
      @click="tab = 'common'">Common</li>

    <li class="settings-form__tab"
      :class="{ 'settings-form__tab--active': tab === 'form' }"
      @click="tab = 'form'">Form</li>

    <li class="settings-form__tab"
      :class="{ 'settings-form__tab--active': tab === 'time' }"
      @click="tab = 'time'">Time</li>
  </ul>

  <div class="settings-form__tab-content"
    v-show="tab === 'common'">
    <h3 class="settings-form__option-title">Thread Alignment</h3>

    <x-radio-button v-model="settings.common.layout" :value="'left'">
      On the left
    </x-radio-button>

    <x-radio-button v-model="settings.common.layout" :value="'center'">
      In the center
    </x-radio-button>

    <h3 class="settings-form__option-title">Posts</h3>

    <x-checkbox v-model="settings.common.showPostHeaderReflinkIcon">
      Show reply icon in the post header
    </x-checkbox>

    <x-checkbox v-model="settings.common.movePostHeaderReflinkIconToDE">
      Move reply icon to DE buttons
    </x-checkbox>

    <x-checkbox v-model="settings.common.showPostReflinkIcon">
      Show reply icon in the bottom right corner of post message
    </x-checkbox>

    <x-checkbox v-model="settings.common.scrollToNewPosts">
      Scroll to new posts
    </x-checkbox>

    <x-checkbox v-model="settings.common.smoothScroll">
      Smooth scrolling
    </x-checkbox>
  </div>

  <div class="settings-form__tab-content"
    v-show="tab === 'form'">
    <h3 class="settings-form__option-title">Form Behaviour</h3>

    <x-checkbox v-model="settings.form.scrollBottom">
      Scroll to the bottom after posting
    </x-checkbox>

    <x-checkbox v-model="settings.form.saveSubject">
      Save subject after posting
    </x-checkbox>

    <x-checkbox v-model="settings.form.saveName">
      Save name after posting
    </x-checkbox>

    <x-checkbox v-model="settings.form.saveFormState">
      Save form floating state on page reload
    </x-checkbox>

    <h3 class="settings-form__option-title">Form Alignment</h3>

    <x-radio-button v-model="settings.form.align" :value="'left'">
      On the left
    </x-radio-button>

    <x-radio-button v-model="settings.form.align" :value="'center'">
      In the center
    </x-radio-button>

    <h3 class="settings-form__option-title">Preview Alignment</h3>

    <x-radio-button v-model="settings.form.previewAlign" :value="'left'">
      On the left
    </x-radio-button>

    <x-radio-button v-model="settings.form.previewAlign" :value="'right'">
      On the right
    </x-radio-button>

    <h3 class="settings-form__option-title">Markup</h3>

    <x-checkbox v-model="settings.form.showMarkup">
      Show markup buttons
    </x-checkbox>

    <x-checkbox v-model="settings.form.showMarkupMobile">
      Show markup buttons (mobile)
    </x-checkbox>

    <x-checkbox v-model="settings.form.insertTagsInPairs">
      Insert tags in pairs
    </x-checkbox>

    <h3 class="settings-form__option-title">Replaces</h3>

    <ul class="settings-form__list">
      <li class="settings-form__list-item"
        v-for="(item, index) in settings.form.replaces">
        <input type="text" class="input settings-form__text"
          v-model="item.pattern" placeholder="Pattern" />

        <input type="text" class="input settings-form__text"
          v-model="item.replace" placeholder="Replace" />

        <button class="button"
          @click="removeReplaceAt(index)">Remove</button>
      </li>

      <li class="settings-form__list-item">
        <input type="text" class="input settings-form__text"
          v-model="newReplace.pattern" placeholder="Pattern" />

        <input type="text" class="input settings-form__text"
          v-model="newReplace.replace" placeholder="Replace" />

        <button class="button"
          @click="addReplace(newReplace)">Add</button>
      </li>
    </ul>
  </div>

  <div class="settings-form__tab-content"
    v-show="tab === 'time'">
    <h3 class="settings-form__option-title">Language</h3>

    <x-radio-button v-model="settings.time.locale" :value="'default'">
      Browser default
    </x-radio-button>

    <x-radio-button v-model="settings.time.locale" :value="'custom'">
      Custom
      <input type="text" class="input settings-form__text" placeholder="en"
        @click="settings.time.locale = 'custom'"
        v-model="settings.time.localeCustom" />
    </x-radio-button>

    <h3 class="settings-form__option-title">Format</h3>

    <x-radio-button v-model="settings.time.format" :value="'default'">
      Browser default
    </x-radio-button>

    <x-radio-button v-model="settings.time.format" :value="'custom'">
      Custom
      <input type="text" class="input settings-form__text"
        placeholder="EEE, dd MMM yyyy HH:mm:ss"
        @click="settings.time.format = 'custom'"
        v-model="settings.time.formatCustom" />
    </x-radio-button>

    <p>
      See the
      <a href="https://github.com/moment/luxon/blob/master/docs/formatting.md#table-of-tokens">
        luxon documentation
      </a>
      for the custom tokens reference.
    </p>

    <h3 class="settings-form__option-title">Time zone</h3>

    <x-radio-button v-model="settings.time.zone" :value="'default'">
      Browser default
    </x-radio-button>

    <x-radio-button v-model="settings.time.zone" :value="'fixed'">
      Fixed UTC offset
      <input type="number" class="input settings-form__text"
        min="-99" max="99"
        @click="settings.time.zone = 'fixed'"
        v-model="settings.time.zoneFixed" />
    </x-radio-button>

    <h3 class="settings-form__option-title">Current format</h3>

    <p>{{ time }}</p>
  </div>

  <div class="settings-form__footer">
    <div class="settings-form__buttons">
      <p class="settings-form__status" >{{ status }}</p>

      <button type="button" class="button settings-form__save"
        @click.prevent="saveSettings()">Save</button>
    </div>
  </div>
</div>`,
            data() {
                return {
                    settings: null,
                    tab: 'common',
                    newReplace: {
                        pattern: '',
                        replace: '',
                    },
                    time: '',
                    status: '',
                };
            },
            created() {
                // Load settings from a cookie
                this.settings = __1.SettingsManager.load();
                this._timer = setInterval(this.updateTime.bind(this), 1000);
            },
            destroyed() {
                if (this._timer) {
                    clearInterval(this._timer);
                }
            },
            methods: {
                removeReplaceAt(index) {
                    this.settings.form.replaces.splice(index, 1);
                },
                addReplace(item) {
                    try {
                        new RegExp(item.pattern, 'gm');
                    }
                    catch (e) {
                        this.status = `Invalid regular expression: ${e.message}`;
                        return;
                    }
                    this.settings.form.replaces.push(Object.assign({}, item));
                    this.newReplace = { pattern: '', replace: '' };
                },
                updateTime() {
                    try {
                        const time = luxon_1.DateTime.fromJSDate(new Date());
                        this.time = utils_1.Time.format(time, this.settings);
                    }
                    catch (_a) {
                        this.time = 'Invalid format';
                    }
                },
                saveSettings() {
                    __1.SettingsManager.save(this.settings);
                    // Indicate that settings are saved.
                    this.status = '';
                    setTimeout(() => {
                        this.status = 'Settings saved.';
                    }, 1000 / 3);
                },
            },
            components: {
                'x-checkbox': Checkbox,
                'x-radio-button': RadioButton,
            },
        });
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "./ts/components/style-switch.ts":
/*!***************************************!*\
  !*** ./ts/components/style-switch.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __webpack_require__(/*! .. */ "./ts/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./ts/utils/index.ts");
class StyleSwitch {
    constructor() {
        this.styles = {};
        // Parse selectable styles from <head>
        const styles = utils_1.DOM.qsa('link[title]');
        styles.forEach(style => {
            const title = style.title;
            const url = style.getAttribute('href');
            this.styles[title] = url;
            if (!style.hasAttribute('data-selected')) {
                style.remove();
            }
        });
        // Get selected style
        const selected_style = utils_1.Cookie.get('tinyib_style', 'Synthwave');
        this.setStyle(selected_style);
        __1.eventBus.$on(__1.Events.Ready, this.onReady.bind(this));
    }
    onReady() {
        const style_switcher = utils_1.DOM.qid('style-switcher');
        if (style_switcher) {
            // Populate style switcher widget
            const styles = Object.keys(this.styles);
            for (let i = 0; i < styles.length; ++i) {
                const title = styles[i];
                style_switcher.innerHTML += `<option class="style-switcher__option" value="${title}">${title}</option>`;
            }
            // Set style change callback
            style_switcher.addEventListener('change', () => {
                this.setStyle(style_switcher.value);
            });
        }
        const selected_style = utils_1.Cookie.get('tinyib_style', 'Synthwave');
        window.dataLayer.push({ 'theme': selected_style });
    }
    setStyle(style) {
        const head = utils_1.DOM.qs('head');
        // If no <head> element, do nothing
        if (!head) {
            return;
        }
        const selected_style = utils_1.DOM.qs('link[data-selected]');
        if (selected_style) {
            // If style already selected, do nothing
            if (selected_style.title === style) {
                return;
            }
            // Remove previously selected style from <head>
            selected_style.remove();
        }
        // Add currently selected style to <head>
        const url = this.styles[style];
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        link.setAttribute('data-selected', 'true');
        head.appendChild(link);
        // Save selected style
        const expiration_date = new Date();
        expiration_date.setTime(expiration_date.getTime() + 365 * 24 * 60 * 60 * 1000);
        utils_1.Cookie.set('tinyib_style', style, expiration_date);
    }
}
exports.StyleSwitch = StyleSwitch;


/***/ }),

/***/ "./ts/event-bus.ts":
/*!*************************!*\
  !*** ./ts/event-bus.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(/*! vue */ "vue"));
const eventBus = new vue_1.default();
exports.eventBus = eventBus;


/***/ }),

/***/ "./ts/events.ts":
/*!**********************!*\
  !*** ./ts/events.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Events;
(function (Events) {
    Events["Ready"] = "ready";
    Events["PostsInserted"] = "posts_inserted";
    Events["PostCreated"] = "post_created";
    Events["InsertMarkup"] = "insert_markup";
})(Events = exports.Events || (exports.Events = {}));


/***/ }),

/***/ "./ts/index.ts":
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __webpack_require__(/*! ./api */ "./ts/api.ts");
exports.Api = api_1.Api;
var event_bus_1 = __webpack_require__(/*! ./event-bus */ "./ts/event-bus.ts");
exports.eventBus = event_bus_1.eventBus;
var events_1 = __webpack_require__(/*! ./events */ "./ts/events.ts");
exports.Events = events_1.Events;
var settings_1 = __webpack_require__(/*! ./settings */ "./ts/settings.ts");
exports.SettingsManager = settings_1.SettingsManager;


/***/ }),

/***/ "./ts/settings.ts":
/*!************************!*\
  !*** ./ts/settings.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const settingsKey = 'settings';
const defaultSettings = {
    common: {
        layout: 'left',
        showPostHeaderReflinkIcon: true,
        movePostHeaderReflinkIconToDE: false,
        showPostReflinkIcon: false,
        scrollToNewPosts: true,
        smoothScroll: true,
    },
    form: {
        align: 'center',
        previewAlign: 'right',
        scrollBottom: true,
        showMarkup: true,
        showMarkupMobile: false,
        insertTagsInPairs: true,
        saveFormState: false,
        saveSubject: false,
        saveName: true,
        float: false,
        floatPosition: { x: 100, y: 100 },
        replaces: [],
    },
    time: {
        locale: 'default',
        localeCustom: '',
        zone: 'default',
        zoneFixed: 0,
        format: 'default',
        formatCustom: '',
    },
};
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
function merge(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                }
                else {
                    output[key] = merge(target[key], source[key]);
                }
            }
            else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
class SettingsManager {
    static load() {
        const settings = JSON.parse(localStorage.getItem(settingsKey));
        return merge(defaultSettings, settings);
    }
    static save(settings) {
        const data = JSON.stringify(settings);
        localStorage.setItem(settingsKey, data);
    }
}
exports.SettingsManager = SettingsManager;


/***/ }),

/***/ "./ts/utils/cookie.ts":
/*!****************************!*\
  !*** ./ts/utils/cookie.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Cookie {
    static get(name, _default = null) {
        const cookie_str = `; ${document.cookie}`;
        const cookie_parts = cookie_str.split(`; ${name}=`);
        if (cookie_parts.length === 2) {
            const value_enc = cookie_parts.pop().split(';').shift();
            return decodeURIComponent(value_enc);
        }
        return _default;
    }
    static set(name, value, expiration) {
        const value_enc = encodeURIComponent(value);
        const expiration_str = expiration.toUTCString();
        document.cookie = `${name}=${value_enc}; path=/; expires=${expiration_str}`;
    }
}
exports.Cookie = Cookie;


/***/ }),

/***/ "./ts/utils/dom.ts":
/*!*************************!*\
  !*** ./ts/utils/dom.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class DOM {
    static qid(id) {
        return document.getElementById(id);
    }
    static qs(selector, context = null) {
        if (!context) {
            context = document;
        }
        return context.querySelector(selector);
    }
    static qsa(selector, context = null) {
        if (!context) {
            context = document;
        }
        const elementList = context.querySelectorAll(selector);
        return Array.prototype.slice.call(elementList);
    }
}
exports.DOM = DOM;


/***/ }),

/***/ "./ts/utils/index.ts":
/*!***************************!*\
  !*** ./ts/utils/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = __webpack_require__(/*! ./cookie */ "./ts/utils/cookie.ts");
exports.Cookie = cookie_1.Cookie;
var dom_1 = __webpack_require__(/*! ./dom */ "./ts/utils/dom.ts");
exports.DOM = dom_1.DOM;
var time_1 = __webpack_require__(/*! ./time */ "./ts/utils/time.ts");
exports.Time = time_1.Time;


/***/ }),

/***/ "./ts/utils/time.ts":
/*!**************************!*\
  !*** ./ts/utils/time.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Time {
    static format(time, settings) {
        if (settings.time.locale === 'custom') {
            time = time.setLocale(settings.time.localeCustom);
        }
        if (settings.time.zone === 'fixed') {
            const offset = settings.time.zoneFixed;
            const offsetStr = 'UTC' + (offset >= 0 ? '+' : '') + offset.toString();
            time = time.setZone(offsetStr);
        }
        if (settings.time.format === 'custom') {
            return time.toFormat(settings.time.formatCustom);
        }
        else {
            return time.toFormat('d.LL.yyyy HH:mm:ss');
        }
    }
}
exports.Time = Time;


/***/ }),

/***/ "luxon":
/*!************************!*\
  !*** external "luxon" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = luxon;

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vdHMvYXBpLnRzIiwid2VicGFjazovLy8uL3RzL2FwcC50cyIsIndlYnBhY2s6Ly8vLi90cy9jb21wb25lbnRzL2NhcHRjaGEudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvY29tcG9uZW50cy9jb3JyZWN0LXRpbWUudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvY29tcG9uZW50cy9kZWxldGUtZm9ybS50cyIsIndlYnBhY2s6Ly8vLi90cy9jb21wb25lbnRzL2RyYWdnYWJsZS50cyIsIndlYnBhY2s6Ly8vLi90cy9jb21wb25lbnRzL2ZpbGUtcHJldmlldy50cyIsIndlYnBhY2s6Ly8vLi90cy9jb21wb25lbnRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudHMvbmV3LXBvc3RzLWRldGVjdG9yLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudHMvcG9zdC1yZWZlcmVuY2UtbWFwLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudHMvcG9zdC50cyIsIndlYnBhY2s6Ly8vLi90cy9jb21wb25lbnRzL3Bvc3RpbmctZm9ybS50cyIsIndlYnBhY2s6Ly8vLi90cy9jb21wb25lbnRzL3NldHRpbmdzLnRzIiwid2VicGFjazovLy8uL3RzL2NvbXBvbmVudHMvc3R5bGUtc3dpdGNoLnRzIiwid2VicGFjazovLy8uL3RzL2V2ZW50LWJ1cy50cyIsIndlYnBhY2s6Ly8vLi90cy9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vdHMvdXRpbHMvY29va2llLnRzIiwid2VicGFjazovLy8uL3RzL3V0aWxzL2RvbS50cyIsIndlYnBhY2s6Ly8vLi90cy91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi90cy91dGlscy90aW1lLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImx1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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQXdELFVBQVU7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLFNBQVM7QUFDdkQsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Es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QWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlEQUFpRDtBQUNoRTs7QUFFQTtBQUNBLGVBQWUsK0NBQStDO0FBQzlEOztBQUVBO0FBQ0EsZUFBZSwrQ0FBK0M7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDNUQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQSw2QkFBNkIsR0FBRyxnQkFBZ0I7QUFDaEQsZ0RBQWdELEdBQUcsS0FBSztBQUN4RDtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixLQUFLLEdBQUcsV0FBVyxRQUFRLFdBQVcsZUFBZTtBQUNsRjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsQmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGVBQWUsbUJBQU8sQ0FBQyxzQ0FBVTtBQUNqQztBQUNBLFlBQVksbUJBQU8sQ0FBQyxnQ0FBTztBQUMzQjtBQUNBLGFBQWEsbUJBQU8sQ0FBQyxrQ0FBUTtBQUM3Qjs7Ozs7Ozs7Ozs7OztBQ1BhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQSx1Qjs7Ozs7Ozs7Ozs7QUNBQSxxQiIsImZpbGUiOiIuL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi90cy9hcHAudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgQXBpIHtcbiAgICBzdGF0aWMgY3JlYXRlUG9zdChyZXF1ZXN0LCBvblByb2dyZXNzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3dpbmRvdy5iYXNlVXJsfS9hamF4L3Bvc3QvY3JlYXRlYDtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ3BhcmVudCcsIHJlcXVlc3QucGFyZW50LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdzdWJqZWN0JywgcmVxdWVzdC5zdWJqZWN0KTtcbiAgICAgICAgICAgICAgICBkYXRhLmFwcGVuZCgnbmFtZScsIHJlcXVlc3QubmFtZSk7XG4gICAgICAgICAgICAgICAgZGF0YS5hcHBlbmQoJ21lc3NhZ2UnLCByZXF1ZXN0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgcmVxdWVzdC5maWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgICAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIG9uUHJvZ3Jlc3MuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeGhyLmdldFJlc3BvbnNlSGVhZGVyKCdMb2NhdGlvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChkYXRhLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChgJHt4aHIuc3RhdHVzfSAke3hoci5zdGF0dXNUZXh0fWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5BcGkgPSBBcGk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IF8xID0gcmVxdWlyZShcIi5cIik7XG5jb25zdCBjb21wb25lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzXCIpO1xuY29uc3Qgc2V0dGluZ3NfMSA9IHJlcXVpcmUoXCIuL3NldHRpbmdzXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xubmV3IGNvbXBvbmVudHNfMS5DYXB0Y2hhKCk7XG5uZXcgY29tcG9uZW50c18xLkNvcnJlY3RUaW1lKCk7XG5uZXcgY29tcG9uZW50c18xLkRlbGV0ZUZvcm0oKTtcbm5ldyBjb21wb25lbnRzXzEuTmV3UG9zdHNEZXRlY3RvcigpO1xubmV3IGNvbXBvbmVudHNfMS5Qb3N0KCk7XG5uZXcgY29tcG9uZW50c18xLlBvc3RpbmdGb3JtKCk7XG5uZXcgY29tcG9uZW50c18xLlBvc3RSZWZlcmVuY2VNYXAoKTtcbm5ldyBjb21wb25lbnRzXzEuU2V0dGluZ3MoKTtcbm5ldyBjb21wb25lbnRzXzEuU3R5bGVTd2l0Y2goKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBlID0+IHtcbiAgICBfMS5ldmVudEJ1cy4kZW1pdChfMS5FdmVudHMuUmVhZHkpO1xuICAgIGNvbnN0IHNldHRpbmdzID0gc2V0dGluZ3NfMS5TZXR0aW5nc01hbmFnZXIubG9hZCgpO1xuICAgIGlmIChzZXR0aW5ncy5jb21tb24uc21vb3RoU2Nyb2xsKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc21vb3RoLXNjcm9sbCcpO1xuICAgIH1cbiAgICBjb25zdCBsYXlvdXQgPSB1dGlsc18xLkRPTS5xcygnLmxheW91dCcpO1xuICAgIGlmIChsYXlvdXQpIHtcbiAgICAgICAgbGF5b3V0LmNsYXNzTGlzdC5hZGQoJ2xheW91dC0tJyArIHNldHRpbmdzLmNvbW1vbi5sYXlvdXQpO1xuICAgICAgICBpZiAoIXNldHRpbmdzLmNvbW1vbi5zaG93UG9zdEhlYWRlclJlZmxpbmtJY29uKSB7XG4gICAgICAgICAgICBsYXlvdXQuY2xhc3NMaXN0LmFkZCgnbGF5b3V0LS1oaWRlLXBvc3QtaGVhZGVyLXJlZmxpbmstaWNvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2V0dGluZ3MuY29tbW9uLnNob3dQb3N0UmVmbGlua0ljb24pIHtcbiAgICAgICAgICAgIGxheW91dC5jbGFzc0xpc3QuYWRkKCdsYXlvdXQtLWhpZGUtcG9zdC1yZWZsaW5rLWljb24nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBmb3JtV3JhcHBlciA9IHV0aWxzXzEuRE9NLnFzKCcuY29udGVudF9fcG9zdGluZy1mb3JtLXdyYXBwZXInKTtcbiAgICBpZiAoZm9ybVdyYXBwZXIpIHtcbiAgICAgICAgZm9ybVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY29udGVudF9fcG9zdGluZy1mb3JtLXdyYXBwZXItLScgKyBzZXR0aW5ncy5mb3JtLmFsaWduKTtcbiAgICB9XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgX18xID0gcmVxdWlyZShcIi4uXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbmNsYXNzIENhcHRjaGEge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsU3JjID0gJyc7XG4gICAgICAgIF9fMS5ldmVudEJ1cy4kb24oX18xLkV2ZW50cy5SZWFkeSwgdGhpcy5vblJlYWR5LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHV0aWxzXzEuRE9NLnFpZCgnY2FwdGNoYWltYWdlJyk7XG4gICAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFNyYyA9IGltYWdlLnNyYztcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZWxvYWQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVsb2FkKCkge1xuICAgICAgICBjb25zdCBjYXB0Y2hhID0gdXRpbHNfMS5ET00ucWlkKCdjYXB0Y2hhJyk7XG4gICAgICAgIGNhcHRjaGEudmFsdWUgPSAnJztcbiAgICAgICAgY2FwdGNoYS5mb2N1cygpO1xuICAgICAgICBjb25zdCBpbWFnZSA9IHV0aWxzXzEuRE9NLnFpZCgnY2FwdGNoYWltYWdlJyk7XG4gICAgICAgIGltYWdlLnNyYyA9IGAke3RoaXMub3JpZ2luYWxTcmN9IyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2FwdGNoYSA9IENhcHRjaGE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGx1eG9uXzEgPSByZXF1aXJlKFwibHV4b25cIik7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY2xhc3MgQ29ycmVjdFRpbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gX18xLlNldHRpbmdzTWFuYWdlci5sb2FkKCk7XG4gICAgICAgIF9fMS5ldmVudEJ1cy4kb24oX18xLkV2ZW50cy5Qb3N0c0luc2VydGVkLCB0aGlzLm9uUG9zdHNJbnNlcnRlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgb25Qb3N0c0luc2VydGVkKHBvc3RzKSB7XG4gICAgICAgIHBvc3RzLmZvckVhY2godGhpcy5vblBvc3RJbnNlcnRlZC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgb25Qb3N0SW5zZXJ0ZWQocG9zdCkge1xuICAgICAgICBjb25zdCB0aW1lRWxlbWVudHMgPSB1dGlsc18xLkRPTS5xc2EoJy5wb3N0IHRpbWUnLCBwb3N0KTtcbiAgICAgICAgdGltZUVsZW1lbnRzLmZvckVhY2godGhpcy5jb3JyZWN0VGltZS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgY29ycmVjdFRpbWUoZWwpIHtcbiAgICAgICAgY29uc3QgdGltZV9zdHIgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJyk7XG4gICAgICAgIGlmICghdGltZV9zdHIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aW1lID0gbHV4b25fMS5EYXRlVGltZS5mcm9tSVNPKHRpbWVfc3RyKTtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB1dGlsc18xLlRpbWUuZm9ybWF0KHRpbWUsIHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ29ycmVjdFRpbWUgPSBDb3JyZWN0VGltZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgX18xID0gcmVxdWlyZShcIi4uXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbmNsYXNzIERlbGV0ZUZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfXzEuZXZlbnRCdXMuJG9uKF9fMS5FdmVudHMuUmVhZHksIHRoaXMub25SZWFkeS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IHV0aWxzXzEuRE9NLnFpZCgnZGVsZm9ybScpO1xuICAgICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZWxldGVfcG9zdF9wYXNzd29yZCA9IHV0aWxzXzEuRE9NLnFpZCgnZGVsZXRlcG9zdHBhc3N3b3JkJyk7XG4gICAgICAgIGlmIChkZWxldGVfcG9zdF9wYXNzd29yZCkge1xuICAgICAgICAgICAgLy8gTG9hZCBkZWxldGUgcG9zdCBwYXNzd29yZC5cbiAgICAgICAgICAgIGRlbGV0ZV9wb3N0X3Bhc3N3b3JkLnZhbHVlID0gdXRpbHNfMS5Db29raWUuZ2V0KCd0aW55aWJfcGFzc3dvcmQnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRGVsZXRlRm9ybSA9IERlbGV0ZUZvcm07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBvaW50ZXJFdmVudHMgPSAnUG9pbnRlckV2ZW50JyBpbiB3aW5kb3c7XG5jb25zdCB0b3VjaEV2ZW50cyA9ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcbmV4cG9ydHMuZHJhZ2dhYmxlID0ge1xuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IHRoaXMuZ2V0RHJhZ0hhbmRsZSgpO1xuICAgICAgICBpZiAoIWhhbmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlUmVzaXplID0gdGhpcy5vbkRyYWdnYWJsZVJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZU1vdXNlRG93biA9IHRoaXMub25EcmFnZ2FibGVNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZHJhZ2dhYmxlUmVzaXplKTtcbiAgICAgICAgaWYgKHBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIHRoaXMuZHJhZ2dhYmxlTW91c2VEb3duKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b3VjaEV2ZW50cykge1xuICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5kcmFnZ2FibGVNb3VzZURvd24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZHJhZ2dhYmxlTW91c2VEb3duKTtcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMuc2V0UG9zaXRpb24odGhpcy5jaGVja0JvdW5kcyh0aGlzLmdldFBvc2l0aW9uKCkpKTtcbiAgICB9LFxuICAgIGJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZVJlc2l6ZSkge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZHJhZ2dhYmxlUmVzaXplKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYW5kbGUgPSB0aGlzLmdldERyYWdIYW5kbGUoKTtcbiAgICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAgICAgaWYgKHBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCB0aGlzLmRyYWdnYWJsZU1vdXNlRG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmRyYWdnYWJsZU1vdXNlRG93bik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhbmRsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmRyYWdnYWJsZU1vdXNlRG93bik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgZ2V0RHJhZ0hhbmRsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9LFxuICAgICAgICBnZXREcmFnZ2FibGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UG9zaXRpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBkcmFnZ2FibGUgPSB0aGlzLmdldERyYWdnYWJsZSgpO1xuICAgICAgICAgICAgaWYgKCFkcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiAwLCB5OiAwIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHg6IGRyYWdnYWJsZS5vZmZzZXRMZWZ0LFxuICAgICAgICAgICAgICAgIHk6IGRyYWdnYWJsZS5vZmZzZXRUb3AsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBzZXRQb3NpdGlvbihjb29yZHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnYWJsZSA9IHRoaXMuZ2V0RHJhZ2dhYmxlKCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYWdnYWJsZS5zdHlsZS5sZWZ0ID0gYCR7Y29vcmRzLnh9cHhgO1xuICAgICAgICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGAke2Nvb3Jkcy55fXB4YDtcbiAgICAgICAgfSxcbiAgICAgICAgY2hlY2tCb3VuZHMoeyB4LCB5IH0pIHtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnYWJsZSA9IHRoaXMuZ2V0RHJhZ2dhYmxlKCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHgsIHkgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBkcmFnZ2FibGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBtaW5YID0gMDtcbiAgICAgICAgICAgIGNvbnN0IG1pblkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbWF4WCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggLSByZWN0LndpZHRoO1xuICAgICAgICAgICAgY29uc3QgbWF4WSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBNYXRoLm1pbihNYXRoLm1heChtaW5YLCB4KSwgbWF4WCksXG4gICAgICAgICAgICAgICAgeTogTWF0aC5tYXgoTWF0aC5taW4obWF4WSwgeSksIG1pblkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EcmFnZ2FibGVSZXNpemUoKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuY2hlY2tCb3VuZHModGhpcy5nZXRQb3NpdGlvbigpKSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRHJhZ2dhYmxlTW91c2VEb3duKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnYWJsZSA9IHRoaXMuZ2V0RHJhZ2dhYmxlKCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmFnZ2FibGVQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIGlmIChlIGluc3RhbmNlb2YgTW91c2VFdmVudFxuICAgICAgICAgICAgICAgIHx8IHBvaW50ZXJFdmVudHMgJiYgZSBpbnN0YW5jZW9mIFBvaW50ZXJFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdTdGFydCA9IHtcbiAgICAgICAgICAgICAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICB5OiBlLmNsaWVudFksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRvdWNoRXZlbnRzICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ1N0YXJ0ID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiB0b3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3VjaC5jbGllbnRZLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJhZ2dhYmxlTW91c2VNb3ZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVNb3VzZU1vdmUgPSB0aGlzLm9uRHJhZ2dhYmxlTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKHBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgdGhpcy5kcmFnZ2FibGVNb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5kcmFnZ2FibGVNb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRyYWdnYWJsZU1vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLmRyYWdnYWJsZU1vdXNlVXApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdnYWJsZU1vdXNlVXAgPSB0aGlzLm9uRHJhZ2dhYmxlTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChwb2ludGVyRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCB0aGlzLmRyYWdnYWJsZU1vdXNlVXApO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmNhbmNlbCcsIHRoaXMuZHJhZ2dhYmxlTW91c2VVcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG91Y2hFdmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuZHJhZ2dhYmxlTW91c2VVcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLmRyYWdnYWJsZU1vdXNlVXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kcmFnZ2FibGVNb3VzZVVwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uRHJhZ2dhYmxlTW91c2VNb3ZlKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyYWdnYWJsZSA9IHRoaXMuZ2V0RHJhZ2dhYmxlKCk7XG4gICAgICAgICAgICBpZiAoIWRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gMDtcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSAwO1xuICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb3VzZUV2ZW50XG4gICAgICAgICAgICAgICAgfHwgcG9pbnRlckV2ZW50cyAmJiBlIGluc3RhbmNlb2YgUG9pbnRlckV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gZS5jbGllbnRYIC0gdGhpcy5fZHJhZ1N0YXJ0Lng7XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gZS5jbGllbnRZIC0gdGhpcy5fZHJhZ1N0YXJ0Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0b3VjaEV2ZW50cyAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IHRvdWNoLmNsaWVudFggLSB0aGlzLl9kcmFnU3RhcnQueDtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSB0b3VjaC5jbGllbnRZIC0gdGhpcy5fZHJhZ1N0YXJ0Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuY2hlY2tCb3VuZHMoe1xuICAgICAgICAgICAgICAgIHg6IHRoaXMuX2RyYWdnYWJsZVBvc2l0aW9uLnggKyBkZWx0YVgsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5fZHJhZ2dhYmxlUG9zaXRpb24ueSArIGRlbHRhWSxcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EcmFnZ2FibGVNb3VzZVVwKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZU1vdXNlTW92ZSkge1xuICAgICAgICAgICAgICAgIGlmIChwb2ludGVyRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybW92ZScsIHRoaXMuZHJhZ2dhYmxlTW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3VjaEV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuZHJhZ2dhYmxlTW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kcmFnZ2FibGVNb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZU1vdXNlVXApIHtcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRlckV2ZW50cykge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdGhpcy5kcmFnZ2FibGVNb3VzZVVwKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJjYW5jZWwnLCB0aGlzLmRyYWdnYWJsZU1vdXNlVXApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdWNoRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmRyYWdnYWJsZU1vdXNlVXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5kcmFnZ2FibGVNb3VzZVVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZHJhZ2dhYmxlTW91c2VVcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVNb3VzZU1vdmUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVNb3VzZVVwID0gbnVsbDtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdnVlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInZ1ZVwiKSk7XG5leHBvcnRzLkZpbGVQcmV2aWV3ID0gdnVlXzEuZGVmYXVsdC5leHRlbmQoe1xuICAgIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwiZmlsZS1wcmV2aWV3XCJcbiAgdi1vbjpjbGljaz1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gIHYtb246ZHJhZ2VudGVyLnN0b3AucHJldmVudFxuICB2LW9uOmRyYWdsZWF2ZS5zdG9wLnByZXZlbnRcbiAgdi1vbjpkcmFnb3Zlci5zdG9wLnByZXZlbnRcbiAgdi1vbjpkcm9wLnN0b3AucHJldmVudD1cIm9uRHJvcCgkZXZlbnQpXCI+XG4gIDxzcGFuIGNsYXNzPVwiZmlsZS1wcmV2aWV3X19pbmZvXCJcbiAgICB2LWlmPVwidHlwZVwiPnt7IGluZm8gfX08L3NwYW4+XG5cbiAgPGltZyBjbGFzcz1cImZpbGUtcHJldmlld19fY29udGVudFwiXG4gICAgdi1iaW5kOnNyYz1cInNyY1wiXG4gICAgdi1iaW5kOnRpdGxlPVwiaW5mb1wiXG4gICAgdi1pZj1cInR5cGUgPT09ICdpbWFnZScgJiYgc3JjXCIgLz5cbiAgPHZpZGVvIGNsYXNzPVwiZmlsZS1wcmV2aWV3X19jb250ZW50XCIgYXV0b3BsYXkgbG9vcCBtdXRlZFxuICAgIHYtYmluZDpzcmM9XCJzcmNcIlxuICAgIHYtYmluZDp0aXRsZT1cImluZm9cIlxuICAgIHYtZWxzZS1pZj1cInR5cGUgPT09ICd2aWRlbycgJiYgc3JjXCI+PC92aWRlbz5cbiAgPHNwYW4gY2xhc3M9XCJmaWxlLXByZXZpZXdfX2xhYmVsXCJcbiAgICB2LWVsc2U+VXBsb2FkIGZpbGU8L3NwYW4+XG5cbiAgPHNsb3Q+PC9zbG90PlxuPC9kaXY+YCxcbiAgICBwcm9wczogWydmaWxlJ10sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNyYzogbnVsbCxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIG5hbWUoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsZSB8fCAhdGhpcy5maWxlLm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWxlLm5hbWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNpemUoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsZS5zaXplO1xuICAgICAgICB9LFxuICAgICAgICBzaXplRm9ybWF0dGVkKCkge1xuICAgICAgICAgICAgY29uc3QgdW5pdHMgPSBbJ0InLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInXTtcbiAgICAgICAgICAgIGxldCBzaXplID0gdGhpcy5zaXplO1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgZm9yICg7IGkgPCB1bml0cy5sZW5ndGggJiYgc2l6ZSA+PSAxMDAwOyArK2kpIHtcbiAgICAgICAgICAgICAgICBzaXplIC89IDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYCR7c2l6ZS50b0ZpeGVkKDIpfSAke3VuaXRzW2ldfWA7XG4gICAgICAgIH0sXG4gICAgICAgIGluZm8oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgICAgICAgICAgICAgPyBgJHt0aGlzLm5hbWV9LCAke3RoaXMuc2l6ZUZvcm1hdHRlZH1gXG4gICAgICAgICAgICAgICAgOiB0aGlzLnNpemVGb3JtYXR0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGUoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZmlsZS50eXBlO1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZS5zdGFydHNXaXRoKCd2aWRlby8nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3ZpZGVvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZS5zdGFydHNXaXRoKCdhdWRpby8nKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2F1ZGlvJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaW1hZ2UnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICBpZiAobmFtZS5lbmRzV2l0aCgnLndlYm0nKSB8fCBuYW1lLmVuZHNXaXRoKCcubXA0JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZpZGVvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUuZW5kc1dpdGgoJy5tcDMnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnYXVkaW8nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICdpbWFnZSc7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgICBmaWxlKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcmMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3JjID0gZS50YXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTCh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIG9uQ2xpY2soZSkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Ecm9wKGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Ryb3AnLCBlKTtcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjYXB0Y2hhXzEgPSByZXF1aXJlKFwiLi9jYXB0Y2hhXCIpO1xuZXhwb3J0cy5DYXB0Y2hhID0gY2FwdGNoYV8xLkNhcHRjaGE7XG52YXIgY29ycmVjdF90aW1lXzEgPSByZXF1aXJlKFwiLi9jb3JyZWN0LXRpbWVcIik7XG5leHBvcnRzLkNvcnJlY3RUaW1lID0gY29ycmVjdF90aW1lXzEuQ29ycmVjdFRpbWU7XG52YXIgZGVsZXRlX2Zvcm1fMSA9IHJlcXVpcmUoXCIuL2RlbGV0ZS1mb3JtXCIpO1xuZXhwb3J0cy5EZWxldGVGb3JtID0gZGVsZXRlX2Zvcm1fMS5EZWxldGVGb3JtO1xudmFyIGRyYWdnYWJsZV8xID0gcmVxdWlyZShcIi4vZHJhZ2dhYmxlXCIpO1xuZXhwb3J0cy5kcmFnZ2FibGUgPSBkcmFnZ2FibGVfMS5kcmFnZ2FibGU7XG52YXIgZmlsZV9wcmV2aWV3XzEgPSByZXF1aXJlKFwiLi9maWxlLXByZXZpZXdcIik7XG5leHBvcnRzLkZpbGVQcmV2aWV3ID0gZmlsZV9wcmV2aWV3XzEuRmlsZVByZXZpZXc7XG52YXIgbmV3X3Bvc3RzX2RldGVjdG9yXzEgPSByZXF1aXJlKFwiLi9uZXctcG9zdHMtZGV0ZWN0b3JcIik7XG5leHBvcnRzLk5ld1Bvc3RzRGV0ZWN0b3IgPSBuZXdfcG9zdHNfZGV0ZWN0b3JfMS5OZXdQb3N0c0RldGVjdG9yO1xudmFyIHBvc3RfMSA9IHJlcXVpcmUoXCIuL3Bvc3RcIik7XG5leHBvcnRzLlBvc3QgPSBwb3N0XzEuUG9zdDtcbnZhciBwb3N0aW5nX2Zvcm1fMSA9IHJlcXVpcmUoXCIuL3Bvc3RpbmctZm9ybVwiKTtcbmV4cG9ydHMuUG9zdGluZ0Zvcm0gPSBwb3N0aW5nX2Zvcm1fMS5Qb3N0aW5nRm9ybTtcbnZhciBwb3N0X3JlZmVyZW5jZV9tYXBfMSA9IHJlcXVpcmUoXCIuL3Bvc3QtcmVmZXJlbmNlLW1hcFwiKTtcbmV4cG9ydHMuUG9zdFJlZmVyZW5jZU1hcCA9IHBvc3RfcmVmZXJlbmNlX21hcF8xLlBvc3RSZWZlcmVuY2VNYXA7XG52YXIgc2V0dGluZ3NfMSA9IHJlcXVpcmUoXCIuL3NldHRpbmdzXCIpO1xuZXhwb3J0cy5TZXR0aW5ncyA9IHNldHRpbmdzXzEuU2V0dGluZ3M7XG52YXIgc3R5bGVfc3dpdGNoXzEgPSByZXF1aXJlKFwiLi9zdHlsZS1zd2l0Y2hcIik7XG5leHBvcnRzLlN0eWxlU3dpdGNoID0gc3R5bGVfc3dpdGNoXzEuU3R5bGVTd2l0Y2g7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IF9fMSA9IHJlcXVpcmUoXCIuLlwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jbGFzcyBOZXdQb3N0c0RldGVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqIEB0b2RvOiByZW1vdmUgTXV0YXRpb25PYnNlcnZlciBBU0FQLCB3aXRoIGludGVncmF0ZWQgdGhyZWFkIHVwZGF0aW5nLiAqL1xuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9ucyA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3N0cyA9IG11dGF0aW9uc1xuICAgICAgICAgICAgICAgIC8vIEdldCBhZGRlZCBwb3N0cywgaWYgYW55LlxuICAgICAgICAgICAgICAgIC5tYXAobXV0YXRpb24gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gbXV0YXRpb24uYWRkZWROb2RlcztcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IG5vZGVzLmZpbHRlcihub2RlID0+IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgZWxlbWVudCBpcyBwb3N0IGl0c2VsZiwgcmV0dXJuIGl0LFxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHF1ZXJ5IGZvciBlbGVtZW50IGNoaWxkcmVuLlxuICAgICAgICAgICAgICAgICAgICAubWFwKGVsZW1lbnQgPT4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3Bvc3QnKVxuICAgICAgICAgICAgICAgICAgICA/IFtlbGVtZW50XVxuICAgICAgICAgICAgICAgICAgICA6IHV0aWxzXzEuRE9NLnFzYSgnLnBvc3QnLCBlbGVtZW50KSlcbiAgICAgICAgICAgICAgICAgICAgLy8gRmxhdHRlbiBwb3N0cyBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgodG90YWwsIGN1cnJlbnQpID0+IHRvdGFsLmNvbmNhdChjdXJyZW50KSwgW10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBGbGF0dGVuIHBvc3RzIGFycmF5LlxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKHRvdGFsLCBjdXJyZW50KSA9PiB0b3RhbC5jb25jYXQoY3VycmVudCksIFtdKTtcbiAgICAgICAgICAgIGlmIChwb3N0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgX18xLmV2ZW50QnVzLiRlbWl0KF9fMS5FdmVudHMuUG9zdHNJbnNlcnRlZCwgcG9zdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgX18xLmV2ZW50QnVzLiRvbihfXzEuRXZlbnRzLlJlYWR5LCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBTZXR1cCBNdXRhdGlvbk9ic2VydmVyLlxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RzID0gdXRpbHNfMS5ET00ucXNhKCcucG9zdCcpO1xuICAgICAgICAgICAgaWYgKHBvc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBfXzEuZXZlbnRCdXMuJGVtaXQoX18xLkV2ZW50cy5Qb3N0c0luc2VydGVkLCBwb3N0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuTmV3UG9zdHNEZXRlY3RvciA9IE5ld1Bvc3RzRGV0ZWN0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IF9fMSA9IHJlcXVpcmUoXCIuLlwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XG5jbGFzcyBQb3N0UmVmZXJlbmNlTWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wb3N0cyA9IHt9O1xuICAgICAgICBfXzEuZXZlbnRCdXMuJG9uKF9fMS5FdmVudHMuUG9zdHNJbnNlcnRlZCwgKHBvc3RzKSA9PiBwb3N0cy5mb3JFYWNoKHRoaXMub25Qb3N0SW5zZXJ0LmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgb25Qb3N0SW5zZXJ0KHBvc3QpIHtcbiAgICAgICAgY29uc3QgcG9zdElkID0gK3Bvc3QuZ2V0QXR0cmlidXRlKCdkYXRhLXBvc3QtaWQnKTtcbiAgICAgICAgLy8gU3RvcmUgcG9zdC5cbiAgICAgICAgdGhpcy5wb3N0c1twb3N0SWRdID0gcG9zdDtcbiAgICAgICAgLy8gR2V0IHJlZmVyZW5jZXMuXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZUVsZW1lbnRzID0gdXRpbHNfMS5ET00ucXNhKCdhW2RhdGEtdGFyZ2V0LXBvc3QtaWRdJywgcG9zdCk7XG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSByZWZlcmVuY2VFbGVtZW50cy5tYXAoZWxlbWVudCA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgaWQ6ICtlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQtcG9zdC1pZCcpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgYXV0aG9yIG5hbWUgb2YgdGhlIHJlZmVyZW5jZWQgcG9zdCB0byB0aGUgcmVmZXJlbmNlIGxpbmsgdGV4dC5cbiAgICAgICAgcmVmZXJlbmNlcy5mb3JFYWNoKHJlZmVyZW5jZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwb3N0ID0gdGhpcy5wb3N0c1tyZWZlcmVuY2UuaWRdO1xuICAgICAgICAgICAgaWYgKCFwb3N0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVmZXJlbmNlQXV0aG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgcmVmZXJlbmNlQXV0aG9yLmNsYXNzTGlzdC5hZGQoJ3Bvc3RfX3JlZmVyZW5jZS1saW5rLWF1dGhvcicpO1xuICAgICAgICAgICAgcmVmZXJlbmNlQXV0aG9yLmlubmVySFRNTCA9IHRoaXMuZ2V0UG9zdFJlZkxpbmtBdXRob3JIdG1sKHBvc3QpO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gcmVmZXJlbmNlLmVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIGNvbnN0IG5leHRTaWJsaW5nID0gcmVmZXJlbmNlLmVsZW1lbnQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHJlZmVyZW5jZUF1dGhvciwgbmV4dFNpYmxpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UG9zdFJlZkxpbmtBdXRob3JIdG1sKHBvc3QpIHtcbiAgICAgICAgY29uc3QgbmFtZUVsID0gdXRpbHNfMS5ET00ucXMoJy5wb3N0LWhlYWRlcl9fbmFtZScsIHBvc3QpO1xuICAgICAgICBjb25zdCB0cmlwY29kZUVsID0gdXRpbHNfMS5ET00ucXMoJy5wb3N0LWhlYWRlcl9fdHJpcGNvZGUnLCBwb3N0KTtcbiAgICAgICAgY29uc3QgbmFtZSA9IG5hbWVFbCA/IG5hbWVFbC5pbm5lckhUTUwgOiAnJztcbiAgICAgICAgY29uc3QgdHJpcGNvZGUgPSB0cmlwY29kZUVsID8gdHJpcGNvZGVFbC5pbm5lckhUTUwgOiAnJztcbiAgICAgICAgaWYgKG5hbWUubGVuZ3RoIHx8IHRyaXBjb2RlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGAoPHNwYW4gY2xhc3M9XCJwb3N0X19yZWZlcmVuY2UtbGluay1uYW1lXCI+JHtuYW1lfTwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgKyBgPHNwYW4gY2xhc3M9XCJwb3N0X19yZWZlcmVuY2UtbGluay10cmlwY29kZVwiPiR7dHJpcGNvZGV9PC9zcGFuPilgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGBgO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Qb3N0UmVmZXJlbmNlTWFwID0gUG9zdFJlZmVyZW5jZU1hcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY29uc3QgdnVlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInZ1ZVwiKSk7XG5jb25zdCBkcmFnZ2FibGVfMSA9IHJlcXVpcmUoXCIuL2RyYWdnYWJsZVwiKTtcbjtcbmNsYXNzIFBvc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfXzEuZXZlbnRCdXMuJG9uKF9fMS5FdmVudHMuUmVhZHksIHRoaXMub25SZWFkeS5iaW5kKHRoaXMpKTtcbiAgICAgICAgX18xLmV2ZW50QnVzLiRvbihfXzEuRXZlbnRzLlBvc3RzSW5zZXJ0ZWQsIHRoaXMub25Qb3N0c0luc2VydGVkLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwb3B1cC5pZCA9ICdwb3B1cCc7XG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwJywgJ2hpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShwb3B1cCwgbnVsbCk7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLnBvcHVwVmlld01vZGVsID0gbmV3IHZ1ZV8xLmRlZmF1bHQoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJwb3B1cFwiIGlkPVwicG9wdXBcIiB2LXNob3c9XCIhaGlkZGVuXCIgcmVmPVwicG9wdXBcIj5cbiAgPGRpdiBjbGFzcz1cInBvcHVwX19oZWFkZXJcIiByZWY9XCJoZWFkZXJcIj5cbiAgICA8c3BhbiBjbGFzcz1cInBvcHVwX190aXRsZVwiPnt7IHRpdGxlIH19PC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJwb3B1cF9faGVhZGVyLWJ1dHRvbnNcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwicG9wdXBfX2Nsb3NlXCJcbiAgICAgICAgdi1vbjpjbGljay5zdG9wPVwib25DbG9zZUNsaWNrKClcIlxuICAgICAgICB0aXRsZT1cIkNsb3NlIHBvcHVwXCI+PC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInBvcHVwX19ib2R5XCIgdi1odG1sPVwiY29udGVudFwiPlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgICAgICAgICBtaXhpbnM6IFtkcmFnZ2FibGVfMS5kcmFnZ2FibGVdLFxuICAgICAgICAgICAgZWw6ICcjcG9wdXAnLFxuICAgICAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb3ViJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgZ2V0RHJhZ0hhbmRsZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuaGVhZGVyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ2V0RHJhZ2dhYmxlKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcmVmcy5wb3B1cDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2xvc2VDbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblBvc3RzSW5zZXJ0ZWQocG9zdHMpIHtcbiAgICAgICAgcG9zdHMuZm9yRWFjaCh0aGlzLnByb2Nlc3NPRW1iZWRMaW5rcy5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHJvY2Vzc09FbWJlZExpbmtzKHBvc3QpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RDb250ZW50ID0gdXRpbHNfMS5ET00ucXMoJy5wb3N0X19jb250ZW50JywgcG9zdCk7XG4gICAgICAgICAgICBpZiAoIXBvc3RDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zdE1lc3NhZ2UgPSB1dGlsc18xLkRPTS5xcygnLnBvc3RfX21lc3NhZ2UnLCBwb3N0KTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtzID0gdXRpbHNfMS5ET00ucXNhKCdhW2hyZWZdJywgcG9zdCk7XG4gICAgICAgICAgICBsaW5rcy5maWx0ZXIobGluayA9PiAhbGluay5oYXNBdHRyaWJ1dGUoJ2RhdGEtcHJvY2Vzc2VkJykpXG4gICAgICAgICAgICAgICAgLm1hcChsaW5rID0+IHtcbiAgICAgICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9jZXNzZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAubWFwKHVybCA9PiB1cmwubWF0Y2goJ15odHRwcz86XFwvXFwvKD86d3d3XFwuKT9jb3ViXFwuY29tXFwvdmlld1xcLyhbMC05YS16XSspJCcpKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIobWF0Y2hlcyA9PiBtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID49IDEpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKG1hdGNoZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3ViVXJsID0gYGh0dHBzOi8vY291Yi5jb20vYXBpL3YyL2NvdWJzLyR7bWF0Y2hlc1sxXX1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3dpbmRvdy5iYXNlVXJsfS9hcGkvZW1iZWQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvdWJVcmwpfWA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYENhblxcJ3QgbG9hZCBjb3ViICcke21hdGNoZXNbMF19JzpgLCByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdWIgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRodW1ibmFpbFVybCA9IGNvdWIuaW1hZ2VfdmVyc2lvbnMudGVtcGxhdGUucmVwbGFjZSgnJXt2ZXJzaW9ufScsICdzbWFsbCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aHVtYm5haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsLmNsYXNzTGlzdC5hZGQoJ3Bvc3RfX2ZpbGUnLCAnZmlsZScpO1xuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWwuaW5uZXJIVE1MID0gYFxuPGRpdiBjbGFzcz1cInBvc3RfX2ZpbGUtaW5mbyBmaWxlLWluZm8gZmlsZXNpemVcIj5cbiAgPGEgY2xhc3M9XCJmaWxlLWluZm9fX2xpbmtcIiBocmVmPVwiaHR0cHM6Ly9jb3ViLmNvbS92aWV3LyR7Y291Yi5wZXJtYWxpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q291YjwvYT5cbiAgPHNwYW4gY2xhc3M9XCJmaWxlLWluZm9fX3NpemVcIj48L3NwYW4+XG48L2Rpdj5cblxuPGEgY2xhc3M9XCJmaWxlX190aHVtYm5haWwgdGh1bWJuYWlsIHRodW1ibmFpbC0tdmlkZW9cIiBocmVmPVwiaHR0cHM6Ly9jb3ViLmNvbS92aWV3LyR7Y291Yi5wZXJtYWxpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gIDxpbWcgY2xhc3M9XCJ0aHVtYm5haWxfX2NvbnRlbnQgdGh1bWJuYWlsX19jb250ZW50X2ltYWdlXCIgc3JjPVwiJHt0aHVtYm5haWxVcmx9XCIgLz5cbjwvYT5gO1xuICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWwuc3R5bGUubWF4SGVpZ2h0ID0gJzI1MHB4JztcbiAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsLnN0eWxlLm1heFdpZHRoID0gJzI1MHB4JztcbiAgICAgICAgICAgICAgICAgICAgcG9zdENvbnRlbnQuaW5zZXJ0QmVmb3JlKHRodW1ibmFpbCwgcG9zdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5rID0gdXRpbHNfMS5ET00ucXMoJy50aHVtYm5haWwnLCB0aHVtYm5haWwpO1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Db3ViSW5Qb3B1cChjb3ViKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FuXFwndCBsb2FkIGNvdWIgJyR7bWF0Y2hlc1swXX0nOmAsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9wZW5Db3ViSW5Qb3B1cChjb3ViKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBjb3ViVXJsID0gYGh0dHBzOi8vY291Yi5jb20vdmlldy8ke2NvdWIucGVybWFsaW5rfWA7XG4gICAgICAgICAgICBjb25zdCBvRW1iZWRVcmwgPSBgaHR0cHM6Ly9jb3ViLmNvbS9hcGkvb2VtYmVkLmpzb24/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvdWJVcmwpfSZhdXRvcGxheT10cnVlYDtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3dpbmRvdy5iYXNlVXJsfS9hcGkvZW1iZWQ/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9FbWJlZFVybCl9YDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaCh1cmwsIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FuXFwndCBsb2FkIGNvdWIgJ2h0dHBzOi8vY291Yi5jb20vdmlldy8ke2NvdWIucGVybWFsaW5rfSc6YCwgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBqc29uID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBWaWV3TW9kZWwudGl0bGUgPSAnQ291YiDigJQgJyArIGNvdWIudGl0bGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1cFZpZXdNb2RlbC5jb250ZW50ID0ganNvbi5odG1sO1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBWaWV3TW9kZWwuc2V0UG9zaXRpb24oe1xuICAgICAgICAgICAgICAgICAgICB4OiBNYXRoLm1heCgwLCB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBqc29uLndpZHRoIC8gMiksXG4gICAgICAgICAgICAgICAgICAgIHk6IE1hdGgubWF4KDAsIHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBqc29uLmhlaWdodCAvIDIpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBWaWV3TW9kZWwuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ2FuXFwndCBsb2FkIGNvdWIgJ2h0dHBzOi8vY291Yi5jb20vdmlldy8ke2NvdWIucGVybWFsaW5rfSc6YCwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjbG9zZVBvcHVwKCkge1xuICAgICAgICB0aGlzLnBvcHVwVmlld01vZGVsLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMucG9wdXBWaWV3TW9kZWwuY29udGVudCA9IG51bGw7XG4gICAgfVxufVxuZXhwb3J0cy5Qb3N0ID0gUG9zdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2dWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwidnVlXCIpKTtcbmNvbnN0IF8xID0gcmVxdWlyZShcIi5cIik7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9hcGlcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY2xhc3MgUG9zdGluZ0Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmlzSW5UaHJlYWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fMS5TZXR0aW5nc01hbmFnZXIubG9hZCgpO1xuICAgICAgICBfXzEuZXZlbnRCdXMuJG9uKF9fMS5FdmVudHMuUmVhZHksIHRoaXMub25SZWFkeS5iaW5kKHRoaXMpKTtcbiAgICAgICAgX18xLmV2ZW50QnVzLiRvbihfXzEuRXZlbnRzLlBvc3RzSW5zZXJ0ZWQsIHRoaXMub25Qb3N0c0luc2VydGVkLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb25zdCBmb3JtID0gdXRpbHNfMS5ET00ucWlkKCdwb3N0aW5nLWZvcm0nKTtcbiAgICAgICAgaWYgKCFmb3JtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvXFwvcmVzXFwvKFxcZCspL2kpO1xuICAgICAgICBjb25zdCBpc0luVGhyZWFkID0gISFtYXRjaDtcbiAgICAgICAgY29uc3QgdGhyZWFkSWQgPSBpc0luVGhyZWFkID8gK21hdGNoWzFdIDogMDtcbiAgICAgICAgdGhpcy5pc0luVGhyZWFkID0gaXNJblRocmVhZDtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSBuZXcgdnVlXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBlbDogZm9ybSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG48Zm9ybSBjbGFzcz1cImNvbnRlbnRfX3Bvc3RpbmctZm9ybSBwb3N0aW5nLWZvcm1cIiBpZD1cInBvc3RpbmctZm9ybVwiXG4gIHYtYmluZDpjbGFzcz1cInsgJ3Bvc3RpbmctZm9ybS0tZmxvYXRpbmcnOiBwb3NpdGlvbiA9PSAnZmxvYXQnIH1cIlxuICB2LW9uOnN1Ym1pdC5wcmV2ZW50PVwib25TdWJtaXQoKVwiIHYtc2hvdz1cIiFoaWRkZW5cIlxuICByZWY9XCJmb3JtXCI+XG4gIDxkaXYgY2xhc3M9XCJwb3N0aW5nLWZvcm1fX2hlYWRlclwiIHJlZj1cImhlYWRlclwiPlxuICAgIDxzcGFuIGNsYXNzPVwicG9zdGluZy1mb3JtX190aXRsZVwiPnt7XG4gICAgICB0aHJlYWRJZCA/ICdSZXBseSB0byB0aHJlYWQgIycgKyB0aHJlYWRJZCA6ICdDcmVhdGUgdGhyZWFkJ1xuICAgIH19PC9zcGFuPlxuXG4gICAgPHNwYW4gY2xhc3M9XCJwb3N0aW5nLWZvcm1fX2hlYWRlci1idXR0b25zXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInBvc3RpbmctZm9ybV9fcmVzZXRcIlxuICAgICAgICB2LW9uOmNsaWNrLnN0b3A9XCJyZXNldEZpZWxkcygpXCIgdGl0bGU9XCJDbGVhciBmb3JtXCI+PC9zcGFuPlxuXG4gICAgICA8c3BhbiBjbGFzcz1cInBvc3RpbmctZm9ybV9fZmxvYXRcIlxuICAgICAgICB2LWlmPVwicG9zaXRpb24gIT09ICdmbG9hdCcgJiYgbW9kZSAhPT0gJ21vYmlsZSdcIlxuICAgICAgICB2LW9uOmNsaWNrLnN0b3A9XCJtYWtlRmxvYXRpbmcoKVwiIHRpdGxlPVwiRmxvYXRpbmcgZm9ybVwiPjwvc3Bhbj5cblxuICAgICAgPHNwYW4gY2xhc3M9XCJwb3N0aW5nLWZvcm1fX3Jlc3RvcmVcIlxuICAgICAgICB2LWlmPVwicG9zaXRpb24gPT09ICdmbG9hdCcgJiYgbW9kZSAhPT0gJ21vYmlsZSdcIlxuICAgICAgICB2LW9uOmNsaWNrLnN0b3A9XCJtb3ZlVG9Cb3R0b20oKVwiIHRpdGxlPVwiTW92ZSBmb3JtIHRvIGJvdHRvbVwiPjwvc3Bhbj5cblxuICAgICAgPHNwYW4gY2xhc3M9XCJwb3N0aW5nLWZvcm1fX2Nsb3NlXCJcbiAgICAgICAgdi1vbjpjbGljay5zdG9wPVwib25DbG9zZUNsaWNrKClcIiB0aXRsZT1cIkNsb3NlIGZvcm1cIj48L3NwYW4+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwicG9zdGluZy1mb3JtX19jb250ZW50XCI+XG4gICAgPHgtZmlsZS1wcmV2aWV3IGNsYXNzPVwicG9zdGluZy1mb3JtX19wcmV2aWV3XCJcbiAgICAgIHYtYmluZDpjbGFzcz1cIntcbiAgICAgICAgJ3Bvc3RpbmctZm9ybV9fcHJldmlldy0tcmlnaHQnOiBtb2RlID09ICdkZWZhdWx0J1xuICAgICAgICAgICYmIHNldHRpbmdzLnByZXZpZXdBbGlnbiA9PSAncmlnaHQnLFxuICAgICAgfVwiXG4gICAgICB2LWJpbmQ6ZmlsZT1cImZpbGVcIlxuICAgICAgdi1vbjpjbGljaz1cInNob3dGaWxlRGlhbG9nKClcIlxuICAgICAgdi1vbjpkcm9wPVwib25GaWxlRHJvcCgkZXZlbnQpXCJcbiAgICAgIHYtc2hvdz1cIm1vZGUgPT0gJ2RlZmF1bHQnIHx8IGZpbGVcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwicG9zdGluZy1mb3JtX19wcmV2aWV3LXJlbW92ZVwiXG4gICAgICAgIHYtaWY9XCJmaWxlXCIgdi1vbjpjbGljay5zdG9wPVwiZmlsZSA9IG51bGxcIj48L3NwYW4+XG4gICAgPC94LWZpbGUtcHJldmlldz5cblxuICAgIDxkaXYgY2xhc3M9XCJwb3N0aW5nLWZvcm1fX21haW5cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3N0aW5nLWZvcm1fX3Jvd1wiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0IHBvc3RpbmctZm9ybV9fc3ViamVjdFwiIHBsYWNlaG9sZGVyPVwiU3ViamVjdFwiXG4gICAgICAgICAgdi1tb2RlbD1cImZpZWxkcy5zdWJqZWN0XCJcbiAgICAgICAgICB2LWJpbmQ6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgICAgICAgdi1vbjpjaGFuZ2U9XCJvblN1YmplY3RDaGFuZ2UoKVwiIC8+XG5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJpbnB1dCBwb3N0aW5nLWZvcm1fX25hbWVcIiBwbGFjZWhvbGRlcj1cIk5hbWVcIlxuICAgICAgICAgIHYtbW9kZWw9XCJmaWVsZHMubmFtZVwiXG4gICAgICAgICAgdi1iaW5kOmRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgICAgICAgIHYtb246Y2hhbmdlPVwib25OYW1lQ2hhbmdlKClcIiAvPlxuXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInBvc3RpbmctZm9ybV9fYXR0YWNobWVudFwiIHYtc2hvdz1cIm1vZGUgPT0gJ21vYmlsZSdcIj5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cInBvc3RpbmctZm9ybV9fYXR0YWNobWVudC1pbnB1dFwiXG4gICAgICAgICAgICB2LW1vZGVsPVwiZmllbGRzLmZpbGVcIiB2LWJpbmQ6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICB2LW9uOmNoYW5nZT1cIm9uRmlsZUNoYW5nZSgkZXZlbnQudGFyZ2V0LmZpbGVzKVwiXG4gICAgICAgICAgICByZWY9XCJmaWxlXCIgLz5cbiAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBwb3N0aW5nLWZvcm1fX3N1Ym1pdFwiXG4gICAgICAgICAgdi1pZj1cIm1vZGUgPT0gJ2RlZmF1bHQnXCIgdi1iaW5kOmRpc2FibGVkPVwiZGlzYWJsZWRcIj5SZXBseTwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3N0aW5nLWZvcm1fX21hcmt1cC1yb3cgbWFya3VwXCJcbiAgICAgICAgdi1zaG93PVwiKG1vZGUgPT09ICdtb2JpbGUnKSAmJiBzZXR0aW5ncy5zaG93TWFya3VwTW9iaWxlXG4gICAgICAgICAgfHwgKG1vZGUgIT09ICdtb2JpbGUnKSAmJiBzZXR0aW5ncy5zaG93TWFya3VwXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHBvc3RpbmctZm9ybV9fbWFya3VwLWJ1dHRvblwiXG4gICAgICAgICAgdi1vbjpjbGljay5wcmV2ZW50PVwiaW5zZXJ0TWFya3VwKCdiJylcIj5cbiAgICAgICAgICA8c3Ryb25nPmI8L3N0cm9uZz5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcG9zdGluZy1mb3JtX19tYXJrdXAtYnV0dG9uXCJcbiAgICAgICAgICB2LW9uOmNsaWNrLnByZXZlbnQ9XCJpbnNlcnRNYXJrdXAoJ2knKVwiPlxuICAgICAgICAgIDxlbT5pPC9lbT5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcG9zdGluZy1mb3JtX19tYXJrdXAtYnV0dG9uXCJcbiAgICAgICAgICB2LW9uOmNsaWNrLnByZXZlbnQ9XCJpbnNlcnRNYXJrdXAoJ3UnKVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWFya3VwX191bmRlcmxpbmVcIj51PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwb3N0aW5nLWZvcm1fX21hcmt1cC1idXR0b25cIlxuICAgICAgICAgIHYtb246Y2xpY2sucHJldmVudD1cImluc2VydE1hcmt1cCgncycpXCI+XG4gICAgICAgICAgPGRlbD5zPC9kZWw+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHBvc3RpbmctZm9ybV9fbWFya3VwLWJ1dHRvblwiXG4gICAgICAgICAgdi1vbjpjbGljay5wcmV2ZW50PVwiaW5zZXJ0TWFya3VwKCdzdWInKVwiPlxuICAgICAgICAgIDxzdWI+c3ViPC9zdWI+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHBvc3RpbmctZm9ybV9fbWFya3VwLWJ1dHRvblwiXG4gICAgICAgICAgdi1vbjpjbGljay5wcmV2ZW50PVwiaW5zZXJ0TWFya3VwKCdzdXAnKVwiPlxuICAgICAgICAgIDxzdXA+c3VwPC9zdXA+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHBvc3RpbmctZm9ybV9fbWFya3VwLWJ1dHRvblwiXG4gICAgICAgICAgdi1vbjpjbGljay5wcmV2ZW50PVwiaW5zZXJ0TWFya3VwKCdjb2RlJylcIj5cbiAgICAgICAgICA8Y29kZT5jb2RlPC9jb2RlPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvbiBwb3N0aW5nLWZvcm1fX21hcmt1cC1idXR0b25cIlxuICAgICAgICAgIHYtb246Y2xpY2sucHJldmVudD1cImluc2VydE1hcmt1cCgnc3BvaWxlcicpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXJrdXBfX3Nwb2lsZXIgbWFya3VwX19zcG9pbGVyLS12aXNpYmxlXCI+c3A8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHBvc3RpbmctZm9ybV9fbWFya3VwLWJ1dHRvblwiXG4gICAgICAgICAgdi1vbjpjbGljay5wcmV2ZW50PVwiaW5zZXJ0TWFya3VwKCdycCcpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXJrdXBfX3JwIG1hcmt1cF9fcnAtLXZpc2libGVcIj5ycDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b24gcG9zdGluZy1mb3JtX19tYXJrdXAtYnV0dG9uXCJcbiAgICAgICAgICB2LW9uOmNsaWNrLnByZXZlbnQ9XCJpbnNlcnRRdW90ZSgpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXJrdXBfX3F1b3RlXCI+Jmd0Ozwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cInBvc3RpbmctZm9ybV9fcm93XCI+XG4gICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImlucHV0IHBvc3RpbmctZm9ybV9fbWVzc2FnZVwiIHBsYWNlaG9sZGVyPVwiTWVzc2FnZVwiXG4gICAgICAgICAgdi1tb2RlbD1cImZpZWxkcy5tZXNzYWdlXCIgdi1iaW5kOmRpc2FibGVkPVwiZGlzYWJsZWRcIlxuICAgICAgICAgIHYtb246a2V5ZG93bj1cIm9uTWVzc2FnZUtleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgdi1vbjpwYXN0ZT1cIm9uTWVzc2FnZVBhc3RlKCRldmVudClcIlxuICAgICAgICAgIHJlZj1cIm1lc3NhZ2VcIj48L3RleHRhcmVhPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgdi1pZj1cInN0YXR1c1wiIGNsYXNzPVwicG9zdGluZy1mb3JtX19zdGF0dXNcIj57eyBzdGF0dXMgfX08L2Rpdj5cblxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJwb3N0aW5nLWZvcm1fX3N1Ym1pdCAgcG9zdGluZy1mb3JtX19zdWJtaXQtLW1vYmlsZVwiXG4gICAgICAgIHYtaWY9XCJtb2RlID09ICdtb2JpbGUnXCIgdi1iaW5kOmRpc2FibGVkPVwiZGlzYWJsZWRcIj5SZXBseTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZm9ybT5gLFxuICAgICAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3Q6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJycsXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGNvbXBvbmVudC5zZXR0aW5ncy5mb3JtLnNhdmVGb3JtU3RhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGNvbXBvbmVudC5zZXR0aW5ncy5mb3JtLmZsb2F0XG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdmbG9hdCcgOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogJ21vYmlsZScsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgICAgIHRocmVhZElkKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyZWFkSWQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXR0aW5ncygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudC5zZXR0aW5ncy5mb3JtO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3JlYXRlZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LnNldHRpbmdzLmZvcm0uc2F2ZVN1YmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9hZCBzYXZlZCBzdWJqZWN0LlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJqZWN0ID0gbG9jYWxTdG9yYWdlWydwb3N0aW5nLWZvcm0uc3ViamVjdCddO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5zZXR0aW5ncy5mb3JtLnNhdmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIExvYWQgc2F2ZWQgbmFtZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGxvY2FsU3RvcmFnZVsncG9zdGluZy1mb3JtLm5hbWUnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZSA9IHRoaXMudXBkYXRlTW9kZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdmbG9hdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSBjb21wb25lbnQuc2V0dGluZ3MuZm9ybS5mbG9hdFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuY2hlY2tCb3VuZHMocG9zaXRpb24pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveWVkKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yZXNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgICAgICAneC1maWxlLXByZXZpZXcnOiBfMS5GaWxlUHJldmlldyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaXhpbnM6IFtcbiAgICAgICAgICAgICAgICBfMS5kcmFnZ2FibGUsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgICAgIGdldERyYWdIYW5kbGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmhlYWRlcjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdldERyYWdnYWJsZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb24gIT09ICdmbG9hdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRyZWZzLmZvcm07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRQb3NpdGlvbihjb29yZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHJhZ2dhYmxlID0gdGhpcy5nZXREcmFnZ2FibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkcmFnZ2FibGUuc3R5bGUubGVmdCA9IGAke2Nvb3Jkcy54fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlLnN0eWxlLnRvcCA9IGAke2Nvb3Jkcy55fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnNldHRpbmdzLmZvcm0uZmxvYXRQb3NpdGlvbiA9IGNvb3JkcztcbiAgICAgICAgICAgICAgICAgICAgX18xLlNldHRpbmdzTWFuYWdlci5zYXZlKGNvbXBvbmVudC5zZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkRyYWdnYWJsZVJlc2l6ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmNoZWNrQm91bmRzKHRoaXMuZ2V0UG9zaXRpb24oKSkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzZXRGaWVsZHMoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50LnNldHRpbmdzLmZvcm0uc2F2ZVN1YmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGRzLnN1YmplY3QgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5zZXR0aW5ncy5mb3JtLnNhdmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5uYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMubWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5maWxlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtYWtlRmxvYXRpbmcoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudC5tYWtlRmxvYXRpbmcoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vdmVUb0JvdHRvbSgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lm1vdmVUb0JvdHRvbSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2hvd0ZpbGVEaWFsb2coKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRyZWZzLmZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMuZmlsZS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cGRhdGVNb2RlKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8IDYwMCA/ICdtb2JpbGUnIDogJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnbW9iaWxlJyAmJiB0aGlzLnBvc2l0aW9uID09PSAnZmxvYXQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQubW92ZVRvQm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2xvc2VDbGljaygpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnVwZGF0ZVJlcGx5QnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblN1YmplY3RDaGFuZ2UoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgc3ViamVjdC5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlWydwb3N0aW5nLWZvcm0uc3ViamVjdCddID0gdGhpcy5maWVsZHMuc3ViamVjdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uTmFtZUNoYW5nZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2F2ZSBuYW1lLlxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VbJ3Bvc3RpbmctZm9ybS5uYW1lJ10gPSB0aGlzLmZpZWxkcy5uYW1lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25GaWxlRHJvcChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0ICYmIHRleHQubWF0Y2goL2h0dHBzPzpcXC9cXC9bLWEtekEtWjAtOUA6JS5fXFwrfiM9XXsyLH1cXC5bYS16XXsyLH1cXGJbLWEtekEtWjAtOUA6JV9cXCsufiM/JlxcLz1dKi8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIub3BlbignR0VUJywgdGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlID0geGhyLnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBgRXJyb3I6ICR7eGhyLnN0YXR1c30gJHt4aHIuc3RhdHVzVGV4dH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZpbGVDaGFuZ2UoZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlID0gZmlsZXMubGVuZ3RoID8gZmlsZXNbMF0gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25NZXNzYWdlS2V5RG93bihlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN1Ym1pdCBmb3JtIG9uIEN0cmwrRW50ZXIgaW4gdGhlIG1lc3NhZ2UgZmllbGQuXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZS5rZXlDb2RlID09IDEwIHx8IGUua2V5Q29kZSA9PSAxMykgJiYgZS5jdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU3VibWl0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uTWVzc2FnZVBhc3RlKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzdGUgZmlsZS5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGUuY2xpcGJvYXJkRGF0YSB8fCBlLm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkYXRhLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUuc3RhcnRzV2l0aCgnaW1hZ2UvJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBpdGVtLnR5cGUuc3RhcnRzV2l0aCgnYXVkaW8vJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBpdGVtLnR5cGUuc3RhcnRzV2l0aCgndmlkZW8vJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlID0gaXRlbS5nZXRBc0ZpbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5zZXJ0TWFya3VwKHRhZykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlRWwgPSB0aGlzLiRyZWZzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luOiBtZXNzYWdlRWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG1lc3NhZ2VFbC5zZWxlY3Rpb25FbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IG1lc3NhZ2VFbC5zZWxlY3Rpb25FbmQgLSBtZXNzYWdlRWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmZpZWxkcy5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcGVuaW5nVGFnID0gYFske3RhZ31dYDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xvc2luZ1RhZyA9IGBbLyR7dGFnfV1gO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCB8fCBjb21wb25lbnQuc2V0dGluZ3MuZm9ybS5pbnNlcnRUYWdzSW5QYWlycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGV4dCBpcyBzZWxlY3RlZCwgd3JhcCBpdCBpbiBhIHRhZyBwYWlyLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMubWVzc2FnZSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnN1YnN0cmluZygwLCBzZWxlY3Rpb24uYmVnaW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pbmdUYWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zdWJzdHJpbmcoc2VsZWN0aW9uLmJlZ2luLCBzZWxlY3Rpb24uZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zaW5nVGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2Uuc3Vic3RyaW5nKHNlbGVjdGlvbi5lbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgc2VsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvbi5iZWdpbiArIG9wZW5pbmdUYWcubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb24uZW5kICsgb3BlbmluZ1RhZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmxhc3RJbmRleE9mKG9wZW5pbmdUYWcsIHNlbGVjdGlvbi5iZWdpbikgPiBtZXNzYWdlLmxhc3RJbmRleE9mKGNsb3NpbmdUYWcsIHNlbGVjdGlvbi5iZWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5tZXNzYWdlID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnN1YnN0cmluZygwLCBzZWxlY3Rpb24uYmVnaW4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zaW5nVGFnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLnN1YnN0cmluZyhzZWxlY3Rpb24uZW5kKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgc2VsZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVsLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvbi5iZWdpbiArIGNsb3NpbmdUYWcubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWwuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uLmVuZCArIGNsb3NpbmdUYWcubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMubWVzc2FnZSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zdWJzdHJpbmcoMCwgc2VsZWN0aW9uLmJlZ2luKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmluZ1RhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5zdWJzdHJpbmcoc2VsZWN0aW9uLmVuZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHNlbGVjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWwuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb24uYmVnaW4gKyBvcGVuaW5nVGFnLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVsLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbi5lbmQgKyBvcGVuaW5nVGFnLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaW5zZXJ0UXVvdGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VFbCA9IHRoaXMuJHJlZnMubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW46IG1lc3NhZ2VFbC5zZWxlY3Rpb25TdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogbWVzc2FnZUVsLnNlbGVjdGlvbkVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDogbWVzc2FnZUVsLnNlbGVjdGlvbkVuZCAtIG1lc3NhZ2VFbC5zZWxlY3Rpb25TdGFydCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuZmllbGRzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJlZm9yZSA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIHNlbGVjdGlvbi5iZWdpbik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gbWVzc2FnZS5zdWJzdHJpbmcoc2VsZWN0aW9uLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0xpbmVCZWZvcmUgPSBiZWZvcmUubGVuZ3RoICYmICFiZWZvcmUuZW5kc1dpdGgoJ1xcbicpID8gJ1xcbicgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3TGluZUFmdGVyID0gIWFmdGVyLmxlbmd0aCB8fCAhYWZ0ZXIuc3RhcnRzV2l0aCgnXFxuJykgPyAnXFxuJyA6ICcnO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZVRleHQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGUgPSBgJHtuZXdMaW5lQmVmb3JlfT4gJHtxdW90ZVRleHR9JHtuZXdMaW5lQWZ0ZXJ9YDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWVsZHMubWVzc2FnZSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1b3RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIsXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VFbC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVsLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uLmJlZ2luICsgcXVvdGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVsLnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbi5iZWdpbiArIHF1b3RlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblN1Ym1pdCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgcmVwbGFjZXMgdG8gdGhlIG1lc3NhZ2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXBsYWNlcyA9IGNvbXBvbmVudC5zZXR0aW5ncy5mb3JtLnJlcGxhY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHJlcGxhY2VzLnJlZHVjZSgobWVzc2FnZSwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4cCA9IG5ldyBSZWdFeHAoaXRlbS5wYXR0ZXJuLCAnZ20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKHJlZ2V4cCwgaXRlbS5yZXBsYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuZmllbGRzLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHlpZWxkIGFwaV8xLkFwaS5jcmVhdGVQb3N0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiB0aHJlYWRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdDogdGhpcy5maWVsZHMuc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5maWVsZHMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogdGhpcy5maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BlcmNlbnQgPSBNYXRoLmNlaWwoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBgVXBsb2FkaW5nLi4uICR7cHJvZ3Jlc3NQZXJjZW50fSVgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGaWVsZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvc2l0aW9uICE9PSAnZmxvYXQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgZm9ybSB0byB0aGUgaW5pdGlhbCBsb2NhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Lm1vdmVUb0JvdHRvbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNJblRocmVhZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIERFIHRocmVhZCB1cGRhdGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZXIgPSB1dGlsc18xLkRPTS5xcygnLmRlLXRoci11cGRhdGVyLWxpbmsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZXIuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJlY3QgdG8gdGhyZWFkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbG9jYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gYEVycm9yOiAke2V9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuc2V0dGluZ3MuZm9ybS5zY3JvbGxCb3R0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIGxhc3QgcG9zdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB1dGlsc18xLkRPTS5xcygnLnBvc3Q6bnRoLWxhc3Qtb2YtdHlwZSgxKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnNjcm9sbEludG9WaWV3KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzaG93QnV0dG9uID0gdXRpbHNfMS5ET00ucWlkKCdwb3N0aW5nLWZvcm0tc2hvdycpO1xuICAgICAgICBpZiAoc2hvd0J1dHRvbikge1xuICAgICAgICAgICAgc2hvd0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb0JvdHRvbSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGVudCA9IHV0aWxzXzEuRE9NLnFzKCcubGF5b3V0X19jb250ZW50Jyk7XG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlZmxpbmsnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB2bSA9IHRoaXMudmlld01vZGVsO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VFbCA9IHZtLiRyZWZzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBiZWdpbjogbWVzc2FnZUVsLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IG1lc3NhZ2VFbC5zZWxlY3Rpb25FbmQsXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aDogbWVzc2FnZUVsLnNlbGVjdGlvbkVuZCAtIG1lc3NhZ2VFbC5zZWxlY3Rpb25TdGFydCxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB2bS5maWVsZHMubWVzc2FnZTtcbiAgICAgICAgICAgICAgICBjb25zdCBiZWZvcmUgPSBtZXNzYWdlLnN1YnN0cmluZygwLCBzZWxlY3Rpb24uYmVnaW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmdGVyID0gbWVzc2FnZS5zdWJzdHJpbmcoc2VsZWN0aW9uLmVuZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TGluZUJlZm9yZSA9IGJlZm9yZS5sZW5ndGggJiYgIWJlZm9yZS5lbmRzV2l0aCgnXFxuJykgPyAnXFxuJyA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0xpbmVBZnRlciA9ICFhZnRlci5sZW5ndGggfHwgIWFmdGVyLnN0YXJ0c1dpdGgoJ1xcbicpID8gJ1xcbicgOiAnJztcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVmbGluaycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlVGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RRdW90ZUluZGV4ID0gbWVzc2FnZS5sYXN0SW5kZXhPZignPj4nLCBzZWxlY3Rpb24uYmVnaW4pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlU2FtZVBvc3QgPSBsYXN0UXVvdGVJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgJiYgbWVzc2FnZS5sYXN0SW5kZXhPZihgPj4ke2lkfWAsIHNlbGVjdGlvbi5iZWdpbikgPj0gbGFzdFF1b3RlSW5kZXg7XG4gICAgICAgICAgICAgICAgLy8gSWYgcXVvdGluZyB0aGUgc2FtZSBwb3N0IGFnYWluLCBub3QgaW5zZXJ0IGlkLlxuICAgICAgICAgICAgICAgIGxldCBxdW90ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChxdW90ZVNhbWVQb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIHF1b3RlID0gcXVvdGVUZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke25ld0xpbmVCZWZvcmV9PiAke3F1b3RlVGV4dH0ke25ld0xpbmVBZnRlcn1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBxdW90ZVRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYCR7bmV3TGluZUJlZm9yZX0+PiR7aWR9XFxuPiAke3F1b3RlVGV4dH0ke25ld0xpbmVBZnRlcn1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGAke25ld0xpbmVCZWZvcmV9Pj4ke2lkfSR7bmV3TGluZUFmdGVyfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEluc2VydCByZXBseSBtYXJrdXAuXG4gICAgICAgICAgICAgICAgdm0uZmllbGRzLm1lc3NhZ2UgPSBbXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZSxcbiAgICAgICAgICAgICAgICAgICAgcXVvdGUsXG4gICAgICAgICAgICAgICAgICAgIGFmdGVyLFxuICAgICAgICAgICAgICAgIF0uam9pbignJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJblRocmVhZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVvdGVTYW1lUG9zdCAmJiAhcXVvdGVUZXh0ICYmICF2bS5oaWRkZW4gJiYgdm0ucG9zaXRpb24gIT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2bS5wb3NpdGlvbiAhPT0gJ2Zsb2F0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgZm9ybSB0byB0aGUgcG9zdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3N0ID0gdGFyZ2V0LmNsb3Nlc3QoJy5wb3N0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Qb3N0KHBvc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9Cb3R0b20oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2bS4kbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZUVsLnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uLmJlZ2luICsgcXVvdGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlRWwuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uLmJlZ2luICsgcXVvdGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Qb3N0c0luc2VydGVkKHBvc3RzKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbW1vbi5zY3JvbGxUb05ld1Bvc3RzKSB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxpbmdFbCA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgIGNvbnN0IHBvc3RzSGVpZ2h0ID0gcG9zdHMucmVkdWNlKCh0b3RhbCwgcG9zdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShwb3N0LCAnJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFyZ2luID0gcGFyc2VJbnQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKVxuICAgICAgICAgICAgICAgICAgICArIHBhcnNlSW50KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgcG9zdC5vZmZzZXRIZWlnaHQgKyBtYXJnaW47XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIC8vIElmIGluIHRoZSBib3R0b20gYXJlYS5cbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbU9mZnNldCA9IHNjcm9sbGluZ0VsLnNjcm9sbEhlaWdodCAtIHNjcm9sbGluZ0VsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbUFyZWEgPSBwb3N0c0hlaWdodCArIDEuNSAqIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIGlmIChib3R0b21PZmZzZXQgPCBib3R0b21BcmVhKSB7XG4gICAgICAgICAgICAgICAgLy8gU2Nyb2xsIHRvIHRoZSBsYXN0IHBvc3QuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdXRpbHNfMS5ET00ucXMoJy5wb3N0Om50aC1sYXN0LW9mLXR5cGUoMSknKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zY3JvbGxJbnRvVmlldyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29tbW9uLm1vdmVQb3N0SGVhZGVyUmVmbGlua0ljb25Ub0RFKSB7XG4gICAgICAgICAgICBwb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgcmVwbHkgaWNvbiBhZnRlciBERSBoaWRlIGljb24uXG4gICAgICAgICAgICAgICAgY29uc3QgcmVwbHlJY29uID0gdXRpbHNfMS5ET00ucXMoJy5wb3N0LWhlYWRlcl9fcmVmbGluay13cmFwcGVyID4gLnBvc3QtaGVhZGVyX19yZWZsaW5rLWljb24nLCBwb3N0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZUhpZGUgPSB1dGlsc18xLkRPTS5xcygnLmRlLWJ0bi1oaWRlJywgcG9zdCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGx5SWNvbiAmJiBkZUhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVIaWRlLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHJlcGx5SWNvbiwgZGVIaWRlLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVSZXBseUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3Qgc2hvd0J1dHRvbiA9IHV0aWxzXzEuRE9NLnFpZCgncG9zdGluZy1mb3JtLXNob3cnKTtcbiAgICAgICAgaWYgKCFzaG93QnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmlld01vZGVsLmhpZGRlbiB8fCB0aGlzLnZpZXdNb2RlbC5wb3NpdGlvbiAhPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIHNob3dCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzaG93QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsLmhpZGRlbiA9IHRydWU7XG4gICAgfVxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMudmlld01vZGVsLmhpZGRlbiA9IGZhbHNlO1xuICAgIH1cbiAgICBtYWtlRmxvYXRpbmcoKSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICBjb25zdCB2bSA9IHRoaXMudmlld01vZGVsO1xuICAgICAgICB2bS5wb3NpdGlvbiA9ICdmbG9hdCc7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZm9ybS5mbG9hdCA9IHRydWU7XG4gICAgICAgIF9fMS5TZXR0aW5nc01hbmFnZXIuc2F2ZSh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnNldHRpbmdzLmZvcm0uZmxvYXRQb3NpdGlvbjtcbiAgICAgICAgdm0uc2V0UG9zaXRpb24odm0uY2hlY2tCb3VuZHMocG9zaXRpb24pKTtcbiAgICAgICAgdGhpcy51cGRhdGVSZXBseUJ1dHRvbigpO1xuICAgIH1cbiAgICBtb3ZlVG9Qb3N0KHBvc3QsIGZvY3VzID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IHV0aWxzXzEuRE9NLnFpZCgncG9zdGluZy1mb3JtJyk7XG4gICAgICAgIGlmIChmb3JtKSB7XG4gICAgICAgICAgICBwb3N0LnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGZvcm0sIHBvc3QubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICBjb25zdCB2bSA9IHRoaXMudmlld01vZGVsO1xuICAgICAgICB2bS5wb3NpdGlvbiA9ICdwb3N0JztcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5mb3JtLmZsb2F0ID0gZmFsc2U7XG4gICAgICAgIF9fMS5TZXR0aW5nc01hbmFnZXIuc2F2ZSh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgY29uc3Qgc2hvd0J1dHRvbiA9IHV0aWxzXzEuRE9NLnFpZCgncG9zdGluZy1mb3JtLXNob3cnKTtcbiAgICAgICAgaWYgKHNob3dCdXR0b24pIHtcbiAgICAgICAgICAgIHNob3dCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVSZXBseUJ1dHRvbigpO1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICAgIHZtLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZtLiRyZWZzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1vdmVUb0JvdHRvbShmb2N1cyA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSB1dGlsc18xLkRPTS5xaWQoJ3Bvc3RpbmctZm9ybScpO1xuICAgICAgICBjb25zdCB3cmFwcGVyID0gdXRpbHNfMS5ET00ucWlkKCdwb3N0aW5nLWZvcm0td3JhcHBlcicpO1xuICAgICAgICBpZiAoZm9ybSAmJiB3cmFwcGVyKSB7XG4gICAgICAgICAgICB3cmFwcGVyLmluc2VydEJlZm9yZShmb3JtLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgY29uc3Qgdm0gPSB0aGlzLnZpZXdNb2RlbDtcbiAgICAgICAgdm0ucG9zaXRpb24gPSAnYm90dG9tJztcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5mb3JtLmZsb2F0ID0gZmFsc2U7XG4gICAgICAgIF9fMS5TZXR0aW5nc01hbmFnZXIuc2F2ZSh0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy51cGRhdGVSZXBseUJ1dHRvbigpO1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICAgIHZtLiRuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHZtLiRyZWZzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Qb3N0aW5nRm9ybSA9IFBvc3RpbmdGb3JtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsdXhvbl8xID0gcmVxdWlyZShcImx1eG9uXCIpO1xuY29uc3QgdnVlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInZ1ZVwiKSk7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY2xhc3MgU2V0dGluZ3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBfXzEuZXZlbnRCdXMuJG9uKF9fMS5FdmVudHMuUmVhZHksIHRoaXMub25SZWFkeS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NGb3JtID0gdXRpbHNfMS5ET00ucWlkKCdzZXR0aW5nc19mb3JtJyk7XG4gICAgICAgIGlmICghc2V0dGluZ3NGb3JtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgQ2hlY2tib3ggPSB2dWVfMS5kZWZhdWx0LmV4dGVuZCh7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogYFxuPGRpdiBjbGFzcz1cInNldHRpbmdzLWZvcm1fX3Jvd1wiPlxuICA8bGFiZWwgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19sYWJlbFwiPlxuICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cInNldHRpbmdzLWZvcm1fX2NoZWNrYm94XCJcbiAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgIDpjaGVja2VkPVwiY2hlY2tlZFwiXG4gICAgICBAY2hhbmdlPVwib25JbnB1dFwiIC8+XG4gICAgPHNsb3Q+PC9zbG90PlxuICA8L2xhYmVsPlxuPC9kaXY+YCxcbiAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgcHJvcDogJ2NoZWNrZWQnLFxuICAgICAgICAgICAgICAgIGV2ZW50OiAnY2hhbmdlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgICAgIG9uSW5wdXQoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCAhdGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IFJhZGlvQnV0dG9uID0gdnVlXzEuZGVmYXVsdC5leHRlbmQoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IGBcbjxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19yb3dcIj5cbiAgPGxhYmVsIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fbGFiZWxcIj5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19yYWRpb1wiXG4gICAgICA6dmFsdWU9XCJ2YWx1ZVwiXG4gICAgICA6Y2hlY2tlZD1cInZhbHVlID09IHNlbGVjdGVkVmFsdWVcIlxuICAgICAgQGNoYW5nZT1cIm9uSW5wdXRcIiAvPlxuICAgIDxzbG90Pjwvc2xvdD5cbiAgPC9sYWJlbD5cbjwvZGl2PmAsXG4gICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICAgIHByb3A6ICdzZWxlY3RlZFZhbHVlJyxcbiAgICAgICAgICAgICAgICBldmVudDogJ2NoYW5nZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWU6IFN0cmluZyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICAgICAgb25JbnB1dChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWV3TW9kZWwgPSBuZXcgdnVlXzEuZGVmYXVsdCh7XG4gICAgICAgICAgICBlbDogJyNzZXR0aW5nc19mb3JtJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgXG48ZGl2IGNsYXNzPVwiY29udGVudF9fc2V0dGluZ3MtZm9ybSBzZXR0aW5ncy1mb3JtXCIgaWQ9XCJzZXR0aW5nc19mb3JtXCI+XG4gIDx1bCBjbGFzcz1cInNldHRpbmdzLWZvcm1fX3RhYnNcIj5cbiAgICA8bGkgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX190YWJcIlxuICAgICAgOmNsYXNzPVwieyAnc2V0dGluZ3MtZm9ybV9fdGFiLS1hY3RpdmUnOiB0YWIgPT09ICdjb21tb24nIH1cIlxuICAgICAgQGNsaWNrPVwidGFiID0gJ2NvbW1vbidcIj5Db21tb248L2xpPlxuXG4gICAgPGxpIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fdGFiXCJcbiAgICAgIDpjbGFzcz1cInsgJ3NldHRpbmdzLWZvcm1fX3RhYi0tYWN0aXZlJzogdGFiID09PSAnZm9ybScgfVwiXG4gICAgICBAY2xpY2s9XCJ0YWIgPSAnZm9ybSdcIj5Gb3JtPC9saT5cblxuICAgIDxsaSBjbGFzcz1cInNldHRpbmdzLWZvcm1fX3RhYlwiXG4gICAgICA6Y2xhc3M9XCJ7ICdzZXR0aW5ncy1mb3JtX190YWItLWFjdGl2ZSc6IHRhYiA9PT0gJ3RpbWUnIH1cIlxuICAgICAgQGNsaWNrPVwidGFiID0gJ3RpbWUnXCI+VGltZTwvbGk+XG4gIDwvdWw+XG5cbiAgPGRpdiBjbGFzcz1cInNldHRpbmdzLWZvcm1fX3RhYi1jb250ZW50XCJcbiAgICB2LXNob3c9XCJ0YWIgPT09ICdjb21tb24nXCI+XG4gICAgPGgzIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fb3B0aW9uLXRpdGxlXCI+VGhyZWFkIEFsaWdubWVudDwvaDM+XG5cbiAgICA8eC1yYWRpby1idXR0b24gdi1tb2RlbD1cInNldHRpbmdzLmNvbW1vbi5sYXlvdXRcIiA6dmFsdWU9XCInbGVmdCdcIj5cbiAgICAgIE9uIHRoZSBsZWZ0XG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDx4LXJhZGlvLWJ1dHRvbiB2LW1vZGVsPVwic2V0dGluZ3MuY29tbW9uLmxheW91dFwiIDp2YWx1ZT1cIidjZW50ZXInXCI+XG4gICAgICBJbiB0aGUgY2VudGVyXG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDxoMyBjbGFzcz1cInNldHRpbmdzLWZvcm1fX29wdGlvbi10aXRsZVwiPlBvc3RzPC9oMz5cblxuICAgIDx4LWNoZWNrYm94IHYtbW9kZWw9XCJzZXR0aW5ncy5jb21tb24uc2hvd1Bvc3RIZWFkZXJSZWZsaW5rSWNvblwiPlxuICAgICAgU2hvdyByZXBseSBpY29uIGluIHRoZSBwb3N0IGhlYWRlclxuICAgIDwveC1jaGVja2JveD5cblxuICAgIDx4LWNoZWNrYm94IHYtbW9kZWw9XCJzZXR0aW5ncy5jb21tb24ubW92ZVBvc3RIZWFkZXJSZWZsaW5rSWNvblRvREVcIj5cbiAgICAgIE1vdmUgcmVwbHkgaWNvbiB0byBERSBidXR0b25zXG4gICAgPC94LWNoZWNrYm94PlxuXG4gICAgPHgtY2hlY2tib3ggdi1tb2RlbD1cInNldHRpbmdzLmNvbW1vbi5zaG93UG9zdFJlZmxpbmtJY29uXCI+XG4gICAgICBTaG93IHJlcGx5IGljb24gaW4gdGhlIGJvdHRvbSByaWdodCBjb3JuZXIgb2YgcG9zdCBtZXNzYWdlXG4gICAgPC94LWNoZWNrYm94PlxuXG4gICAgPHgtY2hlY2tib3ggdi1tb2RlbD1cInNldHRpbmdzLmNvbW1vbi5zY3JvbGxUb05ld1Bvc3RzXCI+XG4gICAgICBTY3JvbGwgdG8gbmV3IHBvc3RzXG4gICAgPC94LWNoZWNrYm94PlxuXG4gICAgPHgtY2hlY2tib3ggdi1tb2RlbD1cInNldHRpbmdzLmNvbW1vbi5zbW9vdGhTY3JvbGxcIj5cbiAgICAgIFNtb290aCBzY3JvbGxpbmdcbiAgICA8L3gtY2hlY2tib3g+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX190YWItY29udGVudFwiXG4gICAgdi1zaG93PVwidGFiID09PSAnZm9ybSdcIj5cbiAgICA8aDMgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19vcHRpb24tdGl0bGVcIj5Gb3JtIEJlaGF2aW91cjwvaDM+XG5cbiAgICA8eC1jaGVja2JveCB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5zY3JvbGxCb3R0b21cIj5cbiAgICAgIFNjcm9sbCB0byB0aGUgYm90dG9tIGFmdGVyIHBvc3RpbmdcbiAgICA8L3gtY2hlY2tib3g+XG5cbiAgICA8eC1jaGVja2JveCB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5zYXZlU3ViamVjdFwiPlxuICAgICAgU2F2ZSBzdWJqZWN0IGFmdGVyIHBvc3RpbmdcbiAgICA8L3gtY2hlY2tib3g+XG5cbiAgICA8eC1jaGVja2JveCB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5zYXZlTmFtZVwiPlxuICAgICAgU2F2ZSBuYW1lIGFmdGVyIHBvc3RpbmdcbiAgICA8L3gtY2hlY2tib3g+XG5cbiAgICA8eC1jaGVja2JveCB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5zYXZlRm9ybVN0YXRlXCI+XG4gICAgICBTYXZlIGZvcm0gZmxvYXRpbmcgc3RhdGUgb24gcGFnZSByZWxvYWRcbiAgICA8L3gtY2hlY2tib3g+XG5cbiAgICA8aDMgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19vcHRpb24tdGl0bGVcIj5Gb3JtIEFsaWdubWVudDwvaDM+XG5cbiAgICA8eC1yYWRpby1idXR0b24gdi1tb2RlbD1cInNldHRpbmdzLmZvcm0uYWxpZ25cIiA6dmFsdWU9XCInbGVmdCdcIj5cbiAgICAgIE9uIHRoZSBsZWZ0XG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDx4LXJhZGlvLWJ1dHRvbiB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5hbGlnblwiIDp2YWx1ZT1cIidjZW50ZXInXCI+XG4gICAgICBJbiB0aGUgY2VudGVyXG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDxoMyBjbGFzcz1cInNldHRpbmdzLWZvcm1fX29wdGlvbi10aXRsZVwiPlByZXZpZXcgQWxpZ25tZW50PC9oMz5cblxuICAgIDx4LXJhZGlvLWJ1dHRvbiB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5wcmV2aWV3QWxpZ25cIiA6dmFsdWU9XCInbGVmdCdcIj5cbiAgICAgIE9uIHRoZSBsZWZ0XG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDx4LXJhZGlvLWJ1dHRvbiB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5wcmV2aWV3QWxpZ25cIiA6dmFsdWU9XCIncmlnaHQnXCI+XG4gICAgICBPbiB0aGUgcmlnaHRcbiAgICA8L3gtcmFkaW8tYnV0dG9uPlxuXG4gICAgPGgzIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fb3B0aW9uLXRpdGxlXCI+TWFya3VwPC9oMz5cblxuICAgIDx4LWNoZWNrYm94IHYtbW9kZWw9XCJzZXR0aW5ncy5mb3JtLnNob3dNYXJrdXBcIj5cbiAgICAgIFNob3cgbWFya3VwIGJ1dHRvbnNcbiAgICA8L3gtY2hlY2tib3g+XG5cbiAgICA8eC1jaGVja2JveCB2LW1vZGVsPVwic2V0dGluZ3MuZm9ybS5zaG93TWFya3VwTW9iaWxlXCI+XG4gICAgICBTaG93IG1hcmt1cCBidXR0b25zIChtb2JpbGUpXG4gICAgPC94LWNoZWNrYm94PlxuXG4gICAgPHgtY2hlY2tib3ggdi1tb2RlbD1cInNldHRpbmdzLmZvcm0uaW5zZXJ0VGFnc0luUGFpcnNcIj5cbiAgICAgIEluc2VydCB0YWdzIGluIHBhaXJzXG4gICAgPC94LWNoZWNrYm94PlxuXG4gICAgPGgzIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fb3B0aW9uLXRpdGxlXCI+UmVwbGFjZXM8L2gzPlxuXG4gICAgPHVsIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fbGlzdFwiPlxuICAgICAgPGxpIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fbGlzdC1pdGVtXCJcbiAgICAgICAgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIHNldHRpbmdzLmZvcm0ucmVwbGFjZXNcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJpbnB1dCBzZXR0aW5ncy1mb3JtX190ZXh0XCJcbiAgICAgICAgICB2LW1vZGVsPVwiaXRlbS5wYXR0ZXJuXCIgcGxhY2Vob2xkZXI9XCJQYXR0ZXJuXCIgLz5cblxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0IHNldHRpbmdzLWZvcm1fX3RleHRcIlxuICAgICAgICAgIHYtbW9kZWw9XCJpdGVtLnJlcGxhY2VcIiBwbGFjZWhvbGRlcj1cIlJlcGxhY2VcIiAvPlxuXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b25cIlxuICAgICAgICAgIEBjbGljaz1cInJlbW92ZVJlcGxhY2VBdChpbmRleClcIj5SZW1vdmU8L2J1dHRvbj5cbiAgICAgIDwvbGk+XG5cbiAgICAgIDxsaSBjbGFzcz1cInNldHRpbmdzLWZvcm1fX2xpc3QtaXRlbVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0IHNldHRpbmdzLWZvcm1fX3RleHRcIlxuICAgICAgICAgIHYtbW9kZWw9XCJuZXdSZXBsYWNlLnBhdHRlcm5cIiBwbGFjZWhvbGRlcj1cIlBhdHRlcm5cIiAvPlxuXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQgc2V0dGluZ3MtZm9ybV9fdGV4dFwiXG4gICAgICAgICAgdi1tb2RlbD1cIm5ld1JlcGxhY2UucmVwbGFjZVwiIHBsYWNlaG9sZGVyPVwiUmVwbGFjZVwiIC8+XG5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvblwiXG4gICAgICAgICAgQGNsaWNrPVwiYWRkUmVwbGFjZShuZXdSZXBsYWNlKVwiPkFkZDwvYnV0dG9uPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fdGFiLWNvbnRlbnRcIlxuICAgIHYtc2hvdz1cInRhYiA9PT0gJ3RpbWUnXCI+XG4gICAgPGgzIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fb3B0aW9uLXRpdGxlXCI+TGFuZ3VhZ2U8L2gzPlxuXG4gICAgPHgtcmFkaW8tYnV0dG9uIHYtbW9kZWw9XCJzZXR0aW5ncy50aW1lLmxvY2FsZVwiIDp2YWx1ZT1cIidkZWZhdWx0J1wiPlxuICAgICAgQnJvd3NlciBkZWZhdWx0XG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDx4LXJhZGlvLWJ1dHRvbiB2LW1vZGVsPVwic2V0dGluZ3MudGltZS5sb2NhbGVcIiA6dmFsdWU9XCInY3VzdG9tJ1wiPlxuICAgICAgQ3VzdG9tXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImlucHV0IHNldHRpbmdzLWZvcm1fX3RleHRcIiBwbGFjZWhvbGRlcj1cImVuXCJcbiAgICAgICAgQGNsaWNrPVwic2V0dGluZ3MudGltZS5sb2NhbGUgPSAnY3VzdG9tJ1wiXG4gICAgICAgIHYtbW9kZWw9XCJzZXR0aW5ncy50aW1lLmxvY2FsZUN1c3RvbVwiIC8+XG4gICAgPC94LXJhZGlvLWJ1dHRvbj5cblxuICAgIDxoMyBjbGFzcz1cInNldHRpbmdzLWZvcm1fX29wdGlvbi10aXRsZVwiPkZvcm1hdDwvaDM+XG5cbiAgICA8eC1yYWRpby1idXR0b24gdi1tb2RlbD1cInNldHRpbmdzLnRpbWUuZm9ybWF0XCIgOnZhbHVlPVwiJ2RlZmF1bHQnXCI+XG4gICAgICBCcm93c2VyIGRlZmF1bHRcbiAgICA8L3gtcmFkaW8tYnV0dG9uPlxuXG4gICAgPHgtcmFkaW8tYnV0dG9uIHYtbW9kZWw9XCJzZXR0aW5ncy50aW1lLmZvcm1hdFwiIDp2YWx1ZT1cIidjdXN0b20nXCI+XG4gICAgICBDdXN0b21cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXQgc2V0dGluZ3MtZm9ybV9fdGV4dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRUVFLCBkZCBNTU0geXl5eSBISDptbTpzc1wiXG4gICAgICAgIEBjbGljaz1cInNldHRpbmdzLnRpbWUuZm9ybWF0ID0gJ2N1c3RvbSdcIlxuICAgICAgICB2LW1vZGVsPVwic2V0dGluZ3MudGltZS5mb3JtYXRDdXN0b21cIiAvPlxuICAgIDwveC1yYWRpby1idXR0b24+XG5cbiAgICA8cD5cbiAgICAgIFNlZSB0aGVcbiAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L2x1eG9uL2Jsb2IvbWFzdGVyL2RvY3MvZm9ybWF0dGluZy5tZCN0YWJsZS1vZi10b2tlbnNcIj5cbiAgICAgICAgbHV4b24gZG9jdW1lbnRhdGlvblxuICAgICAgPC9hPlxuICAgICAgZm9yIHRoZSBjdXN0b20gdG9rZW5zIHJlZmVyZW5jZS5cbiAgICA8L3A+XG5cbiAgICA8aDMgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19vcHRpb24tdGl0bGVcIj5UaW1lIHpvbmU8L2gzPlxuXG4gICAgPHgtcmFkaW8tYnV0dG9uIHYtbW9kZWw9XCJzZXR0aW5ncy50aW1lLnpvbmVcIiA6dmFsdWU9XCInZGVmYXVsdCdcIj5cbiAgICAgIEJyb3dzZXIgZGVmYXVsdFxuICAgIDwveC1yYWRpby1idXR0b24+XG5cbiAgICA8eC1yYWRpby1idXR0b24gdi1tb2RlbD1cInNldHRpbmdzLnRpbWUuem9uZVwiIDp2YWx1ZT1cIidmaXhlZCdcIj5cbiAgICAgIEZpeGVkIFVUQyBvZmZzZXRcbiAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dCBzZXR0aW5ncy1mb3JtX190ZXh0XCJcbiAgICAgICAgbWluPVwiLTk5XCIgbWF4PVwiOTlcIlxuICAgICAgICBAY2xpY2s9XCJzZXR0aW5ncy50aW1lLnpvbmUgPSAnZml4ZWQnXCJcbiAgICAgICAgdi1tb2RlbD1cInNldHRpbmdzLnRpbWUuem9uZUZpeGVkXCIgLz5cbiAgICA8L3gtcmFkaW8tYnV0dG9uPlxuXG4gICAgPGgzIGNsYXNzPVwic2V0dGluZ3MtZm9ybV9fb3B0aW9uLXRpdGxlXCI+Q3VycmVudCBmb3JtYXQ8L2gzPlxuXG4gICAgPHA+e3sgdGltZSB9fTwvcD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInNldHRpbmdzLWZvcm1fX2Zvb3RlclwiPlxuICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1mb3JtX19idXR0b25zXCI+XG4gICAgICA8cCBjbGFzcz1cInNldHRpbmdzLWZvcm1fX3N0YXR1c1wiID57eyBzdGF0dXMgfX08L3A+XG5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uIHNldHRpbmdzLWZvcm1fX3NhdmVcIlxuICAgICAgICBAY2xpY2sucHJldmVudD1cInNhdmVTZXR0aW5ncygpXCI+U2F2ZTwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0YWI6ICdjb21tb24nLFxuICAgICAgICAgICAgICAgICAgICBuZXdSZXBsYWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2U6ICcnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnJyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICAgICAgLy8gTG9hZCBzZXR0aW5ncyBmcm9tIGEgY29va2llXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IF9fMS5TZXR0aW5nc01hbmFnZXIubG9hZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVUaW1lLmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3llZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGltZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgICAgICByZW1vdmVSZXBsYWNlQXQoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5mb3JtLnJlcGxhY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhZGRSZXBsYWNlKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAoaXRlbS5wYXR0ZXJuLCAnZ20nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBgSW52YWxpZCByZWd1bGFyIGV4cHJlc3Npb246ICR7ZS5tZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5mb3JtLnJlcGxhY2VzLnB1c2goT2JqZWN0LmFzc2lnbih7fSwgaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1JlcGxhY2UgPSB7IHBhdHRlcm46ICcnLCByZXBsYWNlOiAnJyB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdXBkYXRlVGltZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBsdXhvbl8xLkRhdGVUaW1lLmZyb21KU0RhdGUobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWUgPSB1dGlsc18xLlRpbWUuZm9ybWF0KHRpbWUsIHRoaXMuc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lID0gJ0ludmFsaWQgZm9ybWF0JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2F2ZVNldHRpbmdzKCkge1xuICAgICAgICAgICAgICAgICAgICBfXzEuU2V0dGluZ3NNYW5hZ2VyLnNhdmUodGhpcy5zZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluZGljYXRlIHRoYXQgc2V0dGluZ3MgYXJlIHNhdmVkLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ1NldHRpbmdzIHNhdmVkLic7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDAgLyAzKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgICAgICAneC1jaGVja2JveCc6IENoZWNrYm94LFxuICAgICAgICAgICAgICAgICd4LXJhZGlvLWJ1dHRvbic6IFJhZGlvQnV0dG9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5TZXR0aW5ncyA9IFNldHRpbmdzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBfXzEgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xuY2xhc3MgU3R5bGVTd2l0Y2gge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHt9O1xuICAgICAgICAvLyBQYXJzZSBzZWxlY3RhYmxlIHN0eWxlcyBmcm9tIDxoZWFkPlxuICAgICAgICBjb25zdCBzdHlsZXMgPSB1dGlsc18xLkRPTS5xc2EoJ2xpbmtbdGl0bGVdJyk7XG4gICAgICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc3R5bGUudGl0bGU7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBzdHlsZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW3RpdGxlXSA9IHVybDtcbiAgICAgICAgICAgIGlmICghc3R5bGUuaGFzQXR0cmlidXRlKCdkYXRhLXNlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEdldCBzZWxlY3RlZCBzdHlsZVxuICAgICAgICBjb25zdCBzZWxlY3RlZF9zdHlsZSA9IHV0aWxzXzEuQ29va2llLmdldCgndGlueWliX3N0eWxlJywgJ1N5bnRod2F2ZScpO1xuICAgICAgICB0aGlzLnNldFN0eWxlKHNlbGVjdGVkX3N0eWxlKTtcbiAgICAgICAgX18xLmV2ZW50QnVzLiRvbihfXzEuRXZlbnRzLlJlYWR5LCB0aGlzLm9uUmVhZHkuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlX3N3aXRjaGVyID0gdXRpbHNfMS5ET00ucWlkKCdzdHlsZS1zd2l0Y2hlcicpO1xuICAgICAgICBpZiAoc3R5bGVfc3dpdGNoZXIpIHtcbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIHN0eWxlIHN3aXRjaGVyIHdpZGdldFxuICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0gT2JqZWN0LmtleXModGhpcy5zdHlsZXMpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IHN0eWxlc1tpXTtcbiAgICAgICAgICAgICAgICBzdHlsZV9zd2l0Y2hlci5pbm5lckhUTUwgKz0gYDxvcHRpb24gY2xhc3M9XCJzdHlsZS1zd2l0Y2hlcl9fb3B0aW9uXCIgdmFsdWU9XCIke3RpdGxlfVwiPiR7dGl0bGV9PC9vcHRpb24+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNldCBzdHlsZSBjaGFuZ2UgY2FsbGJhY2tcbiAgICAgICAgICAgIHN0eWxlX3N3aXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0eWxlKHN0eWxlX3N3aXRjaGVyLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkX3N0eWxlID0gdXRpbHNfMS5Db29raWUuZ2V0KCd0aW55aWJfc3R5bGUnLCAnU3ludGh3YXZlJyk7XG4gICAgICAgIHdpbmRvdy5kYXRhTGF5ZXIucHVzaCh7ICd0aGVtZSc6IHNlbGVjdGVkX3N0eWxlIH0pO1xuICAgIH1cbiAgICBzZXRTdHlsZShzdHlsZSkge1xuICAgICAgICBjb25zdCBoZWFkID0gdXRpbHNfMS5ET00ucXMoJ2hlYWQnKTtcbiAgICAgICAgLy8gSWYgbm8gPGhlYWQ+IGVsZW1lbnQsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKCFoZWFkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRfc3R5bGUgPSB1dGlsc18xLkRPTS5xcygnbGlua1tkYXRhLXNlbGVjdGVkXScpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRfc3R5bGUpIHtcbiAgICAgICAgICAgIC8vIElmIHN0eWxlIGFscmVhZHkgc2VsZWN0ZWQsIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZF9zdHlsZS50aXRsZSA9PT0gc3R5bGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZW1vdmUgcHJldmlvdXNseSBzZWxlY3RlZCBzdHlsZSBmcm9tIDxoZWFkPlxuICAgICAgICAgICAgc2VsZWN0ZWRfc3R5bGUucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIGN1cnJlbnRseSBzZWxlY3RlZCBzdHlsZSB0byA8aGVhZD5cbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zdHlsZXNbc3R5bGVdO1xuICAgICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBsaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuICAgICAgICBsaW5rLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gICAgICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgICAvLyBTYXZlIHNlbGVjdGVkIHN0eWxlXG4gICAgICAgIGNvbnN0IGV4cGlyYXRpb25fZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGV4cGlyYXRpb25fZGF0ZS5zZXRUaW1lKGV4cGlyYXRpb25fZGF0ZS5nZXRUaW1lKCkgKyAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgdXRpbHNfMS5Db29raWUuc2V0KCd0aW55aWJfc3R5bGUnLCBzdHlsZSwgZXhwaXJhdGlvbl9kYXRlKTtcbiAgICB9XG59XG5leHBvcnRzLlN0eWxlU3dpdGNoID0gU3R5bGVTd2l0Y2g7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHZ1ZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ2dWVcIikpO1xuY29uc3QgZXZlbnRCdXMgPSBuZXcgdnVlXzEuZGVmYXVsdCgpO1xuZXhwb3J0cy5ldmVudEJ1cyA9IGV2ZW50QnVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRXZlbnRzO1xuKGZ1bmN0aW9uIChFdmVudHMpIHtcbiAgICBFdmVudHNbXCJSZWFkeVwiXSA9IFwicmVhZHlcIjtcbiAgICBFdmVudHNbXCJQb3N0c0luc2VydGVkXCJdID0gXCJwb3N0c19pbnNlcnRlZFwiO1xuICAgIEV2ZW50c1tcIlBvc3RDcmVhdGVkXCJdID0gXCJwb3N0X2NyZWF0ZWRcIjtcbiAgICBFdmVudHNbXCJJbnNlcnRNYXJrdXBcIl0gPSBcImluc2VydF9tYXJrdXBcIjtcbn0pKEV2ZW50cyA9IGV4cG9ydHMuRXZlbnRzIHx8IChleHBvcnRzLkV2ZW50cyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmV4cG9ydHMuQXBpID0gYXBpXzEuQXBpO1xudmFyIGV2ZW50X2J1c18xID0gcmVxdWlyZShcIi4vZXZlbnQtYnVzXCIpO1xuZXhwb3J0cy5ldmVudEJ1cyA9IGV2ZW50X2J1c18xLmV2ZW50QnVzO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xuZXhwb3J0cy5FdmVudHMgPSBldmVudHNfMS5FdmVudHM7XG52YXIgc2V0dGluZ3NfMSA9IHJlcXVpcmUoXCIuL3NldHRpbmdzXCIpO1xuZXhwb3J0cy5TZXR0aW5nc01hbmFnZXIgPSBzZXR0aW5nc18xLlNldHRpbmdzTWFuYWdlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2V0dGluZ3NLZXkgPSAnc2V0dGluZ3MnO1xuY29uc3QgZGVmYXVsdFNldHRpbmdzID0ge1xuICAgIGNvbW1vbjoge1xuICAgICAgICBsYXlvdXQ6ICdsZWZ0JyxcbiAgICAgICAgc2hvd1Bvc3RIZWFkZXJSZWZsaW5rSWNvbjogdHJ1ZSxcbiAgICAgICAgbW92ZVBvc3RIZWFkZXJSZWZsaW5rSWNvblRvREU6IGZhbHNlLFxuICAgICAgICBzaG93UG9zdFJlZmxpbmtJY29uOiBmYWxzZSxcbiAgICAgICAgc2Nyb2xsVG9OZXdQb3N0czogdHJ1ZSxcbiAgICAgICAgc21vb3RoU2Nyb2xsOiB0cnVlLFxuICAgIH0sXG4gICAgZm9ybToge1xuICAgICAgICBhbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIHByZXZpZXdBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgc2Nyb2xsQm90dG9tOiB0cnVlLFxuICAgICAgICBzaG93TWFya3VwOiB0cnVlLFxuICAgICAgICBzaG93TWFya3VwTW9iaWxlOiBmYWxzZSxcbiAgICAgICAgaW5zZXJ0VGFnc0luUGFpcnM6IHRydWUsXG4gICAgICAgIHNhdmVGb3JtU3RhdGU6IGZhbHNlLFxuICAgICAgICBzYXZlU3ViamVjdDogZmFsc2UsXG4gICAgICAgIHNhdmVOYW1lOiB0cnVlLFxuICAgICAgICBmbG9hdDogZmFsc2UsXG4gICAgICAgIGZsb2F0UG9zaXRpb246IHsgeDogMTAwLCB5OiAxMDAgfSxcbiAgICAgICAgcmVwbGFjZXM6IFtdLFxuICAgIH0sXG4gICAgdGltZToge1xuICAgICAgICBsb2NhbGU6ICdkZWZhdWx0JyxcbiAgICAgICAgbG9jYWxlQ3VzdG9tOiAnJyxcbiAgICAgICAgem9uZTogJ2RlZmF1bHQnLFxuICAgICAgICB6b25lRml4ZWQ6IDAsXG4gICAgICAgIGZvcm1hdDogJ2RlZmF1bHQnLFxuICAgICAgICBmb3JtYXRDdXN0b206ICcnLFxuICAgIH0sXG59O1xuZnVuY3Rpb24gaXNPYmplY3QoaXRlbSkge1xuICAgIHJldHVybiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSkpO1xufVxuZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QuYXNzaWduKHt9LCB0YXJnZXQpO1xuICAgIGlmIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qoc291cmNlW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihvdXRwdXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBtZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ob3V0cHV0LCB7IFtrZXldOiBzb3VyY2Vba2V5XSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG59XG5jbGFzcyBTZXR0aW5nc01hbmFnZXIge1xuICAgIHN0YXRpYyBsb2FkKCkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc2V0dGluZ3NLZXkpKTtcbiAgICAgICAgcmV0dXJuIG1lcmdlKGRlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuICAgIH1cbiAgICBzdGF0aWMgc2F2ZShzZXR0aW5ncykge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoc2V0dGluZ3MpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzZXR0aW5nc0tleSwgZGF0YSk7XG4gICAgfVxufVxuZXhwb3J0cy5TZXR0aW5nc01hbmFnZXIgPSBTZXR0aW5nc01hbmFnZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIENvb2tpZSB7XG4gICAgc3RhdGljIGdldChuYW1lLCBfZGVmYXVsdCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY29va2llX3N0ciA9IGA7ICR7ZG9jdW1lbnQuY29va2llfWA7XG4gICAgICAgIGNvbnN0IGNvb2tpZV9wYXJ0cyA9IGNvb2tpZV9zdHIuc3BsaXQoYDsgJHtuYW1lfT1gKTtcbiAgICAgICAgaWYgKGNvb2tpZV9wYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlX2VuYyA9IGNvb2tpZV9wYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlX2VuYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9kZWZhdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgc2V0KG5hbWUsIHZhbHVlLCBleHBpcmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlX2VuYyA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGV4cGlyYXRpb25fc3RyID0gZXhwaXJhdGlvbi50b1VUQ1N0cmluZygpO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT0ke3ZhbHVlX2VuY307IHBhdGg9LzsgZXhwaXJlcz0ke2V4cGlyYXRpb25fc3RyfWA7XG4gICAgfVxufVxuZXhwb3J0cy5Db29raWUgPSBDb29raWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIERPTSB7XG4gICAgc3RhdGljIHFpZChpZCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIH1cbiAgICBzdGF0aWMgcXMoc2VsZWN0b3IsIGNvbnRleHQgPSBudWxsKSB7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgY29udGV4dCA9IGRvY3VtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH1cbiAgICBzdGF0aWMgcXNhKHNlbGVjdG9yLCBjb250ZXh0ID0gbnVsbCkge1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBkb2N1bWVudDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlbGVtZW50TGlzdCA9IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlbGVtZW50TGlzdCk7XG4gICAgfVxufVxuZXhwb3J0cy5ET00gPSBET007XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb29raWVfMSA9IHJlcXVpcmUoXCIuL2Nvb2tpZVwiKTtcbmV4cG9ydHMuQ29va2llID0gY29va2llXzEuQ29va2llO1xudmFyIGRvbV8xID0gcmVxdWlyZShcIi4vZG9tXCIpO1xuZXhwb3J0cy5ET00gPSBkb21fMS5ET007XG52YXIgdGltZV8xID0gcmVxdWlyZShcIi4vdGltZVwiKTtcbmV4cG9ydHMuVGltZSA9IHRpbWVfMS5UaW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBUaW1lIHtcbiAgICBzdGF0aWMgZm9ybWF0KHRpbWUsIHNldHRpbmdzKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy50aW1lLmxvY2FsZSA9PT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICAgIHRpbWUgPSB0aW1lLnNldExvY2FsZShzZXR0aW5ncy50aW1lLmxvY2FsZUN1c3RvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldHRpbmdzLnRpbWUuem9uZSA9PT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gc2V0dGluZ3MudGltZS56b25lRml4ZWQ7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRTdHIgPSAnVVRDJyArIChvZmZzZXQgPj0gMCA/ICcrJyA6ICcnKSArIG9mZnNldC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGltZSA9IHRpbWUuc2V0Wm9uZShvZmZzZXRTdHIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXR0aW5ncy50aW1lLmZvcm1hdCA9PT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lLnRvRm9ybWF0KHNldHRpbmdzLnRpbWUuZm9ybWF0Q3VzdG9tKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lLnRvRm9ybWF0KCdkLkxMLnl5eXkgSEg6bW06c3MnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuVGltZSA9IFRpbWU7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGx1eG9uOyIsIm1vZHVsZS5leHBvcnRzID0gVnVlOyJdLCJzb3VyY2VSb290IjoiIn0=