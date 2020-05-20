<template>
  <div class="user">
    <img class="avatar" src="~assets/img/profile/avatar.svg">
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg">
    </div>
  </div>
</template>


<script>
	export default {
		name: "User"
	}
</script>

<style scoped>
  .user {
    display: flex;
    height: 85px;
    background-color: var(--color-tint);
    padding: 6px 15px;
    color: #fff;
  }
  
  .avatar {
    width: 70px;
    height: 70px;
  }

  .info {
    flex: 1;
    padding-left: 15px;
  }

  .info .login {
    margin-top: 15px;
  }

  .phone img {
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }

  .phone span {
    font-size: 13px;
  }

  .arrow {
    width: 20px;
    line-height: 85px;
  }

  .arrow img {
    width: 20px;
  }
</style>