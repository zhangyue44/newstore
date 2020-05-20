<template>
<div class='tab-control'>
  <div v-for="(item, index) in title" :key="index" class="tc-item" :class="{active: currentIndex === index}">
    <span @click="tbClick(index)">{{item}}</span>
  </div>
</div>
</template>

<script>

export default {
name: 'TabControl',
props: {
  title: Array,
},
data() {
  return {
    currentIndex: 0,
  }
},
methods: {
  tbClick(index) {
    this.currentIndex = index;
    this.$emit('toggleClick', index) //给父组件传出一个点击事件
  }
},
}
</script>
<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
}
.tc-item {
  flex: 1;
}
.tc-item span {
  padding: 4px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>