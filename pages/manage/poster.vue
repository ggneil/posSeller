<template>
  <div>
    <el-tabs v-model="showTab">
      <el-tab-pane label="用户推广关系" name="tabFirst">
        <el-table
          :data="userData"
          style="width: 100%;"
        >
          <el-table-column
            label="用户"
            align="center"
          >
            <template scope="scope">
              <img style="width:50px;height: 50px;" :src="scope.row.avatarurl !== '' ? scope.row.avatarurl : ''" alt="">
              <p style="margin-bottom: 0;">{{ scope.row.nickname }}</p>
              <p v-if="scope.row.avatarurl === '' || scope.row.nickname === ''">部分信息未取到</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="spread_num"
            label="邀请人数"
            align="center"
          ></el-table-column>
          <!-- <el-table-column
            width="100"
            prop="user_integral"
            label="获得积分"
          ></el-table-column> -->
          <el-table-column
            width="300"
            fixed="right"
            label="操作"
            align="center"
          >
            <template scope="scope">
              <el-button @click="{customerData(scope.row.user_id), dialogTableVisible=true}" size="small" type="primary">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="邀请列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="nickname" label="用户"></el-table-column>
        <el-table-column property="create_time" label="时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
  layout: 'manage',
  data () {
    return {
      showTab: 'tabFirst',
      shopId: '',
      userData: [],
      dialogTableVisible: false,
      gridData: []
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.userInfoLoad()
  },
  methods: {
    userInfoLoad () {
      axios.get('https://api.doudot.cn/seller/user/relationship?shop_id=' + this.shopId).then((res) => {
        this.userData = res.data.data
      })
    },
    customerData (userId) {
      axios.post('/seller/user/getsonlist?user_id=' + userId).then((res) => {
        if (res.data.code === 1) {
          this.gridData = res.data.data
        } else {
          console.log(res.data.error.msg)
          this.$message({
            type: 'error',
            message: res.data.error.msg
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
