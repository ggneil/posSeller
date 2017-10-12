<template>
  <div>
    <el-row class="head">
      <el-col :span="24" class="head-content">
        <i class="el-icon-menu"></i>
      </el-col>
    </el-row>
    <el-row class="main">
      <el-col :span="4">
        <el-menu mode="vertical" default-active="1" class="menu">
          <el-menu-item-group title="分组一">
            <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-message"></i>导航二</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组二">
            <el-menu-item index="3"><i class="el-icon-message"></i>导航三</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-message"></i>导航四</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组三">
            <el-menu-item index="3"><i class="el-icon-message"></i>导航五</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-message"></i>导航六</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
      <el-col :span="20" :offset="0" class="content">
        <nuxt/>
      </el-col>
    </el-row>
  </div>
</template>

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
    background: #ffffff;
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
  .main {
    margin-top: 56px;
  }
  .main .menu {
    background: #f5f5f5;
  }
  .el-menu {
    border-right: none;
  }
</style>
