---
title: shell 脚本学习
date: 2022-06-26
tag: Shell
icon: icon-park-outline:painted-eggshell
description: linux shell脚本学习
---


## shell脚本学习
shell 就是将我们写的命令，如：`ls`、`cd`等解释为硬件能够看得懂的语言。  
一些命令： 
```bash
ls /etc/shells  # 查看所有的shells
echo $SHELL   # 查看当前的shell
```

## 第一个shell脚本
shell脚本的第一行需要规定使用什么解析器去解析。这是一个`print`hello world 的脚本。文件名为`hello.sh`  
```bash
#!/bin/bash
echo "hello world!!!"
```
其中我们指定了它用bash作为解析器，然后shell脚本是一行一行进行解析运行的。  
运行：  
1. 使用`bash`运行，不需要x权限
  `bash ./hello.sh` 
2. 直接输入文件路径运行。 需要可执行权限+x权限
  ```bash
    # 先赋予权限
    chmod +x ./hello.sh
    # 运行
    ./hello.sh
  ```
3. 其他方法
  ```bash
  source hello.sh
  . hello.sh
  ```

## 系统预定的系统变量
1. 常用的系统变量
  $SHELL、$PWD、$SHELL、$USER  
  ```bash
  # 显示当前的变量
  env
  ```
## 自定义变量
1. 局部变量
```bash
#等号两边不能有空格，这是一个局部变量，只能在这个shell进程里面可以看见
my_var=laf
echo $my_var
```
2. 全局变量
在上面的基础上，添加一行代码  
`export my_var`  
3. 只读变量
```bash
readonly b=5
```
4. 撤销变量
```bash
unset a
```
## 特殊变量
1. `$n`：数字n为，如$0表示脚本名、$1表示输入的第一个参数、$2为第二个参数。  
如以下命令：  
```bash
#!/bin/bash
echo "hello,world!"
echo "hello,$0"
echo "hello $1"
# 输出的内容
[root@1f4409ffff0e scripts]# ./hello.sh laf xxx
hello,world!
hello,./hello.sh
hello laf
```
2. `$#`表示输入参数的个数
3. `$*`表示输入的所有参数，为一个值
4. `$@`表示输入的所有参数，为一个整体，用于循环
5. `$?`表示上一个命令的执行状态

## 运算符
基本语法  
`$[5 * 2]`或`$((5*2))`

## 条件判断
基础语法  
1. `test condition`如：`test 1 = 1`  
2. `[ condition ]`前后一定要有空格

常用的判断条件  
![条件判断的常用判断条件](/img/linux/conditions.png)
例子：  
- 判断文件test的写入权限`[ -w test ]`
- 判断文件是否存在`[ -e test ]`

逻辑与和逻辑或  
`[] || [] && []`


## 流程控制（重点）
### if判断
```bash
if [ condition ]
then
  程序
elif [ condition ]
then
  程序
fi
```
练习  
以下程序用来判断`scripts`文件夹下是否存在`hello.sh`，存在提示，否则创建文件。
```bash
#!/bin/bash
if [ -e /scripts/hello1.sh ]
then
    echo "the file is already exit in /script/"
else
    echo "echo 1" > /scripts/hello.sh
    chmod +x /scripts/hello.sh
fi
```

### case语句
基本语法：  
```bash
case $1 in
"值1")
  程序
;;
"值2")
  程序
;;
*)
  程序（default兜底）
;;
esac
```
练习：  
```bash
#!/bin/bash
case $1 in
1)
  echo "1"
;;
2)
  echo "2"
;;
3)
  echo "3"
;;
*)
  echo "other number"
;;
esac           
```

### for循环
基本语法:  
1. 
```bash
for 变量 in 变量1 变量2 ...
do
  程序
done
```
练习：  
```bash
#!/bin/bash
for i in linux windows mac
do
        echo $i
done
```

2. 
```bash
if((初始值;循环控制条件;变量变化))
do
  程序
done
```
练习：  
```bash
#!/bin/bash
sum=0
for((i=0;i<=100;i++))
do
        sum=$[$sum+$i]
done
echo $sum
```

### while 循环
基础语法：  
```bash
while [ 条件判断式 ]
do
  程序
done
```

## 读取控制台输入
基本语法：  
`read [-t -p] 参数`  
- -t 设置等待时间(秒)
- -p 设置提示信息
- 参数 用户的输入会被设置为这个参数的值
练习：  
```bash
#!/bin/bash
read -t 5000 -p "请输入一些信息" word
```

## 函数
### 系统函数
基础语法：  
1. `basename [文件路径] [prefix]`  
用来获得文件路径对应文件的名字（把文件路径斜杆之后的字符返回回来）
- 文件路径 必填
- prefix 后缀名，如果填了可以帮我们把文件后缀也给去掉
```bash
basename /usr/bin/test.sh   # test.sh
basename /usr/bin/test.sh .sh   # test
```
2. `dirname [文件路径]`  
获得文件路径对应的文件的文件夹（把最后一个斜杠之前的字符返回回来）

### 自定义函数
基本语法：  
```bash
[ function ] funname[()]
{
  Action;
  [return int;]
}
```
1. 调用前先要声明函数
2. 函数返回值，不加为最后一条语句的返回值，加了只能为0-255（$?获得）

## 正则表达式入门
### 基础语法
- ^ 表示以什么开始
- $ 表示以什么结尾
- . 表示任意字符
- \* 表示之前的字符出现n次
- [6,8] 表示6或8
- [a-z] 表示a-z的一个字符

练习：  
匹配一个手机号`grep -E ^1[3-9][0-9]{9}$`

## 文本处理工具
### cut
剪切数据的时候用的  
基本语法：  
`cut [-f -d -c] filename`  
- -f 后面跟列号
- -d 分隔符
- -c 按字符进行切割

### awk 
基本语法：  
`awk [-F -v] '/partern1/{action1} /partern2/{action2}' filename`  
- -F 指定分割符，默认为空格
- -v 指定一个用户变量


