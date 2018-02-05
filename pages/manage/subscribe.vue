<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="服务订购" name="first">
        <el-row :gutter="100" class="page-asset-sum">
          <div v-for="item in pay_type" :key="item">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{ item.type_name }}</span>
                </div>
                <div style="padding: 14px;">
                  <span class="now-price">{{ item.new_price }}<span class="yuan">元/{{ item.unit }}</span></span>
                  <br>
                  <s class="old-price">原价：{{ item.price }}元/{{ item.unit }}</s>
                  <p>
                    <el-button @click="sub(item)" style="text-align: center" type="primary">立即订购</el-button>
                  </p>
                </div>
              </el-card>
            </el-col>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'manage',
    data () {
      return {
        activeName: 'first',
        shopId: 0,
        pay_type: [],
        loading: false
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      this.getData()
    },
    methods: {
      getData () {
        // 获取订购方式
        axios.post('/seller/shop/paytype').then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.pay_type = res.data
          }
        })
      },
      sub (item) {
        if (item.type === 1) {
          this.$message('即将开通')
        } else {
          this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          axios.post('/seller/shop/subscribe?shop_id=' + this.shopId + '&type=' + item.id).then((res) => {
            this.loading.close()
            if (res.data.error) {
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '订购成功'
              })
              this.$router.push({path: '/manage/worker'})
            }
          })
        }
      }
    }
  }
</script>
<style>
  .page-asset-sum {
    background: #ffffff;
    padding: 30px;
  }
  .page-asset-title {
    font-size: 12px;
    color: #555;
    height: 30px;
    line-height: 30px;
    margin-bottom: 7px;
  }
  .page-asset-money {
    font-size: 24px;
    line-height: 33px;
    vertical-align: top;
    margin-right: 19.1%;
  }
  .now-price{
    margin-bottom: 8px;
    font-size: 26px;
    line-height: 36px;
    color: #f44;
  }
  .yuan{
    font-size: 16px;
  }
  .old-price{
    color:#878d99;
    font-size: 12px;
  }
</style>
