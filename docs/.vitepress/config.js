import { defineConfig } from 'vitepress'
import { nav } from "./utils/nav";
import { sidebar } from "./utils/sidebar";

export default {
  base:'',
  lang: 'zh-CN',  
  lastUpdated: true,
  title: "Void",
  description: "",
  themeConfig: {
    logo: '/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    lastUpdatedText: "最后更新时间",
    nav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Voidxox' }
    ],
    sidebar
  }
}