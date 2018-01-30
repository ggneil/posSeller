<template>
  <div>
    <el-tabs v-model="showTab">
      <el-tab-pane label="用户数据" name="tabFirst">
        <el-row class="henglan">
          <el-col :span="10">
            <el-input class="Inp Inp2" v-model="input" placeholder="搜索用户..." @change="searchGoods"></el-input>
          </el-col>
        </el-row>
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
            sortable
            prop="user_order_amount"
            label="消费金额（元）"
          ></el-table-column>
          <el-table-column
            width="180"
            prop="user_address"
            label="地址"
          ></el-table-column>
          <el-table-column
            width="110"
            sortable
            align="center"
            prop="user_integral"
            label="积分"
          ></el-table-column>
          <el-table-column
            width="110"
            sortable
            align="center"
            prop="user_order_num"
            label="订单数"
          ></el-table-column>
          <el-table-column
            width="110"
            sortable
            align="center"
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

      <el-tab-pane label="用户推广关系" name="tabSecond">
        <el-table
          :data="userData1"
          style="width: 100%;"
        >
          <el-table-column
            label="用户"
            align="center"
          >
            <template scope="scope">
              <img style="width:50px;height: 50px;" :src="scope.row.avatarurl !== '' ? scope.row.avatarurl : ''" alt="">
              <p style="margin-bottom: 0;">{{ scope.row.nickname }}</p>
              <p v-if="scope.row.avatarurl === '' || scope.row.nickname === ''">部分信息未取到</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="spread_num"
            label="邀请人数"
            align="center"
          ></el-table-column>
          <!-- <el-table-column
            width="100"
            prop="user_integral"
            label="获得积分"
          ></el-table-column> -->
          <el-table-column
            width="300"
            fixed="right"
            label="操作"
            align="center"
          >
            <template scope="scope">
              <el-button @click="{customerData1(scope.row.user_id), dialogTableVisible=true}" size="small" type="primary">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="邀请列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="nickname" label="用户"></el-table-column>
        <el-table-column property="create_time" label="时间"></el-table-column>
      </el-table>
    </el-dialog>
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
      userData: [],
      userData1: [],
      dialogTableVisible: false,
      gridData: []
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.userInfoLoad()
    this.userInfoLoad1()
  },
  methods: {
    // 搜索用户
    searchGoods (value1) {
      axios.post('/seller/shop/searchuser', { user_name: value1, shop_id: this.shopId }).then((res) => {
        if (res.data.error) {
          console.log(res.data.error.msg)
        } else {
          this.userData = res.data.data
        }
      })
    },
    userInfoLoad () {
      axios.get('https://cdn.wangdoukeji.com/index.php/seller/shop/shopUser?shop_id=' + this.shopId).then((res) => {
        this.userData = res.data.data
      })
    },
    customerData (userId) {
      this.$router.push({path: '/manage/userDetails?user_id=' + userId})
    },
    userInfoLoad1 () {
      axios.get('https://api.doudot.cn/seller/user/relationship?shop_id=' + this.shopId).then((res) => {
        this.userData1 = res.data.data
      })
    },
    customerData1 (userId) {
      axios.post('/seller/user/getsonlist?user_id=' + userId).then((res) => {
        if (res.data.code === 1) {
          this.gridData = res.data.data
        } else {
          console.log(res.data.error.msg)
          this.$message({
            type: 'error',
            message: res.data.error.msg
          })
        }
      })
    }
  }
}
</script>

<style>
  .el-tabs__header {
      margin: 0;
  }
  .Inp{width: 47.5%;}
  .Inp2{margin-left: 5%;}
  .henglan{padding: 10px 20px;border-bottom: 1px solid #eee;}
</style>
