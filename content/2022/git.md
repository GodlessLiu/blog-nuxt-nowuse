---
title: git 学习
date: 2022-06-23
tag: GIT
icon: fe:git
description: Git Learn
---

## 什么是Git （what）
git是一个免费、开源的分布式版本控制系统。

### 版本控制系统分为两种
- 集中式版本控制系统
  只有一台"中央服务器"，且他获得了文件不会进行共享。当他挂了的时候就不能获得所有文件的最新版本。
- 分布式版本控制系统
  虽然只有一台"中央服务器"，但是当他获得了文件的最新消息后，会进行文件共享，也就是每一个服务器都可以获得文件的最新版本。
  
[集中式版本控制系统 VS. 分布式版本控制系统](https://zhuanlan.zhihu.com/p/366198045)


## GIT 使用
1. 配置用户名和用户邮箱
```bash
git config --global user.name "xxxxx"
git config --global user.email "xxxxxxxx@.com"

# 查看配置
git config --global --list
```

## 创建仓库 repo
- 本地创建
  ```bash
  git init (dirname)
  ```
  这个命令会在dirname里面创建一个 *.git*的隐藏文件，里面包含了我们本地仓库的所有信息。
  ![.git文件夹](/img/git/git-.git.png)

- clone网上仓库
 ```bash
 git clone < url to your repo >
 ```

## Git 工作区域
![git 工作区域](/img/git/git-workspace.png)


## 添加和提交文件
```bash
git init   # 创建文件
git status # 查看文件状态
git add    # 将文件提交打暂存区
# 可以使用git rm --cached <file> 去删除暂存区的文件
git commit -m "提交信息" # 将文件提交到本地仓库
git log   # 查看提交记录
```
`git log`信息  
![git log](/img/git/git-log.png)

summary  
![git add commit files](/img/git/git4.png)

## 回退版本 `git reset`
### 三种模式
![git 回退版本的3种模式](/img/git/git-reset-3mod.png)
soft 和 mixed 的结果比较相似，就是当我们觉得中间几次版本提交可以合并成一个`commit`时，我们可以使用两个参数，然后再重新提交。这样我们`git log`就可以将之前几次的合并为一个。
而hard模式是当我们觉得当前版本完全需要放弃的时候，才使用，需要谨慎使用。但是如果我们误操作了也没关系，git的所有操作都是可以回退的。我们可以使用`git reflog`命令查看我们的所有操作，然后再回退到那个版本就可以了。

## Git diff
![GIT FIFF](/img/git/GIT-DIFF.png)

## 如何再版本库里面删除文件
`git rm <file>` 这个命令会把本地工作区的file文件和暂存区的文件一起删除掉。我们可以使用`git ls-files`来查看暂存区的内容。
![git rm](/img/git/GIT-RM.png)

## 忽略文件 .gitignore
### 忽略什么文件
![忽略什么文件](/img/git/what-t0-ignore.png)

### 匹配规则
```bash
# / 表示 当前文件所在的目录

# 忽略public下的所有目录及文件
/public/*

#不忽略/public/assets，就是特例的意思，assets文件不忽略
!/public/assets

# 忽略具体的文件
index.php

# 忽略所有的php
*.php

# 忽略 a.php b.php
[ab].php

#匹配规则和linux文件匹配一样
#以斜杠“/”开头表示目录；
#以星号“*”通配多个字符；
#以问号“?”通配单个字符
#以方括号“[]”包含单个字符的匹配列表；
#以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；
```
[常见的gitignore](https://github.com/github/gitignore)

## ssh配置和同步

### ssh配置
```bash
cd ~
cd ssh
ssh-keygen -t rsa -b 4096 # 生成ssh-key
```
将id_rsa..pub里面的密钥加在我们的github的ssh-key里面。配置完成了。

### 本地仓库和远程仓库同步
![git-push-pull](/img/git/git-push-pull.png)

![summary](/img/git/ssh-su.png)

## 本地仓库和远程仓库进行关联
![pull](/img/git/git-pull.png)

## 分支
分支可以让我们不同的人员再自己的分支干自己的事，最后统一合并到主分支上，这样可以随时保证主分支在一个稳定的状态。
![git分支的使用场景](/img/git/branch.png)

- 查看分支
  ```bash
  git branch
  ```
- 创建分支
  ```bash
  git branch <branch name>
  ```
- 切换分支
  ```bash
  git checkout <branch name>
  git switch <branch name>  # 推荐这个
  ```
- 合并分支
  ```bash
  git merge <branch name> # 这个是合并分支，如我们在main分支，然后这里的<branch name>是dev，这里就是把dev分支合并到main上。而dev分支不会被修改和删除
  ```
- 删除分支
  ```bash
  git branch -d <branch name>  # 删除已合并的分支
  git branch -D <branch name>  # 删除未合并的分支
  ```
![summary](/img/git/git-branch-su.png)

## 解决合并分支的冲突
手动解决
![git-merge-summary](/img/git/git-merge-su.png)

## rebase 变基
在哪个分支执行命令，这个分支就是被变的。
![where rebase](/img/git/rebase.png)
### 和merge的区别
![git merge的优缺点](/img/git/git-merge.png)
![git rebase的优缺点](/img/git/rebase.png)

## 分支管理和工作流模型
![GIT FLOW 模型](/img/git/gitFolw.png)
[Git Flow介绍](https://blog.csdn.net/l2931050/article/details/124105066)
