<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div class="crumbsNav">应用插件 / 支付有礼</div>
        </el-col>
        <el-col class="heng">
          <div>支付有礼 <span v-show="!show" class="returnOut" @click="returnOut">返回</span></div>
        </el-col>
        <el-col class="heng heng-title">
          <p class="content">您可以设置顾客在支付成功页领取的游戏券，以吸引顾客再次消费。如：</p>
          <p class="content content_p">「顾客订单满50元，可获得一次游戏抽奖</p>
          <div v-show="show">
            <el-button type="primary" @click="show = false" size="small">设置支付有礼</el-button>
          </div>
          <el-form v-show="!show" :model="payForm" :rules="rules" ref="payForm" label-width="100px" class="payForm">
            <el-form-item 
              label="活动时间：">
              <div class="block">
                <el-date-picker
                  v-model="timeQuantum"
                  range-separator="至"
                  type="datetimerange"
                  @change="timeQuantum1"
                  align="right"
                  placeholder="选择日期范围"
                  :editable="false"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="参与条件：" prop="much">
              <div>满足指定订单金额，订单满<el-input class="radioInput" type="" v-model="payForm.much"></el-input>元可参加</div>
            </el-form-item>
            <el-form-item label="抽奖次数：">
              <el-select v-model="payForm.value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="addFull('payForm')">保存</el-button>
              <el-button size="small" type="danger" v-show="deleteShow" @click="deleteFull">删除</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'manage',
    data () {
      return {
        activeName: 'first',
        show: true,
        shopId: 0,
        userId: '',
        rules: {
          much: [
            { required: true, message: '请输入金额', trigger: 'blur' }
          ]
        },
        payForm: {
          startTime: '',
          endTime: '',
          value: '10',
          much: ''
        },
        timeQuantum: [],
        // 下拉
        options: [{
          value: '10',
          label: '10'
        }, {
          value: '9',
          label: '9'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '1',
          label: '1'
        }],
        deleteShow: false
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
      this.payList()
    },
    methods: {
      // 返回按钮
      returnOut () {
        this.show = true
      },
      // 顶部点击
      handleClick () {
        this.$router.push({path: '/manage/chajian'})
      },
      // 时间设置
      timeQuantum1 (shijian) {
        this.payForm.startTime = shijian[0]
        this.payForm.endTime = shijian[1]
      },
      // 保存
      addFull (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('https://api.doudot.cn/api/plugin.gift/edit', { params: {shop_id: this.shopId, start_time: this.payForm.startTime, end_time: this.payForm.endTime, conditions: this.payForm.much, value: this.payForm.value} }).then((res) => {
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
                this.handleClick()
              }
            })
          } else {
            return false
          }
        })
      },
      // 加载
      payList () {
        axios.post('https://api.doudot.cn/api/plugin.gift/getgift?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
            this.show = true
          } else {
            this.payForm = {
              startTime: res.data.start_time,
              endTime: res.data.end_time,
              value: res.data.value,
              much: res.data.conditions
            }
            this.timeQuantum = [res.data.start_time, res.data.end_time]
            this.show = false
            this.deleteShow = true
          }
        })
      },
      // 删除
      deleteFull () {
        axios.post('https://api.doudot.cn/api/plugin.gift/del?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
            this.show = false
          } else {
            this.payForm = {
              startTime: '',
              endTime: '',
              value: '10',
              much: ''
            }
            this.timeQuantum = []
            this.show = true
            this.deleteShow = false
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
.hangL{color: #999;line-height: 30px;text-align: right;font-size: 16px;}
.hangR{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR1{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR .el-button{margin-left: 20px;font-size: 16px;padding: 7px 0;}
.hangIn:nth-child(1){margin-top: 40px;}
.hangIn{margin-bottom: 40px;}
.hangR .el-input{width: 40%;min-width:200px;}
.hangR p{color:#999;font-size: 14px;}
a{color:#fdaa60;}
.returnOut {
  margin-left: 20px;
  color: #fc9538;
  cursor: pointer;
}
.radioInput {
  width: 80px;
  margin: 0 5px;
}
.crumbsNav {
  color: #555;
}
</style>
