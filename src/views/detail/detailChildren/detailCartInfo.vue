<template>
<div class='detail-ci' v-if="Object.keys(cartDetail).length !== 0">
  <div class="hea">
    <img :src="showImg">
    <!-- <img src="~assets/img/detail/cart.png"> -->
    <div class="zh">
      <div class="z">价格<span class="p">￥</span><span class="price">{{showPrice}}</span></div>
      <div>库存:{{cartDetail.totalStock}}件</div>
      <div>已选择:<b>{{itemStyle.color}}-{{itemStyle.size}}</b></div>
    </div>
    <div class="cha" @click="showDetailss">×</div>
  </div>
  <div class="zho">
    <div class="xia">
      <div>{{cartDetail.props[0].label}}</div>
      <div class="yan">
        <div class="yans" v-for="(item, index) in showColor" :key="index" :class="{active: currentIndex1 === index}" @click="itemClick1(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="xia">
      <div>{{cartDetail.props[1].label}}</div>
      <div class="yan">
        <div class="yans" v-for="(item, index) in showSize" :key="index" :class="{active: currentIndex2 === index}" @click="itemClick2(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="xia">
      <span>数量:</span>
      <span class="bu">
        <button @click.stop="sub" :disabled="goodsCount <= 1">-</button>
        <button>{{goodsCount}}</button>
        <button @click.stop="add">+</button>
      </span>
    </div>
  </div>
  <div class="hen">
  <button class="que" @click="addCart">确定</button>
  </div>
</div>
</template>

<script>

export default {
name: 'DetailCartInfo',
data() {
  return {
    itemStyle: {
      color: {
        type: String,
      },
      size: {
        typr: String,
      }
    },
    goodsCount: 1,
    currentIndex1: 0,
    currentIndex2: 0,
  }
},
props: {
  cartDetail: Object,
},
components: {},
created() {
  //设置默认显示值
  this.itemStyle.color = this.cartDetail.props[0].list[0].name;
  this.itemStyle.size = this.cartDetail.props[1].list[0].name;
},
computed: {
  showImg() { //显示不同图片
    for (let i of this.cartDetail.skus) { //图片存在skus数组中
      if (this.itemStyle.color === i.style && this.itemStyle.size === i.size) {
        return "http:" + i.img
    }
    }   
  },
  showPrice() { //显示不同价格
    for (let i=0; i < this.cartDetail.skus.length; i++) { //图片存在skus数组中
      if (this.cartDetail.skus[i].style === this.itemStyle.color && this.cartDetail.skus[i].size === this.itemStyle.size) {
        return (this.cartDetail.skus[i].nowprice / 100).toFixed(2);       
      }
    }   
  },
  showColor() { //颜色
    return this.cartDetail.props[0].list
  },
  showSize() {//尺寸
  return this.cartDetail.props[1].list
  },
},
methods: {
  itemClick1(index) {
    this.currentIndex1 = index;
    this.itemStyle.color = this.showColor[index].name;
    this.goodsCount = 1; //刷新数值
  },
  itemClick2(index) {
    this.currentIndex2 = index;
    this.itemStyle.size = this.showSize[index].name;
    this.goodsCount = 1;//刷新数值
  },
  sub() {
    this.goodsCount--;
  },
  add() {
    this.goodsCount++;
  },
  showDetailss() { //就是点击×号，让此组件不显示
    this.$emit('showDetailss')
  },
  addCart() {
    this.$emit('addCart', 
    this.itemStyle.color,
    this.itemStyle.size,
    this.showImg,
    this.showPrice,
    this.goodsCount)
  }
},
}
</script>
<style scoped>
.detail-ci {
  position: relative;
}
.hea {
  position: relative;
  display: flex;
}
.hea img {
  margin: 15px;
  width: 120px;
  height: 120px;
}
.hea .p {
  color: var(--color-high-text);
}
.hea .price {
  color: var(--color-high-text);
  font-size: 24px;
}
.hea .cha {
  position: absolute;
  top:9px;
  right: 9px;
  width: 20px;
  height: 20px;
  line-height: 17px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  text-align: center;
  font-size: 18px;
}
.zho {
  margin-left: 10px;
}
.zh {
  margin-top: 30px;
}
.yan {
  display: flex;
  flex-wrap: wrap;
}
.yans {
  border: 1px solid var(--color-high-text);
  padding: 3px;
  margin: 4px ;
  /* background-color: rgba(158, 154, 154, 0.52); */
  border-radius: 2px;
}
.active {
  background-color: rgba(158, 154, 154, 0.52);
}
.xia {
  padding: 10px 0 10px;
  border-bottom: 1px solid #ccc;
}
.bu button {
  width: 40px;
  padding: 2px;
  background-color: rgba(158, 154, 154, 0.52);
  border: 0;
  margin-right: 2px;
}
.zui {
  text-align: center;
}
.hen {
  position: fixed;
  bottom: 0;
  /* left: 0; */
  right: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
}
.que {
  border-radius: 15px;
  width: 80%;
  height: 30px;
  line-height: 30px;
  border: 0;
  background-color: var(--color-high-text);
  color: #fff;
}
</style>