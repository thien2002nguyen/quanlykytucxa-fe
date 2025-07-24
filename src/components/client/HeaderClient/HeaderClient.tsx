"use client";

import React, { useEffect, useRef, useState } from "react";
import { incrementMonthlyVisitsAction } from "@/store/monthly-visits/monthly-visits.action";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Button,
  Divider,
  Flex,
  Avatar,
  Popover,
  List,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import Link from "next/link";
import {
  FacebookOutlined,
  MailOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { getSchoolAction } from "@/store/school/school.action";
import "./style.scss";
import Image from "next/image";
import { getInfomationsAction } from "@/store/infomation/infomation.action";
import { getNewsAction } from "@/store/news/news.action";
import { RoleAuth } from "@/store/auth/auth.type";
import { logout } from "@/store/auth/auth.reducer";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { ParameterChangePasswordByUser } from "@/store/users/users.type";
import { changePasswordByUserAction } from "@/store/users/users.action";
import { toast } from "react-toastify";

interface ListItem {
  key: string;
  title: string;
  onClick: () => void;
  isNoResponsive?: boolean;
}

const HeaderClient = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const hasCalledAction = useRef(false);

  const [formRef] = Form.useForm<ParameterChangePasswordByUser>();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataSchool } = useAppSelector((state) => state.schoolSlice);
  const { user } = useAppSelector((state) => state.authSlice);
  const { dataInfomations } = useAppSelector((state) => state.infomationSlice);
  const { dataNews } = useAppSelector((state) => state.newsSlice);

  const [isClient, setIsClient] = useState<boolean>(true);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [isShowMenuResponsive, setIsShowMenuResponsive] =
    useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [isClickAuth, setIsClickAuth] = useState<boolean>(false);
  const [showInfomationAccount, setShowInfomationAccount] =
    useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const [isChangePasswordLoading, setIsChangePasswordLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (!hasCalledAction.current) {
      dispatch(incrementMonthlyVisitsAction());
      hasCalledAction.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    setIsClient(false);
  }, []);

  useEffect(() => {
    dispatch(getSchoolAction());
    dispatch(getInfomationsAction({}));
    dispatch(getNewsAction({}));
  }, [dispatch]);

  useEffect(() => {
    if (user.avatar) {
      setAvatarSrc(user.avatar);
    }
  }, [user.avatar]);

  useEffect(() => {
    if (isShowMenuResponsive) {
      document.body.style.height = "100vh"; // Vô hiệu hóa cuộn khi menu mở
      document.body.style.overflow = "hidden"; // Vô hiệu hóa cuộn khi menu mở
    } else {
      document.body.style.overflowY = "auto"; // Kích hoạt cuộn lại khi menu đóng
      document.body.style.overflowX = "hidden"; // Kích hoạt cuộn lại khi menu đóng
      document.body.style.height = "auto"; // Vô hiệu hóa cuộn khi menu mở
    }
  }, [isShowMenuResponsive]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onClickContact = () => {
    const phoneUrl = `tel:${dataSchool.data?.phoneNumber}`;
    window.open(phoneUrl, "_blank");
  };

  const onClickMail = () => {
    const mailUrl = `mailto:${dataSchool.data?.email}`;
    window.open(mailUrl, "_blank");
  };

  const toggleMenu = () => {
    setIsShowMenuResponsive((prev) => !prev);
  };

  if (isClient) {
    return null;
  }

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
      title: "Phòng của bạn",
      onClick: () => {
        setIsClickAuth(false);
        router.push("/ky-tuc-xa/hop-dong");
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

  return (
    <>
      {contextHolder}

      <div className="wrapper-header">
        <p className="warning-text">
          Website đang trong quá trình phát triển vui lòng không thực hiện bất
          kì giao dịch nào
        </p>
        <div className="wrapper-header-top">
          <div className="container">
            <Flex justify="space-between" align="center">
              <div className="school-name">
                <div className="text">{dataSchool.data?.slogan}</div>
              </div>
              <Flex gap={10} align="center">
                <p onClick={onClickContact}>Hỗ trợ</p>
                <Divider type="vertical" className="line-center" />
                <p onClick={onClickContact}>Liên hệ</p>
                <Link
                  href={dataSchool?.data?.facebookUrl || "/"}
                  target="_blank"
                >
                  <FacebookOutlined />
                </Link>
                <p onClick={onClickMail}>
                  <MailOutlined />
                </p>
              </Flex>
            </Flex>
          </div>
        </div>

        <div className="wrapper-header-bottom">
          <div className="container">
            {/* Logo */}
            <Flex justify="space-between" align="center">
              <Flex align="center" gap={16} className="logo">
                <Button
                  className="btn-menu-responsive"
                  type="primary"
                  ghost
                  icon={<MenuOutlined />}
                  onClick={toggleMenu}
                />

                {/* Menu Responsive */}
                <div
                  className={`menu-responsive ${
                    isShowMenuResponsive ? "show" : ""
                  }`}
                >
                  <ul className="menu">
                    <li className="menu-item-nav">
                      <Link
                        href="/"
                        className="item-nav"
                        onClick={() => setIsShowMenuResponsive(false)}
                      >
                        Trang Chủ
                      </Link>
                    </li>
                    <li className="menu-item-nav dropdown">
                      <Link
                        href="#"
                        className="item-nav"
                        onClick={toggleDropdown}
                        scroll={false}
                      >
                        <Flex justify="space-between">
                          <span>Giới Thiệu</span>
                          {isDropdownOpen ? (
                            <IoIosArrowDown />
                          ) : (
                            <IoIosArrowBack />
                          )}
                        </Flex>
                      </Link>
                      <ul
                        className={`dropdown-menu ${
                          isDropdownOpen ? "show" : ""
                        }`}
                      >
                        <li>
                          <Link
                            href={{
                              pathname: "/gioi-thieu",
                            }}
                            className="item-nav"
                            onClick={() => setIsShowMenuResponsive(false)}
                          >
                            Ký túc xá DAU
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={{
                              pathname: "/don-gia",
                            }}
                            className="item-nav"
                            onClick={() => setIsShowMenuResponsive(false)}
                          >
                            Đơn giá ký túc xá
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-nav">
                      {dataInfomations?.data?.[0]?.slug ? (
                        <Link
                          href={`/thong-tin/${dataInfomations?.data[0]?.slug}`}
                          className="item-nav"
                          onClick={() => setIsShowMenuResponsive(false)}
                        >
                          Thông tin
                        </Link>
                      ) : (
                        <span className="item-nav">Thông tin</span>
                      )}
                    </li>
                    <li className="menu-item-nav">
                      {dataNews?.data?.[0]?.slug ? (
                        <Link
                          href={`/tin-tuc/${dataNews.data[0].slug}`}
                          className="item-nav"
                          onClick={() => setIsShowMenuResponsive(false)}
                        >
                          Tin tức
                        </Link>
                      ) : (
                        <span className="item-nav">Tin tức</span>
                      )}
                    </li>
                    <li className="menu-item-nav">
                      <Link
                        href="/noi-quy"
                        className="item-nav"
                        onClick={() => setIsShowMenuResponsive(false)}
                      >
                        Nội quy - Quy định
                      </Link>
                    </li>
                    <li className="menu-item-nav">
                      <Link
                        href="/huong-dan"
                        className="item-nav"
                        onClick={() => setIsShowMenuResponsive(false)}
                      >
                        Hướng dẫn
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Lớp Blur phía sau menu */}
                <div
                  className={`blur-background ${
                    isShowMenuResponsive ? "show" : ""
                  }`}
                  onClick={toggleMenu}
                />

                <Link href="/">
                  <Image
                    width={60}
                    height={60}
                    alt="logo"
                    src="/images/favicon.ico"
                    className="logo-image"
                  />
                </Link>

                <Flex vertical align="center">
                  <p className="logo-text">Ban quản lý ký túc xá</p>
                  <p className="school-name">{dataSchool.data?.schoolName}</p>
                </Flex>
              </Flex>

              {/* Menu Desktop */}
              <Flex gap={20} align="center">
                <div className="wrapper-nav">
                  <ul className="menu">
                    <li className="menu-item-nav">
                      <Link href="/" className="item-nav">
                        Trang Chủ
                      </Link>
                    </li>
                    <li className="menu-item-nav dropdown">
                      <Link href="#" className="item-nav" scroll={false}>
                        Giới Thiệu <IoIosArrowDown />
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link
                            href={{
                              pathname: "/gioi-thieu",
                            }}
                            className="item-nav"
                          >
                            Ký túc xá DAU
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={{
                              pathname: "/don-gia",
                            }}
                            className="item-nav"
                          >
                            Đơn giá ký túc xá
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-nav">
                      {dataInfomations?.data?.[0]?.slug ? (
                        <Link
                          href={`/thong-tin/${dataInfomations?.data[0]?.slug}`}
                          className="item-nav"
                          onClick={() => setIsShowMenuResponsive(false)}
                        >
                          Thông tin
                        </Link>
                      ) : (
                        <span className="item-nav">Thông tin</span>
                      )}
                    </li>
                    <li className="menu-item-nav">
                      {dataNews?.data?.[0]?.slug ? (
                        <Link
                          href={`/tin-tuc/${dataNews.data[0].slug}`}
                          className="item-nav"
                          onClick={() => setIsShowMenuResponsive(false)}
                        >
                          Tin tức
                        </Link>
                      ) : (
                        <span className="item-nav">Tin tức</span>
                      )}
                    </li>
                    <li className="menu-item-nav">
                      <Link href="/noi-quy" className="item-nav">
                        Nội quy - Quy định
                      </Link>
                    </li>
                    <li className="menu-item-nav">
                      <Link href="/huong-dan" className="item-nav">
                        Hướng dẫn
                      </Link>
                    </li>
                  </ul>
                </div>

                {user._id ? (
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
                ) : (
                  <Button
                    type="primary"
                    icon={<UserOutlined />}
                    href="/truy-cap"
                  >
                    <span className="btn-login">Đăng nhập</span>
                  </Button>
                )}
              </Flex>
            </Flex>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default HeaderClient;
