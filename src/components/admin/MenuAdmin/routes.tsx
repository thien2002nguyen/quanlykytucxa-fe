import { RoleAuth } from "@/store/auth/auth.type";
import {
  ShareAltOutlined,
  LineChartOutlined,
  ReadOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  BookOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  role?: RoleAuth;
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
    key: "quan-ly-tai-khoan",
    icon: <ReadOutlined />,
    label: "Quản lý tài khoản",
    role: RoleAuth.ADMIN,
  },
  {
    key: "quan-ly-sinh-vien",
    icon: <UserOutlined />,
    label: "Quản lý sinh viên",
  },
  {
    key: "quan-ly-thong-tin-phong",
    icon: <HomeOutlined />,
    label: "Quản lý thông tin phòng",
    items: [
      { key: "quan-ly-phong", label: "Quản lý phòng" },
      {
        key: "quan-ly-loai-phong",
        label: "Quản lý loại phòng",
      },
      {
        key: "quan-ly-day-phong",
        label: "Quản lý dãy phòng",
      },
      {
        key: "quan-ly-dich-vu-phong",
        label: "Quản lý dịch vụ phòng",
      },
    ],
  },
  {
    key: "quan-ly-tin-tuc",
    icon: <BookOutlined />,
    label: "Quản lý tin tức",
  },
  {
    key: "quan-ly-thong-bao",
    icon: <InfoCircleOutlined />,
    label: "Quản lý thông báo",
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
