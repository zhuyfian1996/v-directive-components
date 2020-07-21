import * as listener from './dom-event-listener';

export const domScrollHandler = function () {
  const windowHeight = this.offsetHeight;
  const childNodes = [...this.childNodes].filter(item => item.nodeType === 1 && item.style.position !== 'fixed');
  let childsHeight = 0;
  childNodes.forEach(item => {
    childsHeight += item.offsetHeight || 0;
  });
  const sub = childsHeight - windowHeight;
  return { windowHeight, childsHeight, sub, scrollTop: this.scrollTop }
}

export {
  listener
}

export default {
  listener,
  domScrollHandler
}

