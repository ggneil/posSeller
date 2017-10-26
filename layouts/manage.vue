<template>
  <el-row class="main">
    <el-col :span="3" class="el-left">
      <div class="personal">
        <div class="personal-logo">
          <img :src="shopInfo.imglogo" alt="">
        </div>
        <div class="personal-information">
          <div class="personal-name">
            {{shopInfo.username}}
          </div>
          <div class="authentication">
            <span class="verification">{{verification}}</span>
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
        <el-menu-item index="/manage/youhuiquan">
          <i class="application-plug-in"></i>
          优惠券/积分
        </el-menu-item>
      </el-menu>
      <div class="acccount">
        <div class="userinfo">
          <div class="userinfo-avatar"></div>
          <div class="userinfo-phone">{{shopInfo.mobile}}</div>
        </div>
        <div class="personal-center">
          <div class="userinfo-pop-hd">
            <div>rootuser</div>
            <div>{{shopInfo.mobile}}</div>
          </div>
          <div class="userinfo-pop-bd">账号设置</div>
          <router-link class="userinfo-pop-bd" to="/shop/shopList" tag="div">切换店铺</router-link>
          <div class="userinfo-pop-ft" @click="logout">退出</div>
        </div>
      </div>
    </el-col>
    <el-col :span="24" :offset="0" class="content">
      <nuxt/>
    </el-col>
  </el-row>
</template>

<script>
import axios from '../plugins/axios'

export default {
  data () {
    return {
      verification: '已验证',
      shopId: '',
      shopInfo: {
        username: '',
        imglogo: '',
        mobile: ''
      }
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.shopInfoLoad()
  },
  methods: {
    // 店铺信息加载
    shopInfoLoad () {
      axios.post('/seller/shop/shopDetail?shop_id=' + this.shopId).then((res) => {
        if (res.data.error) {
          this.$message({
            type: 'error',
            message: res.data.error.msg
          })
        } else {
          console.log(res)
          var url = 'http://pos.wangdoukeji.com/'
          this.shopInfo = {
            username: res.data.shop[0].name,
            imglogo: url + res.data.shop[0].path.replace(/\\/, ''),
            mobile: res.data.shop[0].service_mobile
          }
        }
      })
    },
    // 切换店铺
    switching () {
      location.assign('/shop/shopList')
    },
    logout () {
      location.assign('/account/login')
      localStorage.clear()
    }
  }
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
    width: 185px;
  }
  .content {
    padding-left: 185px;
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
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
