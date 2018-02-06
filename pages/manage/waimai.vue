<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div class="crumbsNav">应用插件 / 外卖</div>
        </el-col>
        <el-col class="heng">
          <div>外卖</div>
        </el-col>
        <div class="containerFood">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="外卖时段：" prop="name">
              <p class="crumbs_p">顾客仅在您设置的时段内，可以在线下单点餐</p>
              <p class="crumbs_p crumbs_p2">如果您关闭外卖插件，这里的设置将不再生效，需要您先开启外卖插件</p>
              <template>
                <el-radio class="foodRadio radioFood1" v-model="foodForm.timerRadio" label="0">与门店的营业时间保持一致</el-radio>
                <div class="radio_content" v-show="foodForm.timerRadio === '0'">{{week}}&nbsp;&nbsp;&nbsp;{{time1}}&nbsp;&nbsp;&nbsp;{{time2}}&nbsp;&nbsp;&nbsp;{{time3}}</div>
                <el-radio class="foodRadio radioFood2" v-model="foodForm.timerRadio" label="1">单独设置外卖的配送时段</el-radio>
                <div class="radio_content" v-show="foodForm.timerRadio === '1'">
                  <template>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
                  <el-form-item
                    class="addTime"
                    v-for="(domain, index) in domains"
                    :label="'时间：'"
                    :key="domain.key"
                    label-width="80px"
                  >
                    <el-time-select
                      editable=true
                      placeholder="起始时间"
                      v-model="domain.startTime"
                      :picker-options="{
                        start: '00:00',
                        step: '00:05',
                        end: '23:59'
                      }">
                    </el-time-select>
                    <el-time-select
                      editable=true
                      placeholder="结束时间"
                      v-model="domain.endTime"
                      :picker-options="{
                        start: '00:00',
                        step: '00:05',
                        end: '23:59',
                        minTime: domain.startTime
                      }">
                    </el-time-select>
                    <el-button @click.prevent="removeDomain(domain)" v-show="index !== 0">删除</el-button>
                  </el-form-item>
                  <el-form-item>
                    <span class="addDomain" @click="addDomain">添加时间</span>
                  </el-form-item>
                </div>
              </template>
            </el-form-item>
            <el-form-item label="外卖预订单：">
              <template>
                <el-checkbox v-model="foodForm.orderChecked">开启外卖预订单</el-checkbox>
              </template>
              <div v-show="foodForm.orderChecked">
                <el-form-item label="最大可预订天数：" label-width="125px">
                  <template>
                    <el-radio-group v-model="foodForm.orderOpen">
                      <el-radio :label="0">仅当天</el-radio>
                      <el-radio :label="1">提前1天</el-radio>
                      <el-radio :label="2">提前2天</el-radio>
                      <el-radio :label="3">提前3天</el-radio>
                      <el-radio :label="4">提前4天</el-radio>
                      <el-radio :label="5">提前5天</el-radio>
                      <el-radio :label="6">提前6天</el-radio>
                      <el-radio :label="7">提前7天</el-radio>
                    </el-radio-group>
                  </template>
                </el-form-item>
                <el-form-item label="间隔时段细分：" label-width="125px">
                  <template>
                    <el-radio-group v-model="foodForm.timeInterval">
                      <el-radio :label="0">15分钟</el-radio>
                      <el-radio :label="1">30分钟</el-radio>
                      <el-radio :label="2">1小时</el-radio>
                    </el-radio-group>
                  </template>
                  <div class="tishi">顾客可选的送达时间的间隔跨度。例14:00、15:00、16:00 (1小时）14:30、15:00、15:30 (30分钟)</div>
                </el-form-item>
                <el-form-item label="预订单提醒时间：" label-width="125px">
                  <template>
                    <el-radio-group v-model="foodForm.orderTime">
                      <el-radio :label="0">送达时间前60分钟<span class="tishi">目前不支持修改</span></el-radio>
                    </el-radio-group>
                  </template>
                </el-form-item>
              </div>
            </el-form-item>
            <el-form-item label="自动接单：">
              <template>
                <el-radio-group v-model="foodForm.automatic">
                  <el-radio :label="0">关闭</el-radio>
                  <el-radio :label="1">开启</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item label="配送方式：">
              <template>
                <el-radio-group v-model="foodForm.modeRadio">
                  <el-radio :label="0">商家自己配送</el-radio>
                  <el-radio :label="1">第三方配送</el-radio>
                </el-radio-group>
              </template>
              <div class="thirdParty" v-show="foodForm.modeRadio === 1">
                <p class="mode">开启后可以选择第三方配送员帮你送餐，该服务产生的配送费用将从店铺余额扣除，请保证店铺余额充足。开启后表示已同意《第三方配送服务协议》。</p>
                <p class="mode">选择第三方配送：</p>
                <template>
                  <el-radio-group v-model="foodForm.thirdParty">
                    <el-radio :label="0">蜂鸟配送</el-radio>
                    <el-radio :label="1">达达配送</el-radio>
                  </el-radio-group>
                </template>
                <p class="mode">接单后自动呼叫第三方：</p>
                <template>
                  <el-radio-group v-model="foodForm.openCall">
                    <el-radio :label="0">关闭</el-radio>
                    <el-radio :label="1">开启</el-radio>
                  </el-radio-group>
                </template>
                <div v-show="foodForm.openCall === 1">配餐时间<el-input class="cateringTime" v-model="foodForm.cateringTime"></el-input>分钟</div>
              </div>
            </el-form-item>
            <el-form-item label="配送设置：">
              <template>
                <el-radio-group v-model="foodForm.distribution" class="distribution">
                  <el-radio :label="0" class="foodRadio radioFood1">按区域固定配送费</el-radio>
                  <div class="distribution_item" v-show="foodForm.distribution === 0">
                    <el-form-item
                      class="addTime"
                      v-for="(fixeds, index) in fixedSet"
                      :label="''"
                      :key="fixeds.key"
                    >
                      起送价：<el-input class="setInput" v-model="fixeds.send"></el-input>元，
                      配送费：<el-input class="setInput" v-model="fixeds.fee"></el-input>元，
                      配送范围：<el-input class="setInput" v-model="fixeds.kilometre"></el-input>公里。
                      <el-button @click.prevent="removeFixed(fixeds)" v-show="index !== 0">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                      <span class="addDomain" @click="addFixed">添加配送区域</span>
                    </el-form-item>
                  </div>
                  <el-radio :label="1" class="foodRadio radioFood2">按距离阶梯配送费</el-radio>
                  <div class="distribution_item" v-show="foodForm.distribution === 1">
                    <div class="addMony">配送费：<el-input class="setInput" v-model="set_rice"></el-input>公里内<el-input class="setInput" v-model="set_money"></el-input>元，每增加<el-input class="setInput" v-model="add_rice"></el-input>公里，配送费增加<el-input class="setInput" v-model="add_money"></el-input>元。</div>
                    <el-form-item
                      class="addTime"
                      v-for="(ladders, index) in ladderSet"
                      :label="''"
                      :key="ladders.key"
                    >
                      起送价：<el-input class="setInput" v-model="ladders.send"></el-input>元，
                      配送范围：<el-input class="setInput" v-model="ladders.kilometre"></el-input>公里。
                      <el-button @click.prevent="removeLadders(ladders)" v-show="index !== 0">删除</el-button>
                    </el-form-item>
                    <el-form-item>
                      <span class="addDomain" @click="addLadders">添加配送区域</span>
                    </el-form-item>
                  </div>
                </el-radio-group>
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addFood">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from '../../plugins/axios'
  const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    layout: 'manage',
    data () {
      return {
        activeName: 'first',
        shopId: '',
        userId: '',
        foodForm: {
          timerRadio: '0',
          orderChecked: false,
          orderOpen: 0,
          timeInterval: 0,
          orderTime: 0,
          automatic: 0,
          // 配送
          modeRadio: 0,
          // 第三方
          thirdParty: 0,
          // 呼叫
          openCall: 0,
          // 配餐时间
          cateringTime: '',
          // 配送设置
          distribution: 0
        },
        // 外卖时间周几
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        // 时分秒
        domains: [{
          startTime: '',
          endTime: ''
        }],
        // 店铺营业时间
        week: '',
        time1: '',
        time2: '',
        time3: '',
        // 固定配置设置
        fixedSet: [{
          send: '',
          fee: '',
          kilometre: ''
        }],
        ladderSet: [{
          send: '',
          kilometre: ''
        }],
        set_rice: '',
        set_money: '',
        add_rice: '',
        add_money: ''
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
      this.dataLoad()
    },
    methods: {
      // 页面数据加载
      dataLoad () {
        axios.post('https://api.doudot.cn/api/plugin.distribution/get?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            console.log(res.data)
            // 店铺时间
            this.week = res.data.shop_time.week
            this.time1 = res.data.shop_time.time1
            this.time2 = res.data.shop_time.time2
            this.time3 = res.data.shop_time.time3
            // 单独设置时间段
            this.checkedCities = res.data.week
            // 时分秒
            this.domains = res.data.time
            // 开启外卖订单
            this.foodForm.orderChecked = res.data.data.preorder
            // 最大天数
            this.foodForm.orderOpen = res.data.data.maxday
            // 每隔时间段
            this.foodForm.timeInterval = res.data.data.Interval_time
            // 订单提醒时间
            this.foodForm.orderTime = res.data.data.remind_time
            // 自动接单
            this.foodForm.automatic = res.data.data.automatic
            // 配送方式
            this.foodForm.modeRadio = res.data.data.Distribution
            // 第三方
            this.foodForm.thirdParty = res.data.data.Take_out
            // 呼叫第三方
            this.foodForm.openCall = res.data.data.third
            // 配餐时间
            this.foodForm.cateringTime = res.data.data.third_time
            // 配送设置单选
            this.foodForm.distribution = res.data.data.give
            // 固定配送
            this.fixedSet = res.data.fixedArray
            // 距离配送费公里
            this.set_rice = res.data.data.set_rice
            this.set_money = res.data.data.set_money
            this.add_rice = res.data.data.add_rice
            this.add_money = res.data.data.add_money
            // 距离起送价 范围
            this.ladderSet = res.data.ladderArray
          }
        })
      },
      // 动态添加时间
      // 删除
      removeDomain (item) {
        var index = this.domains.indexOf(item)
        if (index !== -1) {
          this.domains.splice(index, 1)
        }
      },
      // 添加
      addDomain () {
        this.domains.push({
          startTime: '',
          endTime: '',
          key: Date.now()
        })
      },
      // 动态添加固定范围
      // 删除
      removeFixed (item) {
        var index = this.fixedSet.indexOf(item)
        if (index !== -1) {
          this.fixedSet.splice(index, 1)
        }
      },
      // 添加
      addFixed () {
        this.fixedSet.push({
          send: '',
          fee: '',
          kilometre: '',
          key: Date.now()
        })
      },
      // 动态添加阶梯范围
      // 删除
      removeLadders (item) {
        var index = this.ladderSet.indexOf(item)
        if (index !== -1) {
          this.ladderSet.splice(index, 1)
        }
      },
      // 添加
      addLadders () {
        this.ladderSet.push({
          send: '',
          kilometre: '',
          key: Date.now()
        })
      },
      // 外卖时间
      handleCheckAllChange (val) {
        this.checkedCities = val ? cityOptions : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
      // 顶部点击
      handleClick () {
        this.$router.push({path: '/manage/chajian'})
      },
      // 保存
      addFood () {
        axios.get('https://api.doudot.cn/api/plugin.distribution/edit', { params: {shop_id: this.shopId, businessTime: this.foodForm.timerRadio, week: this.checkedCities, time: this.domains, preorder: this.foodForm.orderChecked, maxday: this.foodForm.orderOpen, Interval_time: this.foodForm.timeInterval, remind_time: this.foodForm.orderTime, automatic: this.foodForm.automatic, Distribution: this.foodForm.modeRadio, Take_out: this.foodForm.thirdParty, third: this.foodForm.openCall, third_time: this.foodForm.cateringTime, give: this.foodForm.distribution, fixedArray: this.fixedSet, ladderArray: this.ladderSet, set_rice: this.set_rice, set_money: this.set_money, add_rice: this.add_rice, add_money: this.add_money} }).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.dataLoad()
          }
        })
      }
    }
  }
</script>

<style scoped>
.zong{background-color: white;}
.heng1{border-bottom: 1px solid #eee;}
.heng{padding: 15px;}
.heng-title{padding-left:50px;}
.heng .el-button{margin-bottom: 15px;}
.content{padding:0 0; font-size: 14px; color: #555;}
.content_p{margin-bottom: 20px;}
/* 导航 */
.crumbsNav {
  color: #555;
}
/* 表单内容 */
.containerFood {
  padding-left: 60px;
}
.crumbs_p {
  padding: 0;
  margin: 0;
  color: #555;
}
.crumbs_p2 {
  line-height: 20px;
  padding-bottom: 20px;
}
.foodRadio {
  display: block;
  line-height: 50px;
}
.radioFood2 {
  margin-left: 0;
}
.radio_content {
  margin-left: 30px;
  color: #555;
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 10px 20px;
}
.orderOpen {
  font-size: 12px;
}
.el-radio+.el-radio {
  margin-left: 20px;
}
.tishi {
  padding-left: 20px;
  color: #999;
  font-size: 13px;
}
.thirdParty {
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 10px;
}
.mode {
  color: #555;
  font-size: 14px;
  margin: 0;
  padding: 0;
  line-height: 25px;
}
.cateringTime {
  width: 100px;
  margin: 0 5px;
}
.addDomain {
  color: #fc9538;
  cursor: pointer;
}
.addTime {
  margin-bottom: 10px;
}
.el-radio-group > .radioFood2 {
  margin-left: 0;
}
.distribution {
  width: 100%;
}
.distribution_item {
  padding-left: 20px;
  color: #555;
  font-size: 13px;
}
.setInput {
  width: 70px;
  margin: 0 5px;
}
.setInput .el-input__inner {
  height: 30px;;
  line-height: 30px;
  padding: 0 5px;
}
.el-button {
  padding: 10px 15px;
}
.addMony {
  height: 60px;
}
</style>
