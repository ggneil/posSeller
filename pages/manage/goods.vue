<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="商品管理" name="first">
        <div v-show="show">
          <el-row class="henglan">
            <el-col :span="2">
              <el-button class="btn" type="primary" @click="newGoods">新建商品</el-button>
            </el-col>
            <el-col :span="10" :offset="11">
              <el-select class="Inp" v-model="value" placeholder="请选择" @change="handleStatusSelect">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input class="Inp Inp2" v-model="input" placeholder="搜索商品..." @change="searchGoods"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="4" :sm="4" :md="4" :lg="2">
              <el-menu :default-active="1" class="el-menu-vertical-demo" @select="handleGroupSelect" @open="handleOpen" @close="handleClose">
                <el-menu-item
                  v-for="item in tableData"
                  class="secondNav" 
                  :key="item.id"
                  :index="item.id">
                {{item.fenzu}}</el-menu-item>
              </el-menu>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="22" class="dish-content">
              <el-table
                :show-header="false"
                :data="tableData1"
                style="width: 100%">
                <el-table-column
                  label="分组"
                  style="width:33%;">
                  <template scope="scope">
                    <el-row>
                      <el-col :span="4" style="padding-left: 10px;">
                        <img class="imgSize" :src="scope.row.ico"/>
                      </el-col>
                      <el-col :span="20">
                        <el-row>
                          <el-col>
                            <span style="margin-left: 10px">{{ scope.row.goodsName }}</span> 
                          </el-col> 
                        </el-row>
                        <el-row>
                          <el-col>
                            <span style="margin-left: 10px">{{ scope.row.goodsPrice }}</span>
                          </el-col> 
                        </el-row>
                      </el-col> 
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column
                  label=""
                  style="width:33%;">
                </el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      disabled
                      size="small" :type="scope.row.goodsStatus === '已上架' ? 'primary' : 'danger'">{{ scope.row.goodsStatus }}</el-button>
                    <el-button
                      size="small"
                      @click="handleEdit2(scope.$index, scope.row)">{{ scope.row.goodsStatusBtn }}</el-button>
                    <el-button
                      size="small"
                      @click="handleEdit1(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete1(scope.$index, tableData1)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
        <div v-show="!show">
          <el-row class="henglan">
            <el-col :span="4">商品管理 / 新建商品</el-col>
          </el-row>
          <div class="bgWhite">
            <!--添加商品表单-->
            <el-form label-width="80px" :model="formAddGoods" :rules="rules" ref="formAddGoods">
              <el-form-item label="图片：">
                <el-upload
                  class="avatar-uploader"
                  action="https://cdn.wangdoukeji.com/api/Attachment/upload"
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
                <el-checkbox-group v-model="formAddGoods.group" :max="1">
                  <el-checkbox
                   v-for="item in tableData"
                   :label="item.id"
                   :key="item.id"
                   @change="checkChange(item.id)"
                  >{{item.fenzu}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-button v-show="!hide" type="primary" class="btn" @click="submitForm ('formAddGoods','1')">完成</el-button>
              <el-button v-show="hide" type="primary" class="btn" @click="changeGoods('formAddGoods')">保存</el-button>
              <el-button v-show="!hide" type="defalut" class="btn" @click="submitForm ('formAddGoods','2')">完成，继续添加下一个</el-button>
            </el-form>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分组管理" name="second">
        <el-row class="henglan">
          <el-col :span="7">
            <el-button type="primary" class="btn" @click="handleNewGroup">新建分组</el-button>
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
  import axios from '../../plugins/axios'
  var zhuangtai = ''
  var zhuangtaiBtn = ''
  var url = 'https://cdn.wangdoukeji.com/'
  export default {
    layout: 'manage',
    data () {
      // 上传商品表单验证
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
        zhuangtai: '',
        zhuangtaiBtn: '',
        shopId: '',
        input: '',
        tagId: 1,
        imgId: 0,
        groupId: '',
        navId: '',
        goodsId: '',
        value: '所有状态', // 下拉框默认选项
        activeName: 'first', // 第一个显示 商品管理
        bianji: '', // 编辑的组
        addGroup: '', // 添加的组
        firstShow: false, // 商品管理
        show: true, // 新建商品
        hide: false,
        imageUrl: '', // 图片显示
        // ajax
        groupResult: [],
        // 组商品
        groupGoods: [],
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
        tableData: [],
        tableData1: [],
        // 下拉框
        options: [{
          value: '所有状态',
          label: '所有状态'
        }, {
          value: '已下架',
          label: '已下架'
        }, {
          value: '已上架',
          label: '已上架'
        }]
      }
    },
    beforeMount () {
      this.shopId = localStorage.getItem('shop_id')
      // 页面加载请求
      this.pageLoad()
      if (this.$route.query.id) {
        this.newGoods()
      }
    },
    methods: {
      // 搜索商品
      searchGoods (value1) {
        axios.post('/seller/Goods/queryGoods', { key: value1, shop_id: this.shopId }).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.value = '所有状态'
            if (value1 === '') {
              axios.post('/seller/Goods/getGoodsList', { shop_id: this.shopId, tag_id: this.navId }).then((res) => {
                if (res.data.error) {
                  console.log(res.data.error.msg)
                } else {
                  this.groupGoods = res.data.goods
                  this.tableData1 = []
                  for (var keys in this.groupGoods) {
                    if (this.groupGoods[keys].path === null || this.groupGoods[keys].path === undefined) {
                      url = ''
                      this.groupGoods[keys].path = '../../static/weixin.png'
                    } else {
                      url = 'https://cdn.wangdoukeji.com/'
                    }
                    if (this.groupGoods[keys].status === 1) {
                      zhuangtai = '已上架'
                      zhuangtaiBtn = '下架'
                    } else {
                      zhuangtai = '已下架'
                      zhuangtaiBtn = '上架'
                    }
                    this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                  }
                }
              })
            } else {
              this.groupGoods = res.data.good
              this.tableData1 = []
              for (var keys in this.groupGoods) {
                if (this.groupGoods[keys].path === null || this.groupGoods[keys].path === undefined) {
                  url = ''
                  this.groupGoods[keys].path = '../../static/weixin.png'
                } else {
                  url = 'https://cdn.wangdoukeji.com/'
                }
                if (this.groupGoods[keys].status === 1) {
                  zhuangtai = '已上架'
                  zhuangtaiBtn = '下架'
                  this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                } else {
                  zhuangtai = '已下架'
                  zhuangtaiBtn = '上架'
                  this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                }
              }
            }
          }
        })
      },
      // 修改完成点击
      changeGoods (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/seller/Goods/editGoods?goods_id=' + this.goodsId + '&img_id=' + this.imgId + '&goods_name=' + this.formAddGoods.name + '&goods_description=' + this.formAddGoods.description + '&goods_price=' + this.formAddGoods.price + '&box_price=' + this.formAddGoods.boxPrice + '&stock=' + this.formAddGoods.num + '&tag_id=' + this.tagId + '&shop_id=' + this.shopId).then((res) => {
              if (res.data.error) {
                console.log(res.data.error.msg)
              } else {
                this.formAddGoods.name = ''
                this.formAddGoods.description = ''
                this.formAddGoods.price = ''
                this.formAddGoods.boxPrice = ''
                this.formAddGoods.num = ''
                this.formAddGoods.group = []
                this.imageUrl = ''
                this.imgId = 0
                this.hide = false
                this.show = true
              }
            })
            console.log('成功')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 页面加载
      pageLoad () {
        axios.post('/seller/Tags/getTagsList', { shop_id: this.shopId }).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            console.log(this.shopId)
            this.groupResult = res.data.tags
            this.tableData = []
            for (var keys in this.groupResult) {
              this.tableData.push({ fenzu: this.groupResult[keys].tag_name, goods: this.groupResult[keys].num, id: this.groupResult[keys].tag_id })
            }
            // 第一个分组请求
            this.navId = this.tableData[0].id
            axios.post('/seller/Goods/getGoodsList', { shop_id: this.shopId, tag_id: this.tableData[0].id }).then((res) => {
              if (res.data.error) {
                console.log(res.data.error.msg)
              } else {
                this.groupGoods = res.data.goods
                this.tableData1 = []
                for (var keys in this.groupGoods) {
                  if (this.groupGoods[keys].path === null || this.groupGoods[keys].path === undefined) {
                    url = ''
                    this.groupGoods[keys].path = '../../static/weixin.png'
                  } else {
                    url = 'https://cdn.wangdoukeji.com/'
                  }
                  if (this.groupGoods[keys].status === 1) {
                    console.log(1)
                    zhuangtai = '已上架'
                    zhuangtaiBtn = '下架'
                    this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                  } else {
                    console.log(2)
                    zhuangtai = '已下架'
                    zhuangtaiBtn = '上架'
                    this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                  }
                }
              }
            })
          }
        })
      },
      // 提交
      checkChange (tagId) {
        this.groupId = tagId
      },
      // 表单提交
      submitForm (formName, style) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/seller/Goods/addGoods', { shop_id: this.shopId, img_id: this.imgId, goods_name: this.formAddGoods.name, goods_description: this.formAddGoods.description, goods_price: this.formAddGoods.price, box_price: this.formAddGoods.boxPrice, stock: this.formAddGoods.num, tag_id: this.groupId }).then((res) => {
              if (res.data.error) {
                console.log(res.data.error.msg)
              } else {
                this.formAddGoods.name = ''
                this.formAddGoods.description = ''
                this.formAddGoods.price = ''
                this.formAddGoods.boxPrice = ''
                this.formAddGoods.num = ''
                this.formAddGoods.group = []
                this.imageUrl = ''
                this.imgId = 0
                if (style === '1') {
                  this.pageLoad()
                  this.handleShow()
                }
              }
            })
            console.log('成功')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 顶部nav点击、打开、关闭事件
      handleClick (tab, event) {
        this.show = true
      },
      // 状态查看
      handleStatusSelect (value) {
        this.input = ''
        axios.post('/seller/Goods/getGoodsList', { shop_id: this.shopId, tag_id: this.navId }).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.groupGoods = res.data.goods
            this.tableData1 = []
            if (value === '所有状态') {
              for (var keys in this.groupGoods) {
                if (this.groupGoods[keys].path === null || this.groupGoods[keys].path === undefined) {
                  url = ''
                  this.groupGoods[keys].path = '../../static/weixin.png'
                } else {
                  url = 'https://cdn.wangdoukeji.com/'
                }
                if (this.groupGoods[keys].status === 1) {
                  zhuangtai = '已上架'
                  zhuangtaiBtn = '下架'
                  this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                } else {
                  zhuangtai = '已下架'
                  zhuangtaiBtn = '上架'
                  this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
                }
              }
            } else if (value === '已上架') {
              for (var keys1 in this.groupGoods) {
                if (this.groupGoods[keys1].path === null || this.groupGoods[keys1].path === undefined) {
                  url = ''
                  this.groupGoods[keys1].path = '../../static/weixin.png'
                } else {
                  url = 'https://cdn.wangdoukeji.com/'
                }
                if (this.groupGoods[keys1].status === 1) {
                  zhuangtai = '已上架'
                  zhuangtaiBtn = '下架'
                  this.tableData1.push({ goodsName: this.groupGoods[keys1].goods_name, goodsPrice: this.groupGoods[keys1].goods_price + '元', goodsId: this.groupGoods[keys1].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys1].path.replace(/\\/, '') })
                }
              }
            } else if (value === '已下架') {
              for (var keys2 in this.groupGoods) {
                if (this.groupGoods[keys2].path === null || this.groupGoods[keys2].path === undefined) {
                  url = ''
                  this.groupGoods[keys2].path = '../../static/weixin.png'
                } else {
                  url = 'https://cdn.wangdoukeji.com/'
                }
                if (this.groupGoods[keys2].status === 0) {
                  zhuangtai = '已下架'
                  zhuangtaiBtn = '上架'
                  this.tableData1.push({ goodsName: this.groupGoods[keys2].goods_name, goodsPrice: this.groupGoods[keys2].goods_price + '元', goodsId: this.groupGoods[keys2].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys2].path.replace(/\\/, '') })
                }
              }
            }
          }
        })
      },
      // 分组选择事件
      handleGroupSelect (key, keyPath) {
        this.value = '所有状态'
        this.input = ''
        this.navId = keyPath[0]
        axios.post('/seller/Goods/getGoodsList', { shop_id: this.shopId, tag_id: keyPath[0] }).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.groupGoods = res.data.goods
            this.tableData1 = []
            for (var keys in this.groupGoods) {
              if (this.groupGoods[keys].path === null || this.groupGoods[keys].path === undefined) {
                url = ''
                this.groupGoods[keys].path = '../../static/weixin.png'
              } else {
                url = 'https://cdn.wangdoukeji.com/'
              }
              if (this.groupGoods[keys].status === 1) {
                zhuangtai = '已上架'
                zhuangtaiBtn = '下架'
              } else {
                zhuangtai = '已下架'
                zhuangtaiBtn = '上架'
              }
              this.tableData1.push({ goodsName: this.groupGoods[keys].goods_name, goodsPrice: this.groupGoods[keys].goods_price + '元', goodsId: this.groupGoods[keys].goods_id, goodsStatus: zhuangtai, goodsStatusBtn: zhuangtaiBtn, ico: url + this.groupGoods[keys].path.replace(/\\/, '') })
            }
          }
        })
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      // 删除组
      handleDelete (index, row) {
        this.$confirm('是否删除' + row[index].fenzu + '分组和' + row[index].fenzu + '分组下的所有商品？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/seller/Tags/deleteTag', { tag_id: row[index].id }).then((res) => {
            if (res.data.error) {
              console.log(res.data.error.msg)
            } else {
              row.splice(index, 1)
              this.pageLoad()
              this.$message({
                message: '删除成功',
                type: 'success'
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
      // 商品删除组
      handleDelete1 (index, row) {
        this.$confirm('是否删除' + row[index].goodsName + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/seller/Goods/deleteGoods', { goods_id: row[index].goodsId }).then((res) => {
            if (res.data.error) {
              console.log(res.data.error.msg)
            } else {
              row.splice(index, 1)
              this.pageLoad()
              this.$message({
                message: '删除成功',
                type: 'success'
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
      // 上下架商品
      handleEdit2 (index, row) {
        axios.post('/seller/Goods/changeStatus?goods_id=' + row.goodsId).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.handleStatusSelect(this.value)
          }
        })
      },
      // 商品编辑
      handleEdit1 (index, row) {
        axios.post('/seller/Goods/getGoods', { goods_id: row.goodsId }).then((res) => {
          if (res.data.error) {
            console.log(res.data.error.msg)
          } else {
            this.handleShow()
            console.log(res.data.good)
            this.formAddGoods.group = []
            this.tagId = res.data.good.tag_id
            this.formAddGoods.name = res.data.good.goods_name
            this.formAddGoods.description = res.data.good.goods_description
            this.formAddGoods.price = res.data.good.goods_price
            this.formAddGoods.boxPrice = res.data.good.box_price
            this.formAddGoods.num = res.data.good.stock
            this.formAddGoods.group.push(res.data.good.tag_id)
            this.formAddGoods.imgId = res.data.good.img_id
            this.imgId = res.data.good.img_id
            this.goodsId = res.data.good.goods_id
            this.imageUrl = 'https://cdn.wangdoukeji.com/' + res.data.good.path.replace(/\\/, '')
            this.hide = true
          }
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
          axios.post('/seller/Tags/editTag', { tag_id: row.id, tag_name: value }).then((res) => {
            if (res.data.error) {
              console.log(res.data.error.msg)
            } else {
              this.pageLoad()
            }
          })
          this.$message({
            type: 'success',
            message: '修改分组成功: ' + value
          })
          row.fenzu = value
        }).catch(() => {
          console.log(1)
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      // 添加组
      handleNewGroup () {
        this.bianji = ''
        this.$prompt('请输入分组名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: this.bianji
        }).then(({ value }) => {
          axios.post('/seller/Tags/addTag', { shop_id: this.shopId, tag_name: value }).then((res) => {
            if (res.data.error) {
              console.log(res.data.error.msg)
            } else {
              this.pageLoad()
            }
          })
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
        this.imgId = res.id
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        console.log(1)
        return (isJPG || isPNG) && isLt2M
      },
      // 新建商品
      newGoods () {
        this.handleShow()
        this.formAddGoods.name = ''
        this.formAddGoods.description = ''
        this.formAddGoods.price = ''
        this.formAddGoods.boxPrice = ''
        this.formAddGoods.num = ''
        this.formAddGoods.group = []
        this.imageUrl = ''
        this.imgId = 0
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
 .secondNav{text-align: center;border-bottom: 1px solid #eee;padding:10px 20px;line-height: 20px;height: inherit;white-space: inherit}
 .henglan{padding: 10px 20px;border-bottom: 1px solid #eee;}
 .btn{padding: 10px 18px}
 .Inp{width: 47.5%;}
 .Inp2{margin-left: 5%;}
 .dish-content{height: 100%;background-color: white;min-height: 480px;overflow: auto;border-left: 1px solid #eee;}
 .bgWhite{background-color: white;padding: 30px 40px;}
 .imgSize{width: 40px;height: 40px;}
</style>
