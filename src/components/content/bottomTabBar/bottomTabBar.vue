<template>
<tab-bar>
  <tab-bar-item path="/home">
      <img src="~assets/img/tabbar/home.svg" slot="tab-icon">
      <img src="~assets/img/tabbar/home_active.svg" slot="tab-active">
      <div slot="title">首页</div>
  </tab-bar-item>
    <tab-bar-item path="/category"> 
      <img src="~assets/img/tabbar/category.svg" slot="tab-icon">
      <img src="~assets/img/tabbar/category_active.svg" slot="tab-active">
      <div slot="title">专区</div>
  </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="~assets/img/tabbar/shopcart.svg" slot="tab-icon">
      <img src="~assets/img/tabbar/shopcart_active.svg" slot="tab-active">
      <div slot="title">购物车</div>
  </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="tab-icon">
      <img src="~assets/img/tabbar/profile_active.svg" slot="tab-active">
      <div slot="title">我的</div>
  </tab-bar-item>
</tab-bar>
</template>

<script>
import TabBar from 'components/common/TabBar/TabBar'
import TabBarItem from 'components/common/TabBar/TabBarItem'

export default {
name: 'BottomTabBar',
components: {
  TabBar,
  TabBarItem,
},
}
</script>
<style scoped>

</style>