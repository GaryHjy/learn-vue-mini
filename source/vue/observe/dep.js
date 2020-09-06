let id = 0;

class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }

  // 订阅
  addSub(watcher) {
    console.log('dep addSub');
    this.subs.push(watcher);
  }

  // 发布
  notify() {
    console.log('dep notify', this.subs);
    this.subs.forEach(watcher => watcher.update());
  }

  depend() {
    if(Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

let stack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;
