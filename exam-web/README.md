# 为考-考试平台

毕业设计：为考-考试系统，后端采用`Spring Cloud`，前端采用`Vue` 3，存储采用`Mysql`，缓存采用`Redis`。完成基本的考试功能。完成了遗传算法自动组卷、文本批量导入题库，邀请码加入课程、数据可视化等一系列前后端功能。悄悄的说一下，如果你觉得本项目还凑合，可以给个`Star` q(≧▽≦q)

## 说明

本项目为本人毕业设计，未经许可，不可用于任何商业用途。禁止通过该项目进行毕设项目买卖

第一次接触`SpringBoot`和`SpringCloud`，为了尽快的完成该项目，很多功能没有进行太多的规划和测试，代码逻辑较乱。只实现了主要功能,本来是想写个学习平台的.但是范围太大,不太好完成.所以就完成了其中的考试功能.

如果你想以本项目做毕设，我建议你可以以完成其他模块入手或者完成本项目没有完成的功能、待优化的功能，如后台管理、错题本，笔记。可以去体验下\*\*通，找找思路，不建议直接使用本项目，毕设应该自己去动动手，这将会是你那简历中挺好的一个经验吧\~。哎\~不过找工作还是好难找不到啊！找前端，哎，后端吧，东西太多记不住，其实我感觉就是人太多，投简历人家都看不见吧~，还有就是自己的基础不牢靠，会模仿着实现一些功能，但很多知识记不住啊！面向百度编程啊！

## 介绍

###  项目地址

#### 为考-考试平台-前端：

Gitee：[https://gitee.com/for-the-exam/exam-web](https://gitee.com/for-the-exam/exam-web)

Github：[https://github.com/baymaxsjj/exam-web](https://github.com/baymaxsjj/exam-web)

#### 为考-考试平台-后端：

Gitee：[https://gitee.com/for-the-exam/exam](https://gitee.com/for-the-exam/exam)

Github：[https://github.com/baymaxsjj/exam](https://github.com/baymaxsjj/exam)

#### 数据库数据填充工具：

专为此项目写的工具，为了给数据库填充点数据，好测试。其实也是为了毕设演示环节有更多的数据进行展示。测试和展示都很好用的工具，可以在你的项目上试试啊！

Gitee：[https://gitee.com/baymaxsjj/sqlmock](https://gitee.com/baymaxsjj/sqlmock) 

Github：[https://gitee.com/baymaxsjj/sqlmock](https://gitee.com/baymaxsjj/sqlmock)

### 系统截图

<table>
    <tr>
        <td><img src="./images/image-20221218155031704.png"/></td>
        <td><img src="./images/image-20221218151201308.png"/></td>
         <td><img src="./images/image-20221218151234715.png"/></td>
         <td><img src="./images/image-20221218151312869.png"/></td>
    </tr>
    <tr>
        <td><img src="./images/image-20230202111804.png"/></td>         
        <td><img src="./images/image-20221218151535396.png"/></td>
         <td><img src="./images/image-20221218151606964.png"/></td>
         <td><img src="./images/image-20221218151632484.png"/></td>
    </tr>
    <tr>
        <td><img src="./images/QQ截图20230202112741.png"/></td>
        <td><img src="./images/QQ截图20230202112753.png"/></td>
         <td><img src="./images/image-20221218152214509.png"/></td>
         <td><img src="./images/image-20221218152256006.png"/></td>
    </tr>
     <tr>
        <td><img src="./images/QQ截图20230222201506.png"/></td>
        <td><img src="./images/QQ截图20230314161322.png"/></td>
        <td><img src="./images/QQ截图20230314162657.png"/></td>
    </tr>
</table>


### 系统

- 框架：SpringBoot、SpringCloud、Mybatis Plus、WebSocket
- 数据库：Mysql
- 缓存：Redis
- 前端：Vue 3、Vite、Pinia、Arco UI

### 功能图

![为考考试系统-功能图](./images/为考-在线考试平台.png)

### E-R图

不知道画的对不对，记得上数据库实训的时候，给我那个博客画的E-R图，结果被老师训了一顿。到现在想起还有点害怕＞︿＜
![为考考试系统-E-R图](./images/系统E-R图.jpg)

### 完成功能

- [x] 创建课程、添加课程、班级码加入课程
- [x] 创建班级、查看班级用户、分享班级码
- [x] 课堂互相实时聊天
- [x] 创建题库、题库树形分类
- [x] 创建题目（单、多、判、填、主观）、修改题目选项
- [x] 创建试卷、修改试卷、手动组卷、遗传算法自动组卷
- [x] 创建考试、修改考试
- [x] 考试控制台、考试概览、老师批阅、数据统计、考试监控
- [x] 参加考试
- [x] 行为监控
- [x] 实时消息通知
- [x] 考试数据导出
- [x] 考生数据统计分析

# 为考-前端
## 功能说明
### 登录

由于注册功能使用的是邮箱注册登录，在本地测试下如果没有配置邮箱功能，就不能注册，如需测试使用，请使用：

```text
用户名：baymax  密码：s123456
用户名：Steven 密码：s123456
用户名：Scott ：密码：s123456
```

### 课程中心

主页面只有我的课程是完成的，我的作业 我的考试 我的笔记 消息那些功能都没写

### 个人中心

个人中心只完成信息的显示，没有实现信息的更改，

没有实现校园认证等功能

### 导入题库

导入格式：是学习通的题库导入格式，在本项目的doc下有一个测试题库，可以复制粘贴到导入题库测试。

格式说明：一定要保证格式正确，要不然不能识别。

```tex
序号、题目内容
字母、选项内容（可选）：
答案： 答案内容（多个答案用中文分号（；）分割）

例如：
选择题:
    27、程序状态字寄存器 PSW 中的 AC=1,表示( )。
    A、 计算结果有进位
    B、 计算结果有溢出
    C、 累加器 A 中的数据有奇数个 1
    D、 计算结果低 4 位向高位进位
    答案： D
填空题：
    20、总线路是用于传送信息的公共通信途径。总线可分为____、____和____。
    答案： 数据总线； 地址总线； 控制总线；

```

## 配置说明

根据实际环境，更改.env下的请求地址，如后台网关地址，图片资源地址

## 主题

如需更改主题，到下面的网站去制作主题，发布npm，然后把项目中的npm-`@arco-themes/vue-mgo-blog`包改了就行。
Arco UI:使用风格配置平台，轻松定制主题风格，从容应对各种业务需求。https://arco.design/themes

##  安装pnpm

```
npm install pnpm -g
```

##  安装依赖

```
pnpm install
```

## 运行项目

```
pnpm run dev
```

## 打包

```
//编译
pnpm run build 
```
## 待完善功能

- [ ] 通过定时器，在考试开始前将考试信息放入缓存，考试结束后将未提交的自动提交
- [ ] 自定义第三方登录
- [ ] 校园认证
- [ ] 后台管理功能