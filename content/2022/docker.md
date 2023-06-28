---
title: docker基础
date: 2022-06-25
tag: Docker
icon: mdi:docker
description: docker的基础学习 
---

## 什么是docker
Docker 是一个应用打包、分发、部署的工具。以把它理解为一个轻量的虚拟机，它只虚拟你软件需要的运行环境，多余的一点都不要。

### docker和普通虚拟机的区别
| 特性 |普通虚拟机|Docker|  
| :----: | :----: | :----: | 
|跨平台|通常只能在桌面级系统运行，例如 Windows/Mac，无法在不带图形界面的服务器上运行|支持的系统非常多，各类 windows 和 Linux 都支持|  
|性能|性能损耗大，内存占用高，因为是把整个完整系统都虚拟出来了|性能好，只虚拟软件所需运行环境，最大化减少没用的配置|  
|自动化|需要手动安装所有东西|一个命令就可以自动部署好所需环境|  
|稳定性|稳定性不高，不同系统差异大|稳定性好，不同系统都一样部署方式|  

### 重要概念
镜像(image)：可以理解为软件安装包，可以方便的进行传播和安装。
容器(container)：软件安装后的状态，每个软件运行环境都是独立的、隔离的，称之为容器。

## docker快速安装软件
### 优点
- 一个命令就可以安装好，快速方便
- 有大量的镜像，可直接使用
- 没有系统兼容问题，Linux 专享软件也照样跑
- 支持软件多版本共存
- 用完就丢，不拖慢电脑速度
- 不同系统和硬件，只要安装好 Docker 其他都一样了，一个命令搞定所有

我们可以去[docker hub](https://hub.docker.com/)查找自己需要的镜像，可以然后编写`dockerfile`或`docker-compose.yml`进行安装。

## 制作自己的镜像
1. 编写Dockfile
  ```dockerfile
  FROM node:11
  MAINTAINER HilaryLiu(2788370451@qq.com)

  # 复制代码
  ADD . /app

  # 设置容器启动后的默认运行目录
  WORKDIR /app

  # 运行命令，安装依赖
  # RUN 命令可以有多个，但是可以用 && 连接多个命令来减少层级。
  # 例如 RUN npm install && cd /app && mkdir logs
  RUN npm install --registry=https://registry.npm.taobao.org

  # CMD 指令只能一个，是容器启动后执行的命令，算是程序的入口。
  # 如果还需要运行其他命令可以用 && 连接，也可以写成一个shell脚本去执行。
  # 例如 CMD cd /app && ./start.sh
  CMD node app.js
  ```
  [dockerfile文档](https://docs.docker.com/engine/reference/builder/#run)

2. 打包镜像和运行
编译`docker build -t (image name):(版本)`
> `-t` 设置镜像名字和版本号
>
> 命令参考：[https://docs.docker.com/engine/reference/commandline/build/](https://docs.docker.com/engine/reference/commandline/build/)

运行`docker run -p 8080:8080 --name test-hello test:v1(镜像的名字)`
> -p 映射容器内端口到宿主机
>
> --name 容器名字
>
> -d 后台运行
>  
> 命令参考文档：[https://docs.docker.com/engine/reference/run/](https://docs.docker.com/engine/reference/run/)

### 更多dokcer相关命令
`docker ps`查看当前运行中的容器
`docker images`查看镜像列表
`docker rm container-id`删除指定 id 的容器
`docker stop/start container-id`停止/启动指定 id 的容器
`docker rmi image-id`删除指定 id 的镜像
`docker volume ls`查看 volume 列表
`docker network ls`查看网络列表

## 目录挂载
我们希望将自己宿主机上面的文件和docker内部的文件进行关联，这样当我们修改宿主机的文件时，docker内部的文件也会跟着改变。

### 几种挂载方式
- `bind mount`*直接将宿主机的文件目录映射到容器内部*，适合用来挂代码文件或者配置文件。可挂到多个容器上
- `volume`*由容器进行创建和管理，直接创建在宿主机内部*，所以当容器被删除后，这个目录也不会消失。常用来储存数据库数据。可挂到多个容器上
- `tmpfs mount` 适合存储临时文件，存宿主机内存中。不可多容器共享。  
文档参考：[https://docs.docker.com/storage/](https://docs.docker.com/storage/)

### 挂载演示
`bind mount`方式用绝对路径 -v D:/code:/app  
`volume`方式，只需要一个名字 -v db-data:/app  
示例：
`docker run -p 8080:8080 --name test-hello -v D:/code:/app -d test:v1`

## 多容器通信
各个项目往往不是单独运行的，比如我们需要使用数据库，这时需要容器之间进行通信。
### 创建虚拟网络
要想多容器之间互通，从 Web 容器访问 数据库 容器，我们只需要把他们放到同个网络中就可以了。
### 演示
1. 创建一个名为`test-net`的网络  
  `docker network create test-net`
2. 运行redis在`test-net`网络，并且取别名为redisnet  
  `docker run -d --name redis-test --network test-net --network-alias redisnet redis:latest` 
3. 修改代码中访问redis的地址为网络别名
  ```ts
  const redis = require(' redis ');
  let rds = redis.createclient({ url: "redis://redisnet:6379" });
  rds.on(' connect ', ()=> console.log(' redis connect ok '))
  rds.connect()
  ```
4. 运行 Web 项目，使用同个网络
  `docker run -p 80:80 --name test -v D:/test:/app --network test-net -d test:v1`
