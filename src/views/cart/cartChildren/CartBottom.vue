<template>
  <div class='cart-bottom'>
     <CheckButton class="select-all" :is-checked="isSelect" @click.native="btnClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: 'CartBottom',
    components: {
      CheckButton,
    },
    methods: {
      btnClick() {
        if (this.isSelect) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    },
    computed: {
      ...mapGetters([
      	'cartList',
        'cartLength'
      ]),
      totalPrice() {  //商品总价格合计
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      isSelect() {
        if (this.cartList.length === 0 ) return false
        return !this.cartList.find(item => !item.checked)
      }

    }
  }
</script>
<style scoped>
  .cart-bottom {
    position: fixed;
    bottom: 49px;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #eee;
    color: #888;
    font-size: 14px;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    padding-left: 35px;
  }

  .cart-bottom .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .cart-bottom .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .cart-bottom .buy-product {
    float: right;
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }
</style>