<template>
<div class='goods-item' @click="gclick">
  <img :src="showImage" @load="imgLoad">
  <div class="goods-qita">
    <p>{{good.title}}</p>
    <span class="price">{{good.price}}</span>
    <span class="collect">{{good.cfav}}</span>
  </div>
</div>
</template>


<script>

export default {
name: 'GoodsItem',
props: {
  good: Object,
},
computed: {
  showImage() {
    return this.good.img || this.good.image || this.good.show.img
  }
},
methods: {
  imgLoad() {  //每个图片加载完成后都调用该事件，发送一个事件，使用 事件总线方法
    if (this.$route.path.indexOf('/home') !== -1) {
     this.$bus.$emit('HomeimgLoad') //发送到首页中
    } else if (this.$route.path.indexOf('/detail') !== -1) {
     this.$bus.$emit('DetailimgLoad') //发送到详情页中
    } else if (this.$route.path.indexOf('/category') !== -1) {
     this.$bus.$emit('CateGoryimgLoad') //发送到分类页中
    }
  },
  gclick() {
    this.$router.push('/detail/' + this.good.iid)  //跳转到每个商品的专属详情页面
  }
}
}
</script>
<style scoped>
.goods-item {
  position: relative;
  width: 48%;
  padding-bottom: 40px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
  .goods-qita {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
  }
    .goods-qita p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .goods-qita .price {
    margin-right: 20px;
    color: var(--color-high-text);
  }
  .goods-qita .collect {
    position: relative;
  }
  .goods-qita .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px; 
    background: url("~assets/img/common/collect.svg")  0 0/14px 14px; /*0 0 代表x与y轴不平铺，两个14px代表background-size*/ 
  }
</style>