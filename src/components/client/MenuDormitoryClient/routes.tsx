import {
  ContactsOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  FileSyncOutlined,
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
    key: "thanh-toan-hoa-don",
    icon: <FileSyncOutlined />,
    label: "Thanh toán hóa đơn",
  },
];
