import { observe } from './index'

// 数据劫持
export function defineReactive(data, key, value) {
  // 深度递归劫持对象
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if(value === newValue) return;
      value = newValue;
    }
  })
}

class Observer {
  constructor(data) {
    this.walk(data);
  }

  // 循环遍历进行数据劫持
  walk(data) {
    let keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}

export default Observer;
