<template>
  <el-row class="main">
    <el-col :span="3" class="el-left">
      <div class="manage-personal">
        <div class="personal-logo">
          <img :src="shopInfo.imglogo" alt="">
        </div>
        <div class="personal-information">
          <div class="personal-name">
            {{shopInfo.username}}
          </div>
          <div class="authentication">
            <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visible2">
              <p>您的店铺{{verification === '已认证' ? '已认证' : '尚未认证'}}</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" v-if="verification === '已认证'" size="mini" @click="dianpuxinxi">查看资料</el-button>
                <el-button type="primary" v-if="verification === '未认证'" size="mini" @click="renzheng">去认证</el-button>
              </div>
            </el-popover>
            <span v-popover:popover5 class="verification" style="outline: none;cursor: pointer;" :style="verification === '已认证' ? 'background-color: #f85;' : 'background-color: #ccc;'">{{verification}}</span>
            <span class="restaurant">{{ shopType }}</span>
          </div>
        </div>
      </div>
      <el-menu mode="vertical" default-active="1" class="menu" :router="true">
        <el-menu-item index="/manage/worker">
          <i class="shop-worker"></i>
          工作台
        </el-menu-item>
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
        <el-menu-item index="/manage/chajian">
          <i class="application-plug-in"></i>
          应用插件
        </el-menu-item>
        <!-- <el-menu-item index="/manage/yindao">
          <i class="application-person"></i>
          功能指引
        </el-menu-item> -->
      </el-menu>
      <div class="acccount">
        <div class="userinfo">
          <div class="userinfo-avatar"></div>
          <div class="userinfo-phone">{{userInfo.mobile}}</div>
        </div>
        <div class="personal-center">
          <div class="userinfo-pop-hd">
            <div>{{userInfo.nickname}}</div>
            <div>{{userInfo.mobile}}</div>
          </div>
          <router-link class="userinfo-pop-bd" to="/account/personal" tag="div">账号设置</router-link>
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
      shopType: '豆点餐饮',
      verification: '',
      // yindaoCode: 0,
      visible2: false,
      shopId: '',
      shopStatusCode: 1,
      shopInfo: {
        username: '',
        imglogo: ''
      },
      userInfo: {
        nickname: '',
        mobile: ''
      }
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.userId = localStorage.getItem('user_id')
    this.shopInfoLoad()
    // 获取店铺状态
    axios.get('https://cdn.wangdoukeji.com/index.php/seller/shop/getIndexStatus?shop_id=' + localStorage.getItem('shop_id')).then((res) => {
      if (res.data.data.shop_auth_status === 1) {
        this.verification = '已认证'
        this.shopStatusCode = 1
      } else {
        this.verification = '未认证'
        this.shopStatusCode = 0
      }
    })
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
            imglogo: url + res.data.shop[0].path.replace(/\\/, '')
          }
          // 店铺类型 默认是餐饮
          // type5是礼品和鲜花所以不同
          localStorage.setItem('shopType', res.data.shop[0].main_business)
          if (res.data.shop[0].main_business === 5) {
            this.shopType = '鲜花礼品'
          }
        }
      })
      // 个人信息
      axios.post('/seller/User/userInfo?user_id=' + this.userId).then((res) => {
        if (res.data.error) {
          this.$message({
            type: 'error',
            message: res.data.error.msg
          })
        } else {
          console.log(res)
          this.userInfo = {
            nickname: res.data.nickname,
            mobile: res.data.mobile
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
    },
    renzheng () {
      this.visible2 = false
      this.$router.push({path: '/manage/renzheng'})
    },
    dianpuxinxi () {
      this.visible2 = false
      this.$router.push({path: '/manage/shopManage'})
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
  .menu > li {
    border-bottom: 1px solid #eee;
  }
  .el-menu {
    border-right: none;
  }
  .el-left {
    position: fixed;
    width: 180px;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid #eee;
  }
  .content {
    padding-left: 185px;
  }
  /*个人信息*/
  .manage-personal{
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
  .shop-worker {
    background: url("../static/icon.png") 0 0 no-repeat;
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
  .application-person{background: url("../static/icon.png") 0 -96px no-repeat;}
  .application-plug {
    background: url("../static/icon.png") 0 -144px no-repeat;
  }
  .chajian {
    background: url("../static/icon.png") 0 -192px no-repeat;
  }
  /*用户信息*/
  .userinfo {
    position: fixed;
    padding: 16px 0;
    border-top: 1px solid #eee;
    margin: 0 15px;
    bottom: 0;
    width: 150px;
    background: #fff;
    cursor: pointer;
    box-sizing: border-box;
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
    background: #fdaa60;
    color: #fff;
  }
  .userinfo-pop-ft:hover {
    background: #fdaa60;
    color: #fff;
  }
</style>
