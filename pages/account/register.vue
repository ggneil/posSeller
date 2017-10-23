<template>
    <el-row type="flex" justify="center">
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
                        <el-input v-model="loginForm.password" placeholder="设置密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="verification" class="verification">
                        <el-input v-model="loginForm.verification" @keyup.enter.native="register" placeholder="输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item class="obtain-verification">
                        <button class="time-btn" v-if="sendMsgDisabled" disabled="">{{time+'秒后获取'}}</button>
                        <button class="obtain-btn" @click="send" v-if="!sendMsgDisabled">获取验证码</button>
                    </el-form-item>
                    <el-form-item class="submit-box">
                        <el-button class="submit-btn" type="primary" v-bind:loading="submit_loading"  @click="register">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>

</template>

<script>
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
      var code = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          if (!/^\d{6}$/.test(value)) {
            callback(new Error('请输入6位验证码'))
          } else {
            callback()
          }
        }
      }
      return {
        loginForm: {
          mobile: '',
          password: '',
          Verification: ''
        },
        submit_loading: false,
        rules: {
          mobile: [{ validator: validateMobile, trigger: 'blur' }],
          password: [
            { required: true, message: '请设置密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' }
          ],
          verification: [{ validator: code, trigger: 'blur' }]
        },
        time: 60,
        sendMsgDisabled: false
      }
    },
    methods: {
      async register () {
        let $valid = false
        await this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            $valid = valid
          }
        })
        if ($valid) {
          this.submit_loading = true
          try {
            await this.$store.dispatch('register', {
              mobile: this.loginForm.mobile,
              password: this.loginForm.password,
              verification: this.loginForm.verification
            })
          } catch (e) {
            this.submit_loading = false
            this.$message.error(e.message)
          }
        }
      },
      //    验证码
      send () {
        let me = this
        me.sendMsgDisabled = true
        let interval = window.setInterval(function () {
          if ((me.time--) <= 0) {
            me.time = 60
            me.sendMsgDisabled = false
            window.clearInterval(interval)
          }
        }, 1000)
      //      发送请求post发送短信
      }

    }
  }
</script>

<style>
    body{}
    .box-card{margin-top: 80px}
    .submit-btn{width: 100%}
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
</style>
