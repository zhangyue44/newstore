<template>
<div class='home-swiper'>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
      <img :src="item.image" @load="siload">
    </a>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
name: 'HomeSwiper',
props: {
  banners: Array,
},
data() {
  return {
    isLoad: false,
  }
},
components: {
  Swiper,
  SwiperItem,
},
methods: {
  siload() { //轮播图片加载完成，是为了解决tab-control的高度计算问题
    if (!this.isLoad) { //有一张图片加载完成即可，不需4张都加载完成
      this.$emit('siload');
      this.isLoad = true;
    }
    
  }
}
}
</script>
<style scoped>

</style>