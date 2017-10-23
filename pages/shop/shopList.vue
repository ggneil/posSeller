<template>
  <el-row :span="20" class="parent">
    <el-col class="header">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508423488947&di=76353e30541ec6bcf1aa15a270886c4c&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Ffcfaaf51f3deb48fbb0bc61ff91f3a292cf57894.jpg" class="logo">
      <el-button type="text" class="button1">返回主页</el-button>
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
            <el-button type="text" @click="open1(shopInfo[index].shopId)" class="button">进入店铺</el-button>
            <el-button type="text" @click="open2(shopInfo[index].shopId, index)" style="color:red;" class="button">删除</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import axios from '../../plugins/axios'
  var url = 'http://pos.wangdoukeji.com/'
  export default {
    // middleware: 'auth', // 中间件登陆之后才可以看到
    data () {
      return {
        userId: 1,
        shopInfo: [],
        currentDate: new Date()
      }
    },
    beforeMount () {
      this.shopInfoLoad()
    },
    methods: {
      // 店铺列表加载
      shopInfoLoad () {
        axios.post('/seller/shop/getShopList?user_id=' + this.userId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
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
          }
        })
      },
      // 进入店铺函数
      open1 (shopId) {
        localStorage.setItem('shop_id', shopId)
        location.href = '../manage/goods'
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
  .header{
    height: 70px;
    padding: 10px 40px;
    background-color: #fc9538;
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, .3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%
  }
  .logo{
    height: 50px;
  }
  .smallBox{
    margin-top: 20px
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
    margin-right: 20px;
    float: right;
    line-height: 50px;
    font-size: 18px;
    color: white
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
  
  .clearfix:after {
      clear: both
  }
</style>
