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
              action="http://pos.wangdoukeji.com/api/Attachment/upload"
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
              v-model="shopInfo.startTime1"
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
              v-model="shopInfo.endTime1"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '24:00',
                minTime: shopInfo.startTime1
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item v-show="tianjia1">
            <el-time-select
              class="Mtop"
              :editable="false"
              placeholder="起始时间"
              v-model="shopInfo.startTime2"
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
              v-model="shopInfo.endTime2"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '24:00',
                minTime: shopInfo.startTime2
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item v-show="tianjia2">
            <el-time-select
              class="Mtop"
              :editable="false"
              placeholder="起始时间"
              v-model="shopInfo.startTime3"
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
              v-model="shopInfo.endTime3"
              :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '24:00',
                minTime: shopInfo.startTime3
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="addTime">添加时段</el-button>
          </el-form-item>
          <el-form-item prop="mobile" label="电话">
            <el-input v-model="shopInfo.mobile" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="cityOption">
            <br />
            <el-cascader
              :options="province"
              @change="addressID"
              v-model="shopInfo.cityOption"
              @active-item-change="handleDistictChange">
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
    // middleware: 'auth', // 中间件登陆之后才可以看到
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
          startTime1: '08:00',
          endTime1: '20:00',
          startTime2: '',
          endTime2: '',
          startTime3: '',
          endTime3: '',
          mobile: '',
          address: '',
          addressId: '',
          cityOption: [],
          imgId: ''
        },
        addIndex: 0,
        tianjia1: false,
        tianjia2: false,
        province: [],
        dayOptions: dayOptions,
        checkAll: true,
        isIndeterminate: true,
        logoUrl: '',
        submit_loading: false,
        rules: {
          mobile: [{ validator: validateMobile, required: true, trigger: 'blur' }],
          cityOption: [{ type: 'array', required: true, message: '请选择城市', trigger: 'blur' }]
        }
      }
    },
    beforeMount () {
      axios.post('/seller/shop/getaddress', { id: 0 }).then((res) => {
        for (var keys in res.data.address) {
          this.province.push({
            value: res.data.address[keys].id,
            label: res.data.address[keys].name,
            children: []
          })
        }
      })
    },
    methods: {
      // 地址id
      addressID (value) {
        this.shopInfo.addressId = value[2]
      },
      // 判断对象值返回索引
      indexThis (val, obj) {
        for (var i in obj) {
          if (obj[i].value === val) {
            return i
          }
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.shopInfo)
            var userId = localStorage.getItem('user_id')
            console.log(userId)
            axios.post('/seller/Shop/create?user_id=' + userId + '&shop_name=' + this.shopInfo.name + '&logo=' + this.shopInfo.imgId + '&start1=' + this.shopInfo.startTime1 + '&end1=' + this.shopInfo.endTime1 + '&start2=' + this.shopInfo.startTime2 + '&end2=' + this.shopInfo.endTime2 + '&start3=' + this.shopInfo.startTime3 + '&end3=' + this.shopInfo.endTime3 + '&service_mobile=' + this.shopInfo.mobile + '&address=' + this.shopInfo.address + '&week=' + this.shopInfo.checkedDay.join(',') + '&area_id=' + this.shopInfo.addressId).then((res) => {
              if (res.data.error) {
                this.$message({
                  type: 'error',
                  message: res.data.error.msg
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '创建店铺成功'
                })
                location.href = '/shop/shopList'
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 添加时段
      addTime () {
        this.addIndex += 1
        if (this.addIndex === 1) {
          this.tianjia1 = true
          this.shopInfo.startTime2 = this.shopInfo.endTime1
        } else if (this.addIndex === 2) {
          this.tianjia2 = true
          this.shopInfo.startTime3 = this.shopInfo.endTime2
        } else {
          this.$message({
            type: 'error',
            message: '已经添加不了更多了'
          })
        }
      },
      handleAvatarSuccess (res, file) {
        this.logoUrl = URL.createObjectURL(file.raw)
        this.shopInfo.imgId = res.id
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
      },
      handleDistictChange (value1) {
        console.log(value1.length)
        if (value1.length === 1) {
          this.province[value1[0] - 1].children = []
          axios.post('/seller/shop/getaddress?id=' + value1[0]).then((res) => {
            for (var keys in res.data.address) {
              this.province[value1[0] - 1].children.push({
                value: res.data.address[keys].id,
                label: res.data.address[keys].name,
                children: []
              })
            }
          })
        } else if (value1.length === 2) {
          this.province[value1[0] - 1].children[this.indexThis(value1[1], this.province[value1[0] - 1].children)].children = []
          axios.post('/seller/shop/getaddress?id=' + value1[1]).then((res) => {
            for (var keys in res.data.address) {
              this.province[value1[0] - 1].children[this.indexThis(value1[1], this.province[value1[0] - 1].children)].children.push({
                value: res.data.address[keys].id,
                label: res.data.address[keys].name
              })
            }
          })
        }
      }
    }
  }
</script>

<style>
  .box-card{margin-top: 80px;margin-bottom:80px;border-radius: 0;
    box-shadow: none;border: 1px solid #fc9538}
  .box-card .el-card__header{background-color: #fc9538;color: #ffffff;text-align: center}

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #feca9c;
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
