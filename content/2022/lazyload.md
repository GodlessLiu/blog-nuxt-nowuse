---
title: 实现图片懒加载的几种方式
date: 2022-07-06
tag: Image
icon: ic:baseline-image
description: 实现图片懒加载的几种方式
---

## 图片懒加载是什么？

图片懒加载就是*延迟加载* ，比如当页面很长很长的时候，这个时候浏览器可视区域装不下，懒加载就是 _优先加载浏览器可视区域内_ 的资源，其他部分等进入了可视区在进行加载。

## 图片懒加载的好处

1. 增加用户体验。一次性加载所有资源浪费时间，且用户第一时间不能看到所有内容
2. 浪费流量。有的时候用户并不是想看完所有的内容

## 实现的思路

1. 我们先为 img 标签设置自定义属性——`data-src`,当图片进入可视化区域后，我们将这个自定义属性赋值给 img 的`src`属性，这样浏览器就会去加载对应的图片。
2. 节流：用户可能出现反复滑动的情况。我们不能设置图片立即加载，应该使用节流来执行加载操作。

## 实现方式

### 第一种——loading 属性

> 设置 Img 的`loading`属性为"lazy",它的值会提示 用户代理 告诉浏览器不在可视视口内的图片该如何加载。这样一来，通过推迟图片加载仅让其在需要的时候加载而非页面初始载入时立刻加载，优化了页面的载入。
>
> lazy 告诉用户代理推迟图片加载直到浏览器认为其需要立即加载时才去加载。例如，如果用户正在往下滚动页面，值为 lazy 会导致图片仅在马上要出现在 可视视口中时开始加载。

### 第二种——图片距离可视窗口的高度小于可视窗口的高度时加载图片。

- `getBoundingClientRect().top`：元素到可视窗口的高度
- `window.innerHeight`：可视窗口的高度

![第一种方式原理](/img/lazyload/1.png)
因此，当`getBoundingClientRect().top < window.innerHeight`时，应该加载图片。

### 第三种——scrollTop+offsetTop+innerHeight

- `offsetTop`：元素距离 Html 页面的高度
- `innerHeight`：可视窗口的高度
- `scrollTop`：滑块滑动的距离
  ![第二种原理](/img/lazyload/2.png)
  `scrollTop + innerHeight > offsetTop`时间,应该加载图片

### 第四种——intersectionObserve()

这是一个新的 api，它可以检测元素是否在窗口可视区域内。  
[MDN 链接](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

```javascript
const iamges = document.querySelectorAll("img");
function lazyLoad() {
  const obsever = new IntersectionObserver((entires) => {
    entires.forEach((item) => {
      let image = item.target;
      if (item.intersectionRatio > 0 && item.intersectionRatio <= 1) {
        image.setAttribute("src", image.getAttribute("data-src"));
      }
    });
  });
  iamges.forEach((element) => {
    obsever.obsever(element);
  });
}
```

## 插件

- [lazyload.js](https://github.com/tuupola/lazyload) 是 IntersectionObserver 方式，而且当浏览器不支持 IntersectionObserver 的时候就直接加载图片，没有延迟加载的功能。
- [vue-lazyload](https://github.com/hilongjw/vue-lazyload)使用 IntersectionObserver 和 getBoundingClientRect 方式，
- [react-lazyload](https://github.com/twobin/react-lazyload) 只用了 getBoundingClientRect 方式，里面的封装细节也很有意思，待下回分解。
