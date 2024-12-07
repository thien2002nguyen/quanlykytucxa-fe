"use client";

import React, { useEffect, useRef, useState } from "react";
import { incrementMonthlyVisitsAction } from "@/store/monthly-visits/monthly-visits.action";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Divider, Flex, Avatar } from "antd";
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

const HeaderClient = () => {
  const dispatch = useAppDispatch();
  const hasCalledAction = useRef(false);

  const { dataSchool } = useAppSelector((state) => state.schoolSlice);
  const { user } = useAppSelector((state) => state.authSlice);

  const [isClient, setIsClient] = useState<boolean>(true);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [isShowMenuResponsive, setIsShowMenuResponsive] =
    useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  return (
    <div className="wrapper-header">
      <div className="wrapper-header-top">
        <div className="container">
          <Flex justify="space-between" align="center">
            <div className="school-name">
              <div className="text">{dataSchool.data?.slogan}</div>
            </div>
            <Flex gap={10} align="center">
              <Link href="/ho-tro">Hỗ trợ</Link>
              <Divider type="vertical" className="line-center" />
              <p onClick={onClickContact}>Liên hệ</p>
              <Link href={dataSchool?.data?.facebookUrl || "/"} target="_blank">
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
                    <Link href="/" className="item-nav">
                      Trang Chủ
                    </Link>
                  </li>
                  <li className="menu-item-nav dropdown">
                    <Link
                      href="#"
                      className="item-nav"
                      onClick={toggleDropdown}
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
                            query: { type: "ky-tuc-xa-dau" },
                          }}
                          className="item-nav"
                        >
                          Ký túc xá DAU
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/don-gia-ky-tuc-xa",
                            query: { type: "don-gia" },
                          }}
                          className="item-nav"
                        >
                          Đơn giá ký túc xá
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-nav">
                    <Link href="/thong-tin" className="item-nav">
                      Thông tin
                    </Link>
                  </li>
                  <li className="menu-item-nav">
                    <Link href="/tin-tuc" className="item-nav">
                      Tin tức
                    </Link>
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

              {/* Lớp Blur phía sau menu */}
              <div
                className={`blur-background ${
                  isShowMenuResponsive ? "show" : ""
                }`}
                onClick={toggleMenu}
              />

              <Image
                width={60}
                height={60}
                alt="logo"
                src="/images/favicon.ico"
                className="logo-image"
              />

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
                    <Link href="#" className="item-nav">
                      Giới Thiệu
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          href={{
                            pathname: "/gioi-thieu",
                            query: { type: "ky-tuc-xa-dau" },
                          }}
                          className="item-nav"
                        >
                          Ký túc xá DAU
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: "/don-gia-ky-tuc-xa",
                            query: { type: "don-gia" },
                          }}
                          className="item-nav"
                        >
                          Đơn giá ký túc xá
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-nav">
                    <Link href="/thong-tin" className="item-nav">
                      Thông tin
                    </Link>
                  </li>
                  <li className="menu-item-nav">
                    <Link href="/tin-tuc" className="item-nav">
                      Tin tức
                    </Link>
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
                <Link href="/ky-tuc-xa/cai-dat/thong-tin-tai-khoan">
                  <Flex align="center" gap={4}>
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
                </Link>
              ) : (
                <Button type="primary" icon={<UserOutlined />} href="/truy-cap">
                  <span className="btn-login">Đăng nhập</span>
                </Button>
              )}
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
