import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base:'',
  lang: 'zh-CN',  
  title: "Void",
  description: "",
  themeConfig: {
    logo: '/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/nav/index' },
      { text: 'Guide', link: '/guide/' },
			{
				text: 'Dropdown Menu',
				items: [
					{ text: 'Item A', link: '/item-1' },
					{ text: 'Item B', link: '/item-2' },
					{ text: 'Item C', link: '/item-3' },
				],
			},
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Voidxox' }
    ]
  }
})
