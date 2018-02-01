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
            <el-col :span="21"><img class="imgSize1" :src="shopInfo.logoUrl"/></el-col>
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
          <p>认证信息</p>
          <p class="pl">{{ shopStatus }}</p>
          <el-button class="pl" :disabled="shopStatusBtn" @click="shengqingrenzheng" type="primary" size="small">{{ shopStatus === '认证未通过' ? '重新认证' : shopStatus}}</el-button>
        </el-row>
      </div>
      <el-row type="flex" justify="center" v-show="changeInfo">
        <el-col :xs="22" :sm="18" :md="16" :lg="12">
          <el-card class="box-card">
            <div slot="header" class="head clearfix">
              修改信息
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
                  action="https://api.doudot.cn/api/Attachment/upload"
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
                <el-button size="small" type="primary" @click="addTime">添加时段</el-button>
                <el-button v-if="deleteBtn" size="small" @click="deleteTime">删除时段</el-button>
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
                  :placeholder="morenCity"
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
              <el-form-item prop="comment" label="店铺介绍"
                :rules="[
                  { required: true, message: '请输入店铺介绍' },
                  { max: 150, message: '店铺介绍最多150个字', trigger: 'blur' }
                ]"> 
                <el-input
                  v-model="shopInfo.comment"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4}"
                  placeholder="请输入店铺介绍">
                </el-input>
              </el-form-item>
              <el-form-item label="店铺图片">
                  (推荐尺寸：750x400)
                <el-upload
                  class="avatar-uploader"
                  action="https://api.doudot.cn/api/Attachment/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccessBanner"
                  :before-upload="beforeAvatarUploadBanner">
                  <img v-if="shopInfo.shopBannerUrl" :src="shopInfo.shopBannerUrl" class="avatar banner_avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('shopInfo')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane v-if="!huadian" label="桌台管理" name="second">
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
                  >生成桌台码</el-button></a>
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
            <el-input v-model="zhuotaiGroupInfoEdit.name" placeholder="桌台类型"></el-input>
          </el-form-item>
          <el-form-item
            prop="min"
            :rules="[
              { required: true, message: '最小值可坐人数不能为空（最多2位）', trigger: 'blur' },
              { min: 1, max: 2, message: '最小值可坐人数不能为空（最多2位）', trigger: 'blur' }
            ]"
          >
            <el-input type="number" v-model="zhuotaiGroupInfoEdit.min" placeholder="最少可坐人数（1-2位数字）"></el-input>
          </el-form-item>
          <el-form-item
            prop="max"
            :rules="[
              { required: true, message: '最大值不能为空（最多2位）', trigger: 'blur' },
              { min: 1, max: 2, message: '最小值可坐人数不能为空（最多2位）', trigger: 'blur' }

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
          >
            <el-select v-model="zhuotaiInfoEdit.tag_id" placeholder="请选择">
              <el-option
                v-for="item in zhuotaiGroupInfo"
                :key="item.tag_id"
                :label="item.name + '(' + item.min + '-' + item.max + '人)'"
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
            <el-input v-model="zhuotaiInfoEdit.table_id" placeholder="桌号名称（x-y人）"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="tianjiazhuotai = false">取 消</el-button>
          <el-button size="small" type="primary" @click="xiugaizhuotai === 1 ? zhuotaisaveleixing(zhuotaiInfoEdit.tag_id, 'zhuotaiInfoEdit') : zhuotaibuildleixing(zhuotaiInfoEdit.tag_id, 'zhuotaiInfoEdit')">保 存</el-button>
        </span>
      </el-dialog>
    </el-tab-pane>
    <el-tab-pane label="首页轮播" name="third">
      <el-upload
        class="upload-demo"
        action="https://api.doudot.cn/api/Attachment/upload"
        :on-success="handSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="bannerUrl"
        list-type="picture">
        <el-button size="small" type="primary" class="up-btn">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb(推荐尺寸：750x400)</div>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="管理员" name="fourth" class="container">
      <div v-show="show">
        <el-row class="henglan">
          <el-col :span="2">
            <el-button class="btn1" type="primary" @click="newUser">添加管理员</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableUserData"
          style="width: 100%">
          <el-table-column
            prop="user_name"
            label="管理员账号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="140">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="add_user_id"
            label="添加人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="添加时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色/权限">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
              <template scope="scope">
                <el-row v-show="scope.row.operation !== '1'">
                  {{ scope.row.operation }}
                </el-row>
                <el-button
                  v-show="scope.row.operation === '1'"
                  size="small"
                  @click="userDataEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  v-show="scope.row.operation === '1'"
                  size="small"
                  type="danger"
                  @click="userDelete(scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <p class="user-prompt prompt_one">普通管理员：具备绝大部分管理权限，不能添加、删除其他管理员、不能删除店铺</p>
        <p class="user-prompt">高级管理员：具备一切管理权限，包含删除其他管理员帐号、删除店铺等权限</p>
      </div>
      <div v-show="!show">
        <el-row class="henglanIn">
          <el-col :span="4">管理员 / 添加管理员</el-col>
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
                <p class="user-prompt prompt_one prompt_in">普通管理员：具备绝大部分管理权限，不能添加、删除其他管理员、不能删除店铺</p>
                <p class="user-prompt prompt_in">高级管理员：具备一切管理权限，包含删除其他管理员帐号、删除店铺等权限</p>
              </template>
            </el-form-item>
            <el-button v-show="showBtn" type="primary" class="btn2" @click="addUserAdmin('formAddUser')">添加管理员</el-button>
            <el-button v-show="!showBtn" type="primary" class="btn2 btnEdit" @click="editUserAdmin('formAddUser', formAddUser.fromId)">编辑管理员</el-button>
          </el-form>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="打印机" name="Fifth" class="container">
      <el-row class="henglan">
        <el-col :span="2">
          <el-button class="btn1" type="primary" @click="newPrinterBtn">新建打印机</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="printerListData"
        style="width: 100%">
        <el-table-column
          prop="printerName"
          label="打印机"
          width="180">
        </el-table-column>
        <el-table-column
          prop="brand"
          label="类型"
          width="140">
        </el-table-column>
        <el-table-column
          prop="printerNumber"
          label="设备号码">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
            <template scope="scope">
              <el-button
                size="small"
                @click="printerDataEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="printerDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-dialog title="打印机" :visible.sync="dialogFormVisible" class="printerModel">
        <p class="printer_p">PC仅支持连接WiFi打印机，蓝牙打印机请使用App连接。</p>
        <p class="printer_p">请确保WiFi打印机已连接网络。</p>
        <el-form :model="newPrinter" :label-width="formLabelWidth" :rules="rules" ref="newPrinter">
          <el-form-item label="设置品名:">
            <template>
              <el-radio :disabled="editDisabled" v-model="newPrinter.brandRadio" label="1">365</el-radio>
              <el-radio :disabled="editDisabled" v-model="newPrinter.brandRadio" label="2">飞鹏</el-radio>
              <el-radio :disabled="editDisabled" v-model="newPrinter.brandRadio" label="3">易联云(不支持K1/K2/K3)</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="设备名称:" prop="printerName">
            <el-input v-model="newPrinter.printerName" placeholder="输入名称，如厨房打印机" class="addUser"></el-input>
          </el-form-item>
          <el-form-item label="设备号码:" prop="printerMobile">
            <el-input :disabled="editDisabled" v-model="newPrinter.printerMobile" placeholder="输入设备底部的机器号" class="addUser"></el-input>
          </el-form-item>
          <el-form-item label="设备密钥:" prop="printerPassworld">
            <el-input :disabled="editDisabled" v-model="newPrinter.printerPassworld" placeholder="输入密钥" class="addUser"></el-input>
          </el-form-item>
          <el-form-item label="打印数量:">
            <template>
              <el-radio v-model="newPrinter.numberRadio" label="1">1张</el-radio>
              <el-radio v-model="newPrinter.numberRadio" label="2">2张</el-radio>
              <el-radio v-model="newPrinter.numberRadio" label="3">3张</el-radio>
              <el-radio v-model="newPrinter.numberRadio" label="4">4张</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="打印显示:">
            <template>
              <el-radio v-model="newPrinter.showRadio" label="1">按下单顺序打印菜品</el-radio>
              <el-radio v-model="newPrinter.showRadio" label="2">按商品分组打印菜品</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="打印支持:">
            <template>
              <el-checkbox-group 
                v-model="newPrinter.checkedCities"
                :min="1">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="printerBtnModel" @click="dialogFormVisible = false">取 消</el-button>
          <el-button class="printerBtnModel" v-show="printerBtnShow" type="primary" @click="addPrinter('newPrinter')">确 定</el-button>
          <el-button class="printerBtnModel" v-show="!printerBtnShow" type="primary" @click="editPrinter('newPrinter', newPrinter.id)">确 定</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from '../../plugins/axios'
  const dayOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const printerOptions = ['外卖订单', '堂食订单', '扫码买单订单']
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
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系方式'))
        } else {
          if (!/^1\d{10}$/.test(value)) {
            callback(new Error('请输入正确的联系方式'))
          } else {
            callback()
          }
        }
      }
      return {
        huadian: false,
        deleteBtn: false,
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
          cityOption: [],
          comment: ''
        },
        bannerPath: '',
        morenCity: '',
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
        shopBannerUrl: '',
        submit_loading: false,
        rules: {
          mobile: [{ validator: validateMobile, required: true, trigger: 'blur' }],
          cityOption: [{ type: 'array', required: true, message: '请选择城市', trigger: 'change' }],
          // 添加管理员的表单验证
          admin: [{ validator: validateMobile, required: true, trigger: 'blur' }],
          phone: [{ validator: validatePhone, required: true, trigger: 'blur' }],
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          // 打印机的表单验证
          printerName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          printerMobile: [{ required: true, message: '请输入设备号', trigger: 'blur' }],
          printerPassworld: [{ required: true, message: '请输入密钥', trigger: 'blur' }]
        },
        zhuotai: [1, 4, 1, 3],
        bannerUrl: [],
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
        showBtn: true,
        // 打印机列表
        printerListData: [],
        // 新建打印机表单
        dialogFormVisible: false,
        newPrinter: {
          id: '',
          printerName: '',
          printerMobile: '',
          printerPassworld: '',
          brandRadio: '1',
          numberRadio: '1',
          showRadio: '1',
          checkedCities: ['外卖订单', '堂食订单', '扫码买单订单']
        },
        // label的宽
        formLabelWidth: '120px',
        // 多选
        cities: printerOptions,
        printerBtnShow: true,
        editDisabled: false
      }
    },
    beforeMount () {
      if (localStorage.getItem('shopType') === '5') {
        this.huadian = true
      }
      this.shopId = localStorage.getItem('shop_id')
      this.userId = localStorage.getItem('user_id')
      if (this.$route.query.id) {
        this.activeName = 'second'
      }
      this.shopInfoLoad()
      this.zhuotaiInfoLoad()
      this.zhuotaiGroupInfoLoad()
      this.bannerList()
      // 添加管理员列表加载
      this.addUserData()
      // 打印机列表加载
      this.printerList()
    },
    methods: {
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
              message: res.data.msg
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
      },
      // 新建打印机初始化
      newPrinterBtn () {
        this.newPrinter.printerName = ''
        this.newPrinter.printerMobile = ''
        this.newPrinter.printerPassworld = ''
        this.newPrinter.brandRadio = '1'
        this.newPrinter.numberRadio = '1'
        this.newPrinter.showRadio = '1'
        this.newPrinter.checkedCities = ['外卖订单', '堂食订单', '扫码买单订单']
        this.dialogFormVisible = true
        this.printerBtnShow = true
        this.editDisabled = false
      },
      // 打印机列表
      printerList () {
        axios.post('https://api.doudot.cn/seller/printer/showPrinter?shop_id=' + this.shopId).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            this.printerListData = res.data.data
            console.log(res.data.data)
          }
        })
      },
      // 添加打印机
      addPrinter (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('https://api.doudot.cn/seller/printer/addprinter?shop_id=' + this.shopId + '&user_id=' + this.userId + '&brand=' + this.newPrinter.brandRadio + '&printerName=' + this.newPrinter.printerName + '&printerNumber=' + this.newPrinter.printerMobile + '&printerKey=' + this.newPrinter.printerPassworld + '&printQuantity=' + this.newPrinter.numberRadio + '&display=' + this.newPrinter.showRadio + '&support=' + this.newPrinter.checkedCities).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
                this.dialogFormVisible = false
                this.printerList()
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
      // 编辑打印机
      printerDataEdit (index, row) {
        axios.post('https://api.doudot.cn/seller/printer/editPrinter', { id: row.id }).then((res) => {
          if (res.data.error) {
            this.$message({
              type: 'error',
              message: res.data.error.msg
            })
          } else {
            console.log(res.data)
            this.newPrinter.id = res.data.data.id
            this.newPrinter.printerName = res.data.data.printerName
            this.newPrinter.printerMobile = res.data.data.printerNumber
            this.newPrinter.printerPassworld = res.data.data.printerKey
            this.newPrinter.brandRadio = res.data.data.brand
            this.newPrinter.numberRadio = res.data.data.printQuantity
            this.newPrinter.showRadio = res.data.data.display
            this.newPrinter.checkedCities = res.data.data.support.split(',')
            this.dialogFormVisible = true
            this.printerBtnShow = false
            this.editDisabled = true
          }
        })
      },
      // 修改打印机
      editPrinter (formName, id) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('https://api.doudot.cn/seller/printer/doedit?id=' + id + '&printerName=' + this.newPrinter.printerName + '&printQuantity=' + this.newPrinter.numberRadio + '&display=' + this.newPrinter.showRadio + '&support=' + this.newPrinter.checkedCities).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
                this.dialogFormVisible = false
                this.printerList()
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
      // 删除打印机
      printerDelete (row) {
        this.$confirm('此操作将永久删除该打印机, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('https://api.doudot.cn/seller/printer/delPrinter', { id: row.id }).then((res) => {
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
              this.printerList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 轮播列表
      bannerList () {
        axios.post('https://api.doudot.cn/seller/banner/listBanner?shop_id=' + this.shopId).then((res) => {
          if (res.data.code === 1) {
            var bannerList = res.data.data
            var banner = []
            for (var i = 0; i < bannerList.length; i++) {
              banner.push({ url: bannerList[i].img, img_id: bannerList[i].id })
            }
            this.bannerUrl = banner
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      },
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
            axios.post('https://api.doudot.cn/index.php/seller/Table/editTag?tag_id=' + tagid + '&name=' + this.zhuotaiGroupInfoEdit.name + '&min=' + this.zhuotaiGroupInfoEdit.min + '&max=' + this.zhuotaiGroupInfoEdit.max).then((res) => {
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
            axios.post('https://api.doudot.cn/index.php/seller/Table/editTable?id=' + this.zhuotaiInfoEdit.id + '&table_id=' + this.zhuotaiInfoEdit.table_id + '&tag_id=' + this.zhuotaiInfoEdit.tag_id).then((res) => {
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
            axios.post('https://api.doudot.cn/index.php/seller/Table/addTag?shop_id=' + this.shopId + '&name=' + this.zhuotaiGroupInfoEdit.name + '&min=' + this.zhuotaiGroupInfoEdit.min + '&max=' + this.zhuotaiGroupInfoEdit.max).then((res) => {
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
            axios.post('https://api.doudot.cn/index.php/seller/Table/addTable?shop_id=' + this.shopId + '&table_id=' + this.zhuotaiInfoEdit.table_id + '&tag_id=' + this.zhuotaiInfoEdit.tag_id).then((res) => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '新建成功'
                })
                this.tianjiazhuotai = false
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
        axios.get('https://api.doudot.cn/index.php/seller/table/tagsList?shop_id=' + this.shopId).then((res) => {
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
        axios.get('https://api.doudot.cn/index.php/seller/table/tableList?shop_id=' + this.shopId).then((res) => {
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
        if (this.addIndex >= 3) {
          this.$message({
            type: 'error',
            message: '已经添加不了更多了'
          })
          this.addIndex = 2
        }
        if (this.addIndex >= 1) {
          this.deleteBtn = true
        }
        if (this.addIndex === 1) {
          this.tianjia1 = true
          this.shopInfo.startTime2 = this.shopInfo.endTime1
        } else if (this.addIndex === 2) {
          this.tianjia2 = true
          this.shopInfo.startTime3 = this.shopInfo.endTime2
        }
      },
      // 删除时段
      deleteTime () {
        this.addIndex -= 1
        if (this.addIndex <= 0) {
          this.addIndex = 0
        }
        if (this.addIndex === 0) {
          this.deleteBtn = false
          this.tianjia1 = false
          this.shopInfo.startTime2 = ''
          this.shopInfo.endTime2 = ''
        } else if (this.addIndex === 1) {
          this.tianjia2 = false
          this.shopInfo.startTime3 = ''
          this.shopInfo.endTime3 = ''
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
        console.log(this.shopInfo.cityOption)
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
            } else if (res.data.shop[0].auth_status === 2) {
              this.shopStatus = '认证中'
              this.shopStatusBtn = true
            } else if (res.data.shop[0].auth_status === null) {
              this.shopStatus = '未认证'
              this.shopStatusBtn = false
            } else if (res.data.shop[0].auth_status === 0) {
              this.shopStatus = '认证未通过'
              this.shopStatusBtn = false
            }
            var url = 'https://api.doudot.cn/'
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
              bannerId: res.data.shop[0].banner_id,
              addressId: res.data.shop[0].area[0].id,
              area: res.data.shop[0].area_id,
              logoUrl: url + res.data.shop[0].path.replace(/\\/, ''),
              shopBannerUrl: url + res.data.shop[0].banner_path.replace(/\\/, ''),
              comment: res.data.shop[0].comment,
              week: res.data.shop_time[0].week,
              cityOption: [res.data.shop[0].province[0].id, res.data.shop[0].city[0].id, res.data.shop[0].area[0].id]
            }
            this.bannerPath = res.data.shop[0].path
            this.openTime1 = this.shopInfo.startTime1 + ' 至 ' + this.shopInfo.endTime1
            if (this.shopInfo.startTime2 === '0' && this.shopInfo.endTime2 === '0') {
              this.shopInfo.startTime2 = ''
              this.shopInfo.endTime2 = ''
              this.openTime2 = ''
            } else {
              this.tianjia1 = true
              this.addIndex = 1
              this.openTime2 = this.shopInfo.startTime2 + ' 至 ' + this.shopInfo.endTime2
            }
            if (this.shopInfo.startTime3 === '0' && this.shopInfo.endTime3 === '0') {
              this.shopInfo.startTime3 = ''
              this.shopInfo.endTime3 = ''
              this.openTime3 = ''
            } else {
              this.tianjia2 = true
              this.addIndex = 2
              this.openTime3 = this.shopInfo.startTime3 + ' 至 ' + this.shopInfo.endTime3
            }
            axios.post('/seller/shop/getaddress', { id: 0 }).then((res1) => {
              for (var keys in res1.data.address) {
                this.province.push({
                  value: res1.data.address[keys].id,
                  label: res1.data.address[keys].name,
                  children: []
                })
              }
              for (var x in this.province) {
                if (this.province[x].value === res.data.shop[0].province[0].id) {
                  this.province[x].children.push({
                    value: res.data.shop[0].city[0].id,
                    label: res.data.shop[0].city[0].name,
                    children: [{
                      value: res.data.shop[0].area[0].id,
                      label: res.data.shop[0].area[0].name
                    }]
                  })
                }
              }
            })
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
            axios.post('/seller/shop/editShop?shop_id=' + this.shopId + '&shop_name=' + this.shopInfo.name + '&logo=' + this.shopInfo.imgId + '&banner_id=' + this.shopInfo.bannerId + '&start1=' + this.shopInfo.startTime1 + '&end1=' + this.shopInfo.endTime1 + '&start2=' + this.shopInfo.startTime2 + '&end2=' + this.shopInfo.endTime2 + '&start3=' + this.shopInfo.startTime3 + '&end3=' + this.shopInfo.endTime3 + '&service_mobile=' + this.shopInfo.mobile + '&address=' + this.shopInfo.address + '&week=' + this.shopInfo.checkedDay.join(',') + '&area_id=' + this.shopInfo.addressId + '&comment=' + this.shopInfo.comment + '&banner_path=' + this.bannerPath).then((res) => {
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
        this.addUserData()
        this.show = true
      },
      handleAvatarSuccess (res, file) {
        this.shopInfo.logoUrl = URL.createObjectURL(file.raw)
        this.shopInfo.imgId = res.id
      },
      // 店铺banner上传
      handleAvatarSuccessBanner (res, file) {
        this.bannerPath = res.path
        this.shopInfo.shopBannerUrl = URL.createObjectURL(file.raw)
        this.shopInfo.bannerId = res.id
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
      // 店铺banner
      beforeAvatarUploadBanner (file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG 和 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return (isJPG || isPNG) && isLt2M
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
        if (!this.shopStatusBtn) {
          this.$router.push({path: '/manage/renzheng'})
        }
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
        this.$confirm('此操作将永久删除该桌位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
          axios.post('https://api.doudot.cn/index.php/seller/Table/deleteTable?id=' + row.id).then((res) => {
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
        this.$confirm('此操作将永久删除该桌位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
          axios.post('https://api.doudot.cn/index.php/seller/Table/deleteTag?tag_id=' + row.tag_id).then((res) => {
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
      },
      // 首页banner
      handSuccess (response, file, fileList) {
        axios.post('https://api.doudot.cn/seller/banner/addbanner?shop_id=' + this.shopId + '&img_id=' + response.id + '&img=' + response.path).then((res) => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.bannerList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.bannerList()
          }
        })
      },
      handleRemove (file, fileList) {
        axios.post('https://api.doudot.cn/seller/banner/deleteBanner?id=' + file.img_id).then((res) => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
            this.bannerList()
          }
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
  .box-card .el-card__header{background-color: #fc9538;color: #ffffff;text-align: center}
  .head{position: none;border: none;}
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
  .banner-icon {
    width: 380px;
    height: 202px;
  }
  .banner-icon:before {
    line-height: 202px;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .el-upload .banner_avatar {
    width: 380px;
    height: 202px;
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
    /* 轮播 */
  #pane-third {
    padding: 10px 30px 0;
  }
  .el-upload-list__item {
    width: 420px;
    height: 242px;
    float: left;  
  }
  .el-upload-list--picture .el-upload-list__item {
    padding: 20px;
    height: auto;
  }
  .el-upload-list--picture .el-upload-list__item-thumbnail {
    width: 380px;
    height: 202px;
    margin-left: 0px;
  }
  .upload-demo {
    padding-left: 20px;
    padding-top: 10px;
  }
  /* 添加管理员 */
  .henglan{padding: 10px 0px;border-bottom: 1px solid #eee;}
  .henglanIn{padding: 10px 0px 10px; margin-bottom: 10px;border-bottom: 1px solid #eee;font-size: 14px; color: #555;}
  .el-tabs__header {
    margin: 0;
  }
  .btn1 {
    font-size: 12px;
    padding: 8px 13px;
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
  /* 打印机模型弹框 */
  .printerModel > .el-dialog {
    width: 40%;
    margin-top: 10vh;
  }
  .printer_p {
    padding-left: 10px;
    line-height: 16px;
    font-size: 14px;
  }
  .printerBtnModel {
    font-size: 13px;
    padding: 8px 13px;
  }
</style>
