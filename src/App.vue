<template>
  <div class="wrap">
    <el-container>
      <el-header>HELLO VUE</el-header>
      <el-container>
        <el-aside width="200px">
          <div
            :class="['list-li', { _on: oCurNav === oNav }]"
            v-for="(oNav, i) in aNav"
            :key="`menu${i}`"
            @click="fNavClick(oNav)"
          >
            <i :class="['iconfont', `icon-${oNav.icon}`]"></i> {{ oNav.name }}
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aNav: [
        { name: "首页", path: "/", icon: "shouye" },
        { name: "列表", path: "/draglist", icon: "drag" },
      ],
      oCurNav: {},
    };
  },
  mounted() {
    this.oCurNav = this.aNav[0];
  },
  methods: {
    fNavClick(oNav) {
      this.oCurNav = oNav;
      this.fJump();
    },
    fJump() {
      this.$router.push({
        path: this.oCurNav.path,
      });
    },
  },
};
</script>
<style lang="scss">
.wrap {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.el-container {
  width: 100%;
}

.el-header {
  width: 100%;
  text-align: center;
  line-height: 60px;
  color: #333;
  background-color: #b3c0d1;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.list-li {
  padding: 6px 20px;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:hover,
  &._on {
    color: #fff;
    background-color: #3cd4fc;
  }
}

.el-main {
  width: 100%;
  text-align: center;
  line-height: 160px;
  color: #333;
  background-color: #e9eef3;
}
</style>
