import {
  Fragment,
  computed,
  createBaseVNode,
  createElementBlock,
  defineComponent,
  getCurrentScope,
  inject,
  normalizeStyle,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  ref,
  renderList,
  renderSlot,
  unref,
  useCssVars,
  watch
} from "./chunk-JKV2V35Q.js";

// node_modules/.pnpm/vue-waterfall-plugin-next@2.2.1_vue@3.3.4/node_modules/vue-waterfall-plugin-next/dist/my-lib.es.js
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
var isClient = typeof window !== "undefined";
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  const filter = (invoke) => {
    const duration2 = unref(ms);
    const maxDuration = unref(options.maxWait);
    if (timer)
      clearTimeout(timer);
    if (duration2 <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        clearTimeout(maxTimer);
        maxTimer = null;
      }
      return invoke();
    }
    if (maxDuration && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer)
          clearTimeout(timer);
        maxTimer = null;
        invoke();
      }, maxDuration);
    }
    timer = setTimeout(() => {
      if (maxTimer)
        clearTimeout(maxTimer);
      maxTimer = null;
      invoke();
    }, duration2);
  };
  return filter;
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn);
}
function unrefElement(elRef) {
  var _a2;
  const plain = unref(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
var defaultWindow = isClient ? window : void 0;
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$c.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$c.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
  let observer;
  const isSupported = window2 && "ResizeObserver" in window2;
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
var _a;
var _b;
isClient && (window == null ? void 0 : window.navigator) && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.platform) && /iP(ad|hone|od)/.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.platform);
var getItemWidth = ({ breakpoints, wrapperWidth, gutter, hasAroundGutter, initWidth }) => {
  const sizeList = Object.keys(breakpoints).map((key) => {
    return Number(key);
  }).sort((a, b) => a - b);
  let validSize = wrapperWidth;
  let breakpoint = false;
  for (const size of sizeList) {
    if (wrapperWidth <= size) {
      validSize = size;
      breakpoint = true;
      break;
    }
  }
  if (!breakpoint)
    return initWidth;
  const col = breakpoints[validSize].rowPerView;
  if (hasAroundGutter)
    return (wrapperWidth - gutter) / col - gutter;
  else
    return (wrapperWidth - (col - 1) * gutter) / col;
};
function useCalculateCols(props) {
  const wrapperWidth = ref(0);
  const waterfallWrapper = ref(null);
  useResizeObserver(waterfallWrapper, (entries) => {
    const entry = entries[0];
    const { width } = entry.contentRect;
    wrapperWidth.value = width;
  });
  const colWidth = computed(() => {
    return getItemWidth({
      wrapperWidth: wrapperWidth.value,
      breakpoints: props.breakpoints,
      gutter: props.gutter,
      hasAroundGutter: props.hasAroundGutter,
      initWidth: props.width
    });
  });
  const cols = computed(() => {
    const offset = props.hasAroundGutter ? -props.gutter : props.gutter;
    return Math.floor((wrapperWidth.value + offset) / (colWidth.value + props.gutter));
  });
  const offsetX = computed(() => {
    const offset = props.hasAroundGutter ? props.gutter : -props.gutter;
    const contextWidth = cols.value * (colWidth.value + props.gutter) + offset;
    return (wrapperWidth.value - contextWidth) / 2;
  });
  return {
    waterfallWrapper,
    wrapperWidth,
    colWidth,
    cols,
    offsetX
  };
}
function hasClass(el, className) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return reg.test(el.className);
}
function addClass(el, className) {
  if (hasClass(el, className))
    return;
  const newClass = el.className.split(/\s+/);
  newClass.push(className);
  el.className = newClass.join(" ");
}
var elementStyle = document.createElement("div").style;
var vendor = (() => {
  const transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform"
  };
  for (const key in transformNames) {
    const val = transformNames[key];
    if (elementStyle[val] !== void 0)
      return key;
  }
  return false;
})();
function prefixStyle(style) {
  if (vendor === false)
    return false;
  if (vendor === "standard")
    return style;
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
var transform = prefixStyle("transform");
var duration = prefixStyle("animation-duration");
var delay = prefixStyle("animation-delay");
var transition = prefixStyle("transition");
var fillMode = prefixStyle("animation-fill-mode");
function useLayout(props, colWidth, cols, offsetX, waterfallWrapper) {
  const posY = ref([]);
  const wrapperHeight = ref(0);
  const getX = (index) => {
    const count = props.hasAroundGutter ? index + 1 : index;
    return props.gutter * count + colWidth.value * index + offsetX.value;
  };
  const initY = () => {
    posY.value = new Array(cols.value).fill(props.hasAroundGutter ? props.gutter : 0);
  };
  const animation = addAnimation(props);
  const layoutHandle = async () => {
    initY();
    const items = [];
    if (waterfallWrapper && waterfallWrapper.value) {
      waterfallWrapper.value.childNodes.forEach((el) => {
        if (el.className === "waterfall-item")
          items.push(el);
      });
    }
    if (items.length === 0)
      return false;
    for (let i = 0; i < items.length; i++) {
      const curItem = items[i];
      const minY = Math.min.apply(null, posY.value);
      const minYIndex = posY.value.indexOf(minY);
      const curX = getX(minYIndex);
      const style = curItem.style;
      if (transform)
        style[transform] = `translate3d(${curX}px,${minY}px, 0)`;
      style.width = `${colWidth.value}px`;
      const { height } = curItem.getBoundingClientRect();
      posY.value[minYIndex] += height + props.gutter;
      animation(curItem, () => {
        if (transition)
          style[transition] = "transform .3s";
      });
    }
    wrapperHeight.value = Math.max.apply(null, posY.value);
  };
  return {
    wrapperHeight,
    layoutHandle
  };
}
function addAnimation(props) {
  return (item, callback) => {
    const content = item.firstChild;
    if (content && !hasClass(content, props.animationPrefix)) {
      const durationSec = `${props.animationDuration / 1e3}s`;
      const delaySec = `${props.animationDelay / 1e3}s`;
      const style = content.style;
      style.visibility = "visible";
      if (duration)
        style[duration] = durationSec;
      if (delay)
        style[delay] = delaySec;
      if (fillMode)
        style[fillMode] = "both";
      addClass(content, props.animationPrefix);
      addClass(content, props.animationEffect);
      if (callback) {
        setTimeout(() => {
          callback();
        }, props.animationDuration + props.animationDelay);
      }
    }
  };
}
var inBrowser = typeof window !== "undefined" && window !== null;
var hasIntersectionObserver = checkIntersectionObserver();
var isEnumerable = Object.prototype.propertyIsEnumerable;
var getSymbols = Object.getOwnPropertySymbols;
function getValue(form, ...selectors) {
  const res = selectors.map((s) => {
    return s.replace(/\[(\w+)\]/g, ".$1").split(".").reduce((prev, cur) => {
      return prev && prev[cur];
    }, form);
  });
  return res;
}
function checkIntersectionObserver() {
  if (inBrowser && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
        get() {
          return this.intersectionRatio > 0;
        }
      });
    }
    return true;
  }
  return false;
}
function isObject(val) {
  return typeof val === "function" || toString.call(val) === "[object Object]";
}
function isPrimitive(val) {
  return typeof val === "object" ? val === null : typeof val !== "function";
}
function isValidKey(key) {
  return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
function assignSymbols(target, ...args) {
  if (!isObject(target))
    throw new TypeError("expected the first argument to be an object");
  if (args.length === 0 || typeof Symbol !== "function" || typeof getSymbols !== "function")
    return target;
  for (const arg of args) {
    const names = getSymbols(arg);
    for (const key of names) {
      if (isEnumerable.call(arg, key))
        target[key] = arg[key];
    }
  }
  return target;
}
function assign(target, ...args) {
  let i = 0;
  if (isPrimitive(target))
    target = args[i++];
  if (!target)
    target = {};
  for (; i < args.length; i++) {
    if (isObject(args[i])) {
      for (const key of Object.keys(args[i])) {
        if (isValidKey(key)) {
          if (isObject(target[key]) && isObject(args[i][key]))
            assign(target[key], args[i][key]);
          else
            target[key] = args[i][key];
        }
      }
      assignSymbols(target, args[i]);
    }
  }
  return target;
}
function loadImage(url, crossOrigin) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error("Image load error"));
    };
    if (crossOrigin)
      image.crossOrigin = "Anonymous";
    image.src = url;
  });
}
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0
};
var DEFAULT_LOADING = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var DEFAULT_ERROR = "";
var Lazy = class {
  constructor(flag = true, options, crossOrigin = true) {
    this.lazyActive = true;
    this.crossOrigin = true;
    this.options = {
      loading: DEFAULT_LOADING,
      error: DEFAULT_ERROR,
      observerOptions: DEFAULT_OBSERVER_OPTIONS,
      log: true
    };
    this._images = /* @__PURE__ */ new WeakMap();
    this.lazyActive = flag;
    this.crossOrigin = crossOrigin;
    this.config(options);
  }
  config(options = {}) {
    assign(this.options, options);
  }
  mount(el, binding, callback) {
    const { src, loading, error } = this._valueFormatter(binding);
    el.setAttribute("lazy", "loading");
    el.setAttribute("src", loading || DEFAULT_LOADING);
    if (!this.lazyActive) {
      this._setImageSrc(el, src, callback, error);
    } else {
      if (!hasIntersectionObserver) {
        this._setImageSrc(el, src, callback, error);
        this._log(() => {
          throw new Error("Not support IntersectionObserver!");
        });
      }
      this._initIntersectionObserver(el, src, callback, error);
    }
  }
  resize(el, callback) {
    const lazy = el.getAttribute("lazy");
    const src = el.getAttribute("src");
    if (lazy && lazy === "loaded" && src) {
      loadImage(src, this.crossOrigin).then((image) => {
        const { width, height } = image;
        const curHeight = el.width / width * height;
        el.height = curHeight;
        const style = el.style;
        style.height = `${curHeight}px`;
        callback();
      });
    }
  }
  unmount(el) {
    const imgItem = this._realObserver(el);
    imgItem && imgItem.unobserve(el);
    this._images.delete(el);
  }
  _setImageSrc(el, src, callback, error) {
    if (!src)
      return;
    const preSrc = el.getAttribute("src");
    if (preSrc === src)
      return;
    loadImage(src, this.crossOrigin).then((image) => {
      const { width, height } = image;
      const ratio = height / width;
      const lazyBox = el.parentNode.parentNode;
      lazyBox.style.paddingBottom = `${ratio * 100}%`;
      el.setAttribute("lazy", "loaded");
      el.removeAttribute("src");
      el.setAttribute("src", src);
      callback();
    }).catch(() => {
      const imgItem = this._realObserver(el);
      imgItem && imgItem.disconnect();
      if (error) {
        el.setAttribute("lazy", "error");
        el.setAttribute("src", error);
      }
      this._log(() => {
        throw new Error(`Image failed to load!And failed src was: ${src} `);
      });
      callback();
    });
  }
  _isOpenLazy() {
    return hasIntersectionObserver && this.lazyActive;
  }
  _initIntersectionObserver(el, src, callback, error) {
    const observerOptions = this.options.observerOptions;
    this._images.set(el, new IntersectionObserver((entries) => {
      Array.prototype.forEach.call(entries, (entry) => {
        if (entry.isIntersecting) {
          const imgItem2 = this._realObserver(el);
          imgItem2 && imgItem2.unobserve(entry.target);
          this._setImageSrc(el, src, callback, error);
        }
      });
    }, observerOptions));
    const imgItem = this._realObserver(el);
    imgItem && imgItem.observe(el);
  }
  _valueFormatter(value) {
    let src = value;
    let loading = this.options.loading;
    let error = this.options.error;
    if (isObject(value)) {
      src = value.src;
      loading = value.loading || this.options.loading;
      error = value.error || this.options.error;
    }
    return {
      src,
      loading,
      error
    };
  }
  _log(callback) {
    if (this.options.log)
      callback();
  }
  _realObserver(el) {
    return this._images.get(el);
  }
};
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var __default__ = defineComponent({
  props: {
    list: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: "id"
    },
    imgSelector: {
      type: String,
      default: "src"
    },
    width: {
      type: Number,
      default: 200
    },
    breakpoints: {
      type: Object,
      default: () => ({
        1200: {
          rowPerView: 3
        },
        800: {
          rowPerView: 2
        },
        500: {
          rowPerView: 1
        }
      })
    },
    gutter: {
      type: Number,
      default: 10
    },
    hasAroundGutter: {
      type: Boolean,
      default: true
    },
    animationPrefix: {
      type: String,
      default: "animate__animated"
    },
    animationEffect: {
      type: String,
      default: "fadeIn"
    },
    animationDuration: {
      type: Number,
      default: 1e3
    },
    animationDelay: {
      type: Number,
      default: 300
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    lazyload: {
      type: Boolean,
      default: true
    },
    loadProps: {
      type: Object,
      default: () => {
      }
    },
    crossOrigin: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 300
    }
  },
  setup(props) {
    const lazy = new Lazy(props.lazyload, props.loadProps, props.crossOrigin);
    provide("lazy", lazy);
    const {
      waterfallWrapper,
      wrapperWidth,
      colWidth,
      cols,
      offsetX
    } = useCalculateCols(props);
    const { wrapperHeight, layoutHandle } = useLayout(props, colWidth, cols, offsetX, waterfallWrapper);
    const renderer = useDebounceFn(() => {
      layoutHandle();
    }, props.delay);
    watch(() => [wrapperWidth, colWidth, props.list], () => {
      renderer();
    }, { deep: true });
    const sizeChangeTime = ref(0);
    provide("sizeChangeTime", sizeChangeTime);
    provide("imgLoaded", renderer);
    const getRenderURL = (item) => {
      return getValue(item, props.imgSelector)[0];
    };
    const getKey = (item, index) => {
      return item[props.rowKey] || index;
    };
    return {
      waterfallWrapper,
      wrapperHeight,
      getRenderURL,
      getKey
    };
  }
});
var __injectCSSVars__ = () => {
  useCssVars((_ctx) => ({
    "e0bdcc92": _ctx.backgroundColor
  }));
};
var __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
var _sfc_main$1 = __default__;
var _hoisted_1$1 = { class: "waterfall-card" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    ref: "waterfallWrapper",
    class: "waterfall-list",
    style: normalizeStyle({ height: `${_ctx.wrapperHeight}px` })
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (item, index) => {
      return openBlock(), createElementBlock("div", {
        key: _ctx.getKey(item, index),
        class: "waterfall-item"
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          renderSlot(_ctx.$slots, "item", {
            item,
            index,
            url: _ctx.getRenderURL(item)
          }, void 0, true)
        ])
      ]);
    }), 128))
  ], 4);
}
var Waterfall = _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-585fbbe9"]]);
var _sfc_main = defineComponent({
  props: {
    url: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const imgLoaded = inject("imgLoaded");
    const lazy = inject("lazy");
    const lazyRef = ref(null);
    onMounted(() => {
      render();
    });
    onUnmounted(() => {
      unRender();
    });
    function render() {
      if (!lazyRef.value)
        return;
      lazy.mount(lazyRef.value, props.url, () => {
        imgLoaded();
      });
    }
    function unRender() {
      if (!lazyRef.value)
        return;
      lazy.unmount(lazyRef.value);
    }
    return {
      lazyRef
    };
  }
});
var _hoisted_1 = { class: "lazy__box" };
var _hoisted_2 = { class: "lazy__resource" };
var _hoisted_3 = {
  ref: "lazyRef",
  class: "lazy__img"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("img", _hoisted_3, null, 512)
    ])
  ]);
}
var LazyImg = _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5a384790"]]);
export {
  LazyImg,
  Waterfall
};
//# sourceMappingURL=vue-waterfall-plugin-next.js.map
