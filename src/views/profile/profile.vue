<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <user></user>
    <account></account>
    <normal-list :list-data="orderList"></normal-list>
    <normal-list :list-data="serviceList"></normal-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'  //导航模块
  import User from './proChildren/User'  //自己信息模块
  import Account from './proChildren/Account' //资产模块
  import NormalList from './proChildren/NormalList' //剩下的模块

  export default {
    name: "Profile",
    components: {
    	NavBar,
      User,
      Account,
      NormalList,
    },
    data() {
    	return {
		    orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
