#!/bin/bash

# 扩展一下命令行功能
# 仅判断第一个参数 1. b（只打包）; 2. bu or ub（先打包然后创建）;3. 不传就是（先打包然后创建）

OPTION=$1

case $OPTION in
"b")
    echo "开始进行打包";
    npm run build;
;;
"bu")
    echo "开始进行打包";
    npm run build;
    echo "开始进行上传";
    npm run up;
;;
"ub")
    echo "开始进行打包";
    npm run build;
    echo "开始进行上传";
    npm run up;
;;
"")
    echo "开始进行打包";
    npm run build;
    echo "开始进行上传";
    npm run up;
;;
*)
  echo "参数错误！"
esac

