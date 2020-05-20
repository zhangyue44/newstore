<template>
<div class='wrapper' ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll' //引入下载的better-scroll, 不需注册

export default {
name: 'Scroll',
data() {
  return {
    scroll: null, //定义一个变量，用来存储new BScroll()
  }
},
props: {
  probeType: {  //值为0和1都是不侦测实时位置，值为2在手指滚动的过程中有侦测，手指离开后的惯性滚动过程不侦测，值为3在手指滚动的过程中有侦测，手指离开后的惯性滚动过程也侦测
    type: Number,
    default: 0
  },
  pullUpLoad: {  //值为true可以进行上拉加载更多
    type: Boolean,
    default: false
  }
},
mounted() {
  this.scroll = new BScroll(this.$refs.wrapper, { //绑定元素
    click: true, //加了这个里面的内容才能点击
    probeType: this.probeType,  //侦测位置
    pullUpLoad: this.pullUpLoad  //上拉加载
  })
  if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {  //监听滚动事件 位置
        this.$emit('scroll', position)
      })
  }
  if (this.pullUpLoad) {
    this.scroll.on('pullingUp', () => {   //上拉加载事件
      this.$emit('loadMore')
    })
  }
},
methods: {
   scrollTo(x, y, time=300) {    //一个滚动事件,默认延迟300ms
        this.scroll && this.scroll.scrollTo(x, y, time)
    }, 
    refresh() {   //刷新事件，重新计算
        this.scroll && this.scroll.refresh()
    },
    finishPullUp() {   //加载完成事件
        this.scroll && this.scroll.finishPullUp()
   },
   getScrollY() {  //返回y轴的值
     return this.scroll ? this.scroll.y : 0
   }
},
}
</script>
<style scoped>

</style>