<template>
<div class='detail'>
  <detail-nav-bar class="detailnb" @toggleClick="toggleClick" ref="nav"></detail-nav-bar>
  <scroll ref="scroll" class="sc" @scroll="detailScroll" :probeType="3">
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
    <goods :goods="goodsList" ref="recommend"></goods>
  </scroll>
  <back-top @click.native="backtop" v-show="isShowBT"></back-top>
  <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  <toast></toast>
</div>
</template>

<script>
import DetailNavBar from './detailChildren/detailNavBar' //导航模块
import DetailSwiper from './detailChildren/detailSwipper' //轮播图模块
import DetailBaseInfo from './detailChildren/detailBaseInfo' //轮播图下面的小信息展示
import DetailShopInfo from './detailChildren/detailShopInfo' //商家信息
import DetailGoodsInfo from './detailChildren/detailGoodsInfo' //商品图片展示
import DetailParamInfo from './detailChildren/detailParamInfo'  //商品参数模块
import DetailCommentInfo from './detailChildren/detailCommentInfo' //用户评价模块
import Goods from 'components/content/Goods/Goods'  //推荐模块，不过引用的是之前在首页封装好的Goods模块
import BackTop from 'components/content/backtop/BackTop'  //返回顶部模块
import DetailBottomBar from './detailChildren/detailBottomBar' //购物车模块
import Toast from 'components/common/toast/Toast' //吐司模块

import Scroll from 'components/common/scroll/Scroll'  //引入scroll模块
import {getDetail, Goodss, Shop, GoodsParam, getRecommend} from 'network/detail' //获取详情页数据
import {debounce} from 'common/utils'          //防抖函数

export default {
name: 'Detail',
components: {
  DetailNavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamInfo,
  DetailCommentInfo,
  Goods,
  Scroll,
  BackTop,
  DetailBottomBar,
  Toast,
},
data() {
  return {
    iid: null, //每个详情页独有id值
    topImages: [], //轮播图片
    goods: {},
    shop: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    goodsList: [],
    offsetT: [], //设置一个数组，用来放置4个参数的y轴值
    currentIndex: 0,
    isShowBT: false,
  }
},
created() {
  this.iid = this.$route.params.iid //保存传入的iid
  this.getDetail()  //调用自定义getDetail()方法，获取详情页数据
  this.getRecommend() //调用自定义getRecommend()方法,获取推荐数据
},
mounted() {
   //要在元素挂载后的 mounted 中执行 
     const refresh = debounce(this.$refs.scroll.refresh, 50)  //防抖操作，防止频繁计算
     this.$bus.$on('DetailimgLoad', () => { //监听GoodsItem中图片加载完成
       refresh() //每个图片加载完成后都重新计算
     })
},
methods: {
  //事件监听相关方法
  imageLoad() {
    this.$refs.scroll.refresh()  //图片加载完成重新刷新一次
    // 图片加载完成后再进行计算 获取navbar中几个参数对应的offsetTop
    this.offsetT = [] //每一次图片加载完后，先清空数组，再重新添加
    this.offsetT.push(0)
    //this.offsetT.push(this.$refs.params.$el.offsetTop - 44) //-44是减去navbar的高度，因为navbar不参与滚动
    this.offsetT.push(this.$refs.params.$el.offsetTop) //加上$el 才能获取对应组件中的元素
    this.offsetT.push(this.$refs.comment.$el.offsetTop)//-44是减去navbar的高度，因为navbar不参与滚动
    this.offsetT.push(this.$refs.recommend.$el.offsetTop)
    this.offsetT.push(Number.MAX_VALUE) //往数组中加一个参数，Number.MAX_VALUE：JS中的最大值，
  },
  toggleClick(index) {  //滚动到指定的参数的y轴位置 
    this.$refs.scroll.scrollTo(0, -this.offsetT[index], 500)
  },
  detailScroll(position) {
    let positionY = -position.y; //先获取y轴值
    let length = this.offsetT.length - 1; //一定要减去个1，因为之前加了一个数组元素
    for (let i = 0; i < length; i++) {
    if (positionY >= this.offsetT[i] && positionY < this.offsetT[i+1]) {
      if (this.currentIndex !== i) {
        this.currentIndex = i;        
        this.$refs.nav.currentIndex = this.currentIndex; //将这里的currentIndex值赋值给detailnavbar中的currentIndex
      }
      break;
    }
    }
    this.isShowBT = positionY > 1000 //让y值变为负值 决定返回顶部按钮是否显示
  },
  backtop() {    //返回顶部
    this.$refs.scroll.scrollTo(0, 0)
  },
  addToCart() { //点击加入购物车
    // 2.将需要的商品信息添加到Store中
    const obj = {}
    obj.iid = this.iid
    obj.imgURL = this.topImages[0]
    obj.title = this.goods.title
    obj.desc = this.goods.desc
    obj.price = this.goods.realPrice
    
    this.$store.dispatch('addToCart', obj).then(() => { //传递给vuex一个异步函数，携带obj参数
    this.$toast({message: '加入购物车成功'})  //回调函数
    })
  },


  //网络请求相关方法
  getDetail() {
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goodss(data.itemInfo, data.columns, data.shopInfo.services)        
        // 3.创建店铺信息的对象
       this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 6.用户评价信息
         if (data.rate.list) {
		        this.commentInfo = data.rate.list[0];
	        }     
    })
  },
  getRecommend() {  //获取推荐模块数据
    getRecommend().then(res => {
      this.goodsList = res.data.list
    })
  },
}
}
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 8;
  height: 100vh;
  background-color: #fff;
}
.sc {
  height: calc(100% - 44px);
}
.detailnb {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>