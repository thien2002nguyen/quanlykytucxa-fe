"use client";

import React, { useEffect, useState } from "react";
import MenuDormitoryClient from "../MenuDormitoryClient/MenuDormitoryClient";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Image,
  Input,
  List,
  message,
  Modal,
  Popover,
  Row,
} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import "./style.scss";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/auth/auth.reducer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { themeAntdClient } from "@/config/theme";
import { getInfomationStudentAction } from "@/store/students/students.action";
import { v4 as uuidv4 } from "uuid";
import { ParameterChangePasswordByUser } from "@/store/users/users.type";
import { changePasswordByUserAction } from "@/store/users/users.action";
import { RoleAuth } from "@/store/auth/auth.type";

interface ListItem {
  key: string;
  title: string;
  onClick: () => void;
  isNoResponsive?: boolean;
}

const DormitoryClient = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formRef] = Form.useForm<ParameterChangePasswordByUser>();
  const [messageApi, contextHolder] = message.useMessage();

  const { user } = useAppSelector((state) => state.authSlice);
  const { dataAuthMeStudent } = useAppSelector((state) => state.studentsSlice);

  const [isClient, setIsClient] = useState<boolean>(true);

  const [isClickAuth, setIsClickAuth] = useState<boolean>(false);
  const [showInfomationAccount, setShowInfomationAccount] =
    useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] =
    useState<boolean>(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsClient(false);
  }, []);

  useEffect(() => {
    if (!isClient && !user._id) {
      dispatch(logout());
      router.push("/truy-cap");
    }
  }, [dispatch, user._id, isClient]);

  useEffect(() => {
    dispatch(getInfomationStudentAction());
  }, [dispatch]);

  useEffect(() => {
    if (user.avatar) {
      setAvatarSrc(user.avatar);
    }
  }, [user.avatar]);

  const menuList: ListItem[] = [
    // Kiểm tra nếu user là Admin hoặc Moderator
    (user?.role === RoleAuth.ADMIN || user?.role === RoleAuth.MODERATOR) && {
      key: uuidv4(),
      title: "Trang quản trị",
      onClick: () => {
        setIsClickAuth(false);
        window.open("/admin", "_blank");
      },
      isNoResponsive: true,
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

  if (isClient) {
    return null;
  }

  return (
    <ConfigProvider theme={themeAntdClient}>
      <>
        {user._id ? (
          <>
            {contextHolder}

            <div className="wrapper-dormitory">
              <div className="wrapper-dormitory-head">
                <div className="header-left">
                  <Button
                    href="/"
                    type="text"
                    icon={<HomeOutlined />}
                    className="home-button"
                  />
                  <Link href="/">
                    <Image
                      src="/images/favicon.ico"
                      width={30}
                      height={30}
                      preview={false}
                    />
                  </Link>
                  <h1>Ký túc xá DAU</h1>
                </div>

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
                          className={`custom-list-item-header ${
                            item.isNoResponsive ? "hidden" : ""
                          }`}
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

              <div className="wrapper-dormitory-container">
                <div className="wrapper-dormitory-menu">
                  <MenuDormitoryClient />
                </div>

                <div className="wrapper-dormitory-content">{children}</div>
              </div>
            </div>
          </>
        ) : null}

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
            <Row
              gutter={[
                { xs: 0, sm: 0, md: 8, lg: 8, xl: 8 },
                { xs: 8, sm: 8, md: 8, lg: 8, xl: 8 },
              ]}
            >
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item label="Tên đăng nhập">
                  <Input value={user.userName} disabled />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item label="Email">
                  <Input value={user.email} disabled />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item label="Số điện thoại">
                  <Input value={user.phoneNumber} disabled />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item label="Mã số sinh viên">
                  <Input value={dataAuthMeStudent.data?.studentCode} disabled />
                </Form.Item>
              </Col>
            </Row>
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
    </ConfigProvider>
  );
};

export default DormitoryClient;
