<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div>应用插件 / 裂变优惠券</div>
        </el-col>
        <el-col class="heng">
          <div>裂变优惠券<span v-show="!show" class="returnOut" @click="returnOut">返回</span></div>
        </el-col>
        <el-col class="heng heng-title">
          <p class="content">您可以设置顾客下单后获得的优惠券，顾客需分享给好友后才能领取，从而拉来更多的顾客。</p>
          <p class="content content_p">如：设置可分享的优惠券数为10张，顾客下单后，分享给好友的同时从中领取1张，最多可有9位好友领取。</p>
          <div v-show="show">
            <el-button type="primary" @click="show = false" size="small">设置裂变优惠券</el-button>
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
            <el-form-item label="优惠券数：" prop="much">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠券：">
              <el-button size="small" @click="pageLoad">选择优惠券</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="addFull('payForm')">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog title="优惠券" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
          <el-table-column property="name" label="券名" width="100"></el-table-column>
          <el-table-column property="denomination" label="面额" width="100"></el-table-column>
          <el-table-column property="total_num" label="数量" width="100"></el-table-column>
          <el-table-column property="amount_limit" label="应达到金额" width="100"></el-table-column>
          <el-table-column property="create_time" label="开始时间"></el-table-column>
          <el-table-column property="update_time" label="结束时间"></el-table-column>
          <el-table-column label="操作" width="100">
            <template scope="scope">
              <el-button type="danger" @click="deleteC(scope.row.couponId)" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
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
        rules: {
          much: [
            { required: true, message: '请输入金额', trigger: 'blur' }
          ]
        },
        payForm: {
          radio: '1',
          startTime: '',
          endTime: '',
          much: ''
        },
        timeQuantum: '',
        dialogTableVisible: false,
        // 优惠券表格
        gridData: [],
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
        value: '10'
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
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
      // 优惠券加载
      pageLoad () {
        // 第一个分组请求
        axios.post('/seller/coupon/couponlist?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.gridData = []
            this.gridData = res.data
            console.log(this.gridData)
            this.dialogTableVisible = true
          }
        })
      },
      // 保存
      addFull (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('https://api.doudot.cn/api/plugin.rebate/add', { shop_id: this.shopId, start_time: this.fullForm.startTime, end_time: this.fullForm.endTime, conditions: this.fullForm.value1, value: this.fullForm.value2 }).then((res) => {
              if (res.data.error) {
                this.$message({
                  type: 'error',
                  message: res.data.error.msg
                })
              } else {
                this.$message({
                  type: 'success',
                  message: res.data.data.msg
                })
              }
            })
          } else {
            return false
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
</style>