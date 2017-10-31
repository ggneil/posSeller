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
                        <el-input v-model="loginForm.password" @keyup.enter.native="login" placeholder="注册密码"></el-input>
                    </el-form-item>
                    <el-form-item class="submit-box">
                        <el-button class="submit-btn" type="primary" v-bind:loading="submit_loading"  @click="login">注册</el-button>
                    </el-form-item>
                    <a href="login" class="login">立即登陆</a>
                </el-form>
            </el-card>
        </el-col>
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
        loginForm: {
          mobile: '',
          password: ''
        },
        submit_loading: false,
        rules: {
          mobile: [{ validator: validateMobile, trigger: 'blur' }],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async login () {
        let $valid = false
        await this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            $valid = valid
          }
        })
        if ($valid) {
          this.submit_loading = true
          try {
            await this.$store.dispatch('login', {
              mobile: this.loginForm.mobile,
              password: this.loginForm.password
            })
          } catch (e) {
            this.submit_loading = false
          }
          var that = this
          axios.post('/seller/user/register?mobile=' + this.loginForm.mobile + '&&password=' + this.loginForm.password).then(function (res) {
            if (res.data.error) {
              var error = res.data.error.msg
              that.$message({
                type: 'error',
                message: error
              })
            } else {
              that.$message({
                type: 'success',
                message: '注册成功!'
              })
              location.assign('/account/login')
            }
          })
        }
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
    .login{
        text-decoration: none;
        display: block;
        text-align: right;
        color: #6e6e6e;
    }
</style>
