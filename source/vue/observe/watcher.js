let id = 0;

class Watcher {
  /**
   * 
   * @param {*} vm 当前组件的实例
   * @param {*} exprOrFn 表达式或者函数
   * @param {*} cb 回调函数
   * @param {*} opts 参数
   */
  constructor(vm, expOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    }
    this.cb = cb;
    this.opts = opts;
    this.id = id++;
    this.getter();
  }

  get() {
    this.getter();
  }
}

export default Watcher;
