
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="幸运抽奖" name="first">
        <el-table
          :data="gameList"
          border
          style="width: 100%">
          <el-table-column
            label="游戏">
            <template scope="scope">
              <el-row>
                <el-col :span="4">
                  <img class="imgSize" :src="'https://cdn.wangdoukeji.com/' + scope.row.icon.replace(/\\/, '')"/>
                </el-col>
                <el-col :span="20">
                  <el-row>
                    <el-col>
                      <span style="margin-left: 10px">游戏名：{{ scope.row.name }}</span> 
                    </el-col> 
                  </el-row>
                </el-col> 
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="游戏状态">
            <template scope="scope">
              <el-button
                size="small"
                @click="handleEdit3(scope.$index, scope.row)">{{ scope.row.status === 1 ? '关闭' : '开启' }}</el-button>
              <el-button
                disabled
                :type="scope.row.status === 1 ? 'danger' : 'primary'"
                size="small">{{ scope.row.status === 1 ? '游戏已开启' : '游戏已关闭' }}</el-button>
              <el-button
                :disabled="scope.row.status === 1 ? false : 'disabled'"
                size="small"
                @click="handleEdit4(scope.$index, scope.row)">设置奖项</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="优惠券和积分奖励只能选一种"
          :visible.sync="centerDialogVisible"
          width="45%"
          center>
          <el-row class="jiangxiang" v-for="item in jiangxiang" :key="item.id">
            <el-col :span="4">
               <span>奖项{{ String(item.id).replace(/^(.*[n])*.*(.|n)$/g, "$2") }}</span>
            </el-col>
            <el-col :span="6">
               <span>{{ item.name }}</span>    
            </el-col>
            <el-col :span="6">
               <el-input size="small" @change="jifenChange(item.score, item.id)" v-model="item.score" placeholder="请输入奖励积分"></el-input>    
            </el-col>
            <el-col :span="8">
               <template>
                <el-select size="small" @focus="dianji(item.id)" @change="couponChange" v-model="item.coupon_name" placeholder="请选择优惠券">
                  <el-option
                    v-for="items in couponList"
                    :key="items.coupon_id"
                    :label="items.name"
                    :value="items.coupon_id">
                  </el-option>
                </el-select>
              </template>    
            </el-col>
          </el-row>
        </el-dialog>
      </el-tab-pane>
      <!-- <el-tab-pane label="游戏管理" name="second">
       
      </el-tab-pane> -->
    </el-tabs>
    
  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
  // middleware: 'auth',
  layout: 'manage',
  data () {
    return {
      gameList: [],
      jiangxiang: [],
      couponList: [],
      shopId: 0,
      gameInp: 50,
      centerDialogVisible: false,
      gamesId: 0,
      tagId: 0,
      activeName: 'first' // 第一个显示 列表管理
    }
  },
  beforeMount () {
    // 获取gameList
    this.shopId = localStorage.getItem('shop_id')
    this.gameListLoad('https://cdn.wangdoukeji.com/index.php/seller/game/getShopGameList?shop_id=' + this.shopId)
    this.couponListLoad('https://cdn.wangdoukeji.com/index.php/seller/coupon/couponlist?shop_id=' + this.shopId)
  },
  methods: {
    dianji (tagId1) {
      this.tagId = tagId1
      console.log(this.tagId)
    },
    // 改变状态
    changeStatus (url) {
      axios.post(url).then((res) => {
        if (res.data.err) {
          this.$message({
            type: 'error',
            message: res.data.err
          })
        }
      })
    },
    // 获取gameList
    gameListLoad (url) {
      axios.get(url).then((res) => {
        if (res.data.err) {
          this.$message({
            type: 'error',
            message: res.data.err
          })
        }
        this.gameList = res.data.data
      })
    },
    // 获取优惠券列表
    couponListLoad (url) {
      axios.get(url).then((res) => {
        if (res.data.err) {
          this.$message({
            type: 'error',
            message: res.data.err
          })
        }
        this.couponList = res.data
      })
    },
    // 获取奖项
    jiangxiangListLoad (url) {
      axios.get(url).then((res) => {
        if (res.data.err) {
          this.$message({
            type: 'error',
            message: res.data.err
          })
        }
        this.jiangxiang = res.data.data
      })
    },
    // 修改奖项
    changejiangxiang (url) {
      axios.post(url).then((res) => {
        if (res.data.err) {
          this.$message({
            type: 'error',
            message: res.data.err
          })
        }
      })
    },
    handleEdit3 (index, row) {
      if (row.status !== 1) {
        // 游戏只能同时开启一个
        // 需要调用接口 gameList重新赋值
        this.changeStatus('https://cdn.wangdoukeji.com/index.php/seller/game/openTheGame?shop_id=' + this.shopId + '&game_id=' + row.game_id)
        this.gameListLoad('https://cdn.wangdoukeji.com/index.php/seller/game/getShopGameList?shop_id=' + this.shopId)
      } else {
        this.changeStatus('https://cdn.wangdoukeji.com/index.php/seller/game/closeGame?shop_id=' + this.shopId)
        this.gameListLoad('https://cdn.wangdoukeji.com/index.php/seller/game/getShopGameList?shop_id=' + this.shopId)
      }
    },
    handleEdit4 (index, row) {
      this.centerDialogVisible = true
      // 获取奖项
      this.gamesId = row.game_id
      this.jiangxiangListLoad('https://cdn.wangdoukeji.com/index.php/seller/Game/getGamePrize?shop_id=' + this.shopId + '&game_id=' + row.game_id)
    },
    // 修改奖励
    jifenChange (jifen, tabId) {
      var that = this
      this.changejiangxiang('https://cdn.wangdoukeji.com/index.php/seller/Game/editGamePrize?id=' + tabId + '&score=' + jifen + '&couponId=')
      setTimeout(function () {
        that.jiangxiangListLoad('https://cdn.wangdoukeji.com/index.php/seller/Game/getGamePrize?shop_id=' + that.shopId + '&game_id=' + that.gamesId)
      }, 200)
    },
    // 优惠券
    couponChange (value) {
      var that = this
      this.changejiangxiang('https://cdn.wangdoukeji.com/index.php/seller/Game/editGamePrize?id=' + this.tagId + '&score=&couponId=' + value)
      setTimeout(function () {
        that.jiangxiangListLoad('https://cdn.wangdoukeji.com/index.php/seller/Game/getGamePrize?shop_id=' + that.shopId + '&game_id=' + that.gamesId)
      }, 200)
    }
  }
}
</script>
<style scoped>
  .el-table td, .el-table th {
    padding: 12px 10px;
  }
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
 .jiangxiang div{padding: 5px;}
 .jiangxiang span{line-height: 42px;}
</style>
