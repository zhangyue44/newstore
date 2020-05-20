<template>
  <div class="normal-list">
    <div v-for="(item, index) in listData" :key="index" class="item">
        <span class="icon">
          <img :src="iconURL(item)">
        </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "NormalList",
    props: {
			listData: Array,
    },
    methods: {
			iconURL(item) {
				return require('assets/img/profile/' + item.icon)
      }
    }
	}
</script>

<style scoped>
  .normal-list {
    margin-top: 15px;
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .item {
    position: relative;
    height: 44px;
    line-height: 44px;
  }

  .icon img {
    width: 20px;
    height: 20px;
  }

  .item .icon {
    position: absolute;
    left: 16px;
    top: 4px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>