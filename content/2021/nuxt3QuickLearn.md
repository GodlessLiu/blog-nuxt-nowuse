---
title: Nuxt的基本学习
date: 2021-05-10
tag: 中文
icon: teenyicons:nuxtjs-solid
description: 记录我的nuxt3学习
---

## 1.快速创建
```bash
npx nuxi init <project-name>
```
<span style="color:red;"> 由于国内网络的原因，nuxt init会失败</span>，这里我将nuxt进行本地下载，然后放在了我的Github上。

## 2.Nuxt文件夹解析
[官方文档](https://nuxt.com/docs/guide/directory-structure/nuxt)
## 3.Nuxt 部署
[官方文档](https://nuxt.com/docs/getting-started/deployment)  
  
这里有一个官方的说法:
There are two ways to deploy a Nuxt application to any static hosting services:  
- Static site generation (SSG) with ssr: true pre-renders routes of your application at build time. (This is the default behaviour when running nuxi generate.) It will also generate /200.html and /404.html single-page app fallback pages, which can render dynamic routes or 404 errors on the client (though you may need to configure this on your static host).

- Alternatively, you can prerender your site with ssr: false (static single-page app). This will produce HTML pages with an empty `<div id="__nuxt"></div>` where your Vue app would normally be rendered. You will lose many of the benefits of prerendering your site, so it is suggested instead to use `<ClientOnly>` to wrap the portions of your site that cannot be server rendered (if any).

这里我喜欢用pm2进行部署，这样我们需要设置 `ssr:true` :  
To use pm2, use an ecosystem.config.js:
```js
module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
```  
[配置属性详细介绍](https://juejin.cn/post/6926357629375610887)
