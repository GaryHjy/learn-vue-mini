import { initState } from './observe/index';

function Vue(options) {
  this._init(options);
}

// 初始化
Vue.prototype._init = function(options) {
  let vm = this;
  vm.$options = options;

  initState(vm); // 初始化数据
}

export default Vue;