---
title: 设计模式
date: 2023-06-28
tag: Design Patterns
icon: material-symbols:design-services
description: 设计模式学习
---

## 构造器模式
```js
function Employee(name,age){
  this.name = name
  this.age = age
  this.say = function(){
    console.log(this.name,this.age);
  }
}
var employee1 = new Employee("kerwin",100)
var employee2 = new Employee("tiechui",100)
```

## 原型模式
构造器模式的方法每次创建一个对象时，都会为开辟一个新的内存空间来存放这个方法，但是，这个方法的作用是唯一的，就是输出`name`和`age`,于是就有了原型模式。
1. 方法表示对象
```js
function Employee(name,age){
  this.name = name
  this.age = age
}
Employee.prototype.say = function(){
  console.log(this.name,this.age);
}
var employee1 = new Employee("kerwin",100)
var employee2 = new Employee("tiechui",100)
```
2. class 构造器
```js
class Employee {
  constructor(name,age){
    this,name=name
    this.age = age
  }
  // say会挂载Employee的原型方法上
  say(){
    console.log(this.name,this.age);
  }
}
```

## 工厂模式
> 有一个对象决定创建某一中产品对象类的实例。
```js
function User(role,pages){
  this.role = role
  this.pages = pages
}

function userFactory(role){
  switch (role) {
    case 'superadmin':
      return new User("superadmin",[
        "home",
        "user-manage",
        "news-manage",
        "right-manage"
      ])
      break;
    case 'admin':
      return new User('adminm',[
        "home",
        "user-manage",
        "news-manage",
      ])
      break
      case 'editor':
        return new User('adminm',[
        "home",
        "news-manage",
      ])
      break
    default:
      throw new Error("参数错误")
  }
}
```
这里我们的`userFactory`用来通过不同的role来创建User对象。

## 单例模式
> 保证创建的对象就是全局的唯一一个,不会重复创建对象
```js
// es5
var Singleton = (function(){
  var instance;
  function User(name,age){
    this.name = name
    this.age = age
  }
  return function(name,age){
    if(!instance){
      instance = new User(name,age)
    }
    return instance
  }
})()


// es6
class Singleton{
  constructor(name,age){
    if(!Singleton.instance){
      this.name = name
      this.age = age
      Singleton.instance = new User(name,age)
    }
    return Singleton.instance
  }
}
```

## 策略模式
策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。策略模式属于对象行为模式，它通过对算法进行封装，把使用算法的责任和算法的实现分割开来，并委派给不同的对象对这些算法进行管理。
该模式主要解决在有多种算法相似的情况下，使用`if...else`所带来的复杂和难以维护。它的优点是算法可以自由切换，同时可以避免多重`if...e1se`判断，且具有良好的扩展性。

## 代理模式
为其他对象提供一种代理以控制这个对象的访问。

```js
let proxy = new Proxy(star,{
  get(target,key){
    console.log("访问了",key);
    return target[key]
  },
  set(target,key,value){
    console.log("设置了",key);
    target[key] = value
  }
})
```

## 观察者模式
> 观察者模式包括观察目标和观察两类对象。
> 一旦观察目标状态改变，所有观察者都会得到通知。
当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新，解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其他对象通知的问题

原理：观察目标对象内部有一个数组，用来储存所有的观察者，当目标对象想要通知观察者时，只需要通过列表里面的对象示例调用相应函数就可以了。


## 发布订阅模式
个人感觉时观察者模式的一种更好的扩展，我们把数组换成了对象，可以通过key来进行只对相应的订阅者发布消息。
