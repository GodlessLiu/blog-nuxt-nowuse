---
title: Website development progress
date: 2021-06-10
tag: 中文
icon: carbon:progress-bar
description: 记录这个网站开发的进度的文档
---

> 你既然已经做出了选择，又何必去问为什么选择。 

## 第一天
学习nuxt的基本使用。

## 第二天
- 完成了项目搭建（使用nuxt），引入一些必要的库。
- nuxt server 后端与mongodb进行连接，测试插入语句成功
- nuxt server 使用fs写入文件成功。


## 第三天
- 完成了导航页面，文章browser页面的开发
- 写了一段自我介绍，index页面开发完成。
- 写了markdown 快速导航Navgation
- 找了自己的网站logo

## 第四天
- 支持dayjs格式化日期
- 选择不使用nuxt server
- 优化了markdown样式、markdown nav
- 修改了网页样式
- 加入按年份分类
- 修改自我介绍

## 第五天
- 部署了blog在自己的网站上
- 写了自动部署（pm2 + scp2）
- 重写了nuxt content 的prose 部分组件
- 修改年份降序排列
- 网页样式

## 第六天
- 为网站添加了雪花背景
- 修改aticle页面

## 第七天
- 添加按年份进行筛选功能
- 修改文字信息
- 添加中英文切换

## 2023/6/30日
- 添加books功能
- 修改books页面的样式
- 后台设置限速

## 开发中获得的收获
1. 快速学习了nuxt，并且学会了nuxt的基本应用，以及tailwind.css自定义样式。
2. 一些css属性:
- 定义字体的边框
    ```css
    /* -webkit-text-stroke: width color;  */
    /* 网页中的year就是通过这个实现的 */
    .year {
        -webkit-text-stroke:2px gray;
        color:transparent;
    }
    ```
- 定义网页选中的颜色
    ```css
    ::selection: color; 
    ```

- 自定义滑轮
    ```css
    /*  
        ::-webkit-scrollbar 
    */
    html::-webkit-scrollbar {
        width: 6px;
        /*height: 4px;*/
    }
    /* 滚动的滑块 */
    html::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(125, 125, 125, 0.4);
    }
    /* 轨道 */
    html::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        background: rgba(125, 125, 125, 0.1);
    }
    ```


3. pm2可以设置config  
[ecosystem.config.js](https://juejin.cn/post/6926357629375610887)
4. ssr
