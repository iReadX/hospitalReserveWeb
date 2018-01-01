# hospitalReserveWeb
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.2-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-2.7.2-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 功能

- 登录/登出
- 管理员
    - 列表
    - 增加
    - 修改
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 个人中心
- 系统信息

## 文件结构
```shell
.
├── build  项目构建配置
└── src
    ├── filters 过滤器
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── accounts  管理员
        ├── error_page  错误页面
        ├── home  首页
        │   ├── components  首页组件
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── number  手机号管理
        ├── own-space  个人中心
        ├── system  系统信息
        └── task  任务
```

## Links

- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)

Copyright (c) 2016-present, iView
