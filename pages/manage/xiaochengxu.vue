<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="应用插件" name="first">
      <div v-if="jiaocheng">
        <el-row v-if="authorization" class="zong">
          <el-col class="heng heng1">
            <h3>微信小程序</h3>
          </el-col>
          <el-col class="heng">
            <p class="content">将微信小程序授权给豆点，系统会自动帮你生成店铺小程序，并提交到微信；你不需要做复杂操作，即可获得店铺的微信小程序。</p>
            <p class="content">注意：你的小程序的主体必须是「企业」，并开通了微信支付，才能具备支付权限。</p>
            <el-button v-if="authorization" @click="shouquanjiemian" type="primary" size="small">授权微信小程序</el-button>
            <el-button v-else disabled type="primary" size="small">已授权微信小程序</el-button>
          </el-col>
          <el-col class="heng">
            <p class="content">如果你还没有注册微信小程序，点击下方按钮注册；注册成功后，再授权给豆点即可。</p>
            <el-button @click="weixinxiaochengxuzhuce" type="" size="small">注册微信小程序</el-button>
          </el-col>
        </el-row>
        <el-row v-if="!authorization && !shanghuhaoStatus" class="zong">
          <el-col class="heng heng1">
            <h3>微信小程序</h3>
          </el-col>
          <el-col>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                小程序：
              </el-col>
              <el-col class="hangR" :span="20">
                {{ name }} <el-button @click="shouquanjiemian" type="text">重新授权</el-button> <el-button @click="quxiaoshouquan" type="text">解除授权</el-button>
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                微信支付：
              </el-col>
              <el-col class="hangR" :span="20">
                目前小程序只支持微信自有支付，你可以在「<a href="https://mp.weixin.qq.com/" target="_blank">小程序后台</a> - 微信支付」页面下申请开通并完成相关配置。<br>
    小程序的主体必须为企业，才可申请微信支付；如果你的小程序不是企业主体，请另注册一个，重新授权给豆点。<br>
    完成设置后，请在本页填写你的商户号和商户密钥。
              </el-col>
            </el-row>
            <el-form :model="shanghu" ref="shanghu">
              <el-row class="hangIn">
                <el-col class="hangL" :span="4">
                  商户号：
                </el-col>
                <el-col class="hangR" :span="20">
                  <el-form-item
                    prop="shanghuhao"
                    :rules="[
                      { required: true, message: '商户号不能为空', trigger: 'blur'},
                      { min: 8, max: 10, message: '长度在 8 或 10 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input placeholder="长度在 8 或 10 个字符" v-model="shanghu.shanghuhao" size="small"></el-input>
                  </el-form-item>
                  <p>微信支付审核通过后，微信会将商户号发送到接收邮箱</p>
                </el-col>
              </el-row>
              <el-row class="hangIn">
                <el-col class="hangL" :span="4">
                  商户密钥：
                </el-col>
                <el-col class="hangR" :span="20">
                  <el-form-item
                    prop="miyao"
                    :rules="[
                      { required: true, message: '密钥不能为空', trigger: 'blur'},
                      { len: 32, message: '长度为 32 个字符', trigger: 'blur' }
                    ]"
                  >
                    <el-input placeholder="长度为 32 个字符" v-model="shanghu.miyao" size="small"></el-input>
                  </el-form-item>
                  <p>请登录微信商户平台，进入「账户中心-API安全」页面，设置密钥 <el-button type="text" @click="jiaocheng = !jiaocheng">查看教程</el-button></p>
                </el-col>
              </el-row>
              <el-row class="hangIn">
                <el-col class="hangL" :span="4">
                  &nbsp;
                </el-col>
                <el-col class="hangR" :span="20">
                  <el-checkbox v-model="checked">已确认商户号和商户密钥配置正确（否则将导致微信支付异常，小程序无法通过审核）</el-checkbox>
                </el-col>
              </el-row>
              <el-row class="hangIn">
                <el-col class="hangL" :span="4">
                  &nbsp;
                </el-col>
                <el-col class="hangR1" :span="20">
                  <el-form-item>
                    <el-button :disabled="!checked" type="primary" @click="submitForm('shanghu')" size="small">提交微信审核</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-row v-if="!authorization && shanghuhaoStatus" class="zong">
          <el-col class="heng heng1">
            <h3>微信小程序</h3>
          </el-col>
          <el-col>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                小程序：
              </el-col>
              <el-col class="hangR" :span="20">
                {{ name }} <el-button @click="shouquanjiemian" type="text">重新授权</el-button> <el-button @click="quxiaoshouquan" type="text">解除授权</el-button>
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                线上版本：
              </el-col>
              <el-col class="hangR" :span="20">
                1.0
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                更新时间：
              </el-col>
              <el-col class="hangR" :span="20">
                无
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                更新状态：
              </el-col>
              <el-col class="hangR" :span="20">
                最新版本（1.8.0）正在等待微信审核
                <p>小程序升级后，系统会自动将最新的小程序提交给微信</p>
                <p>微信审核通过后，您的小程序即可升级到最新版本</p>
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4" style="color: black;">
                微信支付
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                商户号：
              </el-col>
              <el-col class="hangR" :span="20">
                {{ shanghu.shanghuhao }}
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                商户密钥：
              </el-col>
              <el-col class="hangR" :span="20">
                {{ shanghu.miyao }}
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                &nbsp;
              </el-col>
              <el-col class="hangR1" :span="20">
                <el-button size="small" type="primary" @click="shanghuhaoStatus = false">修改配置</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row v-if="!jiaocheng" class="zong">
        <el-col class="heng heng1">
          <h3>在哪里查看微信支付商户号和密钥配置到小程序？</h3>
        </el-col>
        <el-col class="heng">
          <p class="content1">申请微信支付审核通过后，微信会将商户号发送到接收邮箱</p>
          <p class="content1">登录微信商户平台<a href="https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F" target="_blank">点此</a></p>
          <p class="content1">账号设置－API安全进行设置密钥</p>
          <img style="width:70%; margin:15px 0;" src="~static/jiaocheng.jpeg" alt="">
          <p class="content1">注意：密钥填写错误会导致支付异常，按照以上方法修改后，再重新尝试支付。</p>
          <el-button @click="jiaocheng = !jiaocheng" style="margin-top: 15px;" size="small" type="primary">返回</el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="微信小程序授权确认"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>是否已经授权微信小程序？</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="quedingzhuce">已授权</el-button>
        </span>
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
      name: '关贺',
      activeName: 'first',
      authorization: true,
      checked: false,
      jiaocheng: true,
      shopId: 0,
      shanghuhaoStatus: false,
      dialogVisible: false,
      shanghu: {
        shanghuhao: '',
        miyao: ''
      }
    }
  },
  beforeMount () {
    this.shopId = localStorage.getItem('shop_id')
    this.panduanshouquan()
    axios.get('https://cdn.wangdoukeji.com/seller/shop/getWxPayStatus?shop_id=' + this.shopId).then((res) => {
      if (res.data.code === 1) {
        this.shanghuhaoStatus = true
      }
    })
    axios.get('https://cdn.wangdoukeji.com/index.php/seller/plugin/getAppletName?shop_id=' + this.shopId).then((res) => {
      this.name = res.data.data
    })
    this.getshanghuhao()
  },
  methods: {
    // 获取商户密钥和商户号
    getshanghuhao () {
      axios.get('https://cdn.wangdoukeji.com/seller/shop/showwxpaymsg?shop_id=' + this.shopId).then((res) => {
        this.shanghu.shanghuhao = res.data.data.wx_pay_mch_id
        this.shanghu.miyao = res.data.data.wx_pay_key
      })
    },
    submitForm (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('https://cdn.wangdoukeji.com/index.php/seller/shop/getWxPayMsg?shop_id=' + this.shopId + '&mch_id=' + this.shanghu.shanghuhao + '&key=' + this.shanghu.miyao).then((res) => {
            console.log(res.data.code)
            if (res.data.code === 1) {
              that.$message({
                type: 'success',
                message: '提交成功请等待微信审核'
              })
              axios.get('https://cdn.wangdoukeji.com/seller/shop/getWxPayStatus?shop_id=' + this.shopId).then((res) => {
                if (res.data.code === 1) {
                  this.shanghuhaoStatus = true
                }
              })
            } else {
              that.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    panduanshouquan () {
      axios.get('https://cdn.wangdoukeji.com/index.php/seller/plugin/checkPluginAccredit?shop_id=' + this.shopId + '&plugin_id=' + (window.location.href.split('='))[1]).then((res) => {
        if (res.data.code === 1) {
          this.authorization = false
        }
      })
    },
    shouquanjiemian () {
      window.open('https://cdn.wangdoukeji.com/index.php/index/open/auth?shop_id=' + localStorage.getItem('shop_id'))
      this.dialogVisible = true
    },
    weixinxiaochengxuzhuce () {
      window.open('https://mp.weixin.qq.com')
    },
    quedingzhuce () {
      this.panduanshouquan()
      this.dialogVisible = false
      // this.$message({
      //   type: 'success',
      //   message: '提交成功'
      // })
    },
    quxiaoshouquan () {
      var that = this
      axios.get('https://cdn.wangdoukeji.com/index.php/index/Open/cancleAuth?shop_id=' + this.shopId).then((res) => {
        if (res.data.code === 1) {
          that.$message({
            type: 'success',
            message: '取消授权成功'
          })
          this.authorization = true
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
.heng .el-button{margin-top: 15px;}
.content{padding:0 0;}
.hangL{color: #999;line-height: 30px;text-align: right;font-size: 16px;}
.hangR{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR1{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR .el-button{margin-left: 20px;font-size: 16px;padding: 7px 0;}
.hangIn:nth-child(1){margin-top: 40px;}
.hangIn{margin-bottom: 40px;}
.hangR .el-input{width: 40%;min-width:200px;}
.hangR p{color:#999;font-size: 14px;}
a{color:#fdaa60;}
</style>
