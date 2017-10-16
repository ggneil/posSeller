<template>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="18" :md="16" :lg="12">
      <el-card class="box-card">
        <div slot="header" class="head clearfix">
          <h3>创建店铺</h3>
        </div>
        <el-form :model="shopInfo" :rules="rules" ref="shopInfo">
          <el-form-item prop="name" label="店铺名称"
            :rules="[
              { required: true, message: '店铺名称不能为空'},
            ]">
            <el-input v-model="shopInfo.name" placeholder="请输入店铺名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺LOGO">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="logoUrl" :src="logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="营业时间" prop="checkedDay"
            :rules="[
              { required: true, message: '请选择营业时间' },
            ]">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="shopInfo.checkedDay" @change="handleCheckedDayChange">
              <el-checkbox v-for="city in dayOptions" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
            <el-time-select
              class="Mtop"
              :editable="false"
              placeholder="起始时间"
              v-model="shopInfo.startTime"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '24:00'
              }">
            </el-time-select>
            <span class="timeInp Mtop">至</span>  
            <el-time-select
              class="Mtop"
              :editable="false"
              placeholder="结束时间"
              v-model="shopInfo.endTime"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '24:00',
                minTime: shopInfo.startTime
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item prop="mobile" label="电话">
            <el-input v-model="shopInfo.mobile" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="cityOption">
            <br />
            <el-cascader
              :options="province"
              @active-item-change="handleDistictChange"
              :props="props">
            </el-cascader>
          </el-form-item>
          <el-form-item prop="address" label=""
            :rules="[
              { required: true, message: '请输入详细地址' },
            ]">
            <el-input
              v-model="shopInfo.address"
              placeholder="请输入详细地址">
            </el-input>
          </el-form-item> 
          <el-form-item>
            <el-button type="primary" @click="submitForm('shopInfo')">创建店铺</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import axios from '../../plugins/axios'
  const dayOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
        shopInfo: {
          name: '',
          checkedDay: dayOptions,
          startTime: '08:00',
          endTime: '20:00',
          mobile: '',
          address: '',
          cityOption: []
        },
        province: [],
        props: {
          value: 'id',
          label: 'name'
        },
        dayOptions: dayOptions,
        checkAll: true,
        isIndeterminate: true,
        logoUrl: '',
        submit_loading: false,
        rules: {
          mobile: [{ validator: validateMobile, required: true, trigger: 'blur' }],
          cityOption: [{ type: 'array', required: true, message: '请选择城市', trigger: 'change' }]
        }
      }
    },
    mounted: () => {
      axios.post('/seller/shop/getaddress', { id: 0 }).then((res) => {
        this.province = res.data.address
      })
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
  
      handleAvatarSuccess (res, file) {
        this.logoUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG 和 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      handleCheckAllChange (value) {
        this.shopInfo.checkedDay = value ? dayOptions : []
        this.isIndeterminate = false
      },
      handleCheckedDayChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === dayOptions.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < dayOptions.length
      }
    }
  }
</script>

<style>
  .box-card{margin-top: 80px;margin-bottom:80px;border-radius: 0;
    box-shadow: none;border: 1px solid #409EFF}
  .box-card .el-card__header{background-color: #409EFF;color: #ffffff;text-align: center}

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .timeInp{
    margin-left: 20px;
    margin-right: 20px;
  }
  .Mtop{
    margin-top: 20px;
  }
</style>
