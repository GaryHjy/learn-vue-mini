import { observe } from './index'

export function defineReactive(data, key, value) {
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
