<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="应用插件" name="first" v-if="authorization">
      <el-row class="zong">
        <el-col class="heng heng1">
          <h3>微信小游戏</h3>
        </el-col>
        <el-col class="heng">
          <p class="content">将微信小游戏授权给豆点，系统会自动帮你生成店铺小游戏，并提交到微信；你不需要做复杂操作，即可获得店铺的微信小游戏。</p>
          <p class="content">注意：你的小游戏的主体必须是「企业」，并开通了微信支付，才能具备支付权限。</p>
          <el-button @click="shenqingshouquan" type="primary" size="small">申请小程序游戏</el-button>
        </el-col>
      </el-row>
      </el-tab-pane>
    <!-- <el-tab-pane label="游戏管理" name="second">
      
    </el-tab-pane> -->
  </el-tabs>
</template>

<script>
import axios from '../../plugins/axios'
export default {
  layout: 'manage',
  data () {
    return {
      activeName: 'first',
      authorization: false
    }
  },
  beforeMount () {
    axios.get('https://cdn.wangdoukeji.com/index.php/seller/plugin/checkPluginAccredit?shop_id=' + localStorage.getItem('shop_id') + '&plugin_id=' + (window.location.href.split('='))[1]).then((res) => {
      if (res.data.code === 1) {
        this.$router.push({path: '/manage/yingxiao'})
      } else {
        this.authorization = true
      }
    })
  },
  methods: {
    shenqingshouquan () {
      axios.post('https://cdn.wangdoukeji.com/index.php/seller/plugin/applyPlugin?shop_id=' + localStorage.getItem('shop_id') + '&plugin_id=' + (window.location.href.split('='))[1]).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.$router.push({path: '/manage/yingxiao'})
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
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
.content{padding:0 0;}
</style>
