<template>
  <div class="flex-box">这是首页</div>
</template>

<script>
import { main } from "@/api/index";

export default {
  name: "Home",
  components: {},
  async created() {
    try {
      console.log(await main());
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
<style lang="scss"></style>
