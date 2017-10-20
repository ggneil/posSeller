<template>
  <el-row class="main">
    <el-col :span="3">
      <el-menu mode="vertical" default-active="1" class="menu" :router="true">
        <el-menu-item index="/manage/goods">商品管理</el-menu-item>
        <el-menu-item index="/manage/orderManage">订单管理</el-menu-item>
        <el-menu-item index="/manage/dataCenter">数据分析</el-menu-item>
        <el-menu-item index="/manage/shopManage">店铺管理</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21" :offset="0" class="content">
      <nuxt/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  // middleware: 'auth'
}
</script>

<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    background-color: #fafafa;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  body {margin: 0}
  .head {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    border-bottom: 1px solid #eee;
  }
  .head-content {
    height: 56px;
    padding: 0 30px;
    display: flex;
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .main .menu {
    text-align: center;
    border-right: 1px solid #eee;
  }
  .el-menu {
    border-right: none;
  }
</style>
