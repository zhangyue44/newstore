<template>
  <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
          <img class="item-img" :src="item.image" @load="imgLoad">
          <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridView/GridView'

export default {
  name: 'CateContent',
  props: {
    subcategories: Object,
  },
  components:{
    GridView,
  },
  methods: {
    imgLoad() { //每一次图片加载
      this.$emit('cimgLoad')
    }
  },
};
</script>

<style scoped>
  .panel img {
    width: 100%;
  }
  .item {
    text-align: center;
    font-size: 12px;
  }
  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
