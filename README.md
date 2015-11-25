## 为Rapid4j准备的AngularJS Admin前端

模版主题来自这里 [SB Admin v2.0](http://startbootstrap.com/template-overviews/sb-admin-2/).

Angular前端权限管理参考[这里](http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html)


## 快速体验
1. Clone项目或者下载ZIP压缩包
2. 确定自己已经全局(`-g`)安装了 [bower](http://bower.io/), [grunt-cli](https://www.npmjs.com/package/grunt-cli)和 [npm](https://www.npmjs.org/) 
3. 依次执行以下命令
- cd `project-directory`
- `npm install` - 事先要安装bower
- `npm start` - 等同于 `grunt serve`
- `npm run dist` - 等同于 `grunt serve:dist` ,压缩文件准备部署

## 路线图

- Angular权限控制
- Angular统一拦截器管理ajax调用
- 与Rapid4J集成

### 管理工具

- [Grunt](http://gruntjs.com/)
