import { observe } from "./index";

const oldArrayProtoMethods = Array.prototype;

// 创建一个新的
export let arrayMethods = Object.create(oldArrayProtoMethods);

const methods = [
  'push',
  'shift',
  'pop',
  'unshift',
  'reverse',
  'sort',
  'splice',
]

// 数组元素添加响应式
export function observerArray(inserted) {
  for(let i = 0; i < inserted.length; i++) {
    observe(inserted[i]);
  }
}

// 对数组的方法进行重写
methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    let r = oldArrayProtoMethods[method].apply(this, args);
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if(inserted) observerArray(inserted);
    return r;
  }
})
