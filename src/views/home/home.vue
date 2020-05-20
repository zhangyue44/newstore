<template>
<div class='home'>
  <nav-bar class="nb"><div slot="center">购物商场</div></nav-bar>
  <tab-control :title="['流行', '新款', '精选']" @toggleClick="toggClick" ref="tc1" 
  class="tc2" v-show="isShowTC"></tab-control>
  <scroll class="hscroll" :probe-type="3" :pullUpLoad="true" @scroll="bscroll" ref="scroll" 
  @loadMore="loadMore">
    <home-swiper :banners="banners" @siload="siload"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-popular></home-popular>
    <tab-control :title="['流行', '新款', '精选']" @toggleClick="toggClick" ref="tc2"></tab-control>
    <goods :goods="goods[currentType].list"></goods>
  </scroll>
  <back-top ref="btop" v-show="isShowBackTop" @click.native="btt"></back-top>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar' //顶部导航模块
import HomeSwiper from './homechildren/HomeSwiper'  //轮播图模块
import HomeRecommend from './homechildren/HomeRecommend' //推荐模块
import HomePopular from './homechildren/HomePopular'  //本周流行模块
import TabControl from 'components/content/tabcontrol/TabControl' //中间小模块
import Goods from 'components/content/Goods/Goods' //Goods模块
import BackTop from 'components/content/backtop/BackTop' //返回顶部模块

import Scroll from 'components/common/scroll/Scroll' //滚动模块
import {debounce} from 'common/utils'          //防抖函数
import {getHomeMultidata, getHomeGoods} from 'network/home' //网络请求

export default {
name: 'Home',
data() {
  return {
    banners: [], //存储轮播图中的数据
    recommends: [], //存储推荐数据
    goods: {   //存储Goods全部数据
      'pop': {page: 0, list: []},  //流行部分数据
      'new': {page: 0, list: []},  //新款部分数据
      'sell': {page: 0, list: []}  //精选部分数据
    },
    currentType: 'pop', //给一个初始值，Goods模块页面显示
    isShowBackTop: false, //默认不显示
    isShowTC: false, //上面的tab-control是否显示
    tcoT: 0, //第二个tab-control的 offsetTop高度
    positionY: 0, //记录在y轴滚动距离
    saveY: 0,   //离开路由时保存y轴值
  }
},
components: {
  NavBar,
  HomeSwiper,
  HomeRecommend,
  HomePopular,
  TabControl,
  Goods,
  Scroll,
  BackTop,
},

activated() {   //活跃状态，即是切换回本路由
  this.$refs.scroll.refresh()  //最好重新刷新一次，防止出现bug
  this.$refs.scroll.scrollTo(0, this.saveY, 0)  //0秒的时间返回到离开本路由时的位置
    
},
 deactivated() {
  this.saveY = this.$refs.scroll.getScrollY()  //离开路由时保存y轴值
},
created() {
  //实例创建好之后立马进行网络请求，数据获取，返回是promise
   this.getHomeMultidata();   //调用methods中的方法获取数据
   this.getHomeGoods('pop');  
   this.getHomeGoods('new');  //初始时就调用这三个函数获取数据
   this.getHomeGoods('sell');
   },
mounted() {
     //要在元素挂载后的 mounted 中执行 
     const refresh = debounce(this.$refs.scroll.refresh, 50)  //防抖操作，防止频繁计算
     this.$bus.$on('HomeimgLoad', () => { //监听GoodsItem中图片加载完成
       refresh() //每个图片加载完成后都重新计算
     })
},
methods: {
  //事件监听相关方法

  toggClick(index) {  //Goods模块页面切换
    switch (index) {
      case 0:
        this.currentType = 'pop'
        break;
      case 1:
        this.currentType = 'new'
        break;
      case 2:
        this.currentType = 'sell'
        break;
    }

    this.$refs.tc1.currentIndex = index;
    this.$refs.tc2.currentIndex = index; 

    if (this.positionY > this.tcoT) { //在y轴滚动距离大于tabcontrol的OffetTop
    this.$refs.scroll.scrollTo(0, -this.tcoT)
    }
    
  },
  bscroll(position) {  //返回顶部按钮是否显示
    this.positionY = (-position.y) //存储在y轴的滚动距离
    this.isShowBackTop = (-position.y) > 1000 //y值为负值 决定返回顶部按钮是否显示
    this.isShowTC = (-position.y) > this.tcoT //判断 值是true还是false
  },
  btt() {  //直接返回顶部
    this.$refs.scroll.scrollTo(0, 0) //直接调用scroll.vue组件中的 scrollTO方法
  },
  loadMore() {   //上拉加载
  this.getHomeGoods(this.currentType)  //进行数据请求
  },
  siload() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)  //防抖操作，防止频繁计算
    refresh()  
    this.tcoT = this.$refs.tc2.$el.offsetTop //计算第一个tab-control的 offsetTop高度
  },

  // 网络请求相关方法
  getHomeMultidata() {  //获取首页中轮播图与推荐模块数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;  //获取banner数据列表
      this.recommends = res.data.recommend.list;
    })
  }, 
  getHomeGoods(type) {  //获取Goods模块数据
    const page = this.goods[type].page + 1;
    getHomeGoods(type, page).then(res => {
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page += 1;
      this.$refs.scroll.finishPullUp()  //上拉加载完成，一定要写
    })
  },
},
}
</script>
<style scoped>
.home {
  position: relative;
  height: 100vh; /* viewport height 视口高度 100vh 正常视口高度 */
}
.nb {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: var(--color-tint);
}
.tc2 {
  position: relative;
  z-index: 11;
}
.hscroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>