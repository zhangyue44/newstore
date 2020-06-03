<template>
  <div id="app">
    <!-- exclude="Detail" 将详情页面路由排除在外  -->
    <keep-alive exclude="Detail"><!-- keep-alive 属性在路由切换时，可以保留路由里的状态，避免路由被销毁  -->
    <router-view/>
    </keep-alive>
    <bottom-tab-bar></bottom-tab-bar>
  </div>
</template>

<script>
import BottomTabBar from 'components/content/bottomTabBar/bottomTabBar' //底部导航模块

export default {
  name: 'App',
  components: {
    BottomTabBar,
  },
}
</script>


<style>
@import 'assets/css/base.css'

</style>
