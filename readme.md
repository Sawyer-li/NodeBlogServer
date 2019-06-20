# 一个简单的blog
## 描述  
主要用于学习  
## Installation  
安装相关的依赖  

```
npm i 
```

运行程序  
```
node app.js
```
## 生成apidoc 
```
apidoc -i controller -o apidoc
-i input
-o output
```
## 基本错误处理  
http error code的同时在body中返回补充说明的错误信息
错误处理
400
{
  "msg": "",
  "errors": [{

  }]
}
成功数据直接返回