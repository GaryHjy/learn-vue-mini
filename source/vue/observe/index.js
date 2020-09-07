import Observer from './observer';
import Watcher from './watcher';
import Dep from './dep';

export function initState(vm) {
  let opts = vm.$options;
  if(opts.data) {
    initData(vm);
  }

  if(opts.computed) {
    initComputed(vm, opts.computed);
  }
  
  if(opts.watch) {
    initWatch(vm);
  }
}

// 劫持
export function observe (data) {
  if(typeof data !== 'object' || data === null) {
    return
  }
  if(data.__ob__) {
    return data.__ob__;
  }
  return new Observer(data);
}

// 实例代理 -> vm.xxx => vm._data.xxx
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    }
  })
}

// 初始化data数据
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

  for (let key in data) {
    proxy(vm, '_data', key)
  }

  observe(vm._data);
}

function createComputedGetter (vm, key) {
  let watcher = vm._watchersComputed[key];
  return function () {
    if(watcher) {
      if(watcher.dirty) {
        watcher.evaluate();
      }
      if(Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  }
}

function initComputed (vm, computed) {
  // 计算属性配置挂载vm上
  let watchers = vm._watchersComputed = Object.create(null);
  for(let key in computed) {
    let userDef = computed[key];
    watchers[key] = new Watcher(vm, userDef, () => {}, { lazy: true });
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    })
  }
}

function createWatcher (vm, key, handler, opts) {
  return vm.$watch(key, handler, opts);
}

function initWatch (vm) {
  let watch = vm.$options.watch;
  for(let key in watch) {
    let userDef = watch[key];
    let handler = userDef;
    if(userDef.handler) {
      handler = userDef.handler;
    }
    createWatcher(vm, key, handler, { immediate: userDef.immediate });
  }
}
