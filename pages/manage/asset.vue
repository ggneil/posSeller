<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的资产" name="first">
        <el-row class="page-asset-sum">
          <el-col span="8">
            <p class="page-asset-title">店铺可用余额(元)</p>
            <span class="page-asset-money">{{ balance }}</span>
            <el-button type="primary" @click="recharge">充值</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="充值记录" name="second">
        <el-row class="page-asset-sum">
          <el-table
            :data="record"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="充值金额">
            </el-table-column>
            <el-table-column
              prop="time"
              label="支付时间">
            </el-table-column>
            <el-table-column
              prop="trade_no"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="balance"
              label="余额">
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="支出明细" name="third">
        <el-row class="page-asset-sum">
          <el-table
            :data="expenditure"
            stripe
            style="width: 100%">
            <el-table-column
              prop="time"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="title"
              label="支出描述">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="支出金额">
            </el-table-column>
            <el-table-column
              prop="balance"
              label="余额">
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="扫码支付" :visible.sync="centerDialogVisible" width="30%" center>
      <span>使用微信扫码支付，成功后即时到账</span>
      <p><img v-bind:src="payQrcode"/></p>
      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'manage',
    data () {
      return {
        activeName: 'first',
        shopId: 0,
        balance: 0.00,
        tradeNo: '',
        loading: false,
        payQrcode: '',
        centerDialogVisible: false,
        record: [],
        expenditure: []
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.getData()
    },
    methods: {
      getData () {
        // 个人信息
        axios.post('/seller/shop/assetsum?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.balance = res.data.balance
            this.record = res.data.record
            this.expenditure = res.data.expenditure
          }
        })
      },
      recharge () {
        this.$prompt('充值金额：', '充值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/,
          inputErrorMessage: '充值金额无效',
          inputPlaceholder: '0.00'
        }).then(({ value }) => {
          this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          axios.post('/seller/shop/recharge', {shop_id: this.shopId, value: value}).then((res) => {
            this.loading.close()
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              this.tradeNo = res.data.trade_no
              this.payQrcode = res.data.pay_qrcode
              this.centerDialogVisible = true
              this.is_paid()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '充值取消'
          })
        })
      },
      is_paid () {
        axios.post('/seller/we_pay/payStatus?order=' + this.tradeNo).then((res) => {
          if (res.data.error && this.centerDialogVisible === true) {
            setInterval(this.is_paid(), 1000)
          } else {
            this.getData()
            this.centerDialogVisible = false
            this.$message({
              message: '充值成功',
              type: 'success'
            })
          }
        })
      }
    }
  }
</script>
<style>
  .page-asset-sum {
    background: #ffffff;
    padding: 30px;
  }
  .page-asset-title {
    font-size: 12px;
    color: #555;
    height: 30px;
    line-height: 30px;
    margin-bottom: 7px;
  }
  .page-asset-money {
    font-size: 24px;
    line-height: 33px;
    vertical-align: top;
    margin-right: 19.1%;
  }
</style>
