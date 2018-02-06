<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div class="crumbsNav">应用插件 / 进店有礼</div>
        </el-col>
        <el-col class="heng">
          <div>进店有礼 <span v-show="!show" class="returnOut" @click="returnOut">返回</span></div>
        </el-col>
        <el-col class="heng heng-title">
          <p class="content content_p">您可以设置赠送给新顾客的专享礼包，在新顾客进入您的店铺主页、外卖页、堂食点餐页时，获得礼包促成消费。</p>
          <div v-show="show">
            <el-button type="primary" @click="show = false" size="small">设置进店有礼</el-button>
          </div>
          <el-form v-show="!show" :model="enterForm" :rules="rules" ref="enterForm" label-width="100px" class="enterForm">
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
            <el-form-item label="优惠券：">
              <el-button size="small" @click="pageLoad">选择优惠券</el-button>
              <span class="coupon" v-show="!couponShow">{{couponName}}</span>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="addEnter('enterForm')">保存</el-button>
              <el-button size="small" type="danger" v-show="deleteShow" @click="deleteEnter">删除</el-button>
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
              <el-button type="danger" @click="selectCoupon(scope.row)" size="small">选择</el-button>
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
        enterForm: {
          startTime: '',
          endTime: '',
          // 优惠券id
          coupon_id: ''
        },
        timeQuantum: '',
        dialogTableVisible: false,
        // 优惠券表格
        gridData: [],
        // 优惠券按钮
        couponShow: true,
        // 优惠券名称
        couponName: '',
        deleteShow: false
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
      this.enterLoad()
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
        this.enterForm.startTime = shijian[0]
        this.enterForm.endTime = shijian[1]
      },
      // 选择优惠券
      selectCoupon (row) {
        this.enterForm.coupon_id = row.coupon_id
        this.couponName = row.name
        this.couponShow = false
        this.dialogTableVisible = false
      },
      // 进店有利加载
      enterLoad () {
        axios.post('https://api.doudot.cn/api/plugin.New_user/get?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
            this.couponShow = true
          } else {
            this.enterForm = {
              startTime: res.data.start_time,
              endTime: res.data.end_time,
              coupon_id: res.data.coupon_id
            }
            this.timeQuantum = [res.data.start_time, res.data.end_time]
            this.couponName = res.data.name
            this.couponShow = false
            this.show = false
            this.deleteShow = true
          }
        })
      },
      // 删除
      deleteEnter () {
        axios.post('https://api.doudot.cn/api/plugin.New_user/del?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
            this.couponShow = false
            this.show = false
          } else {
            this.enterForm = {
              startTime: '',
              endTime: '',
              coupon_id: ''
            }
            this.timeQuantum = []
            this.couponName = ''
            this.couponShow = true
            this.show = true
            this.deleteShow = false
          }
        })
      },
      // 优惠券加载
      pageLoad () {
        // 第一个分组请求
        axios.post('https://api.doudot.cn/seller/coupon/couponSystemList?shop_id=' + this.shopId).then((res) => {
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
      addEnter (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('https://api.doudot.cn/api/plugin.New_user/edit', { params: {shop_id: this.shopId, start_time: this.enterForm.startTime, end_time: this.enterForm.endTime, coupon_id: this.enterForm.coupon_id} }).then((res) => {
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
.coupon {
  padding-left: 20px;
}
.crumbsNav {
  color: #555;
}
</style>
