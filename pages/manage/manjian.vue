<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div class="crumbsNav">应用插件 / 满减</div>
        </el-col>
        <el-col class="heng">
          <div>满减</div>
        </el-col>
        <el-col class="heng heng-title">
          <p class="content">您可以设置顾客订单满指定金额后，可享受相应优惠。如「订单满50元减20元；满100元减40元，并免配送费」。</p>
          <p class="content content_p">满减活动当前仅支持在线外卖点餐时有效。</p>
          <div v-show="show">
            <el-button type="primary" @click="show = false" class="fullBtn" size="small">添加满减活动</el-button>
            <el-table
              :data="fullTableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="活动名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="conditions"
                label="订单金额"
                width="200">
              </el-table-column>
              <el-table-column
                prop="value"
                label="减免金额"
                width="200">
              </el-table-column>
              <el-table-column
                label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="fullDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-form v-show="!show" :model="fullForm" :rules="rules" ref="fullForm" label-width="100px" class="fullForm">
            <el-form-item 
              label="时间范围：">
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
            <el-form-item :label="'订单金额：'" prop="value1">
              <el-input type="number" v-model="fullForm.value1" placeholder="订单金额" class="spec specInput"></el-input>
            </el-form-item>
            <el-form-item :label="'减免金额：'" prop="value2">
              <el-input type="number" v-model="fullForm.value2" placeholder="减免金额" class="spec specInput"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="addFull('fullForm')">保存</el-button>
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
        rules: {
          time: [
            { required: true, message: '请设置活动时间', trigger: 'change' }
          ],
          value1: [
            { required: true, message: '请设置活动时间', trigger: 'blur' }
          ],
          value2: [
            { required: true, message: '请设置活动时间', trigger: 'blur' }
          ]
        },
        fullForm: {
          startTime: '',
          endTime: '',
          value1: '',
          value2: ''
        },
        timeQuantum: '',
        fullTableData: []
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
      this.fullList()
    },
    methods: {
      handleClick () {
        this.$router.push({path: '/manage/chajian'})
      },
      // 时间设置
      timeQuantum1 (shijian) {
        this.fullForm.startTime = shijian[0]
        this.fullForm.endTime = shijian[1]
      },
      addFull (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('https://api.doudot.cn/api/plugin.rebate/add', { params: {shop_id: this.shopId, start_time: this.fullForm.startTime, end_time: this.fullForm.endTime, conditions: this.fullForm.value1, value: this.fullForm.value2} }).then((res) => {
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
                this.fullList()
                this.show = true
                this.fullForm = {
                  startTime: '',
                  endTime: '',
                  value1: '',
                  value2: ''
                }
              }
            })
          } else {
            return false
          }
        })
      },
      // 列表
      fullList () {
        axios.post('https://api.doudot.cn/api/plugin.rebate/get?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.fullTableData = res.data
          }
        })
      },
      // 删除
      fullDelete (row) {
        axios.post('https://api.doudot.cn/api/plugin.rebate/del', {id: row.id}).then((res) => {
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
            this.fullList()
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
.specInput {
  float: left;
  width: 25%;
  margin-right: 2%;
}
.addFullBtn {
  font-size: 13px;
  padding: 10px 15px;
}
.specDelete {
  color: #fc9538;
  padding: 10px 20px;
  cursor: pointer;
}
.crumbsNav {
  color: #555;
}
</style>
