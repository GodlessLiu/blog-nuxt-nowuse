---
title: css 选择器世界
date: 2022-06-30
tag: CSS
icon: material-symbols:css 
description: 阅读css 选择器世界
---


## 使用`-webkit-`解决css存在浏览器兼容问题
当我们存在如下代码时：  
```css
.e:hover,
.e:active,
.e:focus-within{
  color:red;
}
```
因为IE浏览器不支持`focus-within`伪类，所以整个代码都会无效。于是就出现了`-webkit-`这个私有前缀，向IE这种浏览器就会将他识别为无效伪元素。
我们就可以使用这个来区分不同的浏览器。
```css
/* IE浏览器 */
.e {
  color:red;
}
/* 其他浏览器 */
.e ,::-webkit-whatever {
  color:red;
}
```

## css优先规则
- 0级  
通配选择器，选择符和逻辑组合伪类
```css
* {
  color:red;
}
:not(),
:is(),
:where(){

}
```
- 1级  
标签选择器
```css
body,html{

}
```
- 2级  
class选择器、属性选择器、伪类  
```css
.foo {}
[foo]{}
:hover{}
```
- 3级
id选择器
```css
#foo{}
```
- 4级
style内联属性  
```html
<span style="color:red;"></span>
```
- 5级
`!important`

----
增加css优先级的技巧。我们不要使用他的父类来增加优先级，因为这样增加了代码的耦合。比较好的做法有。重复选择自身，或者使用必然存在的属性选择器
```css
.foo.foo{}
.foo[class]{}
.foo[id]{}
```

## css大小写敏感
![选择器对大小写的敏感程度](/img/css/1.png)
### 手动设置对大小写不敏感
在`]`前面加上`i`
```css
[class ~="val" i]{}
```

## css命名和尽量避免使用嵌套
css命名尽量简单、通俗易懂，可以使用与它功能相关联的css命名，如：`hl-heardr,hl-navs,hl-sel`,其中前缀hl是为了避免我们的命名和其他第三方库重复，hl即Hilary Liu的第一个字母组合起来。  
### 缺点
我们不要使用嵌套命名，他有以下三个缺点：  
1. 渲染性能糟糕
如我们使用`.foo div{}`，css选择器会从右向左开始进行查找，他先回去找到所有的div标签，再去匹配.foo类名的元素。
2. 优先级混乱
过多的嵌套会使我们的css优先级混乱，比如当我们写下这个css样式时`.foo .bar dd .dd_succ img{}`，我们想要去修改img的样式是比较困难的，如果我们避免使用css嵌套，这个就可以解决
3. 难以维护
如上面的哪个css样式，如果有一天，我们中间一个类名发生改变，需要大量的修改css代码，这使得我们代码维护和可扩展性都降低了。

### 正确使用选择器
![正确使用css样式](/img/css/2.png)
基本布局就是使用没有嵌套，没有级联的类选择器就可以了。这样css代码量少，性能高，可扩展强，维护成本低。


## css选择器最佳实践汇总
### 命名书写
1. 建议使用小写，使用英文单词或者缩写。对于专有名词可以使用拼音，如：`youku`
2. 不建议使用驼峰命名法，因为驼峰命名法是给JavaScript Dom使用的。
3. 对于组合命名，使用短横线或下划线连接，这两个也可以组合使用，但是整个项目要保持一致。
4. 使用统一前缀，强化品牌的同时避免样式冲突

### 选择器类型
将网站css分为3部分：css重置样式、css基础样式、css交互变化样式。  
无论哪种样式，都不要使用id选择器，如果必须要用，使用属性选择器代替，他们优先级一样。  
```css
[id="someID"]{}
```
css样式重置使用属性选择器和标签选择器。  
所有的CSS基础样式全部使用类选择器，没有层级，没有标签。  
```css
/* 不建议 */
.cs-module img {} 
.cs-module > li {}
/* 建议 */
.cs-module-img {}
.cs-module-li{}
```

### css选择器分布
![css选择器设计最佳实践示意图](/img/css/3.png)

## css选择符
### 子孙选择符 “空格”
空格选择符选择元素的所有子孙
```css
p a {}
```
上面例子表示选择p元素底下的所有a
### 相邻兄弟选择符 +
表示于目标元素相邻的第一个兄弟元素(不包括文本和注解)
```html
<ul>
  <li class='first'></li>
  <!-- 这是一个注解 -->
  我是一个text文本
  <li>+++</li>
  <li></li>
  <li></li>
</ul>

<style>
  .first + li{
  }
</style>
```
这里style选择的是文本为`+++`的元素
### 所有后面兄弟选择符 ~
表示于目标元素相邻的所有兄弟元素(不包括文本和注解)
```html
<ul>
  <li class='first'></li>
  <!-- 这是一个注解 -->
  我是一个text文本
  <li>+++</li>
  <li>+++</li>
  <li>+++</li>
</ul>

<style>
  .first ~ li{
  }
</style>
```
这里style选择的是文本为`+++`的元素
### 双管道 ||
`some1 || some2`表示属于`some1`的所有`some2`元素


## 属性选择器
### 表示包含这个属性的元素 [attr]
```css
/* 拥有disable属性的所有元素，无论该元素的值为什么 */
[disable]{

}
```

### 表示严格匹配属性值 [attr=type]
```css
[disable=true]{

}
```

### 表示属性单词完全匹配 [attr~=type]
```html
<p data-type="hahahah ggggg">test</p>
<style>
  [data-type~='hahahah']{
    
  }
</style>
```
以上代码可以匹配p标签，因为css会把它分为两个单词`hahahah`和`ggggg`

### 表示属性起始片段完全匹配 [attr|=type]
```html
<p data-type="val-test">匹配</p>
<p data-type="value">不匹配</p>
<p data-type="val test">不匹配</p>
<style>
  [data-type|='val']{}
</style>
```

### 属性正则匹配
- [attr^=type] 表示以type开始
- [attr$=type] 表示以type结尾
- [attr*=type] 表示只要包含type都可以

### 注意点
属性匹配的值可以不用引号包裹，且不区分双引号和单引号。  
默认是区分大小写的，但是可以手动设置，之前讲过在`]`前加i

### css属性选择器搜索过滤技术
```html
<input type="search" id="input" placeholder="输入城市名称或拼音" />
<ul> 
    <li data-search="重庆市chongqing">重庆市</li>
    <li data-search="哈尔滨市haerbing">哈尔滨市</li>
    <li data-search="长春市changchun">长春市</li>
    ...
</ul>
```
```js
var eleStyle = document.createElement('style');
document.head.appendChild(eleStyle);
// 文本框输入
input.addEventListener("input", function() {
    var value = this.value.trim();
    // 这里匹配到不包含搜索的值进行隐藏，并且不区分大小写
    eleStyle.innerHTML = value ? 
      '[data-search]:not([data-search*="'+ value +'" i]) { display: none; }' 
      : '';
});
```

## css用户行为伪类

