import Vue from 'Vue';

let vm = new Vue({
  el: "#app",
  data() {
    return {
      name: '小明',
      age: '18',
      sex: '男',
      obj: {
        name: '小红',
        age: 10,
        sex: '女'
      },
      arr: [[0], 1, 2]
    }
  },
  computed: {

  },
  watch: {
    age(value, oldValue) {
      console.log(value, oldValue);
    },
    // age: {
    //   handler(value, oldValue) {
    //     console.log(value, oldValue);
    //   },
    //   immediate: true
    // }
  },
})

setTimeout(() => {
  vm.age = '111';
  // vm.age = 11;
  // vm.name = '小';
  // vm.name = '红';
  // vm.name = 'jjj';
  // vm.arr[0].push(1);
}, 1000);

// console.log(vm.arr.push(4), vm.arr);
