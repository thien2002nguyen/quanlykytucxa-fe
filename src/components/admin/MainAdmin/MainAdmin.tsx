"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  Avatar,
  ConfigProvider,
  Flex,
  Form,
  Image,
  Input,
  List,
  message,
  Modal,
  Popover,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { adminRoutes } from "../MenuAdmin/routes";
import { logout } from "@/store/auth/auth.reducer";
import { UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import MenuAdmin from "../MenuAdmin/MenuAdmin";
import "./style.scss";
import { toast } from "react-toastify";
import { RoleAuth } from "@/store/auth/auth.type";
import { themeAntdAdmin } from "@/config/theme";
import { ParameterChangePasswordByUser } from "@/store/users/users.type";
import { v4 as uuidv4 } from "uuid";
import { changePasswordByUserAction } from "@/store/users/users.action";

interface ListItem {
  key: string;
  title: string;
  onClick: () => void;
  isNoResponsive?: boolean;
}

const MainAdmin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isLoginPage = pathname.includes("admin/dang-nhap");
  const [formRef] = Form.useForm<ParameterChangePasswordByUser>();
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useAppSelector((state) => state.authSlice);

  const [isClickAuth, setIsClickAuth] = useState<boolean>(false);
  const [showInfomationAccount, setShowInfomationAccount] =
    useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] =
    useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [pageLabel, setPageLabel] = useState<string>("");
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    if (!isClient) {
      if (!user._id || (user && user.role === RoleAuth.STUDENT)) {
        dispatch(logout());
        router.push("/admin/dang-nhap");
        return;
      }
    }
  }, [isClient, user]);

  useEffect(() => {
    if (user.avatar) {
      setAvatarSrc(user.avatar);
    }
  }, [user.avatar]);

  // Cập nhật label dựa trên pathname
  useEffect(() => {
    const label = findLabelByPath(adminRoutes, pathname) || "Thống kê";
    setPageLabel(label);
  }, [pathname]);

  // loading xong thì trả về dữ liệu
  useEffect(() => {
    setIsClient(false);
  }, []);

  // Hàm để tìm label tương ứng với key từ pathname
  const findLabelByPath = (routes: any[], path: string): string | undefined => {
    for (const route of routes) {
      if (route.key && path.includes(route.key)) {
        if (route.items) {
          // Kiểm tra trong items nếu có
          const labelItemRoute = findLabelByPath(route.items, path);

          if (labelItemRoute) {
            return labelItemRoute;
          }
        } else {
          return route.label;
        }
      }
    }
  };

  const menuList: ListItem[] = [
    {
      key: uuidv4(),
      title: "Trang chủ",
      onClick: () => {
        setIsClickAuth(false);
        window.open("/", "_blank");
      },
    },
    {
      key: uuidv4(),
      title: "Thông tin tài khoản",
      onClick: () => {
        setIsClickAuth(false);
        setShowInfomationAccount(true);
      },
    },
    {
      key: uuidv4(),
      title: "Đổi mật khẩu",
      onClick: () => {
        setIsClickAuth(false);
        setShowChangePassword(true);
      },
    },
    {
      key: uuidv4(),
      title: "Đăng xuất",
      onClick: () => {
        // Hiển thị thông báo
        toast.success("🦄 Đăng xuất thành công.", { autoClose: 2000 });

        // Delay 2 giây rồi logout
        setTimeout(() => {
          setIsClickAuth(false);
          dispatch(logout());
          router.push("/truy-cap");
        }, 2000);
      },
    },
  ].filter(Boolean) as ListItem[];

  const handleSubmit = async () => {
    setIsChangePasswordLoading(true);

    const response: any = await dispatch(
      changePasswordByUserAction({
        oldPassword: formRef.getFieldValue("oldPassword"),
        newPassword: formRef.getFieldValue("newPassword"),
      })
    );

    if (response.payload?.error) {
      messageApi.error(response.payload?.error);
    } else {
      messageApi.success("Thay đổi mật khẩu thành công.");
      handleCancel();
    }

    setIsChangePasswordLoading(false);
  };

  const handleCancel = () => {
    formRef.resetFields();
    setShowChangePassword(false);
  };

  // Nếu đang loading thì không render gì
  if (isClient) {
    return null;
  }

  return (
    <ConfigProvider theme={themeAntdAdmin}>
      {isLoginPage ? (
        children
      ) : (
        <>
          {contextHolder}

          {user._id && user.role !== RoleAuth.STUDENT ? ( // Chỉ render nội dung nếu đã đăng nhập
            <div className="main-admin-wrapper">
              {/* Menu Admin Wrapper */}
              <div className="menu-wrapper">
                <MenuAdmin />
              </div>

              {/* Content Wrapper */}
              <div className="content-wrapper">
                <div className="header">
                  <Flex align="center" gap={8}>
                    <Image
                      width={40}
                      height={40}
                      src="/images/favicon.ico"
                      preview={false}
                    />
                    <Title level={3} style={{ marginBottom: 0 }}>
                      {pageLabel}
                    </Title>
                  </Flex>

                  <Popover
                    content={
                      <List
                        size="small"
                        dataSource={menuList}
                        renderItem={(item) => (
                          <List.Item
                            key={item.key}
                            onClick={item.onClick}
                            style={{ cursor: "pointer", userSelect: "none" }}
                          >
                            {item.title}
                          </List.Item>
                        )}
                      />
                    }
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode}
                    arrow={false}
                    placement="bottomRight"
                    open={!!isClickAuth}
                    onOpenChange={() => setIsClickAuth(!isClickAuth)}
                  >
                    <Flex
                      align="center"
                      gap={4}
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => setIsClickAuth(!isClickAuth)}
                    >
                      <Avatar
                        src={avatarSrc}
                        icon={!avatarSrc && <UserOutlined />}
                        size={30}
                        className="avatar"
                      />
                      <span className="user-name">
                        {user.userName?.length > 10
                          ? `${user.userName?.slice(0, 10)}...`
                          : user.userName}
                      </span>
                    </Flex>
                  </Popover>
                </div>
                <div className="content">
                  <div className="layout-content">{children}</div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Không render gì nếu chưa đăng nhập */}

          <Modal
            title="Thông tin tài khoản"
            footer={false}
            open={showInfomationAccount}
            onCancel={() => setShowInfomationAccount(false)}
            centered
          >
            <Form
              name="form-infomation-user"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item label="Tên đăng nhập">
                <Input value={user.userName} disabled />
              </Form.Item>

              <Form.Item label="Email">
                <Input value={user.email} disabled />
              </Form.Item>

              <Form.Item label="Số điện thoại">
                <Input value={user.phoneNumber} disabled />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Đổi mật khẩu"
            okText="Lưu"
            cancelText="Hủy"
            open={showChangePassword}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={isChangePasswordLoading}
            centered
          >
            <Form
              name="form-change-password"
              initialValues={{ remember: true }}
              autoComplete="off"
              layout="vertical"
              form={formRef}
            >
              <Form.Item
                name="oldPassword"
                label="Mật khẩu cũ"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="requirePassword"
                label="Xác nhận mật khẩu"
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </ConfigProvider>
  );
};

export default MainAdmin;
