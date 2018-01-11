<template>
  <div>
    <el-row>
      <el-col style="padding-bottom: 20px;padding-left: 30px;"><el-button type="primary" size="small">添加分组</el-button><nuxt-link to="/manage/shopManage/"><el-button size="small">桌位管理</el-button></nuxt-link></el-col>
    </el-row>
    <el-row class="zhuotaiContent">
      <el-col v-for="(item, index) in zhuotai" :key="item" class="zhuotai" :span="7" :offset="index % 3 === 0 ? '0' : '1'">
        <p>桌号：</p>
        <p>桌位：</p>
        <p>型号：</p>
        <p>座位：</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        zhuotai: [1, 4, 1, 3]
      }
    },
    methods: {
      // zhuowei () {
      //   this.$router.push({path: 'zhuowei'})
      // }
    }
  }
</script>

<style scoped>
.zhuotai{margin-bottom: 20px;padding: 20px;background: white;box-shadow: 0 10px 16px -10px rgba(0, 0, 0, 0.7);border-radius: 4px;}
.zhuotai p{margin: 5px;}
.zhuotaiContent{background-color: #eee;padding-top: 20px;padding-left: 30px;}
</style>
