<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="店铺信息" name="first">
      <div class="shopInfo"  v-show="!changeInfo">
        <el-row class="navTitle">基本资料</el-row>
        <div class="navContent">
          <el-row class="navBody">
            <el-col :span="2" offset="1">店铺名称：</el-col>
            <el-col :span="21">{{shopInfo.name}}</el-col>
          </el-row>
          <el-row class="navBody">
            <el-col :span="2" offset="1">店铺Logo：</el-col>
            <el-col :span="21"><img class="imgSize1" :src="shopInfo.logoUrl"></img></el-col>
          </el-row>
          <el-row class="navBody">
            <el-col :span="2" offset="1">营业时间：</el-col>
            <el-col :span="21">
              <el-row>
                <el-col>{{shopInfo.week}}</el-col>
                <el-col>{{openTime1}}</el-col>
                <el-col v-if="openTime2">{{openTime2}}</el-col>
                <el-col v-if="openTime3">{{openTime3}}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="navBody">
            <el-col :span="2" offset="1">店铺电话：</el-col>
            <el-col :span="21">{{shopInfo.mobile}}</el-col>
          </el-row>
          <el-row class="navBody">
            <el-col :span="2" offset="1">所在地区：</el-col>
            <el-col :span="21">{{shopInfo.area + " " + shopInfo.address}}</el-col>
          </el-row>
          <el-row class="navBody">
            <el-col :span="2" offset="1"><el-button size="small" @click="pageShow" type="primary">修改信息</el-button></el-col>
          </el-row>
        </div>
        <el-row class="navTitle">
          <p>联系电话</p>
          <p class="pl">18943541649</p>
        </el-row>
        <el-row class="navTitle">
          <p>认证信息</p>
          <p class="pl">{{ shopStatus }}</p>
          <el-button class="pl" :disabled="shopStatusBtn" @click="shengqingrenzheng" type="primary" size="small">{{ shopStatusBtn ? '已认证' : '申请认证' }}</el-button>
        </el-row>
      </div>
      <el-row type="flex" justify="center" v-show="changeInfo">
        <el-col :xs="22" :sm="18" :md="16" :lg="12">
          <el-card class="box-card">
            <div slot="header" class="head clearfix">
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
                  action="https://cdn.wangdoukeji.com/api/Attachment/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="shopInfo.logoUrl" :src="shopInfo.logoUrl" class="avatar">
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
                <el-button type="primary" @click="submitForm('shopInfo')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="桌台管理" name="second">
      <div v-if="zhuowei">
        <el-row>
          <el-col style="padding-bottom: 10px;padding-left: 30px;padding-top: 10px;"><el-button type="primary" size="small" @click="buildzhuotai">添加桌位</el-button><el-button @click="zhuowei = !zhuowei" size="small">类型管理</el-button></el-col>
        </el-row>
        <el-table
          :data="zhuotaiInfo"
          border
          style="width: 100%">
          <el-table-column
            label="桌位类型">
            <template scope="scope">
              <el-row>
                <el-col>
                 {{ scope.row.name }}({{ scope.row.min }} - {{ scope.row.max }})
                </el-col> 
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            label="桌号">
            <template scope="scope">
              <el-row>
                {{ scope.row.table_id }}
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="编辑">
            <template scope="scope">
              <el-button
                size="small"
                @click="editzhuotai(scope.$index, scope.row)">编辑</el-button>
              <a style="color:white;text-decoration:none;margin:0 10px;" :href="scope.row.mpc_path.replace(/\\/, '')" :download="scope.row.table_id + '桌台码'">
                <el-button
                  size="small"
                  type="primary"
                  >生成小程序码</el-button></a>
              <el-button
                size="small"
                type="danger"
                @click="shanchuzhuotai(scope.$index, scope.row)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="!zhuowei">
        <el-row>
          <el-col style="padding-bottom: 10px;padding-left: 30px;padding-top: 10px;"><el-button @click="zhuowei = !zhuowei" size="small">桌位管理</el-button><el-button @click="build" type="primary" size="small">添加类型</el-button></el-col>
        </el-row>
        <el-table
          :data="zhuotaiGroupInfo"
          border
          style="width: 100%">
          <el-table-column
            label="桌位类型">
            <template scope="scope">
              <el-row>
                <el-col>
                  {{ scope.row.name }}({{ scope.row.min }} - {{ scope.row.max }})
                </el-col> 
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="编辑">
            <template scope="scope">
              <el-button
                size="small"
                @click="editFenzu(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="shanchuFenzu(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="类型信息"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form :model="zhuotaiGroupInfoEdit" ref="zhuotaiGroupInfoEdit">
          <el-form-item
            prop="name"
            :rules="[
              { required: true, message: '类型不能为空', trigger: 'blur' },
              { max: 8, message: '最多八位', trigger: 'blur' }
            ]"
          >
            <el-input v-model="zhuotaiGroupInfoEdit.name" placeholder="类型名称（1-8）"></el-input>
          </el-form-item>
          <el-form-item
            prop="min"
            :rules="[
              { required: true, message: '最小值不能为空（最多2位）', trigger: 'blur' }
            ]"
          >
            <el-input type="number" v-model="zhuotaiGroupInfoEdit.min" placeholder="最少可坐人数（1-2位数字）"></el-input>
          </el-form-item>
          <el-form-item
            prop="max"
            :rules="[
              { required: true, message: '最大值不能为空（最多2位）', trigger: 'blur' }
            ]"
          >
            <el-input type="number" v-model="zhuotaiGroupInfoEdit.max" placeholder="最多可坐人数（1-2位数字）"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="xiugaiGroup === 1 ? saveleixing(zhuotaiGroupInfoEdit.tag_id, 'zhuotaiGroupInfoEdit') : buildleixing(zhuotaiGroupInfoEdit.tag_id, 'zhuotaiGroupInfoEdit')">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="类型信息"
        :visible.sync="tianjiazhuotai"
        width="30%">
        <el-form :model="zhuotaiInfoEdit" ref="zhuotaiInfoEdit">
          <el-form-item
            prop="tag_id"
            :rules="[
              { required: true, message: '类型不能为空', trigger: 'blur' }
            ]"
          >
            <el-select v-model="zhuotaiInfoEdit.tag_id" placeholder="请选择">
              <el-option
                v-for="item in zhuotaiGroupInfo"
                :key="item.tag_id"
                :label="item.name + '(' + item.min + '-' + item.max + ')'"
                :value="item.tag_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="table_id"
            :rules="[
              { required: true, message: '桌号不能为空', trigger: 'blur' },
              { max: 8, message: '最多八位', trigger: 'blur' }
            ]"
          >
            <el-input v-model="zhuotaiInfoEdit.table_id" placeholder="桌号名称（1-8位）"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="tianjiazhuotai = false">取 消</el-button>
          <el-button size="small" type="primary" @click="xiugaizhuotai === 1 ? zhuotaisaveleixing(zhuotaiInfoEdit.tag_id, 'zhuotaiInfoEdit') : zhuotaibuildleixing(zhuotaiInfoEdit.tag_id, 'zhuotaiInfoEdit')">保 存</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from '../../plugins/axios'
  const dayOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    layout: 'manage',
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
        xiugaiGroup: 1,
        dialogVisible: false,
        tianjiazhuotai: false,
        renzheng: false,
        activeName: 'first', // 默认加载店铺信息
        shopId: 1,
        userId: 1,
        shopStatus: '未认证',
        shopStatusBtn: false,
        zhuowei: true,
        zhuotaiInfo: [],
        zhuotaiInfoEdit: {
          table_id: '',
          tag_id: ''
        },
        zhuotaiGroupInfo: [],
        zhuotaiGroupInfoEdit: {
          name: '',
          min: '',
          max: '',
          tag_id: ''
        },
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
          cityOption: []
        },
        openTime1: '',
        openTime2: '',
        openTime3: '',
        tianjia1: false,
        tianjia2: false,
        addIndex: 0,
        changeInfo: false,
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
        },
        zhuotai: [1, 4, 1, 3]
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      // this.shopId = 1
      // this.userId = localStorage.getItem('user_id')
      if (this.$route.query.id) {
        this.activeName = 'second'
      }
      this.shopInfoLoad()
      this.zhuotaiInfoLoad()
      this.zhuotaiGroupInfoLoad()
      console.log(this.zhuotaiGroupInfo)
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
      // 新建类型
      build () {
        this.xiugaiGroup = 0
        this.zhuotaiGroupInfoEdit.name = ''
        this.zhuotaiGroupInfoEdit.min = ''
        this.zhuotaiGroupInfoEdit.max = ''
        this.zhuotaiGroupInfoEdit.tag_id = ''
        this.dialogVisible = true
      },
      // 新建类型
      buildzhuotai () {
        this.xiugaizhuotai = 0
        this.zhuotaiInfoEdit.table_id = ''
        this.zhuotaiInfoEdit.tag_id = ''
        this.tianjiazhuotai = true
      },
      // 保存类型
      saveleixing (tagid, formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            axios.post('https://cdn.wangdoukeji.com/index.php/seller/Table/editTag?tag_id=' + tagid + '&name=' + this.zhuotaiGroupInfoEdit.name + '&min=' + this.zhuotaiGroupInfoEdit.min + '&max=' + this.zhuotaiGroupInfoEdit.max).then((res) => {
              if (res.data.code === 1) {
                that.$message({
                  type: 'success',
                  message: '修改成功'
                })
                that.zhuotaiGroupInfoLoad()
              } else {
                that.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 编辑桌台
      zhuotaisaveleixing (tagid, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tianjiazhuotai = false
            axios.post('https://cdn.wangdoukeji.com/index.php/seller/Table/editTable?id=' + this.zhuotaiInfoEdit.id + '&table_id=' + this.zhuotaiInfoEdit.table_id + '&tag_id=' + this.zhuotaiInfoEdit.tag_id).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.zhuotaiInfoLoad()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 新建类型
      buildleixing (tagid, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            axios.post('https://cdn.wangdoukeji.com/index.php/seller/Table/addTag?shop_id=' + this.shopId + '&name=' + this.zhuotaiGroupInfoEdit.name + '&min=' + this.zhuotaiGroupInfoEdit.min + '&max=' + this.zhuotaiGroupInfoEdit.max).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '新建成功'
                })
                this.zhuotaiGroupInfoLoad()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 新建类型
      zhuotaibuildleixing (tagid, formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tianjiazhuotai = false
            axios.post('https://cdn.wangdoukeji.com/index.php/seller/Table/addTable?shop_id=' + this.shopId + '&table_id=' + this.zhuotaiInfoEdit.table_id + '&tag_id=' + this.zhuotaiInfoEdit.tag_id).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '新建成功'
                })
                this.zhuotaiInfoLoad()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.msg
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 桌台类型信息
      zhuotaiGroupInfoLoad () {
        axios.get('https://cdn.wangdoukeji.com/index.php/seller/table/tagsList?shop_id=' + this.shopId).then((res) => {
          if (res.data.code === 1) {
            this.zhuotaiGroupInfo = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
      // 桌台信息
      zhuotaiInfoLoad () {
        axios.get('https://cdn.wangdoukeji.com/index.php/seller/table/tableList?shop_id=' + this.shopId).then((res) => {
          if (res.data.code === 1) {
            this.zhuotaiInfo = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
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
      // 判断对象值返回索引
      indexThis (val, obj) {
        for (var i in obj) {
          if (obj[i].value === val) {
            return i
          }
        }
      },
      // 地址id
      addressID (value) {
        this.shopInfo.addressId = value[2]
      },
      // 店铺信息加载
      shopInfoLoad () {
        axios.post('/seller/shop/shopDetail?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            if (res.data.shop[0].auth_status === 1) {
              this.shopStatus = '已认证'
              this.shopStatusBtn = true
            }
            var url = 'https://cdn.wangdoukeji.com/'
            localStorage.setItem('shopName', res.data.shop[0].name)
            localStorage.setItem('phone', res.data.shop[0].service_mobile)
            this.shopInfo = {
              name: res.data.shop[0].name,
              checkedDay: res.data.shop_time[0].week.split(','),
              startTime1: res.data.shop_time[0].start1,
              endTime1: res.data.shop_time[0].end1,
              startTime2: res.data.shop_time[0].start2,
              endTime2: res.data.shop_time[0].end2,
              startTime3: res.data.shop_time[0].start3,
              endTime3: res.data.shop_time[0].end3,
              mobile: res.data.shop[0].service_mobile,
              address: res.data.shop[0].address,
              imgId: res.data.shop[0].logo,
              addressId: '',
              area: res.data.shop[0].area_id,
              logoUrl: url + res.data.shop[0].path.replace(/\\/, ''),
              week: res.data.shop_time[0].week,
              cityOption: []
            }
            this.openTime1 = this.shopInfo.startTime1 + ' 至 ' + this.shopInfo.endTime1
            if (this.shopInfo.startTime2 === '0' && this.shopInfo.endTime2 === '0') {
              this.shopInfo.startTime2 = ''
              this.shopInfo.endTime2 = ''
              this.openTime2 = ''
            } else {
              this.openTime2 = this.shopInfo.startTime2 + ' 至 ' + this.shopInfo.endTime2
            }
            if (this.shopInfo.startTime3 === '0' && this.shopInfo.endTime3 === '0') {
              this.shopInfo.startTime3 = ''
              this.shopInfo.endTime3 = ''
              this.openTime3 = ''
            } else {
              this.openTime3 = this.shopInfo.startTime3 + ' 至 ' + this.shopInfo.endTime3
            }
          }
        })
      },
      // 修改页面显示隐藏
      pageShow () {
        if (this.changeInfo === false) {
          this.changeInfo = true
        } else {
          this.changeInfo = false
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/seller/Shop/editShop?shop_id=' + this.shopId + '&shop_name=' + this.shopInfo.name + '&logo=' + this.shopInfo.imgId + '&start1=' + this.shopInfo.startTime1 + '&end1=' + this.shopInfo.endTime1 + '&start2=' + this.shopInfo.startTime2 + '&end2=' + this.shopInfo.endTime2 + '&start3=' + this.shopInfo.startTime3 + '&end3=' + this.shopInfo.endTime3 + '&service_mobile=' + this.shopInfo.mobile + '&address=' + this.shopInfo.address + '&week=' + this.shopInfo.checkedDay.join(',') + '&area_id=' + this.shopInfo.addressId).then((res) => {
              if (res.data.error) {
                this.$message({
                  type: 'error',
                  message: res.data.error.msg
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '修改信息成功'
                })
                location.href = '/manage/shopManage'
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 头部nav点击事件
      handleClick () {
        this.changeInfo = false
        this.shopInfoLoad()
        this.tianjia1 = false
        this.tianjia2 = false
        this.addIndex = 0
      },
      handleAvatarSuccess (res, file) {
        this.shopInfo.logoUrl = URL.createObjectURL(file.raw)
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
      },
      shengqingrenzheng () {
        this.$router.push({path: '/manage/renzheng'})
      },
      editFenzu (i, row) {
        this.xiugaiGroup = 1
        this.dialogVisible = true
        this.zhuotaiGroupInfoEdit = row
      },
      editzhuotai (i, row) {
        this.xiugaizhuotai = 1
        this.tianjiazhuotai = true
        this.zhuotaiInfoEdit = row
      },
      shanchuzhuotai (i, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
          axios.post('https://cdn.wangdoukeji.com/index.php/seller/Table/deleteTable?id=' + row.id).then((res) => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.zhuotaiInfoLoad()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      shanchuFenzu (i, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
          axios.post('https://cdn.wangdoukeji.com/index.php/seller/Table/deleteTag?tag_id=' + row.tag_id).then((res) => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.zhuotaiGroupInfoLoad()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message
              })
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

<style>
  /*店铺信息*/
  .el-dialog__body{padding-bottom:0;}
  .navTitle{line-height: 40px;background-color: white;color: black;padding-left: 20px;margin-bottom: 5px;border-bottom:1px solid #eee;}
  .navTitle .pl{margin-left:40px;}
  .navTitle .el-button{margin-bottom: 20px;}
  .navBody{line-height: 40px;background-color: white;}
  .navContent{padding-top: 20px;padding-bottom: 20px;background-color: white;margin-bottom: 5px;border-bottom:1px solid #eee;}
  /*店铺信息结束*/
  .imgSize1{width:78px;height: 78px;}
  .box-card{margin-top: 80px;margin-bottom:80px;border-radius: 0;}
  /*.box-card .el-card__header{background-color: #409EFF;color: #ffffff;text-align: center}*/

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
  .zhuotai{margin-bottom: 20px;padding: 20px;background: white;box-shadow: 0 10px 16px -10px rgba(0, 0, 0, 0.7);border-radius: 4px;}
  .zhuotai p{margin: 5px;}
  .zhuotaiContent{background-color: #eee;padding-top: 20px;padding-left: 30px;}
</style>
