<template>
<div class='b-t-b' @click="tabClick">
  <div v-if="!isActive"><slot name="tab-icon"></slot></div>
  <div v-else><slot name="tab-active"></slot></div>
  <div :class="ccls"><slot name="title"></slot></div>
</div>
</template>

<script>

export default {
name: 'TabBarItem',
props: {
  path:String, //传递路由路径
},
computed: {
  isActive() {  //this.$route 表示活跃路由
    return this.$route.path.indexOf(this.path) !== -1 //判断是否处于该路由下
  },
  ccls() {
    return this.isActive ? 'active' : ''  //给字体判断是否活跃
  }
},
methods: {
  tabClick() {
    this.$router.replace(this.path).catch(err => console.log(err))  //路由跳转
  }
}
}
</script>
<style scoped>
.b-t-b {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.b-t-b img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top: 4px;
  margin-bottom: 2px;
}
.active {
  color: red;
}
</style>