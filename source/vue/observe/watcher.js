import { pushTarget, popTarget } from './dep';
import { util } from '../util';
import { queueWatcher } from './nextTick';
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
    if(typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = function() {
        return util.getValue(vm, expOrFn);
      }
    }
    if(opts.user) {
      this.user = true;
    }
    this.lazy = opts.lazy;
    this.dirty = this.lazy;
    this.cb = cb;
    this.opts = opts;
    this.immediate = opts.immediate;
    this.id = id++;
    this.deps = [];
    this.depsId = new Set();
    this.value = this.lazy ? undefined : this.get();
    if(this.immediate) {
      this.cb(this.value);
    }
  }

  get() {
    pushTarget(this);
    let value = this.getter.call(this.vm);
    popTarget();
    return value;
  }

  update() {
    if(this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }

  // 实现与dep进行关联
  addDep(dep) {
    let id = dep.id;
    if(!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  run() {
    let value = this.get();
    if(this.value !== value) {
      this.cb(value, this.value);
    }
  }

  depend() {
    let i = this.deps.length;
    while(i--) {
      this.deps[i].depend();
    }
  }

  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
}

export default Watcher;
