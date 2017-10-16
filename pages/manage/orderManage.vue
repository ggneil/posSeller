<template>
	<div class="container">
	  <el-tabs v-model="activeName" @tab-click="handleClick">
		  <el-tab-pane label="扫码买单" name="first">
		  	<el-input class="frinp" v-model="hao" placeholder="收货人姓名、电话或订单号"></el-input>
		    <el-date-picker class="time1" v-model="value1" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1"></el-date-picker>
		    <span class="zhi">至</span>
		    <el-date-picker class="time2" v-model="value2" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions2"></el-date-picker>
		    <div class="btn_div">
		    	<el-button class="search" @click="handleSearch">搜索</el-button>
		    	<el-button class="reset" @click="handleReset">重置</el-button>
		    </div>
		    <div class="nav_div">
		    	<el-tabs class="nav_bar" v-model="activeName2" type="card" @tab-click="handleClick">
				    <el-tab-pane class="bar_active" label="全部" name="all">
				    	<div class="order_list">
				    	  <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
							    <el-table-column type="selection" width="40"></el-table-column>
							    <el-table-column prop="order_number" label="订单号" width="180"></el-table-column>
							    <el-table-column prop="order_type" label="类型" width="50" show-overflow-tooltip></el-table-column>
							    <el-table-column prop="shop_name" label="店铺名" width="100"></el-table-column>
							    <el-table-column prop="pay_status" label="支付状态" width="100"></el-table-column>
							    <el-table-column prop="send_status" label="发货状态" width="100" show-overflow-tooltip></el-table-column>
							    <el-table-column prop="rec_name" label="收货人姓名" width="100"></el-table-column>
							    <el-table-column  label="打印" width="100" show-overflow-tooltip></el-table-column>
							    <el-table-column prop="money_number" label="金额" width="80"></el-table-column>
							    <el-table-column prop="coupon_number" label="优惠券数量" width="100"></el-table-column>
							    <el-table-column prop="pay_way" label="支付方式" width="80" show-overflow-tooltip></el-table-column>
							    <el-table-column prop="user_name" label="用户名" width="80"></el-table-column>
							    <el-table-column prop="time" label="下单时间" width="100"></el-table-column>
							    <el-table-column label="操作" width="100" show-overflow-tooltip></el-table-column>
							  </el-table>
							  <div class="block fenye">
    							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange":current-page.sync="currentPage3":page-size="100"layout="prev, pager, next, jumper":total="1000"></el-pagination>
  							</div>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="待付款" name="pending">待付款</el-tab-pane>
				    <el-tab-pane label="待接单" name="get">待接单</el-tab-pane>
				    <el-tab-pane label="待发货" name="send">待发货</el-tab-pane>
				    <el-tab-pane label="已发货" name="sent">已发货</el-tab-pane>
				    <el-tab-pane label="已完成" name="final">已完成</el-tab-pane>
				    <el-tab-pane label="已关闭" name="close">已关闭</el-tab-pane>
				    <el-tab-pane label="异常订单" name="error">异常订单</el-tab-pane>
				  </el-tabs>
		    </div>
		  </el-tab-pane>
		  <el-tab-pane label="堂食点餐" name="second"></el-tab-pane>
			<el-tab-pane label="外卖" name="third"></el-tab-pane>
	  </el-tabs>
	</div>
</template>

<script>
	export default {
  layout: 'manage',
  data () {
    return {
      hao: '',
      activeName: 'first',
      activeName2: 'all',
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
      tableData3: [{
        order_number: '20171010144117167929',
        order_type: '线下',
        shop_name: '网豆科技1',
        pay_status: '未付款'
      }, {
        order_number: '20171525252542425225',
        order_type: '线下',
        shop_name: '网豆科技2',
        pay_status: '已付款'
      }, {
        order_number: '20171525252542425225',
        order_type: '线下',
        shop_name: '网豆科技2',
        pay_status: '已付款'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSearch () {
      if (this.hao === '' && this.value1 === '' && this.value2 === '') {
        this.$message('请输入要查询的内容')
      } else {
        this.$message('这是一条消息提示')
      }
    },
    handleReset () {
      this.hao = ''
      this.value1 = ''
      this.value2 = ''
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
	.el-tabs__content{
		padding-top: 20px;
	}
	.container{
		padding:20px 20px 20px 40px;
	}
	.time1{
		margin-left: 40px;
		margin-right: 10px;
	}
	.time2{
		margin-left: 10px;
	}
	.search{
		background: #38f;
		color: #fff;
		border: #38F;
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
