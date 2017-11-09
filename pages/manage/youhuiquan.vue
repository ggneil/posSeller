<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="优惠券管理" name="first">
        <div v-show="show">
          <el-row class="henglan">
            <el-col :span="2">
              <el-button class="btn" type="primary" @click="newGoods">新建优惠券</el-button>
            </el-col>
            <el-col :span="10" :offset="11">
              <!--<el-select class="Inp" v-model="value" placeholder="请选择" @change="handleStatusSelect">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input class="Inp Inp2" v-model="input" placeholder="搜索优惠券..." @change="searchGoods"></el-input>-->
            </el-col>
          </el-row>
          <el-row>
            <el-col class="dish-content">
              <el-table
                :data="tableData1"
                style="width: 100%">
                <el-table-column
                  label="券名"
                  width="140">
                  <template scope="scope">
                    <el-row>
                      <el-col>
                        {{scope.row.couponName}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  label="面额"
                  width="140">
                  <template scope="scope">
                    <el-row>
                      <el-col>
                        {{scope.row.denomination}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  label="数量"
                  width="140">
                  <template scope="scope">
                    <el-row>
                      <el-col>
                        {{scope.row.num}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  label="应达到金额"
                  width="140">
                  <template scope="scope">
                    <el-row>
                      <el-col>
                        {{scope.row.xianzhi}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  label="开始时间"
                  width="200">
                  <template scope="scope">
                    <el-row>
                      <el-col>
                        {{scope.row.startTime}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  label="结束时间"
                  width="200">
                  <template scope="scope">
                    <el-row>
                      <el-col>
                        {{scope.row.endTime}}
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column 
                 label="操作">
                  <template scope="scope">
                    <el-button
                      disabled
                      :type="scope.row.couponStatus === '不可用' ? 'danger' : 'primary'"
                      size="small">{{ scope.row.couponStatus }}</el-button>
                    <el-button
                      size="small"
                      @click="handleEdit2(scope.$index, scope.row)">{{ scope.row.couponStatusBtn }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
        <div v-show="!show">
          <el-row class="henglan">
            <el-col :span="4">优惠券管理 / 新建优惠券</el-col>
          </el-row>
          <div class="bgWhite">
            <!--添加商品表单-->
            <el-form label-width="100px" label-position="left" :model="formAddCoupon" :rules="rules" ref="formAddCoupon">
              <el-form-item label="券名：" prop="name">
                <el-input v-model="formAddCoupon.name" placeholder="商品名称（最多40字）" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="面额：" prop="denomination">
                <el-input type="number" v-model="formAddCoupon.denomination" placeholder="00.00"></el-input>
              </el-form-item>
              <el-form-item label="达到金额：" prop="amountLimit">
                <el-input type="number" v-model="formAddCoupon.amountLimit" placeholder="00.00"></el-input>
              </el-form-item>
              <el-form-item label="数量：" prop="totalNum">
                <el-input type="number" v-model="formAddCoupon.totalNum" placeholder="1000"></el-input>
              </el-form-item>
              <el-form-item 
                label="时间范围：" 
                :rules="[
                  { required: true, message: '请选择用券时间' },
                ]">
                <div class="block">
                  <el-date-picker
                    v-model="timeQuantum"
                    type="datetimerange"
                    @change="timeQuantum1"
                    align="right"
                    placeholder="选择日期范围"
                    :editable="false"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-button type="primary" class="btn" @click="submitForm('formAddCoupon')">保存</el-button>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="积分管理" name="second">
        <el-row class="henglan">
          <el-col :span="10">
            <el-select class="Inp" v-model="value1" placeholder="请选择" @change="handleStatusSelect1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input class="Inp Inp2" v-model="input1" placeholder="搜索商品..." @change="searchGoods1"></el-input>
          </el-col>
        </el-row>
        <el-table
          :data="goodsData"
          border
          style="width: 100%">
          <el-table-column
            label="商品">
            <template scope="scope">
              <el-row>
                <el-col :span="4">
                  <img class="imgSize" :src="scope.row.ico"/>
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-col>
                      <span style="margin-left: 10px">{{ scope.row.name }}</span> 
                    </el-col> 
                  </el-row>
                  <el-row>
                    <el-col>
                      <span style="margin-left: 10px">{{ scope.row.price }}</span>
                    </el-col> 
                  </el-row>
                </el-col> 
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="积分开启/编辑">
            <template scope="scope">
              <el-button
                disabled
                :type="scope.row.integrationStatus === '积分兑换未开启' ? 'danger' : 'primary'"
                size="small">{{ scope.row.integrationStatus }}</el-button>
              <el-button
                size="small"
                @click="handleEdit3(scope.$index, scope.row)">{{ scope.row.integrationStatusBtn }}</el-button>
              <el-button
                :disabled="scope.row.integrationStatus === '积分兑换未开启' ? 'disabled' : false"
                size="small"
                @click="handleEdit4(scope.$index, scope.row)">设置积分</el-button>
              <el-button
                disabled
                :type="scope.row.integrationStatus === '积分兑换未开启' ? '' : 'primary'"
                size="small">{{ scope.row.integrationNum + '积分' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
  import axios from '../../plugins/axios'
  var zhuangtai = ''
  var zhuangtaiBtn = ''
  var goods = ''
  var url = 'http://pos.wangdoukeji.com/'
  function timer (aaa) {
    return new Date(parseInt(aaa) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
  }
  export default {
    layout: 'manage',
    data () {
      // 上传商品表单验证
      var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('钱数格式不正确（例：12.00）小数位不得超过两位'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('钱数格式不正确（例：12.00）小数位不得超过两位'))
          } else {
            callback()
          }
        }
      }
      return {
        goodsData: [],
        // 时间段选择
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() < Date.now()
          }
        },
        zhuangtai: '',
        zhuangtaiBtn: '',
        shopId: '',
        input: '',
        ico: '',
        input1: '',
        imgId: 0,
        groupId: '',
        navId: '',
        goodsId: '',
        integrationNum: '',
        integrationStatus: '',
        integrationStatusBtn: '',
        value: '所有状态', // 下拉框默认选项
        value1: '所有状态', // 下拉框默认选项
        activeName: 'first', // 第一个显示 商品管理
        bianji: '', // 编辑的组
        addGroup: '', // 添加的组
        firstShow: false, // 商品管理
        show: true, // 新建商品
        hide: false,
        imageUrl: '', // 图片显示
        // ajax
        groupResult: [],
        // 组商品
        groupGoods: [],
        // 规则
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          denomination: [{ required: true, validator: validateMobile, trigger: 'blur' }],
          amountLimit: [{ required: true, validator: validateMobile, trigger: 'blur' }],
          totalNum: [{ required: true, message: '设置库存', trigger: 'blur' }]
        },
        // 表单
        timeQuantum: '',
        formAddCoupon: {
          name: '',
          denomination: '',
          totalNum: '',
          amountLimit: '',
          startTime: '',
          endTime: ''
        },
        // 表格
        tableData: [],
        tableData1: [],
        // 下拉框
        options: [{
          value: '所有状态',
          label: '所有状态'
        }, {
          value: '已下架',
          label: '已下架'
        }, {
          value: '已上架',
          label: '已上架'
        }],
        options1: [{
          value: '所有状态',
          label: '所有状态'
        }, {
          value: '已开启积分兑换',
          label: '已开启积分兑换'
        }]
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      // 页面加载请求
      this.pageLoad()
      this.goodsLoad()
    },
    methods: {
      // 搜索商品
      searchGoods1 (value) {
        this.searchLoad(value)
      },
      // 搜索商品加载
      searchLoad (value) {
        axios.post('/seller/Integral_Goods/queryGoods?shop_id=' + this.shopId + '&goods_name=' + value).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.value1 = '所有状态'
            this.goodsData = []
            goods = res.data.goods
            for (var keys in goods) {
              if (goods[keys].chang_status === 1) {
                this.integrationStatus = '积分兑换已开启'
                this.integrationStatusBtn = '关闭积分兑换'
              } else {
                this.integrationStatus = '积分兑换未开启'
                this.integrationStatusBtn = '开启积分兑换'
              }
              if (goods[keys].integral === null || goods[keys].integral === undefined) {
                this.integral = 0
              } else {
                this.integral = goods[keys].integral
              }
              if (goods[keys].path === null) {
                this.ico = ''
              } else {
                this.ico = url + goods[keys].path.replace(/\\/, '')
              }
              this.goodsData.push({
                ico: this.ico,
                name: goods[keys].goods_name,
                price: goods[keys].goods_price + '元',
                integrationNum: this.integral,
                integrationStatus: this.integrationStatus,
                integrationStatusBtn: this.integrationStatusBtn,
                goodsId: goods[keys].goods_id,
                shopId: goods[keys].shop_id
              })
            }
          }
        })
      },
      // 积分状态查看
      handleStatusSelect1 (label) {
        this.input1 = ''
        if (label === '所有状态') {
          this.goodsLoad()
        } else {
          this.goodsData = []
          axios.post('/seller/Integral_Goods/query?shop_id=' + this.shopId).then((res) => {
            goods = res.data.goods
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              goods = res.data.integral_goods
              for (var keys in goods) {
                if (goods[keys].chang_status === 1) {
                  this.integrationStatus = '积分兑换已开启'
                  this.integrationStatusBtn = '关闭积分兑换'
                } else {
                  this.integrationStatus = '积分兑换未开启'
                  this.integrationStatusBtn = '开启积分兑换'
                }
                if (goods[keys].integral === null || goods[keys].integral === undefined) {
                  this.integral = 0
                } else {
                  this.integral = goods[keys].integral
                }
                if (goods[keys].path === null) {
                  this.ico = ''
                } else {
                  this.ico = url + goods[keys].path.replace(/\\/, '')
                }
                this.goodsData.push({
                  ico: this.ico,
                  name: goods[keys].goods_name,
                  price: goods[keys].goods_price + '元',
                  integrationNum: this.integral,
                  integrationStatus: this.integrationStatus,
                  integrationStatusBtn: this.integrationStatusBtn,
                  goodsId: goods[keys].goods_id,
                  shopId: goods[keys].shop_id
                })
              }
            }
          })
        }
      },
      timeQuantum1 (shijian) {
        this.formAddCoupon.startTime = shijian[0]
        this.formAddCoupon.endTime = shijian[1]
      },
      // 页面加载
      pageLoad () {
        // 第一个分组请求
        axios.post('/seller/coupon/couponlist?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.groupGoods = res.data
            this.tableData1 = []
            for (var keys in this.groupGoods) {
              if (this.groupGoods[keys].status === 1) {
                console.log(1)
                zhuangtai = '可使用'
                zhuangtaiBtn = '下架'
                this.tableData1.push({ num: this.groupGoods[keys].total_num, couponName: this.groupGoods[keys].name, denomination: this.groupGoods[keys].denomination + '元', couponId: this.groupGoods[keys].coupon_id, couponStatus: zhuangtai, couponStatusBtn: zhuangtaiBtn, startTime: timer(this.groupGoods[keys].use_start_time), endTime: timer(this.groupGoods[keys].use_end_time), xianzhi: this.groupGoods[keys].amount_limit + '元' })
              } else {
                console.log(2)
                zhuangtai = '不可用'
                zhuangtaiBtn = '上架'
                this.tableData1.push({ num: this.groupGoods[keys].total_num, couponName: this.groupGoods[keys].name, denomination: this.groupGoods[keys].denomination + '元', couponId: this.groupGoods[keys].coupon_id, couponStatus: zhuangtai, couponStatusBtn: zhuangtaiBtn, startTime: timer(this.groupGoods[keys].use_start_time), endTime: timer(this.groupGoods[keys].use_end_time), xianzhi: this.groupGoods[keys].amount_limit + '元' })
              }
            }
          }
        })
      },
      // 积分商品列表加载
      goodsLoad () {
        axios.post('/seller/Integral_Goods/getGoodsList?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            goods = res.data.goods
            this.goodsData = []
            for (var keys in goods) {
              if (goods[keys].chang_status === 1) {
                this.integrationStatus = '积分兑换已开启'
                this.integrationStatusBtn = '关闭积分兑换'
              } else {
                this.integrationStatus = '积分兑换未开启'
                this.integrationStatusBtn = '开启积分兑换'
              }
              if (goods[keys].integral === null || goods[keys].integral === undefined) {
                this.integral = 0
              } else {
                this.integral = goods[keys].integral
              }
              if (goods[keys].path === null) {
                this.ico = ''
              } else {
                this.ico = url + goods[keys].path.replace(/\\/, '')
              }
              this.goodsData.push({
                ico: this.ico,
                name: goods[keys].goods_name,
                price: goods[keys].goods_price + '元',
                integrationNum: this.integral,
                integrationStatus: this.integrationStatus,
                integrationStatusBtn: this.integrationStatusBtn,
                goodsId: goods[keys].goods_id,
                shopId: goods[keys].shop_id
              })
            }
          }
        })
      },
      // 表单提交
      submitForm (formName, style) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/seller/coupon/create', { shop_id: this.shopId, name: this.formAddCoupon.name, denomination: this.formAddCoupon.denomination, total_num: this.formAddCoupon.totalNum, amount_limit: this.formAddCoupon.amountLimit, use_start_time: this.formAddCoupon.startTime, use_end_time: this.formAddCoupon.endTime }).then((res) => {
              if (res.data.error) {
                console.log(res.data.error.msg)
                console.log(this.formAddCoupon)
              } else {
                this.timeQuantum = ''
                this.formAddCoupon = {
                  name: '',
                  denomination: '',
                  totalNum: '',
                  amountLimit: '',
                  startTime: '',
                  endTime: ''
                }
                this.pageLoad()
                this.handleShow()
              }
            })
            console.log('成功')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 顶部nav点击、打开、关闭事件
      handleClick (tab, event) {
        this.show = true
        this.value1 = '所有状态'
        this.input1 = ''
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      // 商品删除组
      handleDelete1 (index, row) {
        this.$confirm('是否删除' + row[index].goodsName + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/seller/Goods/deleteGoods', { goods_id: row[index].goodsId }).then((res) => {
            if (res.data.error) {
              console.log(res.data.error.msg)
            } else {
              row.splice(index, 1)
              this.pageLoad()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleEdit2 (index, row) {
        axios.post('/seller/coupon/changStatus?coupon_id=' + row.couponId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.pageLoad()
          }
        })
      },
      handleEdit3 (index, row) {
        if (row.integrationStatusBtn === '开启积分兑换') {
          axios.post('/seller/Integral_Goods/add?goods_id=' + row.goodsId + '&integral=100').then((res) => {
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '积分兑换开启成功，请设置你的积分值'
              })
              this.goodsData[index].integrationStatus = '积分兑换已开启'
              this.goodsData[index].integrationStatusBtn = '关闭积分兑换'
            }
          })
        } else {
          axios.post('/seller/Integral_Goods/delete?goods_id=' + row.goodsId).then((res) => {
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '积分兑换关闭成功'
              })
              this.goodsData[index].integrationStatus = '积分兑换未开启'
              this.goodsData[index].integrationStatusBtn = '开启积分兑换'
            }
          })
        }
      },
      // 修改积分
      handleEdit4 (index, row) {
        this.$prompt('请输入积分数量', '积分设置', {
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '请输入正整数',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: row.integrationNum
        }).then(({ value }) => {
          axios.post('/seller/Integral_Goods/edit', { goods_id: row.goodsId, integral: value }).then((res) => {
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '修改积分成功: ' + value
              })
              row.integrationNum = value
            }
          })
        }).catch(() => {
          console.log(1)
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 新建商品
      newGoods () {
        this.handleShow()
        this.formAddCoupon = {
          name: '',
          denomination: '',
          totalNum: '',
          amountLimit: '',
          startTime: '',
          endTime: ''
        }
        this.imageUrl = ''
        this.imgId = 0
      },
      // 隐藏切换
      handleShow () {
        if (this.show === true) {
          this.show = false
        } else {
          this.show = true
        }
      }
    }
  }
</script>
<style>
  .el-table td, .el-table th {
    padding: 12px 10px;
  }
 /*图片上传*/
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  /*图片上传结束*/
 .el-tabs__header{margin-bottom: 0}
 .secondNav{text-align: center;border-bottom: 1px solid #eee;padding:10px 20px;line-height: 20px;height: inherit;white-space: inherit}
 .henglan{padding: 10px 20px;border-bottom: 1px solid #eee;}
 .btn{padding: 10px 18px}
 .Inp{width: 47.5%;}
 .Inp2{margin-left: 5%;}
 .dish-content{height: 100%;background-color: white;min-height: 480px;overflow: auto;border-left: 1px solid #eee;}
 .bgWhite{background-color: white;padding: 30px 40px;}
 .imgSize{width: 40px;height: 40px;}
</style>
