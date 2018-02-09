<template>
	<div>
	  <el-tabs v-model="activeName">
		  <el-tab-pane class="container" label="扫码买单" name="first">
		  	<el-input class="frinp" v-model="hao" placeholder="收货人姓名、电话或订单号"></el-input>
		    <el-date-picker class="time1" v-model="value1" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" @change="timeCheck1" align="right" :picker-options="pickerOptions1" :editable="false"></el-date-picker>
		    <span class="zhi">至</span>
		    <el-date-picker class="time2" v-model="value2" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" @change="timeCheck2" align="right" :editable="false"></el-date-picker>
		    <div class="btn_div">
		    	<el-button class="search" @click="handleSearch">搜索</el-button>
		    	<el-button class="reset" @click="handleReset">重置</el-button>
		    </div>
		    <div class="nav_div">
		    	<el-tabs class="nav_bar" v-model="activeName1" type="card" @tab-click="handleClick">
				    <el-tab-pane class="bar_active" label="全部" name="all" @open="orderLoad('/seller/Order/all?shop_id=' + shopId + '&type=0')"></el-tab-pane>
				    <el-tab-pane label="未完成" name="undone" @open="undoneOrderLoad"></el-tab-pane>
				    <el-tab-pane label="已完成" name="done" @open="doneOrderLoad"></el-tab-pane>
				  </el-tabs>
					<div class="order_list">
						<el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%">
							<el-table-column prop="order_number" sortable label="订单号" width="180"></el-table-column>
							<el-table-column prop="user_name" label="用户名" width="100"></el-table-column>
							<el-table-column prop="pay_status" label="支付状态" width="100"></el-table-column>
							<el-table-column prop="order_status" label="订单状态" width="100" show-overflow-tooltip></el-table-column>
							<el-table-column prop="money_number" sortable label="金额" width="80"></el-table-column>
							<el-table-column prop="pay_type" label="支付类型" width="80"></el-table-column>
							<el-table-column prop="order_tel" label="电话" width="120"></el-table-column>
							<el-table-column prop="time" label="下单时间" width="180"></el-table-column>
							<el-table-column label="操作" show-overflow-tooltip>
								<template scope="scope">
									<el-button @click="{orderWatch(scope.row), dialogTableVisible=true}" type="text" size="small">查看</el-button>
									<el-button v-show="orderPaidBtn" @click="orderUpdate(scope.row)" type="text" size="small">已支付</el-button>
									<el-button v-show="orderRemoveBtn" @click="orderRemove(scope.row)" type="text" size="small">移除订单</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--<div class="block fenye">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange":current-page.sync="currentPage3":page-size="100"layout="prev, pager, next, jumper":total="1000"></el-pagination>
						</div>-->
					</div>
          <el-dialog title="订单列表" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="goodsName" label="商品" width="150"></el-table-column>
              <el-table-column property="goodsNum" label="数量" width="200"></el-table-column>
              <el-table-column property="goodsPrice" label="价格（元）"></el-table-column>
            </el-table>
          </el-dialog>
		    </div>
		  </el-tab-pane>
		  <el-tab-pane class="container" label="堂食点餐" name="second">
        <el-input class="frinp" v-model="hao" placeholder="收货人姓名、电话或订单号"></el-input>
		    <el-date-picker class="time1" value-format="yyyy-MM-dd HH:mm:ss" v-model="value1" type="datetime" placeholder="选择日期时间" @change="timeCheck11" align="right" :picker-options="pickerOptions1" :editable="false"></el-date-picker>
		    <span class="zhi">至</span>
		    <el-date-picker class="time2" v-model="value2" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" @change="timeCheck3" align="right" :editable="false"></el-date-picker>
		    <div class="btn_div">
		    	<el-button class="search" @click="handleSearch1">搜索</el-button>
		    	<el-button class="reset" @click="handleReset1">重置</el-button>
		    </div>
		    <div class="nav_div">
		    	<el-tabs class="nav_bar" v-model="activeName2" type="card" @tab-click="handleClick1">
				    <el-tab-pane class="bar_active" label="全部" name="all" @open="orderLoad1('/seller/Order/all?shop_id=' + shopId + '&type=1')"></el-tab-pane>
				    <el-tab-pane label="未完成" name="undone" @open="undoneOrderLoad1"></el-tab-pane>
				    <el-tab-pane label="已完成" name="done" @open="doneOrderLoad1"></el-tab-pane>
				  </el-tabs>
					<div class="order_list">
						<el-table ref="multipleTable1" :data="tableData4" border tooltip-effect="dark" style="width: 100%">
							<el-table-column prop="order_number" sortable label="订单号" width="180"></el-table-column>
							<el-table-column prop="user_name" label="用户名" width="100"></el-table-column>
							<el-table-column prop="pay_status" label="支付状态" width="100"></el-table-column>
							<el-table-column prop="order_status" label="订单状态" width="100" show-overflow-tooltip></el-table-column>
							<el-table-column prop="money_number" sortable label="金额" width="80"></el-table-column>
							<el-table-column prop="pay_type" label="支付类型" width="80"></el-table-column>
							<el-table-column prop="tableNo" label="桌号" width="80"></el-table-column>
							<el-table-column prop="order_tel" label="电话" width="120"></el-table-column>
							<el-table-column prop="time" label="下单时间" width="180"></el-table-column>
							<el-table-column label="操作" show-overflow-tooltip>
								<template scope="scope">
									<el-button @click="{orderWatch(scope.row), dialogTableVisible1=true}" type="text" size="small">查看</el-button>
									<!-- <el-button v-show="orderPaidBtn1" @click="orderUpdate(scope.row)" type="text" size="small">已支付</el-button> -->
                  <el-button v-show="orderRemoveBtn1" @click="orderRemove(scope.row)" type="text" size="small">移除订单</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--<div class="block fenye">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange":current-page.sync="currentPage3":page-size="100"layout="prev, pager, next, jumper":total="1000"></el-pagination>
						</div>-->
					</div>
          <el-dialog title="订单列表" :visible.sync="dialogTableVisible1">
            <el-table :data="gridData1">
              <el-table-column property="goodsName" label="商品" width="150"></el-table-column>
              <el-table-column property="goodsNum" label="数量" width="200"></el-table-column>
              <el-table-column property="goodsPrice" label="价格（元）"></el-table-column>
            </el-table>
          </el-dialog>
		    </div>
      </el-tab-pane>
		  <el-tab-pane class="container" label="外卖" name="third">
        <el-input class="frinp" v-model="hao" placeholder="收货人姓名、电话或订单号"></el-input>
		    <el-date-picker class="time1" v-model="value1" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" @change="timeCheck12" align="right" :picker-options="pickerOptions1" :editable="false"></el-date-picker>
		    <span class="zhi">至</span>
		    <el-date-picker class="time2" v-model="value2" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" @change="timeCheck4" align="right" :editable="false"></el-date-picker>
		    <div class="btn_div">
		    	<el-button class="search" @click="handleSearch2">搜索</el-button>
		    	<el-button class="reset" @click="handleReset2">重置</el-button>
		    </div>
		    <div class="nav_div">
		    	<el-tabs class="nav_bar" v-model="activeName3" type="card" @tab-click="handleClick2">
				    <el-tab-pane class="bar_active" label="全部" name="all" @open="orderLoad2('/seller/Order/all?shop_id=' + shopId + '&type=2')"></el-tab-pane>
				    <el-tab-pane label="未完成" name="undone" @open="undoneOrderLoad2"></el-tab-pane>
				    <el-tab-pane label="已完成" name="done" @open="doneOrderLoad2"></el-tab-pane>
				  </el-tabs>
					<div class="order_list">
						<el-table ref="multipleTable2" :data="tableData5" border tooltip-effect="dark" style="width: 100%">
							<el-table-column prop="order_number" sortable label="订单号" width="180"></el-table-column>
							<el-table-column prop="user_name" label="用户名" width="100"></el-table-column>
							<el-table-column prop="pay_status" label="支付状态" width="80"></el-table-column>
							<el-table-column prop="order_status" label="订单状态" width="80" show-overflow-tooltip></el-table-column>
							<el-table-column prop="money_number" sortable label="金额" width="80"></el-table-column>
							<el-table-column prop="pay_type" label="支付类型" width="80"></el-table-column>
							<el-table-column prop="order_tel" label="电话" width="110"></el-table-column>
							<el-table-column prop="address" label="地址" width="120"></el-table-column>
							<el-table-column prop="time" label="下单时间" width="180"></el-table-column>
							<el-table-column label="操作" show-overflow-tooltip>
								<template scope="scope">
									<el-button @click="{orderWatch(scope.row), dialogTableVisible2=true}" type="text" size="small">查看</el-button>
									<el-button v-show="orderPaidBtn2" @click="orderUpdate(scope.row)" type="text" size="small">已支付</el-button>
									<el-button v-show="orderRemoveBtn2" @click="orderRemove(scope.row)" type="text" size="small">移除订单</el-button>
								</template>
							</el-table-column>
						</el-table>
						<!--<div class="block fenye">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange":current-page.sync="currentPage3":page-size="100"layout="prev, pager, next, jumper":total="1000"></el-pagination>
						</div>-->
					</div>
          <el-dialog title="订单列表" :visible.sync="dialogTableVisible2">
            <el-table :data="gridData2">
              <el-table-column property="goodsName" label="商品" width="150"></el-table-column>
              <el-table-column property="goodsNum" label="数量" width="200"></el-table-column>
              <el-table-column property="goodsPrice" label="价格（元）"></el-table-column>
            </el-table>
          </el-dialog>
		    </div>
      </el-tab-pane>
	  </el-tabs>
	</div>
</template>

<script>
	import axios from '../../plugins/axios'
	var payStatus = ''
	var orderStatus = ''
	var userName = ''
var orderTime = ''
var payType = ''
export default {
	  layout: 'manage',
  data () {
    return {
      shopId: '',
      orderPaidBtn: false,
      orderPaidBtn1: false,
      orderPaidBtn2: false,
      orderRemoveBtn: false,
      orderRemoveBtn1: false,
      orderRemoveBtn2: false,
      gridData: [],
      gridData1: [],
      gridData2: [],
      dialogTableVisible: false,
      dialogTableVisible1: false,
      dialogTableVisible2: false,
      hao: '',
      orderStatus: '全部',
      orderStatus1: '全部',
      orderStatus2: '全部',
      activeName: 'first',
      activeName1: 'all',
      activeName2: 'all',
      activeName3: 'all',
      pickerOptions1: {
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
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      tableData3: [],
      tableData4: [],
      tableData5: [],
      multipleSelection: []
    }
	  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    // this.shopId = 1
    if (this.$route.query.id === 2) {
      this.activeName = 'second'
    } else if (this.$route.query.id === 3) {
      this.activeName = 'third'
    }
    this.orderLoad('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + '&time_to=' + '&type=0')
    this.orderLoad1('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + '&time_to=' + '&type=1')
    this.orderLoad2('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + '&time_to=' + '&type=2')
  },
	  methods: {
    // 订单列表合计
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        const values = data.map(item => Number(item[column.property]))
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 1) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else if (index === 2) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        }
      })
      return sums
    },
    getSummaries1 (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        const values = data.map(item => Number(item[column.property]))
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 1) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else if (index === 2) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        }
      })
      return sums
    },
    getSummaries2 (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        const values = data.map(item => Number(item[column.property]))
        if (index === 0) {
          sums[index] = '总计'
        } else if (index === 1) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else if (index === 2) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        }
      })
      return sums
    },
    // 时间筛选
    timeCheck1 (canshu) {
      this.value3 = canshu
      console.log(this.value1)
      if (this.orderStatus === '全部') {
        this.orderLoad('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=0')
        this.orderRemoveBtn = false
      } else if (this.orderStatus === '已完成') {
        this.doneOrderLoad()
        this.orderRemoveBtn = true
      } else if (this.orderStatus === '未完成') {
        this.undoneOrderLoad()
        this.orderRemoveBtn = false
      }
    },
    timeCheck11 (canshu) {
      this.value3 = canshu
      if (this.orderStatus1 === '全部') {
        this.orderLoad1('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=1')
        this.orderRemoveBtn1 = false
      } else if (this.orderStatus1 === '已完成') {
        this.doneOrderLoad1()
        this.orderRemoveBtn1 = true
      } else if (this.orderStatus1 === '未完成') {
        this.undoneOrderLoad1()
        this.orderRemoveBtn1 = false
      }
    },
    timeCheck12 (canshu) {
      this.value3 = canshu
      console.log(this.value3)
      if (this.orderStatus2 === '全部') {
        this.orderLoad2('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=2')
        this.orderRemoveBtn2 = false
      } else if (this.orderStatus2 === '已完成') {
        this.doneOrderLoad2()
        this.orderRemoveBtn2 = true
      } else if (this.orderStatus2 === '未完成') {
        this.undoneOrderLoad2()
        this.orderRemoveBtn2 = false
      }
    },
    // 时间筛选
    timeCheck2 (canshu) {
      this.value4 = canshu
      console.log(this.value4)
      if (this.orderStatus === '全部') {
        this.orderLoad('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=0')
        this.orderRemoveBtn = false
      } else if (this.orderStatus === '已完成') {
        this.doneOrderLoad()
        this.orderRemoveBtn = true
      } else if (this.orderStatus === '未完成') {
        this.undoneOrderLoad()
        this.orderRemoveBtn = false
      }
    },
    // 时间筛选
    timeCheck3 (canshu) {
      this.value4 = canshu
      console.log(this.value4)
      if (this.orderStatus1 === '全部') {
        this.orderLoad1('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=1')
        this.orderRemoveBtn1 = false
      } else if (this.orderStatus1 === '已完成') {
        this.doneOrderLoad1()
        this.orderRemoveBtn1 = true
      } else if (this.orderStatus1 === '未完成') {
        this.undoneOrderLoad1()
        this.orderRemoveBtn1 = false
      }
    },
    // 时间筛选
    timeCheck4 (canshu) {
      this.value4 = canshu
      console.log(this.value4)
      if (this.orderStatus2 === '全部') {
        this.orderLoad2('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=2')
        this.orderRemoveBtn2 = false
      } else if (this.orderStatus2 === '已完成') {
        this.doneOrderLoad2()
        this.orderRemoveBtn2 = true
      } else if (this.orderStatus2 === '未完成') {
        this.undoneOrderLoad2()
        this.orderRemoveBtn2 = false
      }
    },
    // 删除订单
    orderRemove (row) {
      this.$confirm('此操作将永久删除该订单是否继续', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        size: 'small'
      }).then(() => {
        axios.post('/seller/Order/deleteDone?shop_id=' + this.shopId + '&order_id=' + row.order_id).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
            console.log(res.data.error.msg)
          } else {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.doneOrderLoad()
            this.doneOrderLoad1()
            this.doneOrderLoad2()
          }
        })
      })
    },
    // 切换订单状态
    handleClick (targetName) {
      console.log(targetName.label)
      if (targetName.label === '全部') {
        this.orderLoad('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=0')
        this.orderRemoveBtn = false
        this.orderStatus = '全部'
      } else if (targetName.label === '已完成') {
        this.doneOrderLoad()
        this.orderRemoveBtn = true
        this.orderStatus = '已完成'
      } else if (targetName.label === '未完成') {
        this.undoneOrderLoad()
        this.orderRemoveBtn = false
        this.orderStatus = '未完成'
      }
    },
    // 切换订单状态
    handleClick2 (targetName) {
      console.log(targetName.label)
      if (targetName.label === '全部') {
        this.orderLoad2('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=2')
        this.orderRemoveBtn2 = false
        this.orderStatus2 = '全部'
      } else if (targetName.label === '已完成') {
        this.doneOrderLoad2()
        this.orderRemoveBtn2 = true
        this.orderStatus2 = '已完成'
      } else if (targetName.label === '未完成') {
        this.undoneOrderLoad2()
        this.orderRemoveBtn2 = false
        this.orderStatus2 = '未完成'
      }
    },
    // 切换订单状态
    handleClick1 (targetName) {
      console.log(targetName.label)
      if (targetName.label === '全部') {
        this.orderLoad1('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=1')
        this.orderRemoveBtn1 = false
        this.orderStatus1 = '全部'
      } else if (targetName.label === '已完成') {
        this.doneOrderLoad1()
        this.orderRemoveBtn1 = true
        this.orderStatus1 = '已完成'
      } else if (targetName.label === '未完成') {
        this.undoneOrderLoad1()
        this.orderRemoveBtn1 = false
        this.orderStatus1 = '未完成'
      }
    },
    // 未完成订单加载
    undoneOrderLoad () {
      this.orderLoad('/seller/Order/undone?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=0')
      console.log(2)
    },
    // 已完成订单加载
    doneOrderLoad () {
      this.orderLoad('/seller/Order/done?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=0')
      console.log(1)
    },
    // 未完成订单加载
    undoneOrderLoad1 () {
      this.orderLoad1('/seller/Order/undone?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=1')
      console.log(2)
    },
    // 已完成订单加载
    doneOrderLoad1 () {
      this.orderLoad1('/seller/Order/done?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=1')
      console.log(1)
    },
    // 未完成订单加载
    undoneOrderLoad2 () {
      this.orderLoad2('/seller/Order/undone?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=2')
      console.log(2)
    },
    // 已完成订单加载
    doneOrderLoad2 () {
      this.orderLoad2('/seller/Order/done?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&type=2')
      console.log(1)
    },
    // 订单加载
    orderLoad (bbb) {
      axios.post(bbb).then((res) => {
        if (res.data.error) {
          console.log(res.data.error.msg)
        } else {
          this.tableData3 = []
          console.log(res.data)
          for (var keys in res.data.order) {
            if (res.data.order[keys].status === 0) {
              payStatus = '未付款'
            } else {
              payStatus = '已付款'
            }
            if (res.data.order[keys].order_status !== 1) {
              orderStatus = '未完成'
            } else {
              orderStatus = '已完成'
            }
            if (res.data.order[keys].name === null || res.data.order[keys].name === undefined) {
              userName = '匿名'
            } else {
              userName = res.data.order[keys].name
            }
            if (res.data.order[keys].pay_type === 1) {
              payType = '微信'
            } else if (res.data.order[keys].pay_type === 2) {
              payType = '支付宝'
            } else if (res.data.order[keys].pay_type === 3) {
              payType = '现金'
            } else {
              payType = ''
            }
            orderTime = new Date(parseInt(res.data.order[keys].create_time) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
            this.tableData3.push({ pay_type: payType, order_number: res.data.order[keys].trade_no, order_tel: res.data.order[keys].phone, pay_status: payStatus, order_status: orderStatus, money_number: res.data.order[keys].amount, user_name: userName, time: orderTime, order_id: res.data.order[keys].order_id })
          }
        }
      })
    },
    // 订单加载
    orderLoad1 (bbb) {
      axios.post(bbb).then((res) => {
        if (res.data.error) {
          console.log(res.data.error.msg)
        } else {
          this.tableData4 = []
          console.log(res.data)
          for (var keys in res.data.order) {
            if (res.data.order[keys].status === 0) {
              payStatus = '未付款'
              if (res.data.order[keys].pay_type !== 1) {
                this.orderPaidBtn1 = true
              } else {
                this.orderPaidBtn1 = false
              }
            } else {
              payStatus = '已付款'
            }
            if (res.data.order[keys].order_status === 0) {
              orderStatus = '未完成'
            } else {
              orderStatus = '已完成'
            }
            if (res.data.order[keys].name === null || res.data.order[keys].name === undefined) {
              userName = '匿名'
            } else {
              userName = res.data.order[keys].name
            }
            if (res.data.order[keys].pay_type === 1) {
              payType = '微信'
            } else if (res.data.order[keys].pay_type === 2) {
              payType = '支付宝'
            } else if (res.data.order[keys].pay_type === 3) {
              payType = '现金'
            } else {
              payType = ''
            }
            orderTime = new Date(parseInt(res.data.order[keys].create_time) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
            this.tableData4.push({ pay_type: payType, order_number: res.data.order[keys].trade_no, order_tel: res.data.order[keys].phone, pay_status: payStatus, order_status: orderStatus, money_number: res.data.order[keys].amount, user_name: userName, time: orderTime, order_id: res.data.order[keys].order_id, tableNo: res.data.order[keys].table_id })
          }
        }
      })
    },
    // 订单加载
    orderLoad2 (bbb) {
      axios.post(bbb).then((res) => {
        if (res.data.error) {
          console.log(res.data.error.msg)
        } else {
          this.tableData5 = []
          console.log(res.data)
          for (var keys in res.data.order) {
            if (res.data.order[keys].status === 0) {
              payStatus = '未付款'
            } else {
              payStatus = '已付款'
            }
            if (res.data.order[keys].order_status === 0) {
              orderStatus = '未完成'
            } else {
              orderStatus = '已完成'
            }
            if (res.data.order[keys].name === null || res.data.order[keys].name === undefined) {
              userName = '匿名'
            } else {
              userName = res.data.order[keys].name
            }
            if (res.data.order[keys].pay_type === 1) {
              payType = '微信'
            } else if (res.data.order[keys].pay_type === 2) {
              payType = '支付宝'
            } else if (res.data.order[keys].pay_type === 3) {
              payType = '现金'
            } else {
              payType = ''
            }
            orderTime = new Date(parseInt(res.data.order[keys].create_time) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
            this.tableData5.push({ pay_type: payType, address: res.data.order[keys].address, order_number: res.data.order[keys].trade_no, order_tel: res.data.order[keys].phone, pay_status: payStatus, order_status: orderStatus, money_number: res.data.order[keys].amount, user_name: userName, time: orderTime, order_id: res.data.order[keys].order_id })
          }
        }
      })
    },
    // 商品列表
    goodsLoad (orderId) {
      axios.post('/seller/Order/orderGoodsList?order_id=' + orderId).then((res) => {
        if (res.data.error) {
          console.log(res.data.error.msg)
        } else {
          this.gridData = []
          this.gridData1 = []
          this.gridData2 = []
          console.log(res.data)
          for (var keys in res.data.goods_list) {
            this.gridData.push({ goodsName: res.data.goods_list[keys].goods_name, goodsNum: res.data.goods_list[keys].goods_num, goodsPrice: res.data.goods_list[keys].jin_e })
            this.gridData1.push({ goodsName: res.data.goods_list[keys].goods_name, goodsNum: res.data.goods_list[keys].goods_num, goodsPrice: res.data.goods_list[keys].jin_e })
            this.gridData2.push({ goodsName: res.data.goods_list[keys].goods_name, goodsNum: res.data.goods_list[keys].goods_num, goodsPrice: res.data.goods_list[keys].jin_e })
          }
        }
      })
    },
    // 点击查看
    orderWatch (row) {
      this.goodsLoad(row.order_id)
    },
    handleSearch (canshu) {
      if (this.hao === '' && this.value1 === '' && this.value2 === '') {
        this.$message('请输入要查询的内容')
      } else {
        this.orderLoad('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&key=' + this.hao + '&type=0')
      }
    },
    handleSearch1 (canshu) {
      if (this.hao === '' && this.value1 === '' && this.value2 === '') {
        this.$message('请输入要查询的内容')
      } else {
        this.orderLoad1('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&key=' + this.hao + '&type=1')
      }
    },
    handleSearch2 (canshu) {
      if (this.hao === '' && this.value1 === '' && this.value2 === '') {
        this.$message('请输入要查询的内容')
      } else {
        this.orderLoad2('/seller/Order/all?shop_id=' + this.shopId + '&time_from=' + this.value3 + '&time_to=' + this.value4 + '&key=' + this.hao + '&type=2')
      }
    },
    handleReset () {
      this.hao = ''
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.timeCheck1()
    },
    handleReset1 () {
      this.hao = ''
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.timeCheck11()
    },
    handleReset2 () {
      this.hao = ''
      this.value1 = ''
      this.value2 = ''
      this.value3 = ''
      this.value4 = ''
      this.timeCheck12()
    }
  }
}
</script>
<style>
	.zhi{
		font-size: 12px;
		color: #646060;
	}
	.frinp{
		width: inherit;
	}
	.container{
		padding:15px 20px 20px 10px;
	}
	.time1{
		margin-left: 40px;
		margin-right: 10px;
	}
	.time2{
		margin-left: 10px;
	}
	.search{
		background: #fc9538;
		color: #fff;
		border: #fc9538;
   height: 35px;
    line-height: 35px;
    padding: 0 15px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: none;
	}
	.reset{
		background: #fff;
		color: #333;
		border: 1px solid #bbb;
    height: 35px;
    line-height: 35px;
    padding: 0 15px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: none;
	}
	.el-input__inner{
		height:38px;
	}
	.btn_div{
		padding-bottom: 20px;
		margin-top: 20px;
	}
	.el-tabs__item{
		/*font-size: 13px;*/
	}
	.nav_bar{
		/*margin-top: 20px;*/
	}
	.el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0;
}
.nav_div{
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    background: #FFFFFF;
}
.fenye{
	width: 600px;
	margin: auto;
}

</style>
