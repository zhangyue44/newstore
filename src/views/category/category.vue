<template>
<div class='category'>
  <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
  <div class="centent">
    <div class="fix">
      <tab-control :title="['综合', '新品', '销量']" @toggleClick="tabClick" ref="tc1" 
      v-show="isShowTC"/>
    </div>
    <cate-menu :categories="categories" @selectItem="selectItem"></cate-menu>
    <scroll class="sc" ref="scroll" @scroll="cscroll" :probeType="3">
      <cate-content :subcategories="showSubcategory" @cimgLoad="cimgLoad"></cate-content>
      <tab-control :title="['综合', '新品', '销量']" @toggleClick="tabClick" ref="tc2"/>
      <goods :goods="showCategoryDetail"></goods>
    </scroll>
  </div>
  <back-top ref="btop" v-show="isShowBackTop" @click.native="btt"></back-top>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar' //导航模块
import CateMenu from './cateChildren/cateMenu'  //左侧分类模块
import Scroll from 'components/common/scroll/Scroll' //滚动模块
import CateContent from './cateChildren/cateContent' //内容模块
import TabControl from 'components/content/tabcontrol/TabControl' //中间控件模块
import Goods from 'components/content/Goods/Goods'  //商品模块
import BackTop from 'components/content/backtop/BackTop' //返回顶部模块

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category' //获取数据
import {debounce} from 'common/utils'          //防抖函数

export default {
name: 'Category',
data() {
  return {
    categories: [],
    categoryData: {},
    currentIndex: -1,
    currentType: 'pop',
    isShowTC: false,
    tcoT: 0,
    positionY: 0,
    isShowBackTop: false,
  }
},
components: {
  NavBar,
  CateMenu,
  Scroll,
  CateContent,
  TabControl,
  Goods,
  BackTop,
},
created() {
  this._getCategory() //调用methods中函数，获取数据
},
mounted() {
     //要在元素挂载后的 mounted 中执行 
     const refresh = debounce(this.$refs.scroll.refresh, 50)  //防抖操作，防止频繁计算
     this.$bus.$on('CateGoryimgLoad', () => { //监听GoodsItem中图片加载完成
       refresh() //每个图片加载完成后都重新计算
     })
},
computed: {
  showSubcategory() {
    if (this.currentIndex === -1) return {}
    return this.categoryData[this.currentIndex].subcategories
  },
   showCategoryDetail() {
    if (this.currentIndex === -1) return []
    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
  }
},
methods: {
  //数据请求相关方法

  _getCategory() {
    getCategory().then(res => {
      //1.分类数据
      this.categories = res.data.category.list
      //2.初始化每个类别的子数据
      for (let i = 0; i < this.categories.length; i++) {
        this.categoryData[i] = {
          subcategories: {},
          categoryDetail: {
            'pop': [],
            'new': [],
            'sell': []
          }
        }
      }
      // 3.请求第一个分类的数据
          this._getSubcategory(0)
    })
  },
  _getSubcategory(index) {
  this.currentIndex = index;
  const mailKey = this.categories[index].maitKey;
  getSubcategory(mailKey).then(res => {
    this.categoryData[index].subcategories = res.data
    this.categoryData = {...this.categoryData}
    this._getCategoryDetail('pop')
    this._getCategoryDetail('new')
    this._getCategoryDetail('sell')
  })
},
_getCategoryDetail(type) {
  // 1.获取请求的miniWallkey
  const miniWallkey = this.categories[this.currentIndex].miniWallkey;
  // 2.发送请求,传入miniWallkey和type
  getCategoryDetail(miniWallkey, type).then(res => {
    // 3.将获取的数据保存下来
    this.categoryData[this.currentIndex].categoryDetail[type] = res
    this.categoryData = {...this.categoryData}
  })
},
  //事件监听相关方法

  selectItem(index) { //重新进行数据请求
    this._getSubcategory(index)
    //下面操作相当于重新刷新
    this.$refs.tc1.currentIndex = 0;
    this.$refs.tc2.currentIndex = 0;
    this.isShowTC = false;
  },
  cimgLoad() { //每一次图片加载
    const refresh = debounce(this.$refs.scroll.refresh, 100)  //防抖操作，防止频繁计算
    refresh()  
    this.tcoT = this.$refs.tc2.$el.offsetTop //计算第一个tab-control的 offsetTop高度
  },
  cscroll(position) { //滚动事件
    this.positionY = (-position.y) //存储在y轴的滚动距离
    this.isShowTC = this.positionY > this.tcoT  //判断 值是true还是false
    this.isShowBackTop = this.positionY > 1000   //返回顶部按钮是否显示
  },
  btt() {
    this.$refs.scroll.scrollTo(0, 0) //直接调用scroll.vue组件中的 scrollTO方法
  },
  tabClick(index) {
    switch (index) {
				case 0:
					this.currentType = 'pop'
					break
				case 1:
					this.currentType = 'new'
					break
				case 2:
					this.currentType = 'sell'
					break
      }

    this.$refs.tc1.currentIndex = index;
    this.$refs.tc2.currentIndex = index;

    if (this.positionY > this.tcoT) { //在y轴滚动距离大于tabcontrol的OffetTop
    this.$refs.scroll.scrollTo(0, -this.tcoT)
    }
  } 
},
}
</script>
<style scoped>
.category {
  height: 100vh;
}
  .nav-bar {
    position: relative;
    z-index: 20;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .centent {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
  .sc {
    height: 100%;
    flex: 1;
  }
  .fix {
    position: fixed;
    z-index: 12;
    top: 44px;
    left: 100px;
    right: 0;
  }
</style>