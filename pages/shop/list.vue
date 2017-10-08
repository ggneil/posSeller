<template>
  <el-col :xs="{span:22,offset:1}" :sm="{span:20,offset:2}" :md="{span:18,offset:3}" :lg="{span:16,offset:4}">
    <el-row class="header">
      <span>
        <i class="el-icon-picture"></i>都点 | 选择店铺
      </span>
      <span class="right">
        {{mobile}}
        <a href="#">退出</a>
      </span>
    </el-row>
    <el-row class="select">
      <el-row class="info-bar">
        <img alt="头像" class="avatar" src="">
        <h3>rootuser</h3>
        <p>+86-{{mobile}}
          <a class="info-setting" href="">设置</a>
        </p>
        <div class="create-btn">
          <el-button type="primary">创建店铺</el-button>
        </div>
      </el-row>
      <el-row class="box">
        <ul class="dp-list">
          <li class="dp-item" title="试用体验170609">
            <div class="dp-title">
              <span class="dp-text">试用体验170609</span>
            </div>
            <p>主体信息：未认证</p>
            <p>店铺状态：已打烊</p>
            <div><div class="operate-label">
              <a href="javascript:void(0);">修改</a>
              <a href="javascript:void(0);">删除</a>
            </div></div><span class="type">零售</span>
          </li>
        </ul>
      </el-row>
    </el-row>
  </el-col>
</template>

<script>
  export default {
    middleware: 'auth',
    data () {
      return {
        mobile: this.$store.state.authUser.user
      }
    }
  }
</script>

<style>
  .header{height: 24px;line-height: 30px;margin: 26px 0 21px;}
  .header .right{float: right;}
  .select {
    background: #f8f8f8;
    padding-bottom: 5px;
  }
  .select .box {
    min-height: 460px;
    padding: 0 30px 20px;
    overflow-y: hidden;
    margin: 0 5px;
    background-color: #fff;
  }
  .info-bar {
    position: relative;
    padding: 15px 20px;
    line-height: 20px;
    background: #f8f8f8;
  }
  .info-bar .avatar {
    float: left;
    width: 45px;
    height: 45px;
    margin-right: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
  }
  .info-bar h3 {
    font-size: 14px;
    color: #111;
    font-weight: 700;
    padding-top: 3px;
  }
  .info-bar p {
    font-size: 12px;
    color: #666;
  }
  .info-bar .create-btn {
    position: absolute;
    bottom: 20px;
    right: 25px;
  }
  .select .box .dp-list {
    margin-top: 20px;
  }
  .dp-list {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .dp-item {
    list-style: none;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 260px;
    height: 120px;
    padding: 0 20px;
    margin-bottom: 20px;
    border-radius: 2px;
    border: 1px solid #e5e5e5;
    border-top: 3px solid #d5d7db;
    background: #fff;
    cursor: pointer;
    color: #999;
  }
  .select .box .dp-list .dp-title {
    margin-top: 18px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    padding-bottom: 5px;
    color: #111;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
  }
  .select .box .dp-list .dp-item p {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
  }
  .dp-item span.type {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 2px;
    height: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 12px;
    padding: 3px;
    border: 1px solid #bbb;
    font-size: 12px;
    color: #bbb;
  }
</style>
