<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数据概况" name="first">
        <el-row class="bgwhite touhenglan">
          <el-col :span="4" class="txtcenter">今日实时</el-col>
          <el-col :span="18">更新时间：{{time}}</el-col>
        </el-row>
        <el-row class="centerLine">
          <el-col :span="6">
            <el-row class="">访客数</el-row>
            <el-row class="txt-size-40">{{todayVisitorNum}}</el-row>
            <el-row class="txt-color-dark">昨天：{{yesterdayVisitorNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="">浏览量</el-row>
            <el-row class="txt-size-40">{{todayBrowseNum}}</el-row>
            <el-row class="txt-color-dark">昨天：{{yesterdayBrowseNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="">付款订单数</el-row>
            <el-row class="txt-size-40">{{todayOrderNum}}</el-row>
            <el-row class="txt-color-dark">昨天：{{yesterdayOrderNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row class="">付款金额（元）</el-row>
            <el-row class="txt-size-40">{{todayMoney}}</el-row>
            <el-row class="txt-color-dark">昨天：{{yesterdayMoney}}</el-row>
          </el-col>
        </el-row>
        <el-row class="bgwhite touhenglan">
          <el-col :span="4" class="txtcenter">时间筛选：</el-col>
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-select v-model="dayValue" placeholder="请选择" @change="handleChange" size="small">
                  <el-option
                    v-for="item in dayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <div class="block" v-show="show">
                  <el-date-picker
                    @change="timeChange1"
                    v-model="dateValue1"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                    :editable="false"
                    size="small"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
                <div class="block" v-show="!show">
                  <el-date-picker
                    @change="timeChange1"
                    v-model="dateValue2"
                    type="daterange"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期范围"
                    :editable="false"
                    size="small"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="centerLine">
          <el-col :span="6">
            <el-row>访客数</el-row>
            <el-row class="txt-size-40">{{VisitorNum}}</el-row>
          </el-col>
        </el-row>
        <el-row class="centerLine">
          <el-col :span="6">
            <el-row>下单人数</el-row>
            <el-row class="txt-size-40">{{OrderVisitorNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row>下单笔数</el-row>
            <el-row class="txt-size-40">{{OrderNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row>下单金额（元）</el-row>
            <el-row class="txt-size-40">{{OrderMoney}}</el-row>
          </el-col>
        </el-row>
        <el-row class="centerLine">
          <el-col :span="6">
            <el-row>付款人数</el-row>
            <el-row class="txt-size-40">{{PayVisitorNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row>付款笔数</el-row>
            <el-row class="txt-size-40">{{PayNum}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row>付款金额（元）</el-row>
            <el-row class="txt-size-40">{{PayMoney}}</el-row>
          </el-col>
          <el-col :span="6">
            <el-row>客单价（元）</el-row>
            <el-row class="txt-size-40">{{PayOneMoney}}</el-row>
          </el-col>
        </el-row>
        <el-row class="bgwhite touhenglan">
          <el-col :span="4" class="txtcenter">交易构成：</el-col>
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-select v-model="MonthValue" placeholder="请选择" size="small" disabled="disabled">
                  <el-option
                    v-for="item in MonthOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <div class="block">
                  <el-date-picker
                    v-model="dateValue3"
                    type="month"
                    size="small"
                    :editable="false"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择月"
                    @change='timeChange2'
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="footLine" style="padding: 0 20px;background-color: white;margin-bottom: 30px">
          <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="newCustomer"
              label="客户类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="payMoney"
              label="付款金额（元）"
              width="180">
            </el-table-column>
            <el-table-column
              width="180"
              prop="moneyCompare"
              label="较上个月">%
            </el-table-column>
            <el-table-column
              prop="payPeopleNum"
              label="付款人数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="peopleNumCompare"
              label="较上个月">%
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品分析" name="second">
        <el-row class="bgwhite touhenglan">
          <el-col :span="4" class="txtcenter">时间筛选：</el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-select v-model="dayValue" placeholder="请选择" @change="handleChange" size="small">
                  <el-option
                    v-for="item in dayOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <div class="block" v-show="show">
                  <el-date-picker
                    v-model="dateValue4"
                    align="right"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="timeChange3"
                    placeholder="选择日期"
                    :editable="false"
                    size="small"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
                <div class="block" v-show="!show">
                  <el-date-picker
                    v-model="dateValue5"
                    type="daterange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="timeChange3"
                    align="right"
                    placeholder="选择日期范围"
                    :editable="false"
                    size="small"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="footLine" style="padding: 0 20px;background-color: white;margin-bottom: 30px">
          <el-table
            :data="goodsTableData"
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="商品名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="payPeopleNum"
              label="付款人数"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              width="180"
              sortable
              prop="sellNum"
              label="卖出件数">
            </el-table-column>
            <el-table-column
              prop="average"
              label="平均（件/人）"
              sortable
              width="180">
            </el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'manage',
    data () {
      var timerFirst = new Date()
      return {
        shopId: 1,
        // 新老客户表格
        tableData: [{
          newCustomer: '新成交客户',
          payMoney: '0.00',
          moneyCompare: '0.00',
          payPeopleNum: '',
          peopleNumCompare: '0.00'
        }, {
          newCustomer: '老成交客户',
          payMoney: '0.00',
          moneyCompare: '0.00',
          payPeopleNum: '',
          peopleNumCompare: '0.00'
        }],
        // 商品分析表格
        goodsTableData: [{
          name: '茄子',
          payPeopleNum: 1,
          sellNum: 0,
          average: 1
        }, {
          name: '辣椒',
          payPeopleNum: 0,
          sellNum: 1,
          average: 0
        }],
        // 时间段选择
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        // 单日选择
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        // 单月选择
        pickerOptions2: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        show: true,
        dateValue1: '', // 自然日日期 数据概况
        dateValue2: '', // 自定义日期 数据概况
        dateValue3: '', // 自定义日期 数据概况
        dateValue4: '', // 自然日日期 商品分析
        dateValue5: '', // 自定义日期 商品分析
        value1: '', // 自然日日期交易情况自然日日期范围交易情况
        value2: '', // 自然日日期范围交易情况
        value3: '', // 自然月
        value4: '', // 商品分析日期商品分析日期范围
        value5: '', // 商品分析日期范围
        dayOptions: [{
          value: '选项1',
          label: '自然日'
        }, {
          value: '选项2',
          label: '自定义范围'
        }], // 选择时间方式
        MonthOptions: [{
          value: '选项1',
          label: '自然月'
        }], // 选择月份
        dayValue: '选项1', // 多选框时间
        MonthValue: '选项1', // 多选框时间
        todayVisitorNum: 0, // 今日访客数
        VisitorNum: 0, // 访客数
        todayOrderVisitorNum: 0, // 今日下单人数
        OrderVisitorNum: 0, // 今日下单人数
        PayVisitorNum: 0, // 付款人数
        OrderNum: 0, // 下单笔数
        PayNum: 0, // 付款笔数
        OrderMoney: '0.00', // 下单金额
        PayMoney: '0.00', // 付款金额
        PayOneMoney: '0.00', // 单人付款金额
        todayBrowseNum: 0, // 浏览量
        todayOrderNum: 0, // 订单数
        todayMoney: '0.00', // 钱数
        yesterdayVisitorNum: 0, // 昨日访客数
        yesterdayBrowseNum: 0, // 昨日浏览量
        yesterdayOrderNum: 0, // 昨日订单数
        yesterdayMoney: '0.00', // 昨日钱数
        time: timerFirst.getFullYear() + '-' + (timerFirst.getMonth() + 1) + '-' + timerFirst.getDate() + '  ' + timerFirst.getHours() + '：' + timerFirst.getMinutes() + '：' + timerFirst.getSeconds(), // 时间
        activeName: 'first' // 第一个显示 商品管理
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.pageLoad()
    },
    methods: {
      // 页面加载
      pageLoad () {
        this.nowLoad()
        this.searchLoad()
        this.dealFormLoad()
        this.goodsInfoLoad()
      },
      // 第一次日期筛选触发事件
      timeChange1 (shijian) {
        this.value1 = ''
        this.value2 = ''
        if (shijian.length > 2) {
          this.value1 = shijian
        } else {
          this.value1 = shijian[0]
          this.value2 = shijian[1]
        }
        this.searchLoad()
      },
      // 第二次交易构成月份筛选
      timeChange2 (shijian) {
        this.value3 = shijian
        this.dealFormLoad()
      },
      // 第三次商品分析时间筛选
      timeChange3 (shijian) {
        this.value4 = ''
        this.value5 = ''
        if (shijian.length > 2) {
          this.value4 = shijian
        } else {
          this.value4 = shijian[0]
          this.value5 = shijian[1]
        }
        this.goodsInfoLoad()
      },
      // 实时数据加载
      nowLoad () {
        axios.post('/seller/data/todayRealTime?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: '实时数据：' + res.data.error.msg
            })
          } else {
            this.todayVisitorNum = res.data.today_visitors
            this.yesterdayVisitorNum = res.data.yesterday_visitors
            this.todayBrowseNum = res.data.today_view
            this.yesterdayBrowseNum = res.data.yesterday_view
            this.todayOrderNum = res.data.today[0].num
            this.yesterdayOrderNum = res.data.yes[0].num
            this.todayMoney = res.data.today[0].sum
            this.yesterdayMoney = res.data.yes[0].sum
          }
        })
      },
      // 商品分析加载
      goodsInfoLoad () {
        axios.post('/seller/Data/goodsAnalyze?shop_id=' + this.shopId + '&time_from=' + this.dateValue4 + '&time_to=' + this.dateValue5).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.goodsTableData = []
            for (var keys in res.data.ga) {
              this.goodsTableData.push({
                name: res.data.ga[keys].goods_name,
                payPeopleNum: res.data.ga[keys].pay_ren_shu,
                sellNum: res.data.ga[keys].num,
                average: res.data.ga[keys].ren_jun
              })
            }
          }
        })
      },
      // 交易情况查询
      searchLoad () {
        axios.post('/seller/Data/tradingOutlook?shop_id=' + this.shopId + '&time_from=' + this.dateValue1 + '&time_to=' + this.dateValue2).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.VisitorNum = res.data.visitors
            this.OrderVisitorNum = res.data.orders[0].order_ren_shu
            this.OrderNum = res.data.orders[0].order_bi_shu
            this.OrderMoney = res.data.orders[0].order_jin_e
            this.PayVisitorNum = res.data.pay[0].pay_ren_shu
            this.PayNum = res.data.pay[0].pay_ding_dan
            this.PayMoney = res.data.pay[0].pay_jin_e
            this.PayOneMoney = res.data.pay[0].ke_dan_jia
          }
        })
      },
      // 交易构成
      dealFormLoad () {
        axios.post('/seller/Data/tradeComposition?shop_id=' + this.shopId + '&month=' + this.dateValue3).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.tableData = [{
              newCustomer: '新成交客户',
              payMoney: res.data.new.new_jin_e,
              moneyCompare: res.data.new.new_jin_e_rate + '%',
              payPeopleNum: res.data.new.new_ren_shu,
              peopleNumCompare: res.data.new.new_ren_shu_rate + '%'
            }, {
              newCustomer: '老成交客户',
              payMoney: res.data.old.old_jin_e,
              moneyCompare: res.data.old.old_jin_e_rate + '%',
              payPeopleNum: res.data.old.old_ren_shu,
              peopleNumCompare: res.data.old.old_ren_shu_rate + '%'
            }]
          }
        })
      },
      // tab点击数据更新
      handleClick (tab, event) {
        this.dateValue1 = '' // 自定义日期
        this.dateValue2 = '' // 自然日日期
        this.dateValue3 = '' // 自定义日期 数据概况
        this.dateValue4 = '' // 自然日日期 商品分析
        this.dateValue5 = '' // 自定义日期 商品分析
        this.value1 = ''
        this.value2 = ''
        this.value3 = ''
        this.value4 = ''
        this.value5 = ''
        this.show = true
        this.dayValue = '选项1' // 多选框时间
        this.MonthValue = '选项1' // 多选框时间
        var timer = new Date()
        this.time = timer.getFullYear() + '-' + timer.getMonth() + '-' + timer.getDate() + '  ' + timer.getHours() + '：' + timer.getMinutes() + '：' + timer.getSeconds()
        this.pageLoad()
      },
      // 日期选择下拉框改变事件
      handleChange (label) {
        if (label === '选项1') {
          this.show = true
          this.dateValue2 = '' // 自然日日期
          this.dateValue5 = '' // 自然日日期
        } else {
          this.show = false
          this.dateValue1 = '' // 自定义日期
          this.dateValue4 = '' // 自定义日期
        }
      }
    }
  }
</script>
<style co>
 .el-tabs__header{margin-bottom: 0}
 .bgwhite{background-color: white;margin-top: 15px;padding-left: 20px;}
 .touhenglan{line-height: 40px;border-bottom: 1px solid #eee;}
 .txtcenter{text-align: center;}
 .txt-size-40{font-size: 30px;}
 .txt-color-dark{color: #ccc;}
 .centerLine{line-height: 40px;padding: 20px 0 20px 20px;background-color: white;margin-top: 5px;border-bottom: 1px solid #eee}
 .footLine{margin-top: 5px;}
</style>
