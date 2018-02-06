<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div class="crumbsNav">应用插件 / 裂变优惠券</div>
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
          <el-form v-show="!show" :model="fission" :rules="rules" ref="fission" label-width="100px" class="fission">
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
              <el-select v-model="fission.value" placeholder="请选择">
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
              <span class="coupon" v-show="!couponShow">{{couponName}}</span>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="addFission('fission')">保存</el-button>
              <el-button size="small" type="danger" v-show="deleteShow" @click="deleteFission">删除</el-button>
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
        userId: '',
        fission: {
          value: '10',
          coupon_id: '',
          startTime: '',
          endTime: ''
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
      this.fissionLoad()
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
        this.fission.startTime = shijian[0]
        this.fission.endTime = shijian[1]
      },
      // 选择优惠券
      selectCoupon (row) {
        this.fission.coupon_id = row.coupon_id
        this.couponName = row.name
        this.couponShow = false
        this.dialogTableVisible = false
      },
      // 数据加载
      fissionLoad () {
        axios.post('https://api.doudot.cn/api/plugin.fission/get?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
            this.couponShow = true
          } else {
            this.fission = {
              value: res.data.times,
              coupon_id: res.data.coupon_id,
              startTime: res.data.start_time,
              endTime: res.data.end_time
            }
            this.timeQuantum = [res.data.start_time, res.data.end_time]
            this.couponName = res.data.name
            this.couponShow = false
            this.show = false
            this.deleteShow = true
          }
        })
      },
      // 数据删除
      deleteFission () {
        axios.post('https://api.doudot.cn/api/plugin.fission/del?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
            this.couponShow = true
            this.show = false
          } else {
            this.fission = {
              value: res.data.times,
              coupon_id: res.data.coupon_id,
              startTime: res.data.start_time,
              endTime: res.data.end_time
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
        axios.post('/seller/coupon/couponSystemList?shop_id=' + this.shopId).then((res) => {
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
      addFission (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('https://api.doudot.cn/api/plugin.fission/edit', { params: {shop_id: this.shopId, start_time: this.fission.startTime, end_time: this.fission.endTime, times: this.fission.value, coupon_id: this.fission.coupon_id} }).then((res) => {
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