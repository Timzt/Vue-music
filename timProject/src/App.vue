<template>
  <div id="app-box">
    <router-view></router-view>    
  </div>
</template>

<script>
export default {
  name: 'app-box',
  data (){
  	return{
  	}
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
