# 前端代码规范

## 文件命名规范

### 项目命名

全部使用小写， 以中划线分隔。

```
ts-tsct-core-scmw-web
```

### 目录和文件命名

全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数。不能使用汉字和拼音命名。

```
images
utils
img
msg
page-loadint.vue
shoping-card.vue
```

注意： 杜绝完全不规范的缩写，避免望文不知义：

比如： AbstractClass“缩写”命名成 AbsClass；condition“缩写”命名成 condi，此类随意缩写严重降低了代码的可阅读性。

## HTML规范

**html和vue 模板规范一样**

### 团队规定

- 统一使用 HTML5 的文档声明
- 规定字符编码
- IE 兼容模式
- 规定字符编码
- 元素及标签闭合
- HTML标签名、类名、标签属性和大部分属性值统一用小写
- 使用html5语义化标签
- 不需要为 CSS、JS 指定类型属性，HTML5 中默认已包含
- 元素属性值使用双引号语法，元素属性值可以写上的都写上
- 代码缩进， 统一使用两个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）
- 单行注释单占一行。
- 模块注释，标记开始和结束位置。(注释内容前后各一个空格字符， 表示模块开始， 表示模块结束，模块与模块之间相隔一行)

```
<!DOCTYPE html>
<html lang="en_us">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="UTF-8" />
    <title>Page title</title>
    <!-- 注意：这里不用指定 type 属性 -->
    <link rel="stylesheet" href="" >
    <script src=""></script>
  </head>
  <body>
    <header>
      <h1>我是h1标题</h1>
      <p>我是一段文字，我有始有终，浏览器能正确解析</p>
    </header>
    <br>
    <div class="demo" data-name="user-name"></div>
    <!-- Comment Text -->
    <div>...</div>
    <!-- S Comment Text A -->
    <section class="mod_a">
      ...
    </section>
    <!-- E Comment Text A -->
    <!-- S Comment Text B -->
    <article class="mod_b">
    ...
    </article>
    <!-- E Comment Text B -->
    <img src="images/company-logo.png" alt="Company" />
  </body>
</html>
```

## 样式规范

我们约定

- 统一使用两个空格进行代码缩进
- 样式文件必须写上 @charset 规则，并且一定要在样式文件的第一行首个字符位置开始写，编码名用 “UTF-8”
- id、类名、scss 中的变量、函数、混合、占位符等均使用小写以中划线分隔
- 选择器使用直接子选择器
- 尽量使用缩写属性
- 每个选择器及属性独占一行
- css属性值需要用到引号时，统一使用单引号
- 避免使用ID选择器及全局标签选择器防止污染全局样式
- 单行注释,注释内容第一个字符前有个空格
- 模块注释,注释内容开头用: scss-docs-start + description 结束: scss-docs-end + description
- scss 抽离变量，方便复用
- 运算规范: 运算符之间空出一个空格
- 出现可能不调用的样式代码，请用占位符选择器(%)
- /deep/ 这个选择器，只有chrome支持。 禁止使用

```
@charset "UTF-8";
/**
 * @desc File Info
 * @author Author Name
 * @date 2020-10-12
 */
.dropup,
.dropright,
.dropdown,
.dropleft {
  position: relative;
  > .dropdown-toggle {
      white-space: nowrap;
    }
}
$dropdown-color: #333;
@mixin border-radius {
  border-radius: 50%;
}
@mixin icon($x:0, $y:0) {
  background: url(/img/icon.png) no-repeat $x, $y;
}
// The dropdown menu
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  background-clip: padding-box;
  border: 1px solid red;
  box-shadow: 1px 1px 1px $dropdown-color,2px 2px 2px $dropdown-color;
  font-family: 'Hiragino Sans GB'; // please use ''
  @include border-radius();
  > .title {
    @include icon(20px, 30px);
    color: red;
  }
}
@function px-to-rem($px) {
  @return $px / 10 * 1rem;
}
.body {
  font-size: px-to-rem(20px);
}
// 可能会用不到
%body-box {
  box-sizing: border-box;
}
.content-boxsize {
  @extend %body-box;
}
// scss-docs-start responsive-breakpoints
@each $breakpoint in map-keys($grid-breakpoints) {
  @include media-breakpoint-up($breakpoint) {
    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);
    .dropdown-menu#{$infix}-left {
      right: auto;
      left: 0;
    }
    .dropdown-menu#{$infix}-right {
      right: 0;
      left: auto;
    }
  }
}
// scss-docs-end responsive-breakpoints
```

## JS代码规范

### 命名规范

- 方法名、参数名、成员变量、局部变量都统一使用小写驼峰命名(lowerCamelCase)
- 其中方法名/函数名 必须使用 动词 或者 动词 + 名词
- 增删改查，详情统一使用 以下 5 个单词，不能使用其它(统一各个项目，统一各端)
- 常量命名全部大写，单词间用下划线隔开,力求语义表达完整清楚，不要嫌名字长。

```
add / **delete** / **update** / **get**/ detail
localValue / getHttpMessage() / inputUserId
MIN_NMDE_LENGTH / MAX_AGE
```

### 代码格式

- 统一使用 2 个空格进行缩进

```
if (x < y) {
  x ++;
} else {
  y ++;
}
```

- 不同逻辑、不同语义、不同业务的代码之间插入一个空行分隔开来以提升可读性。

> 说明：任何情形，没有必要插入多个空行进行隔开。

- 字符串必须使用('), 不能使用(")，好处多多。

> 输入的时候少按一个shift键，省点事 创建html 字符串的时候比较省事

```
let testDiv = '<**div** class="box"></**div**>'
```

- 对所有引用使用 const, 不要使用 var, 如果引用可变，则使用 let
- 使用字面值创建对象(业界都这么干)，不要使用保留字或者关键字作为对像的键值

```
// 以下是错误示范
const init = {
  package: 'com.sf',
  default: 1,
  break: 'abc'
}
```

- 必须优先使用 ES6,7 中新增的语法糖和函数

> 必须强制使用 ES6, 及 ES6+ 的新语法，比如箭头函数、await/async ， 解构， let ， for…of 等等

- 当代码块只有一行时，必须使用 {}

```
if (true) { // 此括号要保留
  doSth();
}
```

- 使用 class, 避免直接操作 prototype，类名首字母必须大写

```
class Queue {
  constructor (contents = []) {
    this._queue = [...contents]
  }
  pop () {
    const value = this._queue[0]
    this._queue.splice(0, 1)
    return value
  }
}
```

- 模块化使用标准的 ES6 模块语法 import 和 export, 不要使用import 的通配符 *
- 不要使用 iterators 请使用: forEach, map, some, find, includes, reduce 等函数
- 操作符前后都需要添加空格
- 禁止使用 eval(), with() 方法
- JSON 对象中的拖尾逗号禁止使用

## VUE 项目规范

### vue 编码规范

- 组件名由大于等于2个单词，且命名为大写驼峰命名(KebabCase)格式
- 常量命名规范和javascript一下使用大写加(_)的方式，建议使用vue-enum维护全局常量

> vue-enum : https://www.npmjs.com/package/vue-enum

- 基础组件文件名为 base 开头，使用完整单词而不是缩写

```
base-button.vue
base-table.vue
base-icon.vue
```

- 和父组件紧密耦合的子组件应该以父组件名作为前缀命名

```
user-list.vue
user-list-item.vue
user-list-item-update.vue
```

- 在 Template 模版中使用组件，应使用大写驼峰模式，并且使用自闭合组件。

```
<MyComponent />
<Row><table :column="data"/></Row>
```

- Prop 定义应该尽量详细，必须使用驼峰命名，必须指定类型，必须加上注释，必须加上required 或者 default,如果业务需要必须加上 validator验证
- 组件样式设置作用域

```
<template>
  <button class="btn btn-close">X</button>
</template>
<!-- 使用 `scoped` 特性 -->
<style scoped>
  .btn-close {
    background-color: red;
  }
</style>
```

- 如果组件属性特别多，要主动换行，一行属性个数最多为4个

```
<MyComponent foo="a" bar="b" baz="c" foo="a"
  bar="b" baz="c" foo="a" bar="b"
  baz="c"
 />
```

- 模板中使用简单的表达式， 复杂的表达式应该使用计算属性或者方法

> 因为计算属性和方法可以重用

- 标签顺序保持一致， 我们约定单个文件中标签的顺序应该是 template,script,style

```
<template>...</template>
<script>...</script>
<style>...</style>
```

- 必须为 v-for 设置键值 key
- script 标签内部结构顺序

> components > props > data > computed > watch > filter > 钩子函数（钩子函数按其执行顺序） > methods

- 页面跳转数据传递使用路由参数

> 参数不用vuex维护的原因是：当页面刷新的时候，vuex维护的数据会丢失

```
let id = ' 123';
this.$router.push({ name: 'userCenter', query: { id: id } });
```

- 使用路由懒加载（延迟加载）机制
- vue-router中 path 命名请 小写单词 + '-' (kebab-case) 的命名规范，尽量和vue文件的目录结构保持一致
- name 属性大写驼峰命名

> 这是因为keep-alive特性是按照component的name名称缓存的，所以两者一定要操持一致

```
export const router = {
  path: '/loading-user-list',
  name: 'LoadingUserList',
  components: () => import('./views/loading-user-list.vue')
}
```

### Vue 项目目录规范

```
src                               源码目录
|-- api                              所有api接口
|-- assets                           静态资源，images, icons, styles等
|-- components                       公用组件
|-- config                           配置信息
|-- constants                        常量信息，项目所有Enum, 全局常量等
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- datas                            模拟数据，临时存放
|-- lib                              外部引用的插件存放及修改文件
|-- mock                             模拟接口，临时存放
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- themes                           自定义样式主题
|-- views                            视图目录
|   |-- role                             role模块名
|   |-- |-- role-list.vue                    role列表页面
|   |-- |-- role-add.vue                     role新建页面
|   |-- |-- role-update.vue                  role更新页面
|   |-- |-- index.scss                      role模块样式
|   |-- |-- components                      role模块通用组件文件夹
|   |-- employee                         employee模块
```