<template>
  <scroll class="s-menu">
    <div class="menu">
      <div class="menu-list" v-for="(item, index) in categories" :key="index" :class="{active: currentIndex === index}" @click="change(index)">{{item.title}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll' //滚动模块

export default {
  name: 'CateMenu',
  props: {
    categories: Array,
  },
  components: {
    Scroll,
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    change(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index)
    },
  },
};
</script>

<style scoped>
.s-menu {
  box-sizing: border-box;
  height: 100%;
  width: 100px;
  background-color: #f6f6f6;
}
.menu-list {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.active {
font-weight: 700;
color: var(--color-high-text);
background-color: #fff;
border-left: 3px solid var(--color-high-text);
}
</style>
