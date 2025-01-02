import { RoleAuth } from "@/store/auth/auth.type";
import {
  ShareAltOutlined,
  LineChartOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  InfoCircleOutlined,
  GroupOutlined,
  FormOutlined,
  FileSyncOutlined,
  WarningOutlined,
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
    icon: <UserOutlined />,
    label: "Quản lý tài khoản",
    role: RoleAuth.ADMIN,
  },
  {
    key: "quan-ly-sinh-vien",
    icon: <GroupOutlined />,
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
    key: "quan-ly-thong-tin",
    icon: <InfoCircleOutlined />,
    label: "Quản lý thông tin",
  },
  {
    key: "quan-ly-thong-tin-hop-dong",
    icon: <FormOutlined />,
    label: "Quản lý thông tin hợp đồng",
    items: [
      {
        key: "quan-ly-hop-dong",
        label: "Quản lý hợp đồng",
      },
      {
        key: "quan-ly-dieu-khoan-hop-dong",
        label: "Quản lý điều khoản hợp đồng",
      },
      {
        key: "quan-ly-loai-hop-dong",
        label: "Quản lý loại hợp đồng",
      },
    ],
  },
  {
    key: "quan-ly-hoa-don",
    icon: <FileSyncOutlined />,
    label: "Quản lý hóa đơn",
  },
  {
    key: "quan-ly-bao-cao-su-co",
    icon: <WarningOutlined />,
    label: "Quản lý báo cáo sự cố",
  },
];
