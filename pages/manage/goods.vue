<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品管理" name="first">
        <div v-show="show">
          <el-row class="henglan">
            <el-col :span="2">
              <el-button class="btn" type="primary" @click="handleShow">新建商品</el-button>
            </el-col>
            <el-col :span="10" :offset="11">
              <el-select class="Inp" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input class="Inp Inp2" v-model="input" placeholder="搜索商品..."></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="4" :sm="4" :md="4" :lg="2">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item
                  v-for="item in tableData"
                  class="secondNav" 
                  :index="item.id">
                {{item.fenzu}}</el-menu-item>
              </el-menu>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="22" class="dish-content">
              <p style="margin-top:100px;text-align:center;">没有商品</p>
            </el-col>
          </el-row>
        </div>
        <div v-show="!show">
          <el-row class="henglan">
            <el-col :span="4">商品管理 / 新建商品</el-col>
          </el-row>
          <div class="bgWhite">
            <!--添加商品表单-->
            <el-form label-width="80px" :model="formAddGoods" :rules="rules">
              <el-form-item label="图片：">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="标题：" prop="name">
                <el-input v-model="formAddGoods.name" placeholder="商品名称（最多40字）" maxlength="40"></el-input>
              </el-form-item>
              <el-form-item label="描述：">
                <el-input 
                  type="textarea"
                  maxlength="100"
                  :rows="2"
                  v-model="formAddGoods.description" 
                  placeholder="商品描述（最多100字）"></el-input>
              </el-form-item>
              <el-form-item label="价格：" prop="price">
                <el-input type="number" v-model="formAddGoods.price" placeholder="00.00"></el-input>
              </el-form-item>
              <el-form-item label="餐盒费：" prop="boxPrice">
                <el-input type="number" v-model="formAddGoods.boxPrice" placeholder="00.00"></el-input>
              </el-form-item>
              <el-form-item label="库存：" prop="num">
                <el-input type="number" v-model="formAddGoods.num" placeholder="1000"></el-input>
              </el-form-item>
              <el-form-item label="分组：" prop="group">
                <el-checkbox-group v-model="formAddGoods.group">
                  <el-checkbox
                   v-for="item in tableData"
                   :label="item.fenzu"
                   :fenzuId="item.id"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-button type="primary" class="btn" @click="submitForm('formAddGoods')">完成</el-button>
              <el-button type="defalut" class="btn">完成，继续添加下一个</el-button>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分组管理" name="second">
        <el-row class="henglan">
          <el-col :span="7">
            <el-button type="primary" class="btn" @click="handleNewGroup">新建分组</el-button>
            <el-button type="defalut" class="btn">分组排序</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            label="分组"
            style="width:33%;">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fenzu }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="包含商品"
            style="width:33%;">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>分组: {{ scope.row.fenzu }}</p>
                <div slot="reference" class="name-wrapper">
                  <span style="margin-left: 10px">{{ scope.row.goods }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
  export default {
    layout: 'manage',
    data () {
      var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
      var validateMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('钱数格式不正确（例：12.00）小数位不得超过两位'))
        } else {
          if (!reg.test(value)) {
            callback(new Error('钱数格式不正确（例：12.00）小数位不得超过两位'))
          } else {
            callback()
          }
        }
      }
      return {
        value: '选项1', // 下拉框默认选项
        activeName: 'first', // 第一个显示 商品管理
        bianji: '', // 编辑的组
        addGroup: '', // 添加的组
        firstShow: false, // 商品管理
        show: true, // 新建商品
        imageUrl: '', // 图片显示
        // 规则
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          price: [{ required: true, validator: validateMobile, trigger: 'blur' }],
          boxPrice: [{ required: true, validator: validateMobile, trigger: 'blur' }],
          num: [{ required: true, message: '设置库存', trigger: 'blur' }],
          group: [{ type: 'array', required: true, message: '请选择分类', trigger: 'change' }]
        },
        // 表单
        formAddGoods: {
          name: '',
          description: '',
          price: '',
          boxPrice: '',
          num: '',
          group: []
        },
        // 表格
        tableData: [{
          fenzu: '水果',
          goods: '0',
          id: '1'
        }, {
          fenzu: '蔬菜',
          goods: '0',
          id: '2'
        }, {
          fenzu: '酒类',
          goods: '0',
          id: '3'
        }, {
          fenzu: '坚果',
          goods: '0',
          id: '4'
        }],
        // 下拉框
        options: [{
          value: '选项1',
          label: '所有状态'
        }, {
          value: '选项2',
          label: '已下架'
        }, {
          value: '选项3',
          label: '已售罄'
        }]
      }
    },
    methods: {
      // 表单提交
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
            this.handleShow()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 顶部nav点击、打开、关闭事件
      handleClick (tab, event) {
        console.log(tab, event)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      // 删除组
      handleDelete (index, row) {
        row.splice(index, 1)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      },
      // 编辑组
      handleEdit (index, row) {
        this.bianji = row.fenzu
        this.$prompt('请输入分组名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: this.bianji
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '修改分组成功: ' + value
          })
          row.fenzu = value
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 添加组
      handleNewGroup () {
        this.$prompt('请输入分组名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: this.bianji
        }).then(({ value }) => {
          this.addGroup = {
            fenzu: value,
            goods: '0',
            id: this.tableData.length + 1
          }
          this.tableData.push(this.addGroup)
          this.$message({
            type: 'success',
            message: '添加分组成功: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 图片上传
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      // 隐藏切换
      handleShow () {
        if (this.show === true) {
          this.show = false
        } else {
          this.show = true
        }
      }
    }
  }
</script>
<style>
 /*图片上传*/
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  /*图片上传结束*/
 .el-tabs__header{margin-bottom: 0}
 .secondNav{text-align: center;border-bottom: 1px solid #eee;height: 40px;line-height: 40px;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
 .henglan{padding: 10px 20px;border-bottom: 1px solid #eee;}
 .btn{padding: 10px 18px}
 .Inp{width: 47.5%;}
 .Inp2{margin-left: 5%;}
 .dish-content{height: 100%;background-color: white;height: 480px;overflow: auto;border-left: 1px solid #eee;}
 .bgWhite{background-color: white;padding: 30px 40px;}
</style>
