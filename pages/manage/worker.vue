<template>
  <div class="content">
    <el-row class="header" :class="shopStatusCode === 1 ? 'lv' : ''">
      <el-col :span="11"  v-if="shopStatusCode !== 1">店铺还未完成功认证，当前处于打烊状态，认证后即可正常营业<br>
咨询电话： 15611528199</el-col>
<el-col :span="11"  v-if="shopStatusCode === 1">店铺已正式开启，当前处于运营状态，如有问题请拨打电话<br>
咨询电话： 15611528199</el-col>
      <el-col :span="4">
        <el-button v-if="shopStatusCode !== 1" size="small" @click="renzheng">立即认证</el-button>
      </el-col>
    </el-row>
    <el-row v-if="xiaochengxuStatusCode !== 1" class="header" style="margin-top: 20px;">
      <el-col :span="11">
        小程序开通状态{{ xiaochengxuStatusCode !== 1 ? '：小程认证流程尚未完成' : '：已完成认证' }}
      </el-col>
      <el-col :span="4">
        <el-button size="small" @click="xiaochengxu" v-if="xiaochengxuStatusCode !== 1">设置小程序</el-button>
      </el-col>
    </el-row>
    <el-row class="shuju">
      <el-col :span="6">
        <p>今日访客</p>
        <span>{{ todayVisitorNum }}</span>
      </el-col>
      <el-col :span="6">
        <p>今日浏览量</p>
        <span>{{ todayBrowseNum }}</span>
      </el-col>
      <el-col :span="6">
        <p>今日单数</p>
        <span>{{ todayOrderNum }}</span>
      </el-col>
      <el-col :span="6">
        <p>今日交易额（元）</p>
        <span>{{ todayMoney }}</span>
      </el-col>
    </el-row>
    <h3>待办事项</h3>
    <el-row class="daiban">
      <el-col class="title" :span="12">
        外卖（{{ waimaikaiguan ? '已开启' : '已关闭' }}）
        <el-switch
          v-model="waimaikaiguan"
          active-color="#13ce66"
          disabled
          inactive-color="#ff4949">
        </el-switch>
      </el-col>
      <el-col class="title" :span="12">
        堂食点餐（{{ tangshikaiguan ? '已开启' : '已关闭' }}）
        <el-switch
          :disabled="shopStatusCode !== 1"
          v-model="tangshikaiguan"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-col>
      <el-col class="options" :span="10">
        <router-link :to="{path: '/manage/orderManage', query: {id: 3}}">
          <el-row>
            <el-col :span="12">
              外卖订单-待接单
            </el-col>
            <el-col :span="12">
              {{ weimaiNum }}个订单
            </el-col>
          </el-row>
        </router-link>
      </el-col>
      <el-col class="options" :span="10" :offset="2">
        <router-link :to="{path: '/manage/orderManage', query: {id: 2}}">
          <el-row>
            <el-col :span="12">
              堂食订单-待付款
            </el-col>
            <el-col :span="12">
              {{ tanshiNum }}个订单
            </el-col>
          </el-row>
        </router-link>
      </el-col>
      <el-col class="options" :span="10">
        <router-link :to="{path: '/manage/orderManage', query: {id: 3}}">
          <el-row>
            <el-col :span="12">
              外卖订单-待发货
            </el-col>
            <el-col :span="12">
              {{ weimaiSendNum }}个订单
            </el-col>
          </el-row>
        </router-link>
      </el-col>
    </el-row>
    <h3>常用功能</h3>
    <el-row class="changyong">
      <router-link :to="{path: '/manage/goods', query: {id: 1}}">
        <el-col :span="6">
          <span class="ico cai">菜</span>
          <span class="tiao">新建商品</span>
        </el-col>
      </router-link>
      <router-link :to="{path: '/manage/youhuiquan', query: {id: 1}}">
        <el-col :span="6">
          <span class="ico quan">券</span>
          <span class="tiao">新建优惠券</span>
        </el-col>
      </router-link>
      <router-link :to="{path: '/manage/youhuiquan', query: {id: 2}}">
        <el-col :span="6">
          <span class="ico jian">积</span>
          <span class="tiao">设置积分</span>
        </el-col>
      </router-link>
      <router-link :to="{path: '/manage/shopManage', query: {id: 2}}">
        <el-col :span="6">
          <span class="ico can">餐</span>
          <span class="tiao">堂食点餐</span>
        </el-col>
      </router-link>
    </el-row>
  </div>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'manage',
    data () {
      return {
        xiaochengxuStatus: null,
        xiaochengxuStatusCode: 1,
        shopStatus: null,
        shopStatusCode: 1,
        waimaikaiguan: false,
        todayVisitorNum: 0,
        todayBrowseNum: 0,
        todayOrderNum: 0,
        todayMoney: 0.00,
        tangshikaiguan: true,
        tanshiNum: 0,
        waimaiNum: 0,
        waimaiSendNum: 0,
        shuju: {
          jiaoyie: 0,
          yue: 0,
          liulanliang: 0,
          fukuandanshu: 0
        }
      }
    },
    beforeMount () {
      // 获取店铺状态
      axios.get('https://cdn.wangdoukeji.com/index.php/seller/shop/getIndexStatus?shop_id=' + localStorage.getItem('shop_id')).then((res) => {
        this.shopStatusCode = res.data.data.shop_auth_status
        this.xiaochengxuStatusCode = res.data.data.applet_auth_status
        this.tanshiNum = res.data.data.tang_unpay_num
        this.waimaiNum = res.data.data.take_out_waiting_list
        this.waimaiSendNum = res.data.data.take_out_to_send
        if (this.shopStatusCode === 1) {
          this.tangshikaiguan = true
        } else {
          this.tangshikaiguan = false
        }
      })
      // 获取数据
      axios.post('/seller/data/todayRealTime?shop_id=' + localStorage.getItem('shop_id')).then((res) => {
        if (res.data.error) {
          this.$message({
            type: 'error',
            message: '实时数据：' + res.data.error.msg
          })
        } else {
          this.todayVisitorNum = res.data.today_visitors
          this.todayBrowseNum = res.data.today_view
          this.todayOrderNum = res.data.today[0].num
          this.todayMoney = res.data.today[0].sum
        }
      })
    },
    methods: {
      xiaochengxu () {
        this.$router.push({path: '/manage/xiaochengxu'})
      },
      renzheng () {
        this.$router.push({path: '/manage/renzheng'})
      }
    }
  }
</script>

<style scoped>
a{color: black;}
.content{background-color: white;padding: 20px;}
.header{background-color: rgb(255, 114, 116);color: black;padding: 10px;font-size: 14px;}
.lv{background-color: #0c6;}
.shuju{background-color: #eee;padding: 20px;margin-top: 20px;}
h3{font-size: 16px;}
.shuju p{font-size: 14px;}
.shuju span{font-size: 36px;color: black;}
.title{line-height: 50px;}
.daiban{background-color: #eee;padding: 20px;padding-top: 0;}
.el-switch{line-height: 50px;vertical-align: top}
.options{cursor: pointer;border-left: 3px solid #f60;background-color: white;padding: 20px 10px;box-sizing: border-box;}
.options .el-row .el-col:nth-child(2){color: blue}
.daiban .options:nth-child(5){margin-top: 20px;}
.changyong{background-color: white;box-sizing:border-box;}
.changyong a:nth-child(1) .el-col:nth-child(1){margin-left: 0;border: none;}
.changyong .el-col{cursor: pointer;border-left:3px solid #fff;padding: 15px 0;background-color:#eee;text-align: center;box-sizing: border-box;}
.changyong span{line-height: 25px;font-size: 14px;}
.changyong .el-col:hover{background-color:#ccc;}
.ico{margin-right: 20px;display: inline-block;width: 25px;height: 25px;color: white;border-radius: 4px;text-align: center;}
.cai{background-color: #0c6;}
.quan{background-color: #fc0;}
.jian{background-color: #f44;}
.can{background-color: #38f;}
</style>
