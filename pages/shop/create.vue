<template>
  <div>{{count}}</div>
</template>

<script>
  export default {
    middleware: 'auth',
    data () {
      return {
        count: 0
      }
    },
    mounted: function () {
      this.increment()
    },
    methods: {
      increment () {
        this.count++
      }
    }
  }
</script>
