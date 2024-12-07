import {
  HistoryOutlined,
  ContactsOutlined,
  CalendarOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  items?: MenuItem[];
}

export const dormitoryRoutes: MenuItem[] = [
  {
    key: "phong-ky-tuc-xa",
    icon: <AppstoreOutlined />,
    label: "Phòng ký túc xá",
  },
  {
    key: "dich-vu-phong",
    icon: <CalendarOutlined />,
    label: "Dịch vụ phòng",
  },
  {
    key: "hop-dong",
    icon: <ContactsOutlined />,
    label: "Hợp đồng",
  },
  {
    key: "lich-su-thanh-toan",
    icon: <HistoryOutlined />,
    label: "Lịch sử thanh toán",
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
