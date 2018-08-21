# Git

## 题目

- 【笔试】写出一些常用的 git 命令
- 【面试】简述多人使用 git 协作开发的基本流程

## 解答

你此前做过的项目一定要用过 git ，而且必须是命令行，如果没用过，你自己也得恶补一下。对 git 的基本应用比较熟悉的同学，可以跳过这一节了。mac os 自带 git，windows 需要安装 git 客户端，自己去网上找。

国内比较好的 git 服务商是 coding.net ，国外的是大名鼎鼎的 github 但是很容易被墙。因此建议大家注册一个 coding.net 然后创建一个项目，来练练手。

### 写出一些常用的 git 命令

- git add .
- git checkout xxx
- git commit -m "xxx"
- git push origin master
- git pull origin master
- git stash / git stash pop

### 简述多人使用 git 协作开发的基本流程

- git branch
- git checkout -b xxx / git checkout xxx
- git merge xxx

### 关于 svn

关于 svn 我的态度和针对 IE 低版本浏览器的态度一样，你要查询一下资料简单了解一下，面试的时候可能会问到，但是你只要熟悉了 git 的操作，面试官不会因为你不熟悉 sv 就难为你。但是前提是你要知道一点 svn 的基本命令，自己上网一查就行。

但是 svn 和 git 的区别你得了解。svn 是每一步操作都离不开服务器，创建分支，提交代码都需要连接服务器。而 git 就不一样了，你可以在本地创建分支，提交代码，最后再一起 push 到服务器上。因此，git 拥有 svn 的所有功能，但是却比 svn 强大的多。（git 是 linux 的创始人发明的东西，因此也倍得推崇）

## 接下来

接下来介绍 JS 模块化的考点
