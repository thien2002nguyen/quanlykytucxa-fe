import { ThemeConfig } from "antd";

export const themeAntdClient: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: "#cd0101",
      colorPrimaryHover: "#d73737 ", // Màu nhạt hơn cho hover
      colorPrimaryActive: "#cd0101",

      colorLinkHover: "#d73737 ",
      colorLinkActive: "#cd0101",
      colorInfoTextActive: "#cd0101",
    },
    FloatButton: {
      colorPrimary: "#cd0101",
      colorPrimaryHover: "#d73737 ",
    },
    Input: {
      activeBorderColor: "#cd0101",
      hoverBorderColor: "#d73737 ",
      activeShadow: "#cd0101",
    },
    Tabs: {
      itemHoverColor: "#d73737 ",
      itemSelectedColor: "#cd0101",
      itemActiveColor: "#cd0101",
      inkBarColor: "#cd0101",
    },
    Spin: {
      colorPrimary: "#cd0101",
    },
  },
  hashed: false,
};

export const themeAntdAdmin: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: "#cd0101",
      colorPrimaryHover: "#d73737 ",
      colorPrimaryActive: "#cd0101",

      colorLinkHover: "#d73737 ",
      colorLinkActive: "#cd0101",
      colorInfoTextActive: "#cd0101",
    },
    FloatButton: {
      colorPrimary: "#cd0101",
      colorPrimaryHover: "#d73737 ",
    },
    Input: {
      activeBorderColor: "#cd0101",
      hoverBorderColor: "#d73737 ",
      activeShadow: "#d73737 ",
    },
    Tabs: {
      itemHoverColor: "#d73737 ",
      itemSelectedColor: "#cd0101",
      itemActiveColor: "#cd0101",
      inkBarColor: "#cd0101",
    },
    Spin: {
      colorPrimary: "#cd0101",
    },
    Pagination: {
      colorPrimary: "#cd0101",
      colorPrimaryHover: "#d73737 ",
      colorPrimaryActive: "#cd0101",
    },
  },
  hashed: false,
};
