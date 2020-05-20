<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0; /*当父元素宽度不够时，大家都不缩小适应 */
  }

  .slide img {
    width: 100%;
  }
</style>
