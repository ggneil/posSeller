<template>
    <el-row type="flex" justify="center" class="modify-bg">
        <el-col :xs="18" :sm="12" :md="10" :lg="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h3>修改密码</h3>
                </div>
                <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="password">
                        <el-input size="small" type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input size="small" type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input size="small" type="password" v-model="ruleForm2.checkPass" auto-complete="off" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="submitForm('ruleForm2')" class="submit-btn1">提交</el-button>
                        <el-button size="small" @click="resetForm('ruleForm2')">重置</el-button>
                        <el-button size="small" @click="fanhui">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  import axios from '../../plugins/axios'

  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm2: {
          password: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
          password: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            { min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    beforeMount () {
      this.userId = localStorage.getItem('user_id')
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this
            axios.post('/seller/user/passwd?user_id=' + this.userId + '&&old_pass=' + this.ruleForm2.password + '&&new_pass=' + this.ruleForm2.pass).then(function (res) {
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
                localStorage.clear()
                location.assign('/account/login')
              }
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 返回店铺
      fanhui () {
        location.assign('/manage/worker')
      }
    }
  }
</script>

<style>
    body{}
    .box-card{margin-top: 80px;background-color: hsla(0,0%,100%,.4);}
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
    .modify-bg {
        background: url(/_nuxt/img/banner.48e6129.jpg) no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-size: 100% 100%;
    }
    .el-input__inner {
        background-color: hsla(0,0%,100%,.6);
    }
</style>