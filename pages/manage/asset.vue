<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的资产" name="first">
        <div class="title-asset">
          <span class="title-contant">会员类型</span>
        </div>
        <div class="page-top">
          <div class="page-top-left">金卡会员预付一年1800（一年省1800）</div>
          <div class="page-top-rgt">会员有效期：2018年2月5日- 2028年2 月4日</div>
        </div>
        <!-- <div class="page-top">
          <div class="page-top-left">
            <p>可用余额：<span class="red">{{balance}}</span>元</p>
            <p>(每天扣费：基础服务费和插件费，插件按年付)</p>
          </div>
          <div class="page-top-rgt">
            <p>基础服务费：<span class="orange">{{service_charge}}</span>元</p>
            <p>拓展插件：<span class="blue">{{plugin_num}}</span>个</p>
          </div>
        </div> -->
        <div class="title-asset">
          <span class="title-contant">会员充值</span>
        </div>
        <template>
          <el-radio-group v-model="radioType">
            <el-radio class="typeRadio" :label="1">金卡会员预付一年1800（一年省1800）</el-radio>
            <el-radio class="typeRadio" :label="2">银卡会员预付半年1500（半年省300）</el-radio>
            <el-radio class="typeRadio" :label="3">普通会员预付一个月300元用户</el-radio>
            <el-radio class="typeRadio" :label="4">后付费用户（交易额*0.5%）
              <span> 应交费用：</span>
              <span @click="showModel" class="detailsList blue">查看清单</span>
              <span class="gray">为了不影响服务建议您多充值</span>
            </el-radio>
          </el-radio-group>
        </template>
        <div class="payMode">  
          <el-radio v-model="radioPay" label="1">
            <img @click="wClick" class="img1" src='~static/images/weixin.png' alt="">
          </el-radio>
          <el-radio v-model="radioPay" disabled label="2">
            <img @click="zClick" class="img2" :class="{ select: isSelectz }" src='~static/images/zhifubao.png' alt="">
          </el-radio>
          <el-button class="determineBtn" type="primary" @click="confirm">支付</el-button>
        </div>
        <!-- <div class="payMode">
          <img @click="wClick" class="img1" :class="{ select: isSelectw }" src='~static/images/weixin.png' alt="">
          <img @click="zClick" class="img2" :class="{ select: isSelectz }" src='~static/images/zhifubao.png' alt="">
        </div>
        <div class="title-h2">基础服务</div>
        <div class="title-h2 go-contant">购买周期：
          <template>
            <el-select @change="changeSelct(value)" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          &nbsp;&nbsp;&nbsp;配置费用：<span class="orange">￥{{basePrice}}</span>
          <span class="green">&nbsp;&nbsp;&nbsp;省￥{{provincePrice}}</span>
        </div> -->
        
        <div class="title-asset">
          <span class="title-contant">增值服务</span>
        </div>
        <div class="title-h2">营销插件（可选）</div>
        <er-row class="henglan-title">
          <span class="blue">新客户专享：营销插件每个98元/年</span>
        </er-row>
        <el-row class="henglan">
          <div @click="chooseChajian(item.id, index)" v-for="(item, index) in option3" :key="item.id" class="marketing_a">
            <el-col class="options marketing options1" :span="11">
              <el-row>
                <el-col :span="2" class="isCheck">
                  <i class="el-icon-circle-check checks" style="color: #13ce66"></i>
                  <i class="el-icon-remove remove"></i>
                </el-col>
                <el-col :span="3">
                  <i :class="[item.type === 1 ? 'wxsmall' : '', item.type === 2 ? 'wxsmall1' : '', item.type === 3 ? 'wxsmall2' : '']">
                    <img :src="'https://api.doudot.cn/' + item.icon_path.replace(/\\/, '')" alt="">
                  </i>
                </el-col>
                <el-col class="right" :span="12">
                  <h3>{{ item.name }}</h3>
                  <span>{{ item.description }}</span>
                </el-col>
                <el-col class="right line" :span="7">
                  <s class="pluginPrice">原价：98元/年</s>
                  <div class="pluginPrice">促销：88元/年</div>
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-row>
        <div class="title-h2">总金额：<span class="orange">{{totalPrice}}</span>元</div>
        <div class="determine">
          <el-button class="determineBtn" type="primary" @click="confirm">支付</el-button>
        </div>
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
      <span class="payerweima">使用微信扫码支付，成功后即时到账</span>
      <p><img  class="payerweima" v-bind:src="payQrcode"/></p>
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
        expenditure: [],
        oChajian: {},
        aChajian: [],
        aaa: {'gg': 2},
        // 选中支付方式
        isSelectw: false,
        isSelectz: false,
        // 下拉
        options: [{
          value: '1',
          label: '1个月'
        }, {
          value: '2',
          label: '2个月'
        }, {
          value: '3',
          label: '3个月'
        }, {
          value: '4',
          label: '半年'
        }, {
          value: '5',
          label: '1年'
        }, {
          value: '6',
          label: '2年'
        }],
        value: '4',
        // 营销工具
        option3: [],
        // 基础配置
        basePrice: 1440.00,
        // 省多少
        provincePrice: 360.00,
        // 插件价格
        plugInPrice: 0,
        // 总金额
        totalPrice: 1440.00,
        // 插件数
        plugin_num: '',
        // 服务费
        service_charge: '',
        // 会员类型选择
        radioType: 1,
        radioPay: ''
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.getData()
      axios.get('https://api.doudot.cn/seller/plugin/pluginPrice').then((res) => {
        this.option3 = res.data.data
      })
    },
    methods: {
      showModel () {
        console.log(1)
      },
      // 微信
      wClick () {
        this.isSelectw = true
        this.isSelectz = false
      },
      // 支付宝
      zClick () {
        // this.isSelectw = false
        // this.isSelectz = true
        this.$message({
          type: 'info',
          message: '暂时没有开放'
        })
      },
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
            this.plugin_num = res.data.plugin_num
            this.service_charge = res.data.service_charge
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
          if (res.data.error) {
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
      },
      chooseChajian (id, index) {
        var a = document.querySelectorAll('.options')
        var checks = document.querySelectorAll('.checks')
        var remove = document.querySelectorAll('.remove')
        if (this.oChajian[id + ''] === id) {
          delete this.oChajian[id + '']
          checks[index].style.display = 'none'
          remove[index].style.display = 'block'
          a[index].className = 'options marketing options1 el-col el-col-11 el-col-offset-1'
        } else {
          checks[index].style.display = 'block'
          remove[index].style.display = 'none'
          a[index].className = 'options marketing options1 el-col el-col-11 el-col-offset-1 optionsRed'
          this.oChajian[id + ''] = id
        }
        var arr = Object.keys(this.oChajian)
        this.plugInPrice = 98 * arr.length
        this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
      },
      // 确定下单
      confirm () {
        for (let key in this.oChajian) {
          this.aChajian.push(this.oChajian[key])
        }
        console.log(this.aChajian)
        axios.post('/seller/shop/purchaseService?shop_id=' + this.shopId + '&time=' + this.value + '&basicPrice=' + this.totalPrice + '&plugIn=' + this.aChajian).then((res) => {
          this.aChajian = []
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            console.log(res.data)
            this.tradeNo = res.data.trade_no
            this.payQrcode = res.data.pay_qrcode
            this.centerDialogVisible = true
            this.is_paid()
          }
        })
      },
      changeSelct (value) {
        if (value === '1') {
          this.basePrice = '300.00'
          this.provincePrice = '0.00'
          this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
        } else if (value === '2') {
          this.basePrice = '600.00'
          this.provincePrice = '0.00'
          this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
        } else if (value === '3') {
          this.basePrice = '900.00'
          this.provincePrice = '0.00'
          this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
        } else if (value === '4') {
          this.basePrice = '1440.00'
          this.provincePrice = '360.00'
          this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
        } else if (value === '5') {
          this.basePrice = '1800.00'
          this.provincePrice = '1800.00'
          this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
        } else if (value === '6') {
          this.basePrice = '3600.00'
          this.provincePrice = '3600.00'
          this.totalPrice = parseFloat(this.plugInPrice) + parseFloat(this.basePrice)
        }
      }
    }
  }
</script>
<style>
    .el-table td, .el-table th {
      padding: 12px 10px;
    }
  .el-tabs__header{margin-bottom: 0}
  .henglan {background-color:white;padding: 0px 20px 20px;}
  .henglan-title {background-color: white;display:block;width: 100%;height: 40px;line-height: 40px; padding-left: 30px; box-sizing: border-box; font-size: 14px;}
  .options {cursor: pointer;padding: 10px;background-color: #eee;color: black;}
  .options1 {border:1px solid #eee; box-sizing: border-box; margin-bottom: 20px;}
  .optionsRed {border:1px solid red; background-color: #ccc;}
  .options:hover {background-color: #ccc;}
  .options:active {color: black;}
  .wxsmall{display:block;height:44px;width:44px;background:rgb(0, 204, 153);}
  .wxsmall1{display:block;height:44px;width:44px;background:rgb(85, 153, 255);}
  .wxsmall2{display:block;height:44px;width:44px;background:rgb(255, 136, 85);}
  .wxsmall img, .wxsmall1 img, .wxsmall2 img{height:44px;width:44px;}
  .right{height: 44px;padding:0 10px}
  .right h3{line-height:22px;margin: 0;font-size:16px;}
  .right span{line-height:22px;font-size: 12px;}
  .marketing {
    margin-left: 4.1667%;
  }
  .marketing_a:nth-child(2n+1) .marketing{
    margin-left: 0;
  }
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
  .page-top {
    width: 100%;
    color: #555;
    font-size: 14px;
    overflow: hidden;
    margin-top: 10px;
  }
  .page-top-left,.page-top-rgt {
    float: left;
    width: 50%;
    padding-left: 20px;
    box-sizing: border-box;
    color: #555;
  }
  .page-top-left {
    border-right: 1px solid #eee; 
  }
  .red {
    color: red;
    font-size: 15px;
  }
  .orange {
    color: #fc9538;
    font-size: 16px;
  }
  .blue {
    color: blue;
  }
  .green {
    color: #3b6e65;
    font-size: 12px;
  }
  .gray {
    color: #888;
    margin-left: 10px;
  }
  .title-asset {
    color: #555;
    padding-left: 20px;
    height: 41px;
    background: #fc9538;
    margin-top: 10px;
    width: 98%;
  }
  .title-contant {
    height: 41px;
    line-height: 41px;
    padding: 10px;
    color: #fff;
  }
  .payMode {
    margin-top: 20px;
  }
  .payMode .img1 {
    height: 45px;
    padding: 1px 10px;
    box-sizing: border-box;
  }
  .payMode .img2 {
    height: 45px;
    padding: 1px;
    box-sizing: border-box;
    cursor: not-allowed;
  }
  .select {
    border: 1px solid red;  
  }
  .title-h2 {
    color: #555;
    padding: 10px 20px;
    font-size: 14px;
  }
  .go-contant {
    padding-left: 30px;
  }
  .determine {
    height: 100px;
    widows: 100%;
  }
  .determineBtn {
    margin: 0 20%;
    padding: 10px 30px;
  }
  .payerweima {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
  /* 类型单选 */
  .typeRadio {
    display: block;
    margin-left: 30px;
    line-height: 50px;
    color: #333;
  }
  .detailsList {
    margin-left: 10px;
  }
  /* 插件价格 */
  .pluginPrice {
    font-size: 13px;
  }
  .line {
    border-left: 1px solid #666;
  }
  .isCheck {
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  /* 未选中的园 */
  .checkGarden {
    padding: 10px;
    border-radius: 50%;
  }
</style>
