###vue-project-webpack-simple
```
webpack工程化打包--vue项目--模板
```
###项目指令
```shell
npm run serve --启动项目本地开发环境
npm run build:stage --测试服务包
npm run build:prod --生产环境包
```
###目录结构
```
|-- build  --webpack配置文件
|-- dist  --测试包
|-- prod  --生产包
|-- public --公共样本
|-- src  --项目开发主路径
|-- |-- assets --静态文件
|-- |-- |-- css[style] --样式文件
|-- |-- |-- fonts --字体文件
|-- |-- |-- images --图片文件
|-- |-- components --公用组件
|-- |-- router --vue-router路由
|-- |-- store --vuex公用数据
|-- |-- utils --js插件
|-- |-- views --页面
|-- |-- |-- [module] --模块
|-- |-- |-- |-- component --模块下非公用组件
|-- |-- |-- |-- style --模块下非公用样式
|-- |-- App.vue --入口页
|-- |-- main.js --入口配置
|-- .eslintrc.js  --eslint配置
|-- package.json  --包管理
|-- package-lock.json  --包管理
|-- prettier-config.js  --prettier配置
```
###编辑器识别别名
``` webstorm-setting
position: File > Settings > Languages & Frameworks > JavaScript > Webpack
mode: Manually
file: build > webpack.dev.config.js
```