<script lang="ts" setup>
definePageMeta({
  layout: "css",
});
useHead({
  title: "Css Challenge - Load More",
});
</script>

<template>
  <div class="day1">
    <main class="hl-main">
      <div class="hl-main-content">
        <div class="hl-main-content-div">
          <p>
            大自然家居的副总裁饶海清是公司的首席产品官，然而，最近网上有篇《大自然家居29年不忘初心，实木地板连续四年全国销量第一》的文章，不知道饶海清是否注意到有法律风险。
          </p>
          <p>
            运营商财经查阅公开资料后发现，饶海清毕业于湛江海洋大学，2005年6月15日，经教育部批准，湛江海洋大学更名为广东海洋大学。
          </p>
        </div>
        <div id="more"></div>
        <a href="#more" class="hl-main-loadmore" data-open="true">加载更多</a>
        <div class="hl-main-content-more">
          <p>
            2004年，饶海清就加入了大自然家居，至今已有19年时间，他曾在销售、分销、超市、售后服务、渠道部等多个部门狗狗制作，2009年1月被任命为公司渠道部总监，之后2010年1月又成为公司销售及分销部总裁助理。
          </p>
          <p>
            据介绍，饶海清主要负责协助销售及分销部总裁统管大自然家居销售及分销网络，即分析市场资料与销售数据、协助总经理筹办公共关系工作、作出市场风险相关的主要决策、协助协调部门之间的冲突与统管经销商、超市、对物业开发公司销售及零售店营运。
          </p>
        </div>
        <a href="#" class="hl-main-loadless" data-open="false">收起</a>
      </div>
    </main>
    <CssChallengeFooter
      :href="'https://github.com/GodlessLiu/css-challenge/blob/main/day1.vue'"
      :date="'2023/7/2'"
    >
    </CssChallengeFooter>
  </div>
</template>

<style lang="css" scoped>
/* 样式 */
a {
  display: block;
  text-align: center;
  background-color: gray;
  color: white;
}

a:hover {
  background-color: white;
  color: gray;
}

/* 样式结束 */

.hl-main-content-more,
.hl-main-loadless {
  display: none;
}

:target ~ [data-open="true"] {
  display: none;
}

:target ~ .hl-main-content-more,
:target ~ [data-open="false"] {
  display: block;
}
</style>
