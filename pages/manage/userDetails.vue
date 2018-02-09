<template>
  <div>
    <el-tabs v-model="userDetails">
      <el-tab-pane name="userDetails" label="用户详情">
        <el-row>
          <el-col>
            <p>订单详情</p>
            <el-table :data="orderDetails">
              <el-table-column
                width="180"
                label="订单号"
                align="center"
                prop="trade_no"
              ></el-table-column>
              <el-table-column
                width="120"
                label="订单类型"
              >
                <template scope="scope">
                  <el-col>{{ scope.row.type !== '' ? (scope.row.type !== 0 ? (scope.row.type !== 1 ? '外买订单' : '堂食订单') : '扫码购物') : ''}}</el-col>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                label="支付类型"
              >
                <template scope="scope">
                  <el-col>{{ scope.row.pay_type !== '' ? (scope.row.pay_type !== 1 ? (scope.row.pay_type !== 2 ? '现金' : '支付宝') : '微信支付') : ''}}</el-col>
                </template>
              </el-table-column>
              <el-table-column
                width="120"
                label="电话"
                prop="mobile"
              ></el-table-column>
              <el-table-column
                width="180"
                label="地址"
                prop="address"
              ></el-table-column>
              <el-table-column
                width="120"
                label="订单金额（元）"
                prop="amount"
                align="center"
              ></el-table-column>
              <el-table-column
                width="180"
                label="下单时间"
                prop="create_time"
              ></el-table-column>
              <el-table-column
                label="操作"
                width="180"
                fixed="right"
              >
                <template scope="scope">
                  <el-button type="primary" size="small" @click="watchDetailsBtn(scope.row.order_goods)">
                    订单详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <p>优惠券详情</p>
            <p class="coupon">所有优惠券</p>
            <el-table :data="allCoupon">
              <el-table-column
                label="券名"
                width="200"
                prop="name"
                align="center"
              ></el-table-column>
              <el-table-column
                label="金额（元）"
                width="200"
                prop="denomination"
              ></el-table-column>
              <el-table-column
                label="应达到金额（元）"
                width="200"
                prop="amount_limit"
              ></el-table-column>
              <el-table-column
                label="开始时间"
                width="200"
              >
                <template scope="scope">
                  {{ timer(scope.row.use_start_time) }}
                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
              >
                <template scope="scope">
                  {{ timer(scope.row.use_end_time) }}
                </template>
              </el-table-column>
            </el-table>
            <p class="coupon">已使用优惠券</p>
            <el-table :data="alreadyUseCoupon">
              <el-table-column
                label="券名"
                width="200"
                prop="name"
                align="center"
              ></el-table-column>
              <el-table-column
                label="金额（元）"
                width="200"
                prop="denomination"
              ></el-table-column>
              <el-table-column
                label="应达到金额（元）"
                width="200"
                prop="amount_limit"
              ></el-table-column>
              <el-table-column
                label="开始时间"
                width="200"
              >
                <template scope="scope">
                  {{ timer(scope.row.use_start_time) }}
                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
              >
                <template scope="scope">
                  {{ timer(scope.row.use_end_time) }}
                </template>
              </el-table-column>
            </el-table>
            <p class="coupon">未使用优惠券</p>
            <el-table :data="notUseCoupon">
              <el-table-column
                label="券名"
                width="200"
                prop="name"
                align="center"
              ></el-table-column>
              <el-table-column
                label="金额（元）"
                width="200"
                prop="denomination"
              ></el-table-column>
              <el-table-column
                label="应达到金额（元）"
                width="200"
                prop="amount_limit"
              ></el-table-column>
              <el-table-column
                label="开始时间"
                width="200"
              >
                <template scope="scope">
                  {{ timer(scope.row.use_start_time) }}
                </template>
              </el-table-column>
              <el-table-column
                label="结束时间"
              >
                <template scope="scope">
                  {{ timer(scope.row.use_end_time) }}
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col>
            <p>菜品偏好分析</p>
            <el-table :data="dish">
              <el-table-column
                label="点过菜品"
                prop="name"
                align="center"
              ></el-table-column>
              <el-table-column
                label="数量"
                prop="num"
                sortable
              ></el-table-column>
            </el-table>
            <!-- <div id="zhexiantu"></div> -->
          </el-col>
        </el-row>
        <el-dialog title="订单列表" :visible.sync="orderDetailsWindowShow">
          <el-table :data="orderDetailsWindow">
            <el-table-column property="goods_name" label="商品"></el-table-column>
            <el-table-column property="goods_num" label="数量"></el-table-column>
          </el-table>
        </el-dialog>
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
      shopId: 1,
      userId: 9,
      orderDetailsWindowShow: false,
      userDetails: 'userDetails',
      biaoTitle: '前十菜品分析柱状图',
      dish: [],
      dishes: ['菜品一', '菜品二', '菜品三', '菜品四', '菜品五', '菜品六', '菜品七'],
      dishesNum: [10, 20, 33, 55, 66, 22, 11],
      orderDetails: [],
      alreadyUseCoupon: [],
      notUseCoupon: [],
      allCoupon: [],
      orderDetailsWindow: []
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.userId = this.$route.query.user_id
    this.orderInfoLoad()
    this.couponInfoLoad()
    this.dishesInfoLoad()
  },
  mounted () {},
  computed: {},
  methods: {
    // 时间计算
    timer (aaa) {
      return new Date(parseInt(aaa) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
    },
    // 菜品分析加载
    dishesInfoLoad () {
      var that = this
      axios.post('https://cdn.wangdoukeji.com/index.php/seller/shop/userFoodAnalysis?shop_id=' + this.shopId + '&user_id=' + this.userId).then((res) => {
        if (res.data.code === 1) {
          // that.dish = res.data.data
          that.dishes = []
          that.dishesNum = []
          for (var i in res.data.data) {
            that.dishes.push(i)
            that.dishesNum.push(res.data.data[i])
            that.dish.push({'name': i, 'num': res.data.data[i]})
          }
          that.dishes = that.dishes.slice(0, 10)
          that.dishesNum = that.dishesNum.slice(0, 10)
          let myChart = window.echarts.init(document.getElementById('zhexiantu'))
          myChart.setOption({
            title: {text: that.biaoTitle},
            tooltip: {},
            xAxis: {
              data: that.dishes
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: that.dishesNum
            }]
          })
        } else {
          that.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    // 订单信息加载
    orderInfoLoad () {
      var that = this
      axios.post('https://cdn.wangdoukeji.com/index.php/seller/shop/userOrder?shop_id=' + this.shopId + '&user_id=' + this.userId).then((res) => {
        if (res.data.code === 1) {
          that.orderDetails = res.data.data
        }
      })
    },
    // 优惠券加载
    couponInfoLoad () {
      var that = this
      axios.post('https://cdn.wangdoukeji.com/index.php/seller/shop/userCoupon?shop_id=' + this.shopId + '&user_id=' + this.userId).then((res) => {
        if (res.data.code === 1) {
          that.allCoupon = res.data.data.all_coupon
          that.alreadyUseCoupon = res.data.data.used_coupon
          that.allCoupon = res.data.data.unused_coupon
        }
      })
    },
    watchDetailsBtn (row) {
      this.orderDetailsWindow = row
      this.orderDetailsWindowShow = true
    }
  }
}
</script>

<style scoped>
#zhexiantu{display: block;margin: 20px auto;width: 1000px;height: 300px;}
.coupon{text-align: center;}
</style>

