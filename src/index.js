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
      arr: [0, 1, 2]
    }
  },
  computed: {

  },
  watch: {

  },
})

console.log(vm.arr.push(4), vm.arr);
