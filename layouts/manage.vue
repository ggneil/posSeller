<template>
  <el-row class="main">
    <el-col :span="3" class="el-left">
      <div class="personal">
        <div class="personal-logo">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508737964800&di=8b52e1cb9ab1e70adb91cdb0b77bc54f&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D6023c0be1c950a7b756046c03fe14eef%2F50da81cb39dbb6fd7e4d7eae0824ab18972b3727.jpg" alt="">
        </div>
        <div class="personal-information">
          <div class="personal-name">
            username
          </div>
          <div class="authentication">
            <span class="verification">未验证</span>
            <span class="restaurant">豆点餐饮</span>
          </div>
        </div>
      </div>
      <el-menu mode="vertical" default-active="1" class="menu" :router="true">
        <el-menu-item index="/manage/goods">
          <i class="shop-administration"></i>
          商品管理
        </el-menu-item>
        <el-menu-item index="/manage/orderManage">
          <i class="order-administration"></i>
          订单管理
        </el-menu-item>
        <el-menu-item index="/manage/dataCenter">
          <i class="data-analysis"></i>
          数据分析
        </el-menu-item>
        <el-menu-item index="/manage/shopManage">
        <i class="store-management"></i>
        店铺管理
        </el-menu-item>
        <el-menu-item index="/manage/shopManage">
          <i class="application-plug-in"></i>
          应用插件
        </el-menu-item>
      </el-menu>
      <div class="acccount">
        <div class="userinfo">
          <div class="userinfo-avatar"></div>
          <div class="userinfo-phone">15666666666</div>
        </div>
        <div class="personal-center">
          <div class="userinfo-pop-hd">
            <div>rootuser</div>
            <div>15666666666</div>
          </div>
          <div class="userinfo-pop-bd">账号设置</div>
          <div class="userinfo-pop-bd">切换店铺</div>
          <div class="userinfo-pop-ft">退出</div>
        </div>
      </div>
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
    border-right: 1px solid #eee;
    border-top: 1px solid #eee;
    padding-left: 5%;
  }
  .el-menu {
    border-right: none;
  }
  .el-col{
    height: 100%;
  }
  .el-left {
    position: fixed;
  }
  .content {
    padding-left: 13%;
  }
  /*个人信息*/
  .personal{
    width: 100%;
    padding: 15px 0 15px 15px;
    box-sizing: border-box;
    overflow: hidden;
    border-right: 1px solid #e6e6e6;
  }
  .personal-logo {
    float: left;
  }
  .personal-logo img {
    width: 40px;
    height: 40px;
  }
  .personal-information {
    float: left;
    padding-left: 10px;
  }
  .personal-name {
    font-weight: 700;
    margin-top: -5px;
    margin-bottom: 10px;
  }
  .authentication {
    font-size: 12px;
    color: #fff;
    line-height: 12px;
  }
  .authentication .verification{
    padding: 1px 3px;
    background-color: #ccc;
  }
  .authentication .restaurant {
    padding: 1px 3px;
    background-color: #ccc;
    margin-left: 5px;
  }
  /*商品管理图标*/
  .menu i{
    display: inline-block;
    width: 24px;
    height: 24px;
    padding-right: 7px;
  }
  .shop-administration {
    background: url("../static/icon.png") 0 -24px no-repeat;
  }
  .order-administration {
    background: url("../static/icon.png") 0 -48px no-repeat;
  }
  .data-analysis {
    background: url("../static/icon.png") 0 -72px no-repeat;
  }
  .store-management {
    background: url("../static/icon.png") 0 -120px no-repeat;
  }
  .application-plug-in {
    background: url("../static/icon.png") 0 -168px no-repeat;
  }
  /*用户信息*/
  .userinfo {
    position: fixed;
    padding: 16px 0;
    border-top: 1px solid #eee;
    margin: 0 15px;
    bottom: 0;
    width: 170px;
    background: #fff;
    cursor: pointer;
  }
  .userinfo-avatar {
    position: absolute;
    top: 16px;
    left: 15px;
    width: 18px;
    height: 18px;
    background: url(../static/userinfo.png) no-repeat 0 -175px;
  }
  .userinfo-phone {
    color: #555;
    font-size: 14px;
    line-height: 18px;
    margin-left: 50px;
  }
  .personal-center {
    width: 145px;
    height: 200px;
    position: fixed;
    bottom: 50px;
    left: 25px;
    border-radius: 2px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    background-color: #fff;
    z-index: 2000;
    font-size: 12px;
    display: none;
  }
  .acccount:hover .personal-center {
    display: block;
  }
  .userinfo-pop-hd {
    padding: 10px 20px;
    line-height: 24px;
    background: #f8f8f8;
    border-radius: 2px 0 0 2px;
  }
  .userinfo-pop-hd div{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .userinfo-pop-bd {
    padding: 5px 20px;
    line-height: 30px;
    color: #666;
    font-size: 12px;
    cursor: pointer;
  }
  .userinfo-pop-ft {
    padding: 10px 20px;
    line-height: 30px;
    color: #666;
    font-size: 12px;
    cursor: pointer;
  }
  .userinfo-pop-bd:hover {
    background: #38f;
    color: #fff;
  }
  .userinfo-pop-ft:hover {
    background: #38f;
    color: #fff;
  }
</style>
