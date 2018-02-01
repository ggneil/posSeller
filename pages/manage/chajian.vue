<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="应用插件" name="first">
        <er-row class="henglan-title">
          <el-col :span="2">
            经营渠道
          </el-col>
        </er-row>
        <el-row class="henglan">
          <nuxt-link @click="xianshi = false" v-for="item in option1" :key="item.id" :to="item.status === 1 ? '/manage/' + (item.name_pinyin === 'canzhuoguanli' ? 'shopManage' : item.name_pinyin) + '?plugin_id=' + item.id + (item.name_pinyin === 'canzhuoguanli' ? '&id=2' : '') : ''">
            <el-col :class="[(item.status === 1) ? 'options' : 'options2']" class="options1" :span="7" :offset="item.id%3 === 1 ? 0 : 1">
              <el-row>
                <el-col :span="4">
                  <i :class="[item.type === 1 ? 'wxsmall' : '', item.type === 2 ? 'wxsmall1' : '', item.type === 3 ? 'wxsmall2' : '']">
                    <img :src="'https://api.doudot.cn/' + item.icon_path.replace(/\\/, '')" alt="">
                  </i>
                </el-col>
                <el-col class="right" :span="20">
                  <h3>{{ item.name }}</h3>
                  <span>{{ item.description }}</span>
                </el-col>
              </el-row>
            </el-col>
          </nuxt-link>
        </el-row>
        <er-row class="henglan-title">
          <el-col :span="2">
            店铺拓展
          </el-col>
        </er-row>
        <el-row class="henglan">
          <nuxt-link @click="xianshi = false" v-for="item in option2" :key="item.id" :to="item.status === 1 ? '/manage/' + (item.name_pinyin === 'canzhuoguanli' ? 'shopManage' : item.name_pinyin) + '?plugin_id=' + item.id + (item.name_pinyin === 'canzhuoguanli' ? '&id=2' : '') : ''">
            <el-col :class="[(item.status === 1) ? 'options' : 'options2']" class="options1" :span="7" :offset="item.id%3 === 1 ? 0 : 1">
              <el-row>
                <el-col :span="4">
                  <i :class="[item.type === 1 ? 'wxsmall' : '', item.type === 2 ? 'wxsmall1' : '', item.type === 3 ? 'wxsmall2' : '']">
                    <img :src="'https://api.doudot.cn/' + item.icon_path.replace(/\\/, '')" alt="">
                  </i>
                </el-col>
                <el-col class="right" :span="20">
                  <h3>{{ item.name }}</h3>
                  <span>{{ item.description }}</span>
                </el-col>
              </el-row>
            </el-col>
          </nuxt-link>
        </el-row>
        <er-row class="henglan-title">
          <el-col :span="2">
            营销工具
          </el-col>
        </er-row>
        <el-row class="henglan">
          <nuxt-link @click="xianshi = false" v-for="item in option3" :key="item.id" :to="item.status === 1 ? '/manage/' + (item.name_pinyin === 'canzhuoguanli' ? 'shopManage' : item.name_pinyin) + '?plugin_id=' + item.id + (item.name_pinyin === 'canzhuoguanli' ? '&id=2' : '') : ''" class="marketing_a">
            <el-col :class="[(item.status === 1) ? 'options' : 'options2']" class="marketing options1" :span="7" :offset="item.id%3 === 1 ? 0 : 1">
              <el-row>
                <el-col :span="4">
                  <i :class="[item.type === 1 ? 'wxsmall' : '', item.type === 2 ? 'wxsmall1' : '', item.type === 3 ? 'wxsmall2' : '']">
                    <img :src="'https://api.doudot.cn/' + item.icon_path.replace(/\\/, '')" alt="">
                  </i>
                </el-col>
                <el-col class="right" :span="20">
                  <h3>{{ item.name }}</h3>
                  <span>{{ item.description }}</span>
                </el-col>
              </el-row>
            </el-col>
          </nuxt-link>
        </el-row>
        <nuxt-child/>
      </el-tab-pane>
      <!-- <el-tab-pane label="游戏管理" name="second">
       
      </el-tab-pane> -->
    </el-tabs>
    
  </div>
</template>

<script>
import axios from '../../plugins/axios'
export default {
  layout: 'manage',
  data () {
    return {
      red: {
        background: 'red'
      },
      yellow: {
        background: 'yellow'
      },
      option1: [],
      option2: [],
      option3: [],
      activeName: 'first' // 第一个显示 列表管理
    }
  },
  beforeMount () {
    axios.get('https://api.doudot.cn/index.php/seller/plugin/getPluginList?type=1').then((res) => {
      this.option1 = res.data.data
    })
    axios.get('https://api.doudot.cn/index.php/seller/plugin/getPluginList?type=2').then((res) => {
      this.option2 = res.data.data
    })
    axios.get('https://api.doudot.cn/index.php/seller/plugin/getPluginList?type=3').then((res) => {
      this.option3 = res.data.data
    })
  },
  methods: {}
}
</script>
<style scoped>
  .el-table td, .el-table th {
    padding: 12px 10px;
  }
 .el-tabs__header{margin-bottom: 0}
 .henglan {background-color:white;padding: 0px 20px 20px;}
 .henglan-title {background-color: white;display:block;width: 100%;height: 40px;line-height: 40px; padding-left: 30px; box-sizing: border-box; font-size: 14px;}
 .options {cursor: pointer;padding: 10px;background-color: #eee;color: black;}
 .options2 {cursor:not-allowed;padding: 10px;background-color: #f9f9f9;color: black;}
 .options1 {margin-bottom: 20px;}
 .options:hover {background-color: #ccc;}
 .options:active {color: black;}
 .wxsmall{display:block;height:44px;width:44px;background:rgb(0, 204, 153);}
 .wxsmall1{display:block;height:44px;width:44px;background:rgb(85, 153, 255);}
 .wxsmall2{display:block;height:44px;width:44px;background:rgb(255, 136, 85);}
 .wxsmall img, .wxsmall1 img, .wxsmall2 img{height:44px;width:44px;}
 .right{height: 44px;padding:0 10px}
 .right h3{line-height:22px;margin: 0;font-size:16px;}
 .right span{line-height:22px;font-size: 12px;}
 .marketing {
   margin-left: 4.1667%;
 }
 .marketing_a:nth-child(3n+1) .marketing{
   margin-left: 0;
 }
</style>
