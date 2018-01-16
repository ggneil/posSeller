<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-form :model="shanghu" ref="shanghu">
          <el-col class="heng heng1">
            <h3>资质认证</h3>
          </el-col>
          <el-col>
            <el-row class="hangIn">
              <el-col class="hangL" style="margin-top: 20px;" :span="4">
                企业名称：
              </el-col>
              <el-col class="hangR" style="margin-top: 20px;" :span="20">
                <el-form-item
                  prop="qiyemingcheng"
                  :rules="[
                    { required: true, message: '企业名称', trigger: 'blur'},
                    { min: 2, max: 24, message: '长度在 2 到 24 个字符', trigger: 'blur' }
                  ]"
                >
                  <el-input placeholder="长度在 2 到 24 个字符" v-model="shanghu.qiyemingcheng" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                法人：
              </el-col>
              <el-col class="hangR" :span="20">
                <el-form-item
                  prop="faren"
                  :rules="[
                    { required: true, min: 2, max: 10, message: '法人不能为空（长度在 2 到 10 个字符）', trigger: 'blur'}
                  ]"
                >
                  <el-input placeholder="长度在 2 到 10 个字符" v-model="shanghu.faren" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                法人证件照：
                <p>身份证人像面</p>
              </el-col>
              <el-col class="hangR" :span="8">
                <el-upload
                  class="avatar-uploader"
                  action="https://cdn.wangdoukeji.com/api/Attachment/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <!-- <el-col :span="12">
                <span style="float: left;">示例：</span>
                <img src="~static/icon.png" alt="" style="width: 300px;height: 178px;border: 1px dashed #ccc;">
              </el-col> -->
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                法人证件照：
                <p>身份证国徽面</p>
              </el-col>
              <el-col class="hangR" :span="8">
                <el-upload
                  class="avatar-uploader"
                  action="https://cdn.wangdoukeji.com/api/Attachment/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload1">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <!-- <el-col :span="12">
                <span style="float: left;">示例：</span>
                <img src="~static/icon.png" alt="" style="width: 300px;height: 178px;border: 1px dashed #ccc;">
              </el-col> -->
            </el-row>
            <el-row class="handIn">
              <el-col class="hangL" :span="4">
                营业执照：
              </el-col>
              <el-col class="hangR" :span="8">
                <el-upload
                  class="avatar-uploader"
                  action="https://cdn.wangdoukeji.com/api/Attachment/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload3">
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <!-- <el-col :span="12">
                <span style="float: left;">示例：</span>
                <img src="~static/icon.png" alt="" style="width: 300px;height: 178px;border: 1px dashed #ccc;">
              </el-col> -->
            </el-row>
            <el-row class="hangIn" style="margin-top: 20px;">
              <el-col class="hangL" :span="4">
                营业执照号：
              </el-col>
              <el-col class="hangR" :span="20">
                <el-form-item
                  prop="yingyezhizhaohao"
                  :rules="[
                    { required: true, message: '营业执照号不能为空', trigger: 'blur'},
                    { min: 8, message: '最小 8 个字符', trigger: 'blur' }
                  ]"
                >
                  <el-input placeholder="请填写你的营业执照号" v-model="shanghu.yingyezhizhaohao" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="border-top: 1px solid #eee;" class="heng heng1">
            <h3>主体认证</h3>
          </el-col>
          <el-col>
            <el-row class="hangIn" style="padding-top: 20px;">
              <el-col class="hangL" style="margin-top: 20px;" :span="4">
                店铺名称：
              </el-col>
              <el-col class="hangR" style="margin-top: 20px;" :span="20">
                {{ shopName }}
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                主营项目：
              </el-col>
              <el-col class="hangR" :span="20">
                <el-form-item
                  prop="zhuyingxiangmu"
                >
                  <el-select v-model="shanghu.zhuyingxiangmu" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in shanghu.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                经营许可证：
                <p>非原件照片需加盖
  公司红色公章
  </p>
              </el-col>
              <el-col class="hangR" :span="8">
                <el-upload
                  class="avatar-uploader"
                  action="https://cdn.wangdoukeji.com/api/Attachment/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload2">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <!-- <el-col :span="12">
                <span style="float: left;">示例：</span>
                <img src="~static/icon.png" alt="" style="width: 300px;height: 178px;border: 1px dashed #ccc;">
              </el-col> -->
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                &nbsp;
              </el-col>
              <el-col class="hangR" :span="20">
                <el-form-item
                  prop="yanzhengma"
                  :rules="[
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                  ]"
                >
                  <el-input placeholder="请输入验证码" v-model="shanghu.yanzhengma" style="width: 200px;" size="small"></el-input><el-button type="primary" :disabled="smsBtnStatus" @click="huoquyanzhengma" size="small">{{ smsBtn }}</el-button>
                </el-form-item>
                <p>验证短信将发送到您绑定的手机：{{ shanghu.phone }}，请注意查收</p>
              </el-col>
            </el-row>
            <el-row class="hangIn">
              <el-col class="hangL" :span="4">
                &nbsp;
              </el-col>
              <el-col class="hangR1" :span="20">
                <el-form-item>
                  <el-button type="primary" @click="submitForm('shanghu')" size="small">提交店铺信息</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from '../../plugins/axios'
var timer = null
export default {
  layout: 'manage',
  data () {
    return {
      imageUrl: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      shopName: '关贺',
      smsBtn: '获取验证码',
      smsBtnStatus: false,
      activeName: 'first',
      authorization: true,
      checked: false,
      jiaocheng: true,
      shopId: 0,
      dialogVisible: false,
      shanghu: {
        phone: '',
        qiyemingcheng: '',
        yingyezhizhaohao: '',
        zhuyingxiangmu: 1,
        faren: '',
        yanzhengma: '',
        shenfenid_z: '',
        shenfenid_f: '',
        yingyezhizhaoImg: '',
        canyinxukeImg: '',
        options: [{
          label: '餐饮',
          value: 1
        }, {
          label: '生鲜果蔬',
          value: 2
        }, {
          label: '蛋糕烘培',
          value: 3
        }, {
          label: '茶饮酒水',
          value: 4
        }, {
          label: '礼品鲜花',
          value: 5
        }]
      }
    }
  },
  beforeMount () {
    var that = this
    // 获取店铺状态
    axios.get('https://cdn.wangdoukeji.com/index.php/seller/shop/getIndexStatus?shop_id=' + localStorage.getItem('shop_id')).then((res) => {
      if (res.data.data.shop_auth_status === 1) {
        that.$message({
          type: 'success',
          message: '已完成认证，4秒后自动跳转'
        })
        setTimeout(function () {
          that.$router.push({path: '/manage/shopManage'})
        }, 4000)
      }
    })
    this.shopId = localStorage.getItem('shop_id')
    this.shopName = localStorage.getItem('shopName')
    axios.post('/seller/shop/shopDetail?shop_id=' + this.shopId).then((res) => {
      this.shanghu.phone = res.data.shop[0].service_mobile
    })
  },
  methods: {
    // 点击提交
    submitForm (formName) {
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('https://cdn.wangdoukeji.com/index.php/seller/shop/shopAuth?shop_id=' + this.shopId + '&company_name=' + this.shanghu.qiyemingcheng + '&corp=' + this.shanghu.faren + '&id_photo_z=' + this.shanghu.shenfenid_z + '&id_photo_f=' + this.shanghu.shenfenid_f + '&business_license=' + this.shanghu.yingyezhizhaoImg + '&business_license_number=' + this.shanghu.yingyezhizhaohao + '&main_business=' + this.shanghu.zhuyingxiangmu + '&licence=' + this.shanghu.canyinxukeImg + '&captcha=' + this.shanghu.yanzhengma).then((res) => {
            if (res.data.code === 1) {
              that.$message({
                type: 'success',
                message: res.data.msg
              })
              this.$router.push({path: '/manage/shopManage'})
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
    // 获取验证码
    huoquyanzhengma () {
      if (!this.smsBtnStatus) {
        this.smsBtnStatus = true
        var that = this
        var countDown = 60
        this.smsBtn = countDown + '秒之后重新发送'
        timer = setInterval(function () {
          console.log(1)
          countDown--
          that.smsBtn = countDown + '秒之后重新发送'
          if (countDown === 1) {
            clearInterval(timer)
            that.smsBtn = '获取验证码'
            that.smsBtnStatus = false
          }
        }, 1000)
        axios.get('/seller/shop/sms?phone=' + this.shanghu.phone).then((res) => {
          if (res.data.code === 1) {
            that.$message({
              type: 'success',
              message: '验证码发送成功'
            })
          } else {
            clearInterval(timer)
            this.smsBtnStatus = false
            this.smsBtn = '获取验证码'
            that.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch((err) => {
          that.$message({
            type: 'error',
            message: err.data
          })
        })
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.shanghu.shenfenid_z = res.id
      this.$message({
        type: 'success',
        message: res.info
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    handleAvatarSuccess3 (res, file) {
      this.imageUrl3 = URL.createObjectURL(file.raw)
      this.shanghu.yingyezhizhaoImg = res.id
      this.$message({
        type: 'success',
        message: res.info
      })
    },
    beforeAvatarUpload3 (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    handleAvatarSuccess1 (res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw)
      this.shanghu.shenfenid_f = res.id
      this.$message({
        type: 'success',
        message: res.info
      })
    },
    beforeAvatarUpload1 (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    handleAvatarSuccess2 (res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw)
      this.shanghu.canyinxukeImg = res.id
      this.$message({
        type: 'success',
        message: res.info
      })
    },
    beforeAvatarUpload2 (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return (isJPG || isPNG) && isLt2M
    }
  }
}
</script>

<style scoped>
.avatar-uploader>.el-upload{
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader>.el-upload--text{
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  border: 1px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
.zong{background-color: white;}
.heng1{border-bottom: 1px solid #eee;}
.heng{padding: 15px;}
.heng .el-button{margin-top: 15px;}
.content{padding:0 0;}
.hangL{color: #999;line-height: 30px;text-align: right;font-size: 16px;}
.hangR{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR1{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
/* .hangR .el-button{margin-left: 20px;font-size: 16px;padding: 7px 0;} */
.hangIn1:nth-child(1){margin-top: 30px;}
.hangIn{margin-bottom: 20px;}
.hangR .el-input{width: 40%;min-width:200px;}
.hangR p{color:#999;font-size: 14px;}
a{color:#fdaa60;}
</style>
