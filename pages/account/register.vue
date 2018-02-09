<template>
    <el-row class="loginBg" type="flex" justify="center">
        <router-link to="/">
          <img src="~static/images/logo1.png" style="position:fixed;top: 30px;left: 30px;width: 250px;" alt="">
        </router-link>
        <el-col :xs="18" :sm="12" :md="10" :lg="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h3>商家注册</h3>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="mobile">
                        <el-input v-model="loginForm.mobile" placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="注册密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input placeholder="区域负责人ID（可选）"></el-input>
                    </el-form-item>
                    <el-form-item prop="sms" class="verification-code">
                        <el-input v-model="loginForm.sms" @keyup.enter.native="login" placeholder="验证码"></el-input>
                    </el-form-item>
                    <el-form-item class="submit-box">
                        <el-button class="submit-btn" type="primary" v-bind:loading="submit_loading"  @click="login">注册</el-button>
                    </el-form-item>
                    <a href="/account/login" class="login">立即登陆</a>
                </el-form>
                <div class="verification-btn">
                    <button v-if="sendMsgDisabled" disabled class="jin">{{time+'秒后获取'}}</button>
                    <button v-if="!sendMsgDisabled" style="cursor: pointer;" @click="send">获取验证码</button>
                </div>
            </el-card>
        </el-col>
        <p style="color: white;text-align: center;position: fixed;bottom: 300px;right: 62px;">官方微信公众号<br>更快捷的管理方式</p>
        <img src="~static/images/xiaohuangren.png" style="position: fixed;right: 0; bottom: 0;" alt="">
    </el-row>
</template>

<script>
  import axios from '../../plugins/axios'

  export default {
    data () {
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else {
          if (!/^1\d{10}$/.test(value)) {
            callback(new Error('请输入正确的手机号码'))
          } else {
            callback()
          }
        }
      }
      return {
        time: 60,
        sendMsgDisabled: false,
        submit_loading: false,
        loginForm: {
          mobile: '',
          password: '',
          sms: ''
        },
        yanzhengma: '',
        rules: {
          mobile: [{ validator: validateMobile, trigger: 'blur' }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' }
          ],
          sms: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '验证码为6位数字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 验证码
      send () {
        let me = this
        axios.post('/seller/user/sms?phone=' + this.loginForm.mobile).then(function (res) {
          if (res.data.code === 1 && me.loginForm.mobile.length === 11) {
            me.sendMsgDisabled = true
            var timer = setInterval(function () {
              me.time--
              if (me.time < 0) {
                me.time = 60
                me.sendMsgDisabled = false
                clearInterval(timer)
              }
            }, 1000)
          } else {
            me.$message({
              type: 'error',
              message: res.data.message
            })
          }
        })
      },
      async login () {
        let $valid = false
        await this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            $valid = valid
          }
        })
        if ($valid) {
          // this.submit_loading = true
          try {
            await this.$store.dispatch('login', {
              mobile: this.loginForm.mobile,
              password: this.loginForm.password,
              sms: this.loginForm.sms
            })
          } catch (e) {
            // this.submit_loading = false
          }
          var that = this
          axios.post('/seller/user/register?mobile=' + this.loginForm.mobile + '&password=' + this.loginForm.password + '&verify=' + this.loginForm.sms).then(function (res) {
            if (res.data.code === 1) {
              that.$message({
                type: 'success',
                message: '注册成功!'
              })
              var userId = res.data.data
              localStorage.setItem('user_id', userId)
              location.assign('/shop/shopList')
            } else {
              that.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        }
      }
    }
  }
</script>

<style>
    .loginBg{background: url('~static/images/banner.jpg') no-repeat;position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-size: 100% 100%;}
    .box-card{position: relative;margin-top: 50px;background-color: rgba(255, 255, 255, 0.4)}
    .submit-btn{width: 100%}
    .el-input__inner{background-color: rgba(255, 255, 255, 0.6)}
    @media (max-width: 768px){
        .el-col-xs-18 .el-card{
            border: none;
            box-shadow: none;
        }
    }
    .verification{
        width: 70%;
        float: left;
    }
    .obtain-verification{
        width: 30%;
        float: right;
    }
    .obtain-btn{
        display: inline-block;
        width: 100%;
        height: 40px;
        background-color: #69b3ff;
        border:none;
        color: #fff;
        outline:0;
        white-space:nowrap;
        overflow: hidden;
        cursor: pointer;
    }
    .time-btn{
        display: inline-block;
        width: 100%;
        height: 40px;
        background-color: #fff;
        border: 1px solid #d8dce6;
        color: #5a5e66;
        white-space:nowrap;
        overflow: hidden;
    }
    .submit-box{
        width: 100%;
        overflow: hidden;
    }
    .login{
        text-decoration: none;
        display: block;
        text-align: right;
        color: black;
        cursor: pointer;
    }
    .login:hover{
      color: #fc9538;
    }
    /*验证码*/
    .verification-code {
        width: 70%;
        float: left;
    }
    .verification-btn {
        position: absolute;
        bottom: 127px;
        right: 4%;
        width: 30%;
        float: left;
        height: 40px;
        outline: none;
    }
    .verification-btn button {
        width: 100%;
        display: inline-block;
        height: 40px;
        margin-top:1px;
        border-radius: 4px;
        border: none;
        color: #fff;
        background-color: #fc9538;
    }
    .verification-btn button:focus{
        outline: 0;
    }
    .verification-btn button.jin{
        background-color: #f6b274;
    }
</style>
