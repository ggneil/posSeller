<template>
  <div>
    <el-tabs v-model="showTab">
      <el-tab-pane label="用户数据" name="tabFirst">
        <el-table
          :data="userData"
          style="width: 100%;"
        >
          <el-table-column
            width="180"
            label="用户"
            align="center"
          >
            <template scope="scope">
              <img style="width:50px;height: 50px;" :src="scope.row.user_avatarurl !== '' ? scope.row.user_avatarurl.replace(/\\/, '') : ''" alt="">
              <p>{{ scope.row.user_nickname }}</p>
              <p v-if="scope.row.user_avatarurl === '' || scope.row.user_nickname === ''">部分信息未取到</p>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            label="绑定电话"
          >
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-if="scope.row.user_harvest_mobile.length !== 0" v-for="(item, index) in scope.row.user_harvest_mobile" :key="index">收货电话: {{ item.mobile }}</p>
                <p v-if="scope.row.user_harvest_mobile.length === 0">暂无收货电话</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag v-if="scope.row.user_binding_mobile !== ''" size="medium">{{ scope.row.user_binding_mobile }}</el-tag>
                  <el-tag v-if="scope.row.user_binding_mobile === ''" size="medium">暂无</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            prop="user_order_amount"
            label="消费金额（元）"
          ></el-table-column>
          <el-table-column
            width="180"
            prop="user_address"
            label="地址"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="user_integral"
            label="积分"
          ></el-table-column>
          <el-table-column
            width="80"
            prop="user_order_num"
            label="订单数"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="user_coupon"
            label="优惠券数"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
          >
            <template scope="scope">
              <el-button @click="customerData(scope.row.user_id)" size="small" type="primary">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
  layout: 'manage',
  data () {
    return {
      showTab: 'tabFirst',
      shopId: 1,
      userData: [{
        id: 1,
        name: '张三', // name
        phone: '18646543214', // phone
        integration: '100', // 积分
        couponCount: '100', // 优惠券数
        orderCount: '100', // 订单数
        wx: '微信号', // 微信号
        address: '这里是地址', // 地址
        consumption: '100' // 消费金额
      }]
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.userInfoLoad()
  },
  methods: {
    userInfoLoad () {
      axios.get('https://cdn.wangdoukeji.com/index.php/seller/shop/shopUser?shop_id=' + this.shopId).then((res) => {
        this.userData = res.data.data
      })
    },
    customerData (userId) {
      this.$router.push({path: '/manage/userDetails?user_id=' + userId})
    }
  }
}
</script>

<style>

</style>
