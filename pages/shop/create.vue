<template>
  <el-row type="flex" justify="center">
    <el-col :xs="22" :sm="18" :md="16" :lg="12">
      <el-card class="box-card">
        <div slot="header" class="head clearfix">
          <h3>创建店铺</h3>
        </div>
        <el-form :model="shopInfo" :rules="rules" ref="shopInfo">
          <el-form-item label="店铺名称">
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
          <el-form-item label="营业时间">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="shopInfo.checkedDay" @change="handleCheckedDayChange">
              <el-checkbox v-for="city in dayOptions" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  const dayOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    data () {
      return {
        shopInfo: {
          name: '',
          checkedDay: dayOptions
        },
        dayOptions: dayOptions,
        checkAll: true,
        isIndeterminate: true,
        logoUrl: '',
        submit_loading: false,
        rules: {
        }
      }
    },
    methods: {
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
  .box-card{margin-top: 80px;border-radius: 0;
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
</style>
