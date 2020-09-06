import { pushTarget, popTarget } from './dep';
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
    this.deps = [];
    this.depId = new Set();
    this.get();
  }

  get() {
    console.log('触发 watch get');
    pushTarget(this);
    this.getter();
    popTarget();
  }

  update() {
    console.log('watch update');
    this.get();
  }

  // 实现与dep进行关联
  addDep(dep) {
    let id = dep.id;
    if(!this.depId.has(id)) {
      this.depId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}

export default Watcher;
