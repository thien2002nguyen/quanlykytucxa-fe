import {
  ShareAltOutlined,
  LineChartOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  items?: MenuItem[];
}

export const adminRoutes: MenuItem[] = [
  {
    key: "thong-ke",
    icon: <LineChartOutlined />,
    label: "Thống kê",
  },
  {
    key: "thong-tin",
    icon: <ShareAltOutlined />,
    label: "Thông tin",
    items: [
      { key: "quan-ly-banner", label: "Quản lý banner" },
      {
        key: "quan-ly-thong-tin-cong-khai",
        label: "Quản lý thông tin công khai",
      },
      {
        key: "kho-luu-tru",
        label: "Kho lưu trữ",
      },
    ],
  },
  {
    key: "quan-ly-sinh-vien",
    icon: <UserOutlined />,
    label: "Quản lý sinh viên",
  },
  {
    key: "cai-dat",
    icon: <SettingOutlined />,
    label: "Cài đặt",
    items: [
      {
        key: "thong-tin-tai-khoan",
        label: "Thông tin tài khoản",
      },
      { key: "doi-mat-khau", label: "Đổi mật khẩu" },
    ],
  },
];
