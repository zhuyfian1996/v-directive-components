import backTopDirective from './directives/back-top';
import reachBottomDirective from './directives/reach-bottom';


const directives = [
  backTopDirective,
  reachBottomDirective
];


const install = function (Vue) {
  directives.forEach(item => {
    const namespace = item.NAME_SPACE;
    delete item.NAME_SPACE;
    Vue.directive(namespace, item);
  });
};

export default install;