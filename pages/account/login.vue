<template>
  <el-row type="flex" justify="center">
    <el-col :xs="18" :sm="12" :md="10" :lg="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <h3>商家登录</h3>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" @keyup.enter.native="login" placeholder="登录密码"></el-input>
          </el-form-item>
          <el-form-item class="submit-box">
            <el-button class="submit-btn" type="primary" v-bind:loading="submit_loading"  @click="login">登录</el-button>
          </el-form-item>
          <a href="register" class="register">立即注册</a>
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
        console.log(this)
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
          axios.post('/seller/user/login?mobile=' + this.loginForm.mobile + '&&password=' + this.loginForm.password).then(function (res) {
            if (res.data.error) {
              that.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              that.$message({
                type: 'success',
                message: '登陆成功!'
              })
              var userId = res.data.user_id
              localStorage.setItem('user_id', userId)
              location.assign('/shop/shopList')
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
  .register{
    text-decoration: none;
    display: block;
    text-align: right;
    color: #6e6e6e;
  }
</style>
