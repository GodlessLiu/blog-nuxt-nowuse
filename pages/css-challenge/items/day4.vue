<script lang="ts" setup>
definePageMeta({
  layout: "css",
});
useHead({
  title: "Css Challenge - Drop-down Menu",
});
</script>
<template>
  <div class="day4">
    <main class="hl-main">
      <div class="hl-main-cotent">
        <div class="menu">
          <a href="" class="menu-a">菜单</a>
          <div class="menu-list">
            <ul>
              <li><a href="" class="menu-list-a">我的</a></li>
              <li><a href="" class="menu-list-a">交流</a></li>
              <li><a href="" class="menu-list-a">主页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <CssChallengeFooter
      :href="'https://github.com/GodlessLiu/css-challenge/blob/main/day4.vue'"
      :date="'2022/7/5'"
    >
    </CssChallengeFooter>
  </div>
</template>

<style lang="css" scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menu-a {
  height: 25px;
}
.menu-a:hover + .menu-list,
.menu-list:hover {
  visibility: visible;
}
.menu-list {
  visibility: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  position: absolute;
  margin-top: 30px;
  border-radius: 4px;
  padding: 12px;
  transition: visibility 0.2s;
}
.menu-list-a {
  border-radius: 4px;
  padding: 4px 8px;
}
.menu-list-a:hover {
  background-color: rgba(0, 0, 0, 0.16);
}
</style>
