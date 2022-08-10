# 从零开始的前端项目开发

## 第一步：创建项目目录

准备工具：vite构建工具，npm包管理器

操作步骤：

1. 在新目录下执行` npm create vite@latest`
2. 进入构建选择，name自定义，framework选择vue，variant选择vue，当前目录下生成项目
3. 进入项目文件夹，执行`npm install`安装依赖，执行`npm run dev`即可打开浏览器显示项目页面
4. 当前目录结构如下：

```bash
├── README.md
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
└── vite.config.js
```

5. 修改文件目录，使其符合开发需求

```bash
├── docs
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
│   ├── App.vue
│   ├── main.js
│   ├── logic	
│   ├── page
│   └── theme
└── vite.config.js
```

6. 到此项目结构基本搭建完成

## 第二步：创建项目开发文档

准备工具：vitepress文档生成器

操作步骤：

1. 进入docs目录下，执行命令`npm install vitepress vue -D`
2. 在docs目录下新建目录和配置文件`.vitepress/config.js`
3. 根据官网教程，配置导航栏、侧边栏内容
4. 在package.json文件中添加指令

```
"scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
```

4. 在docs目录下下添加index.md文件，添加内容
4. 执行`npm run docs:dev`，打开浏览器查看结果

## 第三步：配置项目开发依赖包

准备工具：nrm，npm

操作步骤：

1. 安装依赖包

| 项目依赖包    | 作用            |
| ------------- | --------------- |
| vuex          | 全局存储        |
| vue-router    | 前端路由        |
| element-plus  | ui组件          |
| axios         | ajax操作        |
| normalize.css | 重置默认css样式 |

| 开发依赖包              | 作用                     |
| ----------------------- | ------------------------ |
| mockjs                  | 生成随机数据，拦截ajax   |
| prettier                | 代码格式化               |
| unplugin-vue-components | 按需导入element-plus组件 |
| unplugin-auto-import    |                          |
| sass                    | css预处理器              |

## 第四步：配置vite构建工具

操作目标：vite.config.js

操作步骤：

1. 为/src路径添加别名
2. 配置自动导入element组件
