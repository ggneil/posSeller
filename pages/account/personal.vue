<template>
    <div>
        <el-row :span="20" class="parent">
            <el-col class="header">
                <div class="personal">个人账号设置</div>
                <div class="button1" @click="logout">退出</div>
                <router-link to="/shop/shopList" tag="div" class="button1">选择店铺</router-link>
                <div class="button1 tel">{{mobile}}</div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="flex">
            <el-col :xs="18" :sm="12" :md="10" :lg="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <h3>账号修改<router-link to="/account/modify" tag="span" class="pass">修改密码</router-link></h3>
                    </div>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm">
                        <el-form-item prop="nickname">
                            <el-input v-model="loginForm.nickname" placeholder="昵称" @keyup.enter.native="login"></el-input>
                        </el-form-item>
                        <el-form-item class="submit-box">
                            <el-button class="submit-btn" type="primary" v-bind:loading="submit_loading"  @click="login">确认修改</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  import axios from '../../plugins/axios'

  export default {
    data () {
      return {
        mobile: '',
        loginForm: {
          nickname: ''
        },
        submit_loading: false,
        rules: {
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    beforeMount () {
      this.userId = localStorage.getItem('user_id')
      this.tel()
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
          var that = this
          axios.post('/seller/User/editUserInfo?user_id=' + this.userId + '&&nickname=' + this.loginForm.nickname).then(function (res) {
            if (res.data.error) {
              that.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              that.$message({
                type: 'success',
                message: '修改成功!'
              })
              location.assign('/manage/goods')
            }
          })
        }
      },
      tel () {
        axios.post('/seller/User/userInfo?user_id=' + this.userId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.mobile = res.data.mobile
          }
        })
      },
      logout () {
        location.assign('/account/login')
        localStorage.clear()
      }
    }
  }
</script>

<style>
    .header{
        height: 70px;
        padding: 10px 40px;
        background-color: #fc9538;
        box-shadow: 0 10px 10px -10px rgba(0, 0, 0, .3);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        width: 100%
    }
    .parent{
        padding: 80px 20px 20px 20px;
        background-color: white
    }
    .button1{
        padding: 0;
        margin-right: 20px;
        float: right;
        line-height: 50px;
        font-size: 18px;
        color: white;
        cursor: pointer;
    }
    .personal{
        float: left;
        height: 50px;
        width: 110px;
        margin-left: 20px;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
        display: inline-block;
        border: none;
    }

    html,body{}
    .box-card{margin-top: 80px}
    .submit-btn{
        width: 100%;
    }
    @media (max-width: 768px){
        .el-col-xs-18 .el-card{
            border: none;
            box-shadow: none;
        }
    }
    .pass {
        text-align: right;
        float: right;
        text-decoration: none;
        font-weight: normal;
        font-size: 13px;
        color: #07d;
        display: block;
        height: 25px;
        line-height: 25px;
        vertical-align: bottom;
        cursor: pointer;
    }
</style>
