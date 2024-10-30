"use client";

import React, { useEffect, useRef } from "react";
import { incrementMonthlyVisitsAction } from "@/store/monthly-visits/monthly-visits.action";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button, Divider, Flex } from "antd";
import Link from "next/link";
import {
  FacebookOutlined,
  MailOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { getSchoolAction } from "@/store/school/school.action";
import "./style.scss";
import Image from "next/image";

const HeaderClient = () => {
  const dispatch = useAppDispatch();
  const hasCalledAction = useRef(false);
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);

  useEffect(() => {
    if (!hasCalledAction.current) {
      dispatch(incrementMonthlyVisitsAction());
      hasCalledAction.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSchoolAction());
  }, [dispatch]);

  const onClickContact = () => {
    const phoneUrl = `tel:${dataSchool.data?.phoneNumber}`;
    window.open(phoneUrl, "_blank");
  };

  const onClickMail = () => {
    const mailUrl = `mailto:${dataSchool.data?.email}`;
    window.open(mailUrl, "_blank");
  };

  return (
    <div className="wrapper-header">
      <div className="wrapper-header-top">
        <div className="container">
          <Flex justify="space-between" align="center">
            <div className="school-name">
              <div className="text">
                Ban quản lý ký túc xá - {dataSchool.data?.schoolName}
              </div>
            </div>
            <Flex gap={10} align="center">
              <Link href="/ho-tro">Hỗ trợ</Link>
              <Divider type="vertical" />
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
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={16}>
              <Image
                width={60}
                height={60}
                alt="logo"
                src="/images/favicon.ico"
              />
              <Flex className="logo" vertical align="center">
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

              <Button type="primary" icon={<SolutionOutlined />}>
                Đăng ký
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
