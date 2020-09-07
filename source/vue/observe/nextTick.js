let has = {};
let queue = [];

function flushQueue() {
  queue.forEach(watcher => watcher.run());
}

export function queueWatcher(watcher) {
  let id = watcher.id;
  if(!has[id]) {
    has[id] = true;
    queue.push(watcher);
    nextTick(flushQueue);
  }
}

let callbacks = [];
function flushCallbacks() {
  callbacks.forEach(cb => cb());
}
function nextTick(cb) {
  callbacks.push(cb);

  let timerFunc = () => {
    flushCallbacks();
  }

  if(Promise) {
    Promise.resolve().then(timerFunc);
    return;
  }
  if(MutationObserver) {
    let observe = new MutationObserver(timerFunc);
    let textNode = document.createTextNode(1);
    observe.observe(textNode, { characterData: true });
    textNode.textContent = 2;
    return;
  }
  if(setImmediate) {
    setImmediate(timerFunc);
    return;
  }
  if(setTimeout) {
    setTimeout(timerFunc, 0)
    return;
  }
}