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
        age: 10
      }
    }
  },
  computed: {

  },
  watch: {

  },
})

console.log(vm);
