<template>
  <div class="clist">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'  //导入vuex中的一个模块

export default {
    name: 'CartList',
    components: {
        CartListItem,
    },
    computed: {
        ...mapGetters(['cartList'])  //可以在计算属性中直接使用vuex中的index.js的getters

    },
}
</script>

<style scoped>

</style>