import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default {
  base:'/note',
  lang: 'zh-CN',  
  title: "Void",
  description: "",
  themeConfig: {
    logo: '/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'CODE-TEST', link: '/nav/' },
      { text: 'NOTE', link: '/guide/note' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Voidxox' }
    ]
  }
}