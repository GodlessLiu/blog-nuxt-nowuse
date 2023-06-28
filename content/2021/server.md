---
title: Blog back-end development
date: 2021-06-11
tag: 中文
icon: teenyicons:nodejs-outline
description: 使用本地文件服务直接上传到服务器
---


## 技术栈
node + scp2 + pm2


## 具体实现
- scp2 实现文件上传功能
- pm2 使用config配置，使用监听文件，发现文件变化自动重新启动 [配置介绍](https://juejin.cn/post/6926357629375610887)

## scp2 注意事项
这个放回的参数以回调函数的形式给出，所以我们需要自己封装promise，因为当我们开启两个传送服务时，scp2会把传送的文件都改为最后一个。所以我们需要等待一个文件传送完后，在开始传送另一个文件。

