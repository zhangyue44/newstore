<template>
    <div>
      <div class="icon-selector" :class="{'selector-active': isChecked}" @click="selectItem">
        <img src="~/assets/img/cart/tick.svg">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: true
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
	}
</script>

<style scoped>
  .icon-selector {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
