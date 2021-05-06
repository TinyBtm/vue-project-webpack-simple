<template>
  <div class="main">
    <div class="">
      <router-link to="/">首页</router-link>
      <router-link to="/draglist">拖拽列表</router-link>
    </div>
    <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
.main {
  text-align: center;
}

.flex-box {
  height: 500px;
}
</style>