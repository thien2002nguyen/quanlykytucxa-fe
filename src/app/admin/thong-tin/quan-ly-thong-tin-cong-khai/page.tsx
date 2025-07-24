"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import TextEditor from "@/components/admin/TextEditor/TextEditor";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getSchoolAction,
  patchSchoolAction,
} from "@/store/school/school.action";
import { isContentValid } from "@/utils/contentValidator";
import { Button, Col, Flex, Form, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";

interface SchoolInterface {
  schoolName: string;
  timeWork: string;
  email: string;
  phoneNumber: string;
  address: string;
  facebookUrl: string;
  googleMapUrl: string;
  slogan: string;
  zaloUrl: string;
}

const School = () => {
  const [formRef] = Form.useForm<SchoolInterface>();
  const dispatch = useAppDispatch();
  const { dataSchool } = useAppSelector((state) => state.schoolSlice);
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rules, setRules] = useState<string>("");
  const [guides, setGuides] = useState<string>("");

  useEffect(() => {
    dispatch(getSchoolAction());
  }, [dispatch]);

  useEffect(() => {
    onReset();
  }, [dataSchool?.data]);

  const onFinish = async (values: SchoolInterface) => {
    const isRules = isContentValid(rules);

    if (!isRules) {
      messageApi.warning("Vui lòng nhập nội quy - quy định của ký túc xá.");
      return;
    }

    setIsLoading(true);

    const response = await dispatch(
      patchSchoolAction({
        schoolName: values.schoolName,
        timeWork: values.timeWork,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        facebookUrl: values.facebookUrl,
        googleMapUrl: values.googleMapUrl,
        slogan: values.slogan,
        zaloUrl: values.zaloUrl,
        rulesAndRegulations: rules,
        guidelines: guides,
      })
    );

    if (response.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Cập nhật thông tin thành công.");
      dispatch(getSchoolAction());
    }

    setIsLoading(false);
  };

  const onReset = () => {
    const {
      schoolName,
      timeWork,
      email,
      phoneNumber,
      address,
      facebookUrl,
      googleMapUrl,
      slogan,
      zaloUrl,
      rulesAndRegulations,
      guidelines,
    } = dataSchool.data;

    formRef.setFieldsValue({
      schoolName: schoolName || "",
      timeWork: timeWork || "",
      email: email || "",
      phoneNumber: phoneNumber || "",
      address: address || "",
      facebookUrl: facebookUrl || "",
      googleMapUrl: googleMapUrl || "",
      slogan: slogan || "",
      zaloUrl: zaloUrl || "",
    });

    setRules(rulesAndRegulations || "");
    setGuides(guidelines || "");
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent title="Thông tin công khai" />

      <Form
        name="form-school"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onReset={onReset}
        autoComplete="off"
        layout="vertical"
        form={formRef}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên trường"
              name="schoolName"
              rules={[{ required: true, message: "Vui lòng nhập tên trường!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Thời gian làm việc"
              name="timeWork"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thời gian làm việc!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
                {
                  pattern: /^(0[3|5|7|8|9][0-9]{8}|01[0-9]{9})$/, // Biểu thức chính quy cho số điện thoại Việt Nam
                  message: "Số điện thoại không hợp lệ! Vui lòng kiểm tra lại.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ! Vui lòng kiểm tra lại.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Khẩu hiệu"
          name="slogan"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập khẩu hiệu!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đường dẫn zalo"
          name="zaloUrl"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đường dẫn zalo!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đường dẫn facebook"
          name="facebookUrl"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đường dẫn facebook!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Đường dẫn google map"
          name="googleMapUrl"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đường dẫn facebook!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Nội quy - quy định của ký túc xá">
          <TextEditor value={rules} onBlur={setRules} />
        </Form.Item>

        <Form.Item label="Hướng dẫn">
          <TextEditor value={guides} onBlur={setGuides} />
        </Form.Item>

        <div className="form-footer">
          <Flex gap={8} justify="flex-end">
            <Button htmlType="reset">Hủy</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Lưu
            </Button>
          </Flex>
        </div>
      </Form>
    </div>
  );
};

export default School;
