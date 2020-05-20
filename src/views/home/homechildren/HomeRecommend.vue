<template>
<div class='recom'>
  <div v-for="(item, index) in recommends" :key="index" class="recom-item">
      <a :href="item.link">
        <img :src="item.image">
         <div>{{item.title}}</div>
      </a>
  </div>
</div>
</template>

<script>

export default {
name: 'HomeRecommend',
props: {
  recommends: Array,
},
}
</script>
<style scoped>
.recom {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recom-item {
  flex: 1;
}
.recom-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px
}
</style>