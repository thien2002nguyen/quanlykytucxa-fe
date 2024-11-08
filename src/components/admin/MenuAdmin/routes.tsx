import { RoleAdmin } from "@/store/auth-admin/auth-admin.type";
import {
  ShareAltOutlined,
  LineChartOutlined,
  ReadOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  role?: RoleAdmin;
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
        key: "gioi-thieu",
        label: "Quản lý giới thiệu",
      },
      {
        key: "don-gia",
        label: "Quản lý đơn giá ký túc xá",
      },
    ],
  },
  {
    key: "quan-ly-nhan-vien",
    icon: <ReadOutlined />,
    label: "Quản lý nhân viên",
    role: RoleAdmin.ADMIN,
  },
  {
    key: "quan-ly-sinh-vien",
    icon: <UserOutlined />,
    label: "Quản lý sinh viên",
    role: RoleAdmin.ADMIN,
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
