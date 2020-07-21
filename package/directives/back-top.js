import _ from 'lodash';
import { domScrollHandler } from '../utils';
import BackTopComponent from '../components/back-top/back-top.vue';
import Vue from 'vue';
import { listener } from '../utils';

/**
 * @params
 * {
 *   global  Boolean 是否挂载body上
 *   config: {   配置对象  
 *     right,  //默认40px
 *     bottom //默认40px
 *   },
 *   components: 使用自定义组件
 * }
 */

const document = window.document;

const NAME_SPACE = 'back-top';
const CONTAINER_ID = 'vdc-back-top';

const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;

let container = null;
let btInstance = null;
let timer = null;
let sign = null;
const animationTime = 200;

const defaultEnterClass = 'zdc__fade-enter-active';
const defaultLeaveClass = 'zdc__fade-leave-active';


const createBackTopLayout = function (el, global, config) {  //create layout container
  const { bottom = 40, right = 40 } = config;
  const container = document.createElement('div');
  const box = document.createElement('div');
  container.style.position = global ? 'fixed' : 'absolute';
  container.style.bottom = bottom + 'px';
  container.style.right = right + 'px';
  container.style.cursor = 'pointer';
  box.setAttribute('id', CONTAINER_ID);
  container.addEventListener('click', e => {
    clickHandler(el);
  })
  container.appendChild(box);
  return container;
}

const scrollHandler = function (el, scrollTop, infos, dirConfig, gobal) { // onscroll handler
  const { component = null, config = {} } = dirConfig || {};
  const backTopConstructor = Vue.extend(component ? component : BackTopComponent);
  if (config.fromTop && isNaN(config.fromTop)) {
    throw new Error('config fromTop should be typeof Number!');
  }
  if (scrollTop >= (parseInt(config.fromTop) || 300)) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      resetContainer(el);
    }
    if (container && btInstance) return;
    const { windowHeight, childsHeight } = infos;
    container = createBackTopLayout(el, global, config);
    btInstance = new backTopConstructor();
    btInstance.$mount();
    container.append(btInstance.$el);
    container.classList.add(defaultEnterClass);
    el.appendChild(container);
    setTimeout(() => {
      container.classList.remove(defaultEnterClass);
    }, animationTime);
  } else if (scrollTop < 100 && container && btInstance && !timer) {
    clear(el);
  }
}

const clear = function (el) { // remove container + layout
  if (timer) return;
  container.classList.add(defaultLeaveClass);
  timer = setTimeout(() => {
    container.classList.remove(defaultLeaveClass);
    resetContainer(el);
    timer = null;
  }, animationTime);
}

const resetContainer = function (el) {  // remove container
  btInstance.$destroy();
  el.removeChild(container);
  btInstance = null;
  container = null;
}

const clickHandler = function (el) {
  const beginTime = Date.now();
  const beginValue = el.scrollTop;
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
      rAF(frameFunc);
    } else {
      el.scrollTop = 0;
    }
  };
  rAF(frameFunc);
}


const bind = (el, binding, vnode) => {
  const { debounce = false, global = false } = binding.modifiers;
  const element = global ? document.body : el;
  let onscroll = function () {
    const infos = domScrollHandler.call(this);
    scrollHandler(this, infos.scrollTop, infos, binding.value, global);
  };
  onscroll = debounce ? _.debounce(onscroll, 50) : onscroll;
  sign = listener.on(element, 'scroll', onscroll);
}

const unbind = (el) => {
  if (sign) {
    listener.remove(el, 'scroll', sign);
    listener.remove(document.body, 'scroll', sign);
  }
  sign = null;
}


export default {
  NAME_SPACE,
  bind,
  unbind
}