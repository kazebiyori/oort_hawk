export default {
  title: "主页",
  description: "Just playing around.",
  themeConfig: {
    nav: [
      { text: "技术规范", link: "/standards/项目结构" },
      { text: "开发日志", link: "/blog/22-08-07" },
      { text: "会议记录", link: "/meeting/22-08-08" },
      // {
      //   text: "Dropdown Menu",
      //   items: [
      //     { text: "Item A", link: "/item-1" },
      //     { text: "Item B", link: "/item-2" },
      //     { text: "Item C", link: "/item-3" },
      //   ],
      // },
    ],
    sidebar: {
      "/standards/": [
        {
          text: "技术规范",
          // collapsible: true,
          items: [
            { text: "项目结构", link: "/standards/项目结构" },
            { text: "技术选型", link: "/standards/技术选型" },
          ],
        },
      ],
      "/blog/": [
        {
          text: "8月",
          items: [
            { text: "从零开始的前端项目开发", link: "/blog/22-08-06" },
            { text: "22-08-07", link: "/blog/22-08-07" },
            { text: "22-08-08", link: "/blog/22-08-08" },
            { text: "22-08-09", link: "/blog/22-08-09" },
            { text: "22-08-10", link: "/blog/22-08-10" },
            { text: "22-08-11", link: "/blog/22-08-11" },
            { text: "22-08-15", link: "/blog/22-08-15" },
            { text: "22-08-17", link: "/blog/22-08-17" },
          ],
        },
      ],
      "/meeting/": [
        {
          text: "8月",
          items: [{ text: "22-08-08", link: "/meeting/22-08-08" }],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/littleroot-town/front-end-project",
      },
      // { icon: "slack", link: "..." },
    ],
    footer: {
      message: "项目组前端团队开发",
      copyright: "Copyright © 2022-present",
    },
  },
};
