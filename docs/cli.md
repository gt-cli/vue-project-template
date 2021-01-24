## 一、必备模块

我们先从大家众所周知的 `vue-cli` 入手,先来看看他用了哪些`**npm` 包**来实现的

- **commander** ：参数解析 `--help` 其实就借助了他~
- **inquirer** ：交互式命令行工具，有他就可以实现命令行的选择功能
- **download-git-repo** ：在 `git` 中下载模板
- **chalk** ：粉笔帮我们在控制台中画出各种各样的颜色
- **metalsmith** ：读取所有文件,实现模板渲染
- **consolidate** ：统一模板引擎

先幻想下要实现的功能:

根据模板初始化项目 `gt-cli create project-name`

初始化配置文件 `gt-cli config set repo repo-name`



## 二、工程创建

### 初始化项目

```
npm init -y # 初始化package.json
npm install eslint husky --save-dev # eslint是负责代码校验工作,husky提供了git钩子功能
npx eslint --init # 初始化eslint配置文件
```

![image.png](https://cdn.nlark.com/yuque/0/2021/png/738210/1610981738462-50f7ce37-a33a-48d9-af44-b01282e83a2d.png)

### 创建文件夹

```
├── bin
│   └── gt  // 全局命令执行的根文件
├── package.json
├── src
│   ├── main.js // 入口文件
│   └── utils   // 存放工具方法
│── .huskyrc    // git hook
│── .eslintrc.json // 代码规范校验
```



### eslint配置

配置 `package.json`  校验 `src` 文件夹下的代码

```
"scripts": {
    "lint":"eslint src"
}
```



### 配置husky

当使用git提交前校验代码是否符合规范

```
.huskyrc
{
  "hooks": {
    "pre-commit": "npm run lint"
  }
}
```



### 链接全局包

设置在命令下执行gt-cli时调用bin目录下的gt文件

```
package.json
"bin": {
  "gt-cli": "./bin/www",
  "gt": "./bin/www"
}
```



gt文件中使用main作为入口文件，并且以node环境执行此文件

```
bin/gt
#! /usr/bin/env node
require('../src/main.js');
```



链接包到全局下使用

```
npm link
```



我们已经可以成功的在命令行中使用`gt-cli`命令，并且可以执行 `main.js` 文件！



## 三、解析命令行参数

**commander:The complete solution for node.js command-line interfaces**

commander,commander可以自动生成help，解析选项参数！

像这样 `vue-cli --help!`

像这样 `vue-cli create <project-namne>`



### 使用commander

```
npm install commander
```



main.js就是我们的入口文件

```
src/main.js
const program = require('commander');
program.version('0.0.1')
  .parse(process.argv); // process.argv就是用户在命令行中传入的参数
```



执行`gt-cli --help` 是不是已经有一提示了!

这个版本号应该使用的是当前cli项目的版本号，我们需要动态获取，并且为了方便我们将常量全部放到util下的`constants`文件夹中

```
src/utils/constants.js
const { name, version } = require('../../package.json');
module.exports = {
  name,
  version,
};
```



这样我们就可以**动态获取版本号**了

```
src/main.js
const program = require('commander');
const { version } = require('./utils/constants');
program.version(version)
  .parse(process.argv);
```



### 配置指令命令

根据我们想要实现的功能配置执行动作，遍历产生对应的命令

```
src/main.js
/* eslint-disable no-undef */
const program = require('commander');
const { version } = require('./utils/constants');

// 创建模板
program
  .command('create <project-name>') // 命令名称
  .description('create a new project') // 命令的描述
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, cmd) => { // 动作
    console.log(name, cmd)
  })
  .alias('cr') // 命令的别名

// 配置配置文件
program
  .command('config [value]') // 命令名称
  .description('inspect and modify the config') // 命令的描述
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>', 'set value to config')
  .option('-d, --delete <path>', 'delete option from config')
  .action((name, cmd) => { // 动作
    console.log(name, cmd)
  })
  .alias('c') // 命令的别名

program
  .command('*') // 命令名称
  .description('command not found') // 命令的描述

// 版本
program.version(`gt-cli @${version}`)
  .usage(`<command> [option]`)

// 解析用户执行命令传入的参数
program.parse(process.argv);
```

### 编写help命令

监听help命令打印帮助信息



- 安装依赖

```
cnpm i chalk
src/main.js
const chalk = require('chalk');
program.on('--help', () => {
  console.log()
  console.log(`Run ${chalk.cyan('gt-cli <command> --help')} show details`);
  console.log()
});
```

## 四、create命令

create命令的主要作用就是去git仓库中拉取模板并下载对应的版本到本地，如果有模板则根据用户填写的信息渲染好模板，生成到当前运行命令的目录下~

```
src.main.js
// 创建模板
program
  .command('create <project-name>') // 命令名称
  .description('create a new project') // 命令的描述
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, cmd) => { // 动作
    require(path.resolve(__dirname, 'action', 'create'))(name, cmd);
  })
  .alias('cr') // 命令的别名
```



根据不同的动作，动态引入对应模块的文件

创建 `create.js` 

```
src/action/create.js
// 创建项目
module.exports = async (projectName, cmd) => {
  console.log(projectName, cmd);
};
```



执行`gt-cli create project`,可以打印出 `project`



### 拉取项目

我们需要获取仓库中的所有模板信息，我的模板全部放在了git上，这里就以git为例，我通过axios去获取相关的信息

```
npm i axios
```

1

这里借助下 `github` 的 [英文api](https://developer.github.com/v3/) （[中文api](https://docs.github.com/cn/rest)）

> 注意我们必须将代码放在一个组织下面才能获取到当前组织中的仓库信息。



```
src/action/create.js
const axios = require('axios');

// 获取仓库列表
const fetchRepoList = async() => {
  console.log(111)
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
  let { data } = await axios.get('https://api.github.com/orgs/gt-cli/repos')
  return data

}
// 创建项目
module.exports = async (projectName, cmd) => {
  let repos = await fetchRepoList();
  repos = repos.map(item => item.name)
  console.log(repos)
  console.log(projectName, cmd);
};
```

发现在安装的时候体验很不好没有任何提示,而且最终的结果我希望是可以供用户选择的！



### inquirer & ora

我们来解决上面提到的问题

```
npm i inquirer ora
```



```
src/action/create.js
// 创建项目
module.exports = async (projectName, cmd) => {
  const spinner = ora('fetching repo list');
  spinner.start(); // 开始loading
  let repos = await fetchRepoList();
  spinner.succeed(); // 结束loading
  // 选择模板
  repos = repos.map((item) => item.name);
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choice repo template to create project',
    choices: repos, // 选择模式
  });
  console.log(projectName, cmd);
  console.log(repo);
};
```



我们看到的命令行中选择的功能基本都是基于inquirer实现的，可以实现不同的询问方式



### 获取版本信息

和获取模板一样，我们可以使用 `github api` 获取。

```
src/action/create.js
// 获取所有tag
const fetchTagList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/gt-cli/${repo}/tags`)
  return data
}
// 创建项目
module.exports = async (projectName, cmd) => {
  let spinner = ora('fetching repo list');
  spinner.start(); // 开始loading
  let repos = await fetchRepoList();
  spinner.succeed(); // 结束loading
  // 选择模板
  repos = repos.map((item) => item.name);
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choice repo template to create project',
    choices: repos, // 选择模式
  });

  // 获取版本信息
  spinner = ora(`fetching ${repo} tags`);
  spinner.start();
  let tags = await fetchTagList(repo);
  // 选择版本
  tags = tags.map(item => item.name);
  const { tag } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: `please choice ${repo} template to create project`,
    choices: tags
  })
  console.log(projectName, cmd);
  console.log(tag);
};
```



我们发现每次都需要去开启loading、关闭loading，重复的代码当然不能放过啦！我们来简单的封装下。

```
src/utils/common.js
// 格式化参数
const formatArgs = (cmd) => {
  const args = {}
  cmd.options.forEach(o => {
    console.log(o.long, cmd.force)
    const key = o.long.slice(2);
    if(cmd[key]) args[key] = cmd[key];
  })
  return args;
}

// 加载动画
const ora = require('ora');
const wrapFetchAddLoading = (fn, message) => async(...args) => {
  const spinner = ora(message);
  spinner.start(); // 开始loading
  const r = await fn(...args);
  spinner.succeed(); // 结束loading
  return r
}
module.exports = {
  formatArgs,
  wrapFetchAddLoading
}
```



```
src/action/create.js
const axios = require('axios');
const Inquirer = require('inquirer');
const { wrapFetchAddLoading } = require( '../utils/common')

// 获取仓库列表
const fetchRepoList = async() => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
  let { data } = await axios.get('https://api.github.com/orgs/gt-cli/repos')
  return data

}
// 获取所有tag
const fetchTagList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/gt-cli/${repo}/tags`)
  return data
}
// 创建项目
module.exports = async (projectName, cmd) => {
  let repos = await wrapFetchAddLoading(fetchRepoList, 'fetching repo list')();
  // 选择模板
  repos = repos.map((item) => item.name);
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choice repo template to create project',
    choices: repos, // 选择模式
  });

  // 获取版本信息
  let tags = await wrapFetchAddLoading(fetchTagList, `fetching ${repo} tags`)(repo);
  // 选择版本
  tags = tags.map(item => item.name);
  const { tag } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: `please choice ${repo} template to create project`,
    choices: tags
  })
  console.log(projectName, cmd);
  console.log(tag);
};
```



### 下载项目

我们已经成功获取到了项目模板名称和对应的版本，那我们就可以直接下载啦！

```
npm i download-git-repo
```

1

很遗憾的是这个方法不是promise方法，没关系我们自己包装一下

```
src/action/create.js
const { promisify } = require('util');
const downLoadGit = require('download-git-repo');
downLoadGit = promisify(downLoadGit);
```



node中已经帮你提供了一个现成的方法，将异步的api可以快速转化成promise的形式

下载前先找个临时目录来存放下载的文件,来～继续配置常量

```
src/action/create.js
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`;
```



这里我们将文件下载到当前用户下的`.template`文件中,由于系统的不同目录获取方式不一样,`process.platform` 在 `windows` 下获取的是 `win32` 我这里是 `mac`  所有获取的值是 `darwin`,在根据对应的环境变量获取到用户目录

```
src/action/create.js
const download = async (repo, tag) => {
  let api = `zhu-cli/${repo}`; // 下载项目
  if (tag) {
    api += `#${tag}`;
  }
  const dest = `${downloadDirectory}/${repo}`; // 将模板下载到对应的目录中
  await downLoadGit(api, dest);
  return dest; // 返回下载目录
};
// 下载项目
const target = await wrapFetchAddLoding(download, 'download template')(repo, tag);
```



如果对于简单的项目可以直接把下载好的项目拷贝到当前执行命令的目录下即可。

安装`ncp`可以实现文件的拷贝功能

```
npm i ncp
```

1

像这样:

```
src/action/create.js
let ncp = require('ncp'); 
ncp = promisify(ncp);
// 将下载的文件拷贝到当前执行命令的目录下
await ncp(target, path.join(path.resolve(), projectName));
```



当然这里可以做的更严谨一些，判断一下当前目录下是否有重名文件等..., 还有很多细节也需要考虑像多次创建项目是否要利用已经下载好的模板，大家可以自由的发挥～

### 模板编译

刚才说的是简单文件，那当然直接拷贝就好了，但是有的时候用户可以定制下载模板中的内容，拿`package.json`文件为例，用户可以根据提示给项目命名、设置描述等

这里我在项目模板中增加了ask.js

```
module.exports = [
  {
    type: 'confirm',
    name: 'private',
    message: 'ths resgistery is private?',
  }
];
```

根据对应的询问生成最终的`package.json`

下载的模板中使用了`ejs`模板

```
{
  "name": "vue-template",
  "version": "0.1.2",
  "private": "<%=private%>",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "vue": "^2.6.10"
  },
  "autor":"<%=author%>",
  "description": "<%=description%>",
  "devDependencies": {
    "@vue/cli-service": "^3.11.0",
    "vue-template-compiler": "^2.6.10"
  },
  "license": "<%=license%>"
}
```



> 写到这里，大家应该想到了！核心原理就是将下载的模板文件，依次遍历根据用户填写的信息渲染模板，将渲染好的结果拷贝到执行命令的目录下



安装需要用到的模块

```
npm i metalsmith ejs consolidate
```



```
src/action/create.js
const MetalSmith = require('metalsmith'); // 遍历文件夹
let { render } = require('consolidate').ejs;
render = promisify(render); // 包装渲染方法

// 生成模板
const compiler = async (target, projectName) => {
  // 没有ask文件说明不需要编译
  if (!fs.existsSync(path.join(target, 'ask.js'))) {
    await ncp(target, path.join(path.resolve(), projectName));
  } else {
    await new Promise((resovle, reject) => {
      MetalSmith(__dirname)
        .source(target) // 遍历下载的目录
        .destination(path.join(path.resolve(), projectName)) // 输出渲染后的结果
        .use(async (files, metal, done) => {
          // 弹框询问用户
          const result = await Inquirer.prompt(require(path.join(target, 'ask.js')));
          const data = metal.metadata();
          Object.assign(data, result); // 将询问的结果放到metadata中保证在下一个中间件中可以获取到
          delete files['ask.js'];
          done();
        })
        .use((files, metal, done) => {
          Reflect.ownKeys(files).forEach(async (file) => {
            let content = files[file].contents.toString(); // 获取文件中的内容
            if (file.includes('.js') || file.includes('.json')) { // 如果是js或者json才有可能是模板
              if (content.includes('<%')) { // 文件中用<% 我才需要编译
                content = await render(content, metal.metadata()); // 用数据渲染模板
                files[file].contents = Buffer.from(content); // 渲染好的结果替换即可
              }
            }
          });
          done();
        })
        .build((err) => { // 执行中间件
          if (!err) {
            resovle();
          } else {
            reject();
          }
        });
    });
  }
}
```



> 这里的逻辑就是上面描述的那样，实现了模板替换！到此安装项目的功能就完成了，我们发现这里面所有用到的地址的路径都写死了，我们希望这是一个更通用的脚手架，可以让用户自己配置拉取的地址～



## 五、config命令

### config实现

新建config.js 主要的作用其实就是配置文件的读写操作，当然如果配置文件不存在需要提供默认的值，先来编写常量 `constants.js`的配置

```
src/utils/constants.js
const { name, version } = require('../../package.json');
const configFile = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.zhurc`; // 配置文件的存储位置
const defaultConfig = {
  repo: 'gt-cli', // 默认拉取的仓库名
};
module.exports = {
  name,
  version,
  configFile,
  defaultConfig
};
```

编写`config.js`

```
module.exports = (action, k, v) => {
  if (action === 'get') {
    console.log('获取', v);
  } else if (action === 'set') {
    console.log('设置', k, v);
  }
};
```

一般`rc`类型的配置文件都是`ini`格式也就是:

```
repo=gt-cli
register=github
```



下载 `ini` 模块解析配置文件

```
npm i ini
```



这里的代码很简单，无非就是文件操作了

```
const fs = require('fs');
const { encode, decode } = require('ini');
const { defaultConfig, configFile } = require('../utils/constants');

module.exports = (action, k, v) => {
  const flag = fs.existsSync(configFile);
  const obj = {};
  if (flag) { // 配置文件存在
    const content = fs.readFileSync(configFile, 'utf8');
    const c = decode(content); // 将文件解析成对象
    Object.assign(obj, c);
  }
  if (action === 'get') {
    console.log(obj[k] || defaultConfig[k]);
  } else if (action === 'set') {
    obj[k] = v;
    fs.writeFileSync(configFile, encode(obj)); // 将内容转化ini格式写入到字符串中
    console.log(`${k}=${v}`);
  } else if (action === 'getVal') { 
    return obj[k] || defaultConfig[k];
  }
};
```

### 配置指令命令

根据我们想要实现的功能配置执行动作，遍历产生对应的命令

```
src/main.js
/* eslint-disable no-undef */
const program = require('commander');
const { version } = require('./utils/constants');
const chalk = require('chalk');
const path = require('path');

// 创建模板
program
  .command('create <project-name>') // 命令名称
  .description('create a new project') // 命令的描述
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, cmd) => { // 动作
    require(path.resolve(__dirname, 'action', 'create'))(name, cmd);
  })
  .alias('cr') // 命令的别名

// 配置配置文件
program
  .command('config [value]') // 命令名称
  .description('inspect and modify the config') // 命令的描述
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>', 'set value to config')
  .option('-d, --delete <path>', 'delete option from config')
  .action((v, cmd) => { // 动作
    if(!cmd || cmd && Object.keys(cmd).keys().length === 0) return
    const a = Object.keys(cmd)[0]
    const k = cmd[a]
    require(path.resolve(__dirname, 'action', 'config'))(a, k, v);
  })
  .alias('c') // 命令的别名

program.on('--help', () => {
  console.log()
  console.log(`Run ${chalk.cyan('gt-cli <command> --help')} show details`);
  console.log()
});

program
  .command('*') // 命令名称
  .description('command not found') // 命令的描述

// 版本
program.version(`gt-cli @${version}`)
  .usage(`<command> [option]`)

// 解析用户执行命令传入的参数
program.parse(process.argv);
```

`getVal`这个方法是为了在执行 `create` 命令时可以获取到配置变量

```
const config = require('./config');
const repoUrl = config('getVal', 'repo');
const fetchRepoList = async() => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
  let { data } = await axios.get(`https://api.github.com/orgs/${repoUrl}/repos`)
  return data
}
```



这样我们可以将create方法中所有的`gt-cli`全部用获取到的值替换掉啦！

到此基本核心的方法已经ok！剩下的大家可以自行扩展啦！



## 六、项目发布

终于走到最后一步啦,我们将项目推送`npm`上,流程不再赘述啦！

```
# nrm是专门用来管理和快速切换私人配置的 registry 建议全局安装
# npm install nrm -g --save

nrm use npm
npm publish # 已经发布成功～～
```



可以通过`npm install gt-cli -g` 进行安装啦！