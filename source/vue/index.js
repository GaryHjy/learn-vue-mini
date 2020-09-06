import { initState } from './observe/index';
import Watcher from './observe/watcher';
import { compiler } from './util';

function Vue(options) {
  this._init(options);
}

// 初始化
Vue.prototype._init = function(options) {
  let vm = this;
  vm.$options = options;

  initState(vm); // 初始化数据 data computed watch


  // 初始化
  if(vm.$options.el) {
    vm.$mount();
  }
}

function query(el) {
  if(typeof el === 'string') {
    return document.querySelector(el);
  }
  return el;
}

Vue.prototype._update = function() {
  let vm = this;
  let el = vm.$el;
  
  // 循环内容
  let node = document.createDocumentFragment();
  let firstChild;
  while(firstChild = el.firstChild) {
    node.appendChild(firstChild)
  }
  compiler(node, vm);
  el.appendChild(node);
}

Vue.prototype.$mount = function() {
  let vm = this;
  let el = vm.$options.el;
  el = vm.$el = query(el);

  // 更新组件，渲染
  let updateComponent = () => {
    vm._update();
  }

  new Watcher(vm, updateComponent); // 渲染函数
}

Vue.prototype.$watch = function(expr, handler) {
  let vm = this;
  new Watcher(vm, expr, handler, { user: true });
}

export default Vue;