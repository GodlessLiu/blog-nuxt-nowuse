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
