<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="应用插件" name="first">
      <el-row class="zong">
        <el-col class="heng heng1">
          <div>应用插件 / 限时折扣</div>
        </el-col>
        <el-col class="heng heng2">
          <div>限时折扣</div>
        </el-col>
        <div v-show="show">
          <el-row class="henglan">
            <el-col :span="2">
              <el-button class="btn1" type="primary" @click="newUser">新建限时折扣</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableUserData"
            style="width: 100%">
            <el-table-column
              prop="user_name"
              label="活动名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="状态"
              width="140">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="优惠方式">
            </el-table-column>
            <el-table-column
              prop="add_user_id"
              label="规则">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="userDataEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="userDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="!show">
          <el-row class="henglanIn">
            <el-col :span="4">设置限时折扣<span class="returnOut" @click="returnOut">返回</span></el-col>          
          </el-row>
          <div class="bgWhite">
            <!--添加商品表单-->
            <el-form label-width="95px" :model="formAddUser" class="addUserFrom" :rules="rules" ref="formAddUser">
              <el-form-item label="豆点账号：" prop="admin">
                <el-input v-model="formAddUser.admin" placeholder="" class="addUser" :disabled="formAddUser.fromId !== ''"></el-input>
              </el-form-item>
              <el-form-item label="员工姓名：" prop="name">
                <el-input v-model="formAddUser.name" placeholder="" class="addUser"></el-input>
              </el-form-item>
              <el-form-item label="联系方式：" prop="phone">
                <el-input v-model="formAddUser.phone" placeholder="" class="addUser"></el-input>
              </el-form-item>
              <el-form-item label="角色权限：" prop="group">
                <template>
                  <el-radio v-model="formAddUser.radio" label="1">高级管理员</el-radio>
                  <el-radio v-model="formAddUser.radio" label="2">普通管理员</el-radio>
                </template>
              </el-form-item>
              <el-button v-show="showBtn" type="primary" class="btn2" @click="addUserAdmin('formAddUser')">添加管理员</el-button>
              <el-button v-show="!showBtn" type="primary" class="btn2 btnEdit" @click="editUserAdmin('formAddUser', formAddUser.fromId)">编辑管理员</el-button>
            </el-form>
          </div>
        </div>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from '../../plugins/axios'
  export default {
    layout: 'manage',
    data () {
      return {
        activeName: 'first',
        shopId: 0,
        rules: {
          // 添加管理员的表单验证
          admin: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
        },
        // 管理员表格
        tableUserData: [],
        // 管理员添加表单数据
        formAddUser: {
          formId: '',
          admin: '',
          name: '',
          phone: '',
          radio: '1'
        },
        show: true,
        showBtn: true
      }
    },
    beforeMount () {
      // 添加管理员列表加载
      this.addUserData()
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
    },
    methods: {
      handleClick () {
        this.$router.push({path: '/manage/chajian'})
      },
      // 返回按钮
      returnOut () {
        this.show = true
        this.addUserData()
      },
      // 添加管理员
      newUser () {
        this.formAddUser.fromId = ''
        this.formAddUser.admin = ''
        this.formAddUser.name = ''
        this.formAddUser.phone = ''
        this.formAddUser.radio = '1'
        this.showBtn = true
        this.show = false
      },
      // 管理员列表数据
      addUserData () {
        axios.post('https://api.doudot.cn/seller/shop/admin?shop_id=' + this.shopId + '&user_id=' + this.userId).then((res) => {
          if (res.data.code === 1) {
            console.log(res.data.data)
            this.tableUserData = []
            this.tableUserData = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.data.msg
            })
          }
        })
      },
      // 添加管理员
      addUserAdmin (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('https://api.doudot.cn/seller/shop/addadmin?shop_id=' + this.shopId + '&add_user_id=' + this.userId + '&user_name=' + this.formAddUser.admin + '&name=' + this.formAddUser.name + '&mobile=' + this.formAddUser.phone + '&role=' + this.formAddUser.radio).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.show = true
                this.addUserData()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.error.msg
                })
              }
            })
          }
        })
      },
      // 编辑管理员信息
      userDataEdit (index, row) {
        axios.post('https://api.doudot.cn/seller/shop/editadmin', { id: row.id, user_id: this.userId, shop_id: this.shopId }).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            console.log(res.data)
            this.formAddUser.fromId = res.data.data.id
            this.formAddUser.admin = res.data.data.user_name
            this.formAddUser.name = res.data.data.name
            this.formAddUser.phone = res.data.data.mobile
            var radioItem = (res.data.data.role).toString()
            this.formAddUser.radio = radioItem
            this.showBtn = false
            this.show = false
          }
        })
      },
      // 修改管理员
      editUserAdmin (formName, id) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('https://api.doudot.cn/seller/shop/doedit?id=' + id + '&name=' + this.formAddUser.name + '&mobile=' + this.formAddUser.phone + '&role=' + this.formAddUser.radio).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
                this.show = true
                this.addUserData()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.error.msg
                })
              }
            })
          }
        })
      },
      // 删除管理员
      userDelete (row) {
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('https://api.doudot.cn/seller/shop/delAdmin', { id: row.id, user_id: this.userId, shop_id: this.shopId }).then((res) => {
            if (res.data.error) {
              console.log(res.data.error.msg)
              this.$message({
                type: 'error',
                message: res.data.error.msg
              })
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.addUserData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
}
</script>

<style scoped>
.zong{background-color: white;padding-left: 20px;}
.heng{padding: 15px 15px 15px 0;}
.heng1{border-bottom: 1px solid #eee;}
.heng2{margin-bottom: 30px;border-bottom: 1px solid #eee;}
.heng-title{padding-left:50px;}
.heng .el-button{margin-bottom: 15px;}
.content{padding:0 0; font-size: 14px; color: #555;}
.content_p{margin-bottom: 20px;}
.hangL{color: #999;line-height: 30px;text-align: right;font-size: 16px;}
.hangR{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR1{line-height: 30px;box-sizing: border-box;font-size: 16px;padding-left: 20px;box-sizing: border-box;}
.hangR .el-button{margin-left: 20px;font-size: 16px;padding: 7px 0;}
.hangIn:nth-child(1){margin-top: 40px;}
.hangIn{margin-bottom: 40px;}
.hangR .el-input{width: 40%;min-width:200px;}
.hangR p{color:#999;font-size: 14px;}
a{color:#fdaa60;}
/* 添加管理员 */
.henglan{padding: 10px 0px;border-bottom: 1px solid #eee;}
.henglanIn{padding: 10px 0px 10px; margin-bottom: 10px;border-bottom: 1px solid #eee;font-size: 14px; color: #555;}
.el-tabs__header {
  margin: 0;
}
.btn1 {
  font-size: 12px;
  padding: 10px 15px;
}
.btn2 {
  font-size: 12px;
  padding: 8px 13px;
  margin-left: 95px;
}
.btn2 + .btnEdit {
  margin-left: 95px;
}
.container {
  padding: 15px 20px 20px 10px;
}
.el-table td:first-child .cell, .el-table th:first-child .cell {
  padding-left: 20px;
}
.addUser {
  width: 200px;
}
.addUserFrom {
  padding-left: 50px;
  padding-top: 20px;
}
.user-prompt {
  font-size: 12px;
  color: #666;
  padding-left: 10px;
  margin: 5px 0;
}
.prompt_one {
  margin-top: 20px;
}
.prompt_in {
  line-height: 15px;
  padding-left: 0;
}
.returnOut {
  margin-left: 20px;
  color: #fc9538;
  cursor: pointer;
}
</style>
