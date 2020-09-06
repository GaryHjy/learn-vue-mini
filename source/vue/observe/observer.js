import { observe } from './index'
import { arrayMethods, observerArray } from './array';
import Dep from './dep';

// 数据劫持
export function defineReactive(data, key, value) {
  // 深度递归劫持对象
  observe(value);
  let dep = new Dep;
  Object.defineProperty(data, key, {
    get() {
      console.log('获取数据', data, key);
      // 依赖收集
      if(Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newValue) {
      if(value === newValue) return;
      console.log('更新数据');
      observe(newValue); // 新增的值可能为对象
      value = newValue;
      // 触发发布
      dep.notify();
    }
  })
}

class Observer {
  constructor(data) {
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      observerArray(data);
    } else {
      this.walk(data);
    }
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
