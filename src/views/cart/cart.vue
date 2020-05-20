<template>
<div class='cscroll'>
  <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
  <scroll class="c-scroll" ref="scroll">
    <cart-list></cart-list>
  </scroll>
  <cart-bottom></cart-bottom>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar' //导航模块
import CartList from './cartChildren/CartList'  //购物列表模块
import Scroll from 'components/common/scroll/Scroll' //滚动模块
import CartBottom from './cartChildren/CartBottom'  //计算模块

import {mapGetters} from 'vuex'  //导入vuex中的一个模块

export default {
name: 'Cart',
components: {
  NavBar,
  CartList,
  Scroll,
  CartBottom,
},
computed: {
  ...mapGetters(['cartLength']) //可以在计算属性中直接使用vuex中的index.js的getters
},
activated() {   //活跃状态，即是切换回本路由
      this.$refs.scroll.refresh()  //最好重新刷新一次，防止出现bug
},
}
</script>
<style scoped>
/* .cart {
  position: relative;
  height: 100vh;
} */

.cart-nav {
  position: relative;
  z-index: 15;
  color: #fff;
  background-color: var(--color-tint);
} 
.c-scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 93px;
} 
</style>