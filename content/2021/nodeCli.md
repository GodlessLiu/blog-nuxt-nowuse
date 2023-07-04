---
title: 如何写一个node Cli
date: 2021-06-17
tag: node
icon: mdi:nodejs
description: node cli 编写
---

> Node.js 除了可以编写“传统“的 Web 应用外，还有其他更广泛的用途。微服务、REST API、工具、物联网，甚至桌面应用，它能满足你的任何开发需求。

## 优势

1. 我们对 javascript 已经很了解
2. node 的生态，我们可以利用很多 npm 包
3. 可以使用 npm 管理依赖，不用考虑兼容性问题

## 一些好用的库

- chalk：可以让我们输出各种颜色的字体 [chalk](https://www.npmjs.com/package/chalk)
- clear：清空终端屏幕 [clear](https://www.npmjs.com/package/clear)
- clui：绘制命令行的表格、仪表盘、加载指示器等 [clui](https://www.npmjs.com/package/clui)
- figlet：生成 ASCII 的艺术字 [figlet](https://www.npmjs.com/package/figlet)
- inquirer：创建交互式命令行界面 [inquirer](https://www.npmjs.com/package/inquirer)
- minimist：解析命令行的参数 [minimist](https://www.npmjs.com/package/minimist)
- configstore：轻松的加载和保存配置信息 [configstore](https://www.npmjs.com/package/configstore)
- download-git-repo：通过 node 从 git 仓库下载代码(GitHub, GitLab, Bitbucket) [download-git-repo](https://www.npmjs.com/package/download-git-repo)

另一些库：

- @octokit/rest: 基于 Node.js 的 Github REST API 工具
- @octokit/auth-basic: Github 身份验证策略的一种实现
- lodash: JavaScript 工具库
- simple-git: 在 Node.js 中执行 Git 命令的工具
- touch: 实现 Unix touch 命令的工具

## 基本步骤

1. 创建 package.json，规定 bin 文件和一些 keywords、license 等
2. 创建 bin 文件，在第一行输入`#!/usr/bin/env node`这个指定我们的环境为 node
3. 编写代码

## 个人感受

通过 node 创建 cli 工具可以帮我们极大的减轻平时开发时的一些重复性劳动。为我们极大的节约时间。并且我们可以定制化自己的 cli 工具。这个不一定适用于其他人。

## 参考

[来自](https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/)
