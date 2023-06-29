---
title: linux基本学习
date: 2022-06-26
tag: Linux 
icon: uil:linux
description: linux基本学习
---

## linux系统组成
- linux内核（最核心的功能，如：调度cpu、调度内存、调度文件系统）
- 系统级应用程序（出场自带的应用程序，如：文件管理器、任务管理器等）

### linux发行版概念
linux的内核是开源免费的，也就是任何人都可以拿到linux的内核，我们只需要在内核的基础上加上自己的系统级应用程序就能发行自己的linux系统。
![linux发行版](/img/linux/faxingban.jpg)

## linux命令
基础格式
`command [-options] [parameter]`
- command 命令
- -options 命令的选项
- parameter 命令参数

### ls命令
命令：`ls [-a -l -h] Linux路径`
以平铺的方式打开当前文件夹。  
选项：
  -a 表示全部文件，包括隐藏文件夹
  -l 以列表（竖列）的形式展示
  -h 以易于查看的方式显示文件的大小（K MB）

### 目录切换cd 和 pwd
更改工作目录  
命令：`cd linux路径`  
- cd命令只有参数。表示切换到哪个目录下（不填表示home目录）  

查看当前工作目录  
命令：`pwd`
- 没有选项，没有参数

### 相对路径和绝对路径
相对路径： 相对当前路径  
- . 表示当前目录
- .. 表示上一级目录
- ~ 表示home目录  
绝对路径：以/开头，表示文件跟目录：如：`/usr/local/`  

### 创建目录mkdir
命令：`mkdir [-p] 参数`  
- 参数必填，表示Linux路径，相对路径和绝对路径都可以 
- -p可选，表示自动创建不存在的父级目录，适用于创建连续多层级的目录

### 文件操作 touch cat more
创建文件  
命令：`touch linux路径`  
- 无选项，参数必填，表示创建文件的路径

查看文件（一次显示完）  
命令：`cat linux路径`  
- 无选项，参数必填，表示创建文件的路径

查看文件（分页显示，空格翻页、q退出）  
命令：`more linux路径`  
- 无选项，参数必填，表示创建文件的路径

### 复制文件文件夹 cp
命令:`cp [-r] 参数1 参数2`
- -r 选项，可选，用来复制文件夹，表示递归复制
- 参数1，linux路径，表示被复制的文件或文件夹
- 参数2，linux路径，表示要复制去的地方

### 移动文件或文件夹
命令：`mv 参数1 参数2`
- 参数1，linux路径，表示被移动的文件或文件夹
- 参数2，linux路径，表示要移动去的地方

### 删除文件或文件夹
命令：`rm [-r -f] 参数1 参数2 ....`
- -r 用来删除文件夹
- -f 表示强制删除，不会出现提示
- 参数1，参数2，....表示要删除的文件路径

通配符，用来模糊匹配
- 符号*表示通配符，用来模糊匹配
- test* 表示test开始的内容
- *test 表示test结尾的内容
- \*test\* 表示包含test的内容

### 查找命令 which 和 find
查找程序命令的文件在哪  
命令：`which 要查找的命令`  

查找文件  
命令：`find 起始路径 -name "要查找的文件名"`

### 统计数量
统计文件的行数、单词数、字节数。  
命令`wc [-c -m -l -w] 文件路径`
- -c,统计bytes数量
- -m， 统计字符数量
- -l 统计行数
- -w 统计单词数量
- 参数 文件路径，被统计的文件

### 管道符 |
含义：管道符左边的命令的结果作为右边的输入
`cat test.txt | grep xxxx`


### echo 
在命令行输出内容  
命令`echo "输出的内容"`

### 反引号 `
被包围的内容会当作命令去执行
echo \`pwd\`  

### 重定向符号
- \> 将左侧命令的结果覆盖写入右侧文件中
- \>\> 将左侧命令的结果追加到右侧指定文件中
演示：  
- `echo "hellow world" > test.text`

### 查看文件尾部信息
命令：`tail [-f -num] linux路径`  
- 参数 linux路径，必填，查看的文件路径
- -f 持续追踪
- -num 查看的数量（最后几行）


## 软件安装
yum：RPM包软件管理器，用于自动化安装配置linux（需要root权限）  
命令：`yum [-y] [install | remove | search] 软件名`  
- 选项：-y 自动确认，无需手动确认安装  
- install：安装
- remove：卸载
- search：搜索


## systemctl命令
Linux系统很多软件(内置或第三方)均支持使用systemctl命令控制:启动、停止、开机自启能够被systemctl管理的软件，一般也称之为:服务  
命令：`systemctl start | stop | status | enable | disable 服务名`  
系统内置服务：  
- NetWorkManager:主网络服务
- network：副网络服务
- firewalld：防火墙服务
- sshd：ssh服务

## ln命令创建软链接
软链接类似于windows里面的快捷方式  
命令：`ln -s 参数1 参数2`  
- -s选项，创建软链接
- 参数1：要链接的文件
- 参数2：要链接去的文件

![ln 软链接](/img/linux/ln.png)

## 定时任务crontab
```bash
# 未安装的话
yum install -y crontabs

# 开启crond服务
systemctl start crond
```
基本语法：  
`crontab [-e -l -r]`  
- -e 编辑crontab定时任务
- -l 查询crontab任务
- -r 删除当前用户所有定时任务  

编辑的基本格式：  
`* * * * * 执行任务`
- \*的含义
![* 的含义](/img/linux/crond.png)

- 特殊符号
![特殊符号](/img/linux/crond1.png)

- 执行指定时间的任务
![执行指定时间的任务](/img/linux/crond2.png)


## 进程管理
可以分为两大类，前台运行的和后台运行（守护进程）的。
### 查看进程状态
基本语法  
`ps [选项]`
- a 列出终端所有的用户进程
- x 列出所有用户进程，包括没有终端的进程
- u 面向用户友好的显示风格
- -e 列出所有进程
- -u 列出和某个用户有关的所有进程
- -f 列出完整格式的进程列表
`ps aux` 查看系统所有进程  
`ps -ef` 可以查看父子进程关系

### 终止进程
基本语法：  
`kill [-9] 进程号（pid）`  
- -9 强制终止
父进程被kill掉，子进程不会被kill  

### 实时监控系统进程
基本语法：  
`top [-d -i -p]`  
- -d 指定top每隔几秒刷新
- -i 不显示任何闲置或者僵死进程
- -p指定进程id监控某个进程状态

### 显示网络状态和端口占用
基本语法：  
`netstat [-a -n -l -p]`
- -a 显示所有正在监听和未监听的socket
- -n 拒绝显示别名
- -l 只列出在监听的服务状态
- -p 显示哪个进程在调用
常用：  
`netstat -anp` 查看该进程网络信息    
`netstat -nlp` 查看网络端口占用情况  

