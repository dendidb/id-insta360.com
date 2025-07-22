import { ThemeConfig } from "antd";

export const insta360Theme: ThemeConfig = {
  token: {
    colorPrimary: "#FFCB05",
    colorLink: "#373737",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    borderRadius: 2,
  },
  components: {
    Button: {
      primaryColor: "#000000",
      defaultBorderColor: "#EEEEEE",
      defaultColor: "#333333",
      borderRadius: 2,
      controlHeight: 32,
    },
    Card: {
      colorBorderSecondary: "#F0F0F0",
      boxShadowTertiary: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
    Menu: {
      itemHeight: 48,
      itemSelectedBg: "rgba(0, 0, 0, 0.05)",
      itemSelectedColor: "#000000",
      horizontalItemHoverColor: "#000000",
      horizontalItemSelectedColor: "#000000",
      itemBg: "rgba(0, 0, 0, 0)",
      boxShadow: "none",
      horizontalItemBorderRadius: 0,
    },
  },
};