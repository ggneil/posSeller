<template>
  <el-row :span="20" class="parent">
    <el-col class="header">
      <router-link to="/">
        <img src="~static/images/logo1.png" class="logo">
      </router-link>
      <router-link to="/" class="button1" tag="div">返回主页</router-link>
      <router-link to="/shop/create" class="button1" tag="div">创建店铺</router-link>
    </el-col>
    <el-col class="smallBox" :span="6" v-for="(o, index) in shopInfo.length" :key="o" :offset="index % 3 == 0 ? 1 : 2">
      <el-card :body-style="{ padding: '0px' }">
        <div style="height:120px;overflow:hidden;">
          <img :src="shopInfo[index].logoUrl" class="image">
        </div>
        <div style="padding: 14px;">
          <span>{{shopInfo[index].name}}</span>
          <div class="bottom clearfix">
            <time class="time">营业状态：{{shopInfo[index].operating}}</time>
            <el-button type="text" @click="open1(shopInfo[index].shopId, shopInfo[index].name)" class="button">进入店铺</el-button>
            <el-button type="text" @click="open2(shopInfo[index].shopId, index)" style="color:red;" class="button">删除</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import axios from '../../plugins/axios'
  var url = 'https://cdn.wangdoukeji.com/'
  export default {
    // middleware: 'auth', // 中间件登陆之后才可以看到
    data () {
      return {
        userId: '',
        shopInfo: [],
        currentDate: new Date()
      }
    },
    beforeMount () {
      this.userId = localStorage.getItem('user_id')
      this.shopInfoLoad()
    },
    methods: {
      // 店铺列表加载
      shopInfoLoad () {
        console.log(this.userId)
        axios.post('/seller/shop/getShopList?user_id=' + this.userId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            if (res.data.shop_list.length === 0) {
              location.assign('/shop/create')
            } else {
              for (var keys in res.data.shop_list) {
                if (res.data.shop_list[keys].status === 1) {
                  this.shopInfo.push({
                    name: res.data.shop_list[keys].name,
                    shopId: res.data.shop_list[keys].shop_id,
                    logoUrl: url + res.data.shop_list[keys].logo.replace(/\\/, ''),
                    operating: '营业中'
                  })
                } else {
                  this.shopInfo.push({
                    name: res.data.shop_list[keys].name,
                    shopId: res.data.shop_list[keys].shop_id,
                    logoUrl: url + res.data.shop_list[keys].logo.replace(/\\/, ''),
                    operating: '已打烊'
                  })
                }
              }
              console.log(this.shopInfo)
            }
          }
        })
      },
      // 进入店铺函数
      open1 (shopId, name) {
        localStorage.setItem('shop_id', shopId)
        localStorage.setItem('shopName', name)
        axios.post('/seller/shop/shopDetail?shop_id=' + shopId).then((res) => {
          localStorage.setItem('phone', res.data.shop[0].service_mobile)
        })
        location.href = '/manage/worker'
      },
      // 删除操作函数
      open2 (shopId, index) {
        this.$confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          alert(shopId)
          axios.post('/seller/shop/deleteShop?shop_id=' + shopId).then((res) => {
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error
              })
            } else {
              this.shopInfo.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style>
  .header2{
    height: 70px;
    padding: 20px 40px;
    background-color: #fc9538;
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, .3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99999;
    width: 100%
  }
  .logo{
    height: 70px;
    padding: 8px;
    margin-top: -20px;
    margin-left: 20px;
  }
  .smallBox{
    margin-top: 20px;
  }
  .parent{
    padding: 80px 20px 20px 20px;
    background-color: white
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    margin-left: 20px;
    float: right;
  }
  .button1{
    padding: 0;
    margin-right: 30px;
    float: right;
    line-height: 30px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }
  .image {
    width: 100%;
    min-height: 120px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .el-card__body>div:nth-child(2) {
    background-color: #eee;
  }
  .clearfix:after {
      clear: both
  }
</style>
