module.exports = {
  title: 'vue-project-template',
  description: 'vue 项目模板',
  themeConfig: {
    theme: 'reco',
    type: 'blog',
    logo: '/img/logo.png',
    sidebar: 'auto',
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    repo: 'vuejs/vuepress',
    repoLabel: 'vuepress',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    smoothScroll: true,
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'cli', link: '/cli' },
      { text: 'rule', link: '/rule' }
    ]
  },
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/nprogress'
  ]
};
