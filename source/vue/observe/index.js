import Observer from './observer';

export function initState(vm) {
  let opts = vm.$options;
  if(opts.data) {
    initData(vm);
  }

  if(opts.computed) {
    initComputed();
  }
  
  if(opts.watch) {
    initWatch();
  }
}

// 劫持
export function observe (data) {
  if(typeof data !== 'object' || data === null) {
    return
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

function initComputed () {

}

function initWatch () {

}
