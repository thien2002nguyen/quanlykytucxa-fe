"use client";

import ChangePasswordComponent from "@/components/form/ChangePasswordComponent/ChangePasswordComponent";
import LoginComponent from "@/components/form/LoginComponent/LoginComponent";
import RegisterComponent from "@/components/form/RegisterComponent/RegisterComponent";
import ResetPasswordComponent from "@/components/form/ResetPasswordComponent/ResetPasswordComponent";
import VerifyOtpComponent from "@/components/form/VerifyOtpComponent/VerifyOtpComponent";
import { ActionAuthUser } from "@/utils/contants";
import { Col, Image, Row } from "antd";
import React, { useState } from "react";

const AccessUser = () => {
  const [isAccess, setIsAccess] = useState<ActionAuthUser>(
    ActionAuthUser.SIGN_IN
  );

  const listImageLeff = (typeForm: ActionAuthUser): string => {
    const url = "/images";
    let image;

    switch (typeForm) {
      case ActionAuthUser.SIGN_IN:
        image = `${url}/login.jpg`;
        break;

      case ActionAuthUser.SIGN_UP:
        image = `${url}/sign_up.jpg`;
        break;

      case ActionAuthUser.RESET_PASSWORD:
        image = `${url}/reset_password.jpg`;
        break;

      case ActionAuthUser.OTP_AUTHENTICATION:
        image = `${url}/otp.jpg`;
        break;

      case ActionAuthUser.CHANGE_PASSWORD:
        image = `${url}/change_pass.jpg`;
        break;

      default:
        image = `${url}/login_now.jpg`;
        break;
    }

    return image;
  };

  return (
    <Row gutter={{ xs: 0, sm: 0, md: 4, lg: 4, xl: 8 }}>
      <Col xs={0} sm={0} md={14} lg={14} xl={16}>
        <Image
          src={listImageLeff(isAccess)}
          preview={false}
          width="100%"
          height="100vh"
          style={{ objectFit: "contain" }}
        />
      </Col>
      <Col xs={24} sm={24} md={10} lg={10} xl={8}>
        {(ActionAuthUser.SIGN_IN === isAccess && (
          <LoginComponent onChangeTypeForm={setIsAccess} />
        )) ||
          (ActionAuthUser.SIGN_UP === isAccess && (
            <RegisterComponent onChangeTypeForm={setIsAccess} />
          )) ||
          (ActionAuthUser.OTP_AUTHENTICATION === isAccess && (
            <VerifyOtpComponent onChangeTypeForm={setIsAccess} />
          )) ||
          (ActionAuthUser.RESET_PASSWORD === isAccess && (
            <ResetPasswordComponent onChangeTypeForm={setIsAccess} />
          )) ||
          (ActionAuthUser.CHANGE_PASSWORD === isAccess && (
            <ChangePasswordComponent onChangeTypeForm={setIsAccess} />
          ))}
      </Col>
    </Row>
  );
};

export default AccessUser;
