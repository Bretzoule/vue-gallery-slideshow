(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueGallerySlideshow = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    props: {
      images: {
        type: Array,
        required: true
      },
      index: {
        type: Number,
        required: false,
        "default": null
      }
    },
    data: function data() {
      return {
        imgIndex: this.index,
        image: null,
        galleryXPos: 0,
        thumbnailWidth: 120
      };
    },
    computed: {
      imageUrl: function imageUrl() {
        var img = this.images[this.imgIndex];

        if (typeof img === "string") {
          return img;
        }

        return img.url;
      },
      alt: function alt() {
        var img = this.images[this.imgIndex];

        if (_typeof(img) === "object") {
          return img.alt;
        }

        return "";
      },
      desc: function desc() {
        var img = this.images[this.imgIndex];

        if (_typeof(img) === "object") {
          return img.alt;
        }

        return "";
      },
      isMultiple: function isMultiple() {
        return this.images.length > 1;
      }
    },
    watch: {
      index: function index(val, prev) {
        var _this = this;

        this.imgIndex = val; // updateThumbails when popup

        if (prev == null && val != null) {
          this.$nextTick(function () {
            _this.updateThumbails();
          });
        }
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      window.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
          _this2.onPrev();
        } else if (e.key === "ArrowRight") {
          _this2.onNext();
        } else if (e.key === "Escape") {
          _this2.close();
        }
      });
    },
    methods: {
      close: function close() {
        var eventData = {
          imgIndex: this.imgIndex
        };
        this.imgIndex = null;
        this.$emit("close", eventData);
      },
      onPrev: function onPrev() {
        if (this.imgIndex === null) return;

        if (this.imgIndex > 0) {
          this.imgIndex--;
        } else {
          this.imgIndex = this.images.length - 1;
        }

        this.updateThumbails();
      },
      onNext: function onNext() {
        if (this.imgIndex === null) return;

        if (this.imgIndex < this.images.length - 1) {
          this.imgIndex++;
        } else {
          this.imgIndex = 0;
        }

        this.updateThumbails();
      },
      onClickThumb: function onClickThumb(index) {
        this.imgIndex = index;
        this.updateThumbails();
      },
      updateThumbails: function updateThumbails() {
        if (!this.$refs.gallery) {
          return;
        }

        var galleryWidth = this.$refs.gallery.clientWidth;
        var currThumbsWidth = this.imgIndex * this.thumbnailWidth;
        var maxThumbsWidth = this.images.length * this.thumbnailWidth;
        var centerPos = Math.floor(galleryWidth / (this.thumbnailWidth * 2)) * this.thumbnailWidth; // Prevent scrolling of images if not needed

        if (maxThumbsWidth < galleryWidth) {
          return;
        }

        if (currThumbsWidth < centerPos) {
          this.galleryXPos = 0;
        } else if (currThumbsWidth > this.images.length * this.thumbnailWidth - galleryWidth + centerPos) {
          this.galleryXPos = -(this.images.length * this.thumbnailWidth - galleryWidth - 20);
        } else {
          this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "modal" } }, [
      _vm.imgIndex !== null
        ? _c("div", { staticClass: "vgs", on: { click: _vm.close } }, [
            _c(
              "button",
              {
                staticClass: "vgs__close",
                attrs: { type: "button" },
                on: { click: _vm.close },
              },
              [_vm._v("×")]
            ),
            _vm._v(" "),
            _vm.isMultiple
              ? _c(
                  "button",
                  {
                    staticClass: "vgs__prev",
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation();
                        return _vm.onPrev.apply(null, arguments)
                      },
                    },
                  },
                  [_vm._v("\n      ‹\n    ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.images
              ? _c(
                  "div",
                  {
                    staticClass: "vgs__container",
                    on: {
                      click: function ($event) {
                        $event.stopPropagation();
                        return _vm.onNext.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _c("img", {
                      staticClass: "vgs__container__img",
                      attrs: { src: _vm.imageUrl, alt: _vm.alt },
                      on: {
                        click: function ($event) {
                          $event.stopPropagation();
                          return _vm.onNext.apply(null, arguments)
                        },
                      },
                    }),
                    _vm._v(" "),
                    _vm._t("default"),
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.isMultiple
              ? _c(
                  "button",
                  {
                    staticClass: "vgs__next",
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation();
                        return _vm.onNext.apply(null, arguments)
                      },
                    },
                  },
                  [_vm._v("\n      ›\n    ")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.isMultiple
              ? _c("div", { ref: "gallery", staticClass: "vgs__gallery" }, [
                  _vm.images
                    ? _c("div", { staticClass: "vgs__gallery__title" }, [
                        _c("div", [_vm._v(_vm._s(_vm.desc))]),
                        _vm._v(
                          "\n        " +
                            _vm._s(_vm.imgIndex + 1) +
                            " / " +
                            _vm._s(_vm.images.length) +
                            "\n      "
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.images
                    ? _c(
                        "div",
                        {
                          staticClass: "vgs__gallery__container",
                          style: {
                            transform: "translate(" + _vm.galleryXPos + "px, 0)",
                          },
                        },
                        _vm._l(_vm.images, function (img, i) {
                          return _c("img", {
                            key: i,
                            staticClass: "vgs__gallery__container__img",
                            class: {
                              "vgs__gallery__container__img--active":
                                i === _vm.imgIndex,
                            },
                            attrs: {
                              src: typeof img === "string" ? img : img.url,
                              alt: typeof img === "string" ? "" : img.alt,
                            },
                            on: {
                              click: function ($event) {
                                $event.stopPropagation();
                                return _vm.onClickThumb(i)
                              },
                            },
                          })
                        }),
                        0
                      )
                    : _vm._e(),
                ])
              : _vm._e(),
          ])
        : _vm._e(),
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-96337492_0", { source: ".vgs {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  display: table;\n}\n.vgs__close {\n  color: #fff;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: transparent;\n  border: none;\n  font-size: 25px;\n  width: 50px;\n  height: 50px;\n  cursor: pointer;\n  z-index: 999;\n}\n.vgs__close:focus {\n  outline: 0;\n}\n.vgs__prev, .vgs__next {\n  position: absolute;\n  top: 50%;\n  margin-top: -25px;\n  width: 50px;\n  height: 50px;\n  z-index: 999;\n  cursor: pointer;\n  font-size: 40px;\n  color: #fff;\n  background-color: transparent;\n  border: none;\n}\n.vgs__prev:focus, .vgs__next:focus {\n  outline: 0;\n}\n.vgs__prev {\n  left: 0;\n}\n.vgs__next {\n  right: 0;\n}\n.vgs__container {\n  position: absolute;\n  overflow: hidden;\n  cursor: pointer;\n  overflow: hidden;\n  max-width: 100vh;\n  margin: 0.5rem auto 0;\n  left: 0.5rem;\n  right: 0.5rem;\n  height: 60vh;\n  border-radius: 12px;\n  background-color: #000;\n}\n@media (max-width: 767px) {\n.vgs__container {\n    width: 100%;\n    max-width: 100%;\n    top: 50%;\n    margin-top: -140px;\n    left: 0;\n    right: 0;\n    border-radius: 0;\n    height: 280px;\n}\n}\n.vgs__container__img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.vgs__gallery {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem;\n}\n@media (max-width: 767px) {\n.vgs__gallery {\n    display: none;\n}\n}\n.vgs__gallery__title {\n  color: #fff;\n  margin-bottom: 0.5rem;\n}\n.vgs__gallery__container {\n  overflow: visible;\n  display: block;\n  height: 100px;\n  white-space: nowrap;\n  transition: all 200ms ease-in-out;\n  width: 100%;\n}\n.vgs__gallery__container__img {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  display: inline-block;\n  float: none;\n  margin-right: 20px;\n  cursor: pointer;\n  opacity: 0.6;\n  border-radius: 8px;\n}\n.vgs__gallery__container__img--active {\n  width: 100px;\n  display: inline-block;\n  float: none;\n  opacity: 1;\n}\n.modal-enter {\n  opacity: 0;\n}\n.modal-leave-active {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=GallerySlideshow.vue.map */", map: {"version":3,"sources":["F:\\Documents\\Dev\\vue-gallery-slideshow\\src\\component\\GallerySlideshow.vue","GallerySlideshow.vue"],"names":[],"mappings":"AAmPA;EAhBA,6BAAA;EACA,eAAA;EACA,aAAA;EAKA,MAAA;EACA,OAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;EACA,oCA/CA;EAgDA,cAAA;ACrOA;AD0OA;EACA,WAAA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,6BAAA;EACA,YAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,eAAA;EACA,YAAA;ACxOA;ADyOA;EACA,UAAA;ACvOA;AD0OA;EAEA,kBAAA;EACA,QAAA;EACA,iBAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,eAAA;EACA,WAAA;EACA,6BAAA;EACA,YAAA;ACzOA;AD0OA;EACA,UAAA;ACxOA;AD2OA;EACA,OAAA;ACzOA;AD2OA;EACA,QAAA;ACzOA;AD2OA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,qBAAA;EACA,YAAA;EACA,aAAA;EACA,YAAA;EACA,mBAlGA;EAmGA,sBAtGA;ACnIA;ADkJA;AA4EA;IAaA,WAAA;IACA,eAAA;IACA,QAAA;IACA,kBAAA;IACA,OAAA;IACA,QAAA;IACA,gBAAA;IACA,aAAA;ACvOE;AACF;ADyOA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;ACvOA;AD4OA;EAIA,kBAAA;EACA,kBAAA;EACA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;AC5OA;ADqHA;AA2GA;IAEA,aAAA;AC9NE;AACF;ADwOA;EACA,WAvIA;EAwIA,qBAAA;ACtOA;ADwOA;EACA,iBAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,iCAAA;EACA,WAAA;ACtOA;ADuOA;EACA,YAAA;EACA,aAAA;EACA,iBAAA;EACA,qBAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,YAAA;EACA,kBAzJA;AC5EA;ADuOA;EACA,YAAA;EACA,qBAAA;EACA,WAAA;EACA,UAAA;ACrOA;AD0OA;EACA,UAAA;ACvOA;AD0OA;EACA,UAAA;ACvOA;;AAEA,+CAA+C","file":"GallerySlideshow.vue","sourcesContent":["<template>\n  <transition name=\"modal\">\n    <div v-if=\"imgIndex !== null\" class=\"vgs\" @click=\"close\">\n      <button type=\"button\" class=\"vgs__close\" @click=\"close\">&times;</button>\n      <button\n        v-if=\"isMultiple\"\n        type=\"button\"\n        class=\"vgs__prev\"\n        @click.stop=\"onPrev\"\n      >\n        &lsaquo;\n      </button>\n      <div v-if=\"images\" class=\"vgs__container\" @click.stop=\"onNext\">\n        <img\n          class=\"vgs__container__img\"\n          :src=\"imageUrl\"\n          :alt=\"alt\"\n          @click.stop=\"onNext\"\n        />\n        <slot></slot>\n      </div>\n      <button\n        v-if=\"isMultiple\"\n        type=\"button\"\n        class=\"vgs__next\"\n        @click.stop=\"onNext\"\n      >\n        &rsaquo;\n      </button>\n      <div v-if=\"isMultiple\" ref=\"gallery\" class=\"vgs__gallery\">\n        <div v-if=\"images\" class=\"vgs__gallery__title\">\n          <div>{{ desc }}</div>\n          {{ imgIndex + 1 }} / {{ images.length }}\n        </div>\n        <div\n          v-if=\"images\"\n          class=\"vgs__gallery__container\"\n          :style=\"{ transform: 'translate(' + galleryXPos + 'px, 0)' }\"\n        >\n          <img\n            v-for=\"(img, i) in images\"\n            :key=\"i\"\n            class=\"vgs__gallery__container__img\"\n            :src=\"typeof img === 'string' ? img : img.url\"\n            :class=\"{ 'vgs__gallery__container__img--active': i === imgIndex }\"\n            :alt=\"typeof img === 'string' ? '' : img.alt\"\n            @click.stop=\"onClickThumb(i)\"\n          />\n        </div>\n      </div>\n    </div>\n  </transition>\n</template>\n\n<script>\nexport default {\n  props: {\n    images: {\n      type: Array,\n      required: true,\n    },\n    index: {\n      type: Number,\n      required: false,\n      default: null,\n    },\n  },\n  data() {\n    return {\n      imgIndex: this.index,\n      image: null,\n      galleryXPos: 0,\n      thumbnailWidth: 120,\n    };\n  },\n  computed: {\n    imageUrl() {\n      const img = this.images[this.imgIndex];\n      if (typeof img === \"string\") {\n        return img;\n      }\n      return img.url;\n    },\n    alt() {\n      const img = this.images[this.imgIndex];\n      if (typeof img === \"object\") {\n        return img.alt;\n      }\n\n      return \"\";\n    },\n    desc() {\n      const img = this.images[this.imgIndex];\n      if (typeof img === \"object\") {\n        return img.alt;\n      }\n      return \"\";\n    },\n    isMultiple() {\n      return this.images.length > 1;\n    },\n  },\n  watch: {\n    index(val, prev) {\n      this.imgIndex = val;\n\n      // updateThumbails when popup\n      if (prev == null && val != null) {\n        this.$nextTick(() => {\n          this.updateThumbails();\n        });\n      }\n    },\n  },\n  mounted() {\n    window.addEventListener(\"keydown\", (e) => {\n      if (e.key === \"ArrowLeft\") {\n        this.onPrev();\n      } else if (e.key === \"ArrowRight\") {\n        this.onNext();\n      } else if (e.key === \"Escape\") {\n        this.close();\n      }\n    });\n  },\n  methods: {\n    close() {\n      const eventData = {\n        imgIndex: this.imgIndex,\n      };\n      this.imgIndex = null;\n      this.$emit(\"close\", eventData);\n    },\n    onPrev() {\n      if (this.imgIndex === null) return;\n      if (this.imgIndex > 0) {\n        this.imgIndex--;\n      } else {\n        this.imgIndex = this.images.length - 1;\n      }\n      this.updateThumbails();\n    },\n    onNext() {\n      if (this.imgIndex === null) return;\n      if (this.imgIndex < this.images.length - 1) {\n        this.imgIndex++;\n      } else {\n        this.imgIndex = 0;\n      }\n      this.updateThumbails();\n    },\n    onClickThumb(index) {\n      this.imgIndex = index;\n      this.updateThumbails();\n    },\n    updateThumbails() {\n      if (!this.$refs.gallery) {\n        return;\n      }\n\n      const galleryWidth = this.$refs.gallery.clientWidth;\n      const currThumbsWidth = this.imgIndex * this.thumbnailWidth;\n      const maxThumbsWidth = this.images.length * this.thumbnailWidth;\n      const centerPos =\n        Math.floor(galleryWidth / (this.thumbnailWidth * 2)) *\n        this.thumbnailWidth;\n\n      // Prevent scrolling of images if not needed\n      if (maxThumbsWidth < galleryWidth) {\n        return;\n      }\n\n      if (currThumbsWidth < centerPos) {\n        this.galleryXPos = 0;\n      } else if (\n        currThumbsWidth >\n        this.images.length * this.thumbnailWidth - galleryWidth + centerPos\n      ) {\n        this.galleryXPos = -(\n          this.images.length * this.thumbnailWidth -\n          galleryWidth -\n          20\n        );\n      } else {\n        this.galleryXPos = -(this.imgIndex * this.thumbnailWidth) + centerPos;\n      }\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\">\n$black-alpha-80: rgba(0, 0, 0, 0.8);\n$black: #000;\n$white: #fff;\n$radius-medium: 8px;\n$radius-large: 12px;\n// Breakpoints\n$screen-xs: 480px;\n$screen-sm: 768px;\n$screen-md: 992px;\n$screen-lg: 1200px;\n// So media queries don't overlap when required, provide a maximum\n$screen-xs-max: ($screen-sm - 1);\n$screen-sm-max: ($screen-md - 1);\n$screen-md-max: ($screen-lg - 1);\n@mixin respond-to($media) {\n  @if $media==xs {\n    @media (max-width: $screen-xs-max) {\n      @content;\n    }\n  } @else if $media==sm {\n    @media (min-width: $screen-sm) and (max-width: $screen-sm-max) {\n      @content;\n    }\n  } @else if $media==md {\n    @media (min-width: $screen-md) and (max-width: $screen-md-max) {\n      @content;\n    }\n  } @else if $media==lg {\n    @media (min-width: $screen-lg) {\n      @content;\n    }\n  }\n}\n\n@mixin modal-base() {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n}\n\n@mixin modal-mask() {\n  @include modal-base();\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: $black-alpha-80;\n  display: table;\n}\n\n.vgs {\n  @include modal-mask();\n  &__close {\n    color: #fff;\n    position: absolute;\n    top: 0;\n    right: 0;\n    background-color: transparent;\n    border: none;\n    font-size: 25px;\n    width: 50px;\n    height: 50px;\n    cursor: pointer;\n    z-index: 999;\n    &:focus {\n      outline: 0;\n    }\n  }\n  &__prev,\n  &__next {\n    position: absolute;\n    top: 50%;\n    margin-top: -25px;\n    width: 50px;\n    height: 50px;\n    z-index: 999;\n    cursor: pointer;\n    font-size: 40px;\n    color: #fff;\n    background-color: transparent;\n    border: none;\n    &:focus {\n      outline: 0;\n    }\n  }\n  &__prev {\n    left: 0;\n  }\n  &__next {\n    right: 0;\n  }\n  &__container {\n    position: absolute;\n    overflow: hidden;\n    cursor: pointer;\n    overflow: hidden;\n    max-width: 100vh;\n    margin: 0.5rem auto 0;\n    left: 0.5rem;\n    right: 0.5rem;\n    height: 60vh;\n    border-radius: $radius-large;\n    background-color: $black;\n    @include respond-to(xs) {\n      width: 100%;\n      max-width: 100%;\n      top: 50%;\n      margin-top: -140px;\n      left: 0;\n      right: 0;\n      border-radius: 0;\n      height: 280px;\n    }\n\n    &__img {\n      width: 100%;\n      height: 100%;\n      object-fit: contain;\n    }\n  }\n}\n\n.vgs__gallery {\n  @include respond-to(xs) {\n    display: none;\n  }\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem;\n  &__title {\n    color: $white;\n    margin-bottom: 0.5rem;\n  }\n  &__container {\n    overflow: visible;\n    display: block;\n    height: 100px;\n    white-space: nowrap;\n    transition: all 200ms ease-in-out;\n    width: 100%;\n    &__img {\n      width: 100px;\n      height: 100px;\n      object-fit: cover;\n      display: inline-block;\n      float: none;\n      margin-right: 20px;\n      cursor: pointer;\n      opacity: 0.6;\n      border-radius: $radius-medium;\n    }\n    &__img--active {\n      width: 100px;\n      display: inline-block;\n      float: none;\n      opacity: 1;\n    }\n  }\n}\n\n.modal-enter {\n  opacity: 0;\n}\n\n.modal-leave-active {\n  opacity: 0;\n}\n</style>\n",".vgs {\n  transition: opacity 0.2s ease;\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  min-height: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.8);\n  display: table;\n}\n.vgs__close {\n  color: #fff;\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: transparent;\n  border: none;\n  font-size: 25px;\n  width: 50px;\n  height: 50px;\n  cursor: pointer;\n  z-index: 999;\n}\n.vgs__close:focus {\n  outline: 0;\n}\n.vgs__prev, .vgs__next {\n  position: absolute;\n  top: 50%;\n  margin-top: -25px;\n  width: 50px;\n  height: 50px;\n  z-index: 999;\n  cursor: pointer;\n  font-size: 40px;\n  color: #fff;\n  background-color: transparent;\n  border: none;\n}\n.vgs__prev:focus, .vgs__next:focus {\n  outline: 0;\n}\n.vgs__prev {\n  left: 0;\n}\n.vgs__next {\n  right: 0;\n}\n.vgs__container {\n  position: absolute;\n  overflow: hidden;\n  cursor: pointer;\n  overflow: hidden;\n  max-width: 100vh;\n  margin: 0.5rem auto 0;\n  left: 0.5rem;\n  right: 0.5rem;\n  height: 60vh;\n  border-radius: 12px;\n  background-color: #000;\n}\n@media (max-width: 767px) {\n  .vgs__container {\n    width: 100%;\n    max-width: 100%;\n    top: 50%;\n    margin-top: -140px;\n    left: 0;\n    right: 0;\n    border-radius: 0;\n    height: 280px;\n  }\n}\n.vgs__container__img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n.vgs__gallery {\n  overflow-x: hidden;\n  overflow-y: hidden;\n  position: absolute;\n  bottom: 10px;\n  margin: auto;\n  max-width: 100vh;\n  white-space: nowrap;\n  left: 0.5rem;\n  right: 0.5rem;\n}\n@media (max-width: 767px) {\n  .vgs__gallery {\n    display: none;\n  }\n}\n.vgs__gallery__title {\n  color: #fff;\n  margin-bottom: 0.5rem;\n}\n.vgs__gallery__container {\n  overflow: visible;\n  display: block;\n  height: 100px;\n  white-space: nowrap;\n  transition: all 200ms ease-in-out;\n  width: 100%;\n}\n.vgs__gallery__container__img {\n  width: 100px;\n  height: 100px;\n  object-fit: cover;\n  display: inline-block;\n  float: none;\n  margin-right: 20px;\n  cursor: pointer;\n  opacity: 0.6;\n  border-radius: 8px;\n}\n.vgs__gallery__container__img--active {\n  width: 100px;\n  display: inline-block;\n  float: none;\n  opacity: 1;\n}\n\n.modal-enter {\n  opacity: 0;\n}\n\n.modal-leave-active {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=GallerySlideshow.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  return __vue_component__;

})));
