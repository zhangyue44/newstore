<template>
<nav-bar>
  <div slot="left" class="a" @click="back">
    <img src="~assets/img/common/back.svg" >
  </div>
  <div slot="center" class="s">
    <div class="d" v-for="(item, index) in titles" :key="index" 
    :class="{active: currentIndex === index}" @click="togClick(index)">{{item}}</div>
  </div>
</nav-bar>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
name: 'DetailNavBar',
data() {
  return {
    titles: ['商品', '参数', '评论', '推荐'],
    currentIndex: 0,
  }
},
components: {
  NavBar,
},
methods: {
  togClick(index) {
    this.currentIndex = index;
    this.$emit('toggleClick', index) //给父组件传出一个事件
  },
  back() {
    this.$router.back() //返回上一步
  }
}
}
</script>
<style scoped>
.a {
  margin-top: 6px;
}
.s {
  display: flex;
  font-size: 13px;
}
.d {
  flex: 1;
}
.active {
    color: var(--color-high-text)
}
</style>