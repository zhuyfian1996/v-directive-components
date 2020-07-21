
const isServer = typeof window === 'undefined';
const events = ['scroll', 'click', 'resize', 'mouseenter', 'mouseleave', 'touchstart', 'touchend'];
const noop = () => { };

let uid = 0;

let pending = false;

export const on = function (element, event, handler) {
  if (isServer) return;
  if (!element.__eventCollection__) {
    element.__eventCollection__ = {};
    events.forEach(item => {
      element.__eventCollection__[item] = [];
    });
  }
  const id = ++uid;
  if (!element.__eventCollection__[event]) throw new Error('Unknown event name!');
  element.__eventCollection__[event].push({ id, handler });
  element.addEventListener(event, handler.bind(element));
  return id;
};

export const remove = function (element, event, sign) {
  if (isServer || !element.__eventCollection__ || !element.__eventCollection__[event]) return;
  const idx = element.__eventCollection__[event].findIndex(item => sign === item.id);
  if (idx === -1) return;
  element.removeEventListener(event, element.__eventCollection__[event][idx]);
  element.__eventCollection__[event].splice(idx, 1);
}
