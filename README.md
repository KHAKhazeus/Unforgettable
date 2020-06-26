# Unforgettable

1750114 程子鸣

## 框架与部署情况

Unforgettable由一个todolist和sticker board组成，sticker board我称它为Memo。二者构成了完整的一个应用。

### 框架

- 前端：原生js与html

- 后端：node.js(koa) + sqlite

  golang(gin gonic) + mongodb

### 部署情况

由于域名gameshop.khakhazeus.cn之前注册没有备案，因此这次使用了纯ip访问，之后备案完成会再更新，目前可以用`ping gameshop.khakhazeus.cn`确认ip。（之后更换ip可能需要修改部分代码）

- 登录：http://116.62.106.18:3000/login.html

- 注册：http://116.62.106.18:3000/register.html

- Unforgettable-todolist：http://116.62.106.18:3000/todo.html

- Memo：http://116.62.106.18:3000/memo.html

- 网上参考css艺术品：http://116.62.106.18:3000/eyes.html和http://116.62.106.18:3000/diary.html

- 色彩选择（参考网上艺术设计）：http://116.62.106.18:3000/palette.html

- 后端：http://116.62.106.18:3000/ 主要负责静态和todolist

  http://116.62.106.18:8080/memo/主要负责Memo

  没使用80端口是因为其他项目nginx占用了80端口

### Github仓库

https://github.com/KHAKhazeus/Unforgettable

## 基本功能

1. 新增任务
2. 删除任务
3. 展现任务并持久化
4. 全部完成按钮，支持取消
5. 可以删除已完成的任务
6. 保存页面状态，刷新后恢复

## 高级功能

1. 登录/注册和登出
2. 不同用户有不同的任务，分开存储
3. jwt鉴权，完成自动authorization
4. 网上参考了一些css艺术品，实现美观跳转，跳转艺术品随机
5. 可收缩侧边栏
6. 支持任务分类
7. 可按分类进行过滤
8. 添加总分类
9. 任务添加时间选择，利用原生时间选择输入
10. 任务添加优先级
11. 优先级不同，任务颜色不同
12. “长按”单条任务可以编辑内容
13. 统计页面完成和未完成数量，以及百分比
14. 可按照状态过滤
15. “向左滑动”为删除，去除点击删除方式
16. 可以更换主题颜色，并且色调不突兀
17. 增加实现了todolist的兄弟应用便签板“Memo”
18. 可以创建便签
19. 创建的便签可以手动输入hex color更改颜色
20. 便签内容分为title和content
21. 便签可以再页面中随意拖动
22. 拖动后的位置会实时记录
23. 长按便签可以弹出窗口展示具体便签内容
24. 长按后按×按钮可以删除便签
25. Memo总结页面，参考网上实现的Paypal结账动画，增加美观度
26. 总结页面使用gin gonic template引擎实现动态生成（非js控制，多样实现）
27. 后端采用两种语言实现，node.js的koa框架+sqlite，以及golang + gin gonic框架+mongodb，解决了CORS访问的问题，两个框架的出发点在于想体验一下node.js写后端的感觉，go的框架在做另一个课程项目的时候已经有大致的框架，主要更改了接口内容和背后数据库。
28. 代码有模块的拆分，拆分出了querySelector和异步ajax请求作为工具模块

## 功能演示

![result](https://github.com/KHAKhazeus/Unforgettable/raw/master/md-image/result.gif)

## 给老师的留言

徐老师好：

这半个学期辛苦您了。在学校里面能有阿里工程师为我们上课时一件非常荣幸的事情，同时我也在课上学会了很多前端的基础性知识。虽然我本身给自己定位是后端开发。但在项目中使用node.js开发完之后，我发现与语言无关，在设计角度上有很多东西都是共通的。后端的难点在于优化和并发，而前端的难点，在于细节。前端会有很多原理叠加产生一种意想不到的效果，但去反推一个效果背后的起因就是一个技术性很高的问题，这是我在做项目debug过程中深有感触的一件事。

可能前半个学期中，梁老师向我们教授了基本的js,css和html的语法，但那个时候我写出来的代码可能会比较杂乱。现在尽管也有类似的问题存在，但我慢慢开始学会模仿后端的手法去为前端的代码划分框架。我觉得我的过渡算是慢的，其实一开始就应该意识到自己并不应该因为语言而抛弃了之前的一些经验。

这次的项目中有很多地方为了美化参考了网上的css实现，这更让我感受到了前端开发的创造性和潜在的难度。一种逻辑在js上可能会有很多种处理方式，选择一种最不会为自己挖坑的就成为了一种内在修养。

总的来说，我个人觉得自己在这门课的后半段在前端的开发上还是发生了一次蜕变的。老师的课让我受益匪浅。当然我也会在未来的路上继续探索前端上的技术。

谢谢老师！

## 实现参考

- 艺术品：https://codepen.io/akzhy/pen/YdbYbj

  https://codepen.io/mike-schultz/pen/evKWYb

  https://codepen.io/mmadeira/pen/wWzrwd

- Color Palette：https://codepen.io/giana/pen/BoWoQR

- 提供思路，实现由我来完善：

  https://codepen.io/supah/details/ZWGJeR

  https://codepen.io/danny8881/pen/YGzXAx

- 原型：http://luics.com/web-dev/zh-hans/data/memory.html



