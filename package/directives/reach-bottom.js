import { domScrollHandler } from '../utils';
import { listener } from '../utils';


const document = window.document;

const NAME_SPACE = 'reach-bottom';

const noop = () => { };

let sign = null;


const bind = (el, binding, vnode) => {
  const { global = false } = binding.modifiers;
  const reachBottomHandler = binding.value ? binding.value : noop;
  const element = global ? document.body : el;
  const getScrollInfo = domScrollHandler.bind(element);
  sign = listener.on(element, 'scroll', function () {
    const { sub = 0, scrollTop = 0 } = getScrollInfo();
    if (sub === scrollTop) {
      reachBottomHandler && reachBottomHandler();
    }
  })
}

const unbind = el => {
  if (sign) {
    listener.remove(element, 'scroll', sign);
    listener.remove(body, 'scroll', sign);
  }
  sign = null;
}

export default {
  NAME_SPACE,
  bind,
  unbind
}