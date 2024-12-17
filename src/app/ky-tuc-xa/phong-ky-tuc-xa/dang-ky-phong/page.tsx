"use client";

import { ParameterPostContract } from "@/store/contracts/contracts.type";
import {
  Button,
  Checkbox,
  Col,
  Empty,
  Flex,
  Form,
  Image,
  List,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getInfomationStudentAction } from "@/store/students/students.action";
import { GenderEnum } from "@/store/students/students.type";
import { getDetailRoomAction } from "@/store/rooms/rooms.action";
import { formatVND } from "@/utils/formatMoney";
import { getContractTypesAction } from "@/store/contract-types/contract-types.action";
import { getContractTermsAction } from "@/store/contract-terms/contract-terms.action";
import { TimeUnitEnum } from "@/store/contract-types/contract-types.type";
import { getServicesAction } from "@/store/services/services.action";
import { postContractAction } from "@/store/contracts/contracts.action";
import { dayOfWeekOptions, IMAGE_NOT_FOUND } from "@/utils/contants";
import { toast } from "react-toastify";
import { ScheduleItem } from "@/store/services/services.type";
import { formatSchedule } from "@/utils/formatSchedule";

const RegisterRoomPage = () => {
  const [formRef] = Form.useForm<ParameterPostContract>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authSlice);
  const { dataAuthMeStudent } = useAppSelector((state) => state.studentsSlice);
  const { dataDetailRoom } = useAppSelector((state) => state.roomsSlice);
  const { dataServices } = useAppSelector((state) => state.servicesSlice);

  const { dataContractTerms } = useAppSelector(
    (state) => state.contractTermsSlice
  );
  const { dataContractTypes } = useAppSelector(
    (state) => state.contractTypesSlice
  );

  const optionsContractType = dataContractTypes.data?.map((item) => ({
    value: item._id,
    label: `${item.title} - ${item.duration} ${
      (item.unit === TimeUnitEnum.DAY && "Ngày") ||
      (item.unit === TimeUnitEnum.MONTH && "Tháng") ||
      "Năm"
    }`,
  }));

  const optionsService = dataServices.data?.map((item) => ({
    value: item._id,
    label: `${item.name} - ${formatVND(item.price || 0)} VNĐ - ${formatSchedule(
      item.schedule || []
    )}`,
  }));

  const [accepted, setAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getInfomationStudentAction());
    dispatch(getDetailRoomAction(searchParams.get("roomSlug") as string));
    dispatch(getContractTypesAction());
    dispatch(getContractTermsAction());
    dispatch(getServicesAction());
  }, [dispatch]);

  const handleCheckboxChange = (e: any) => {
    setAccepted(e.target.checked); // Lấy trạng thái từ Checkbox
  };

  const onFinish = async (value: any) => {
    setIsLoading(true);

    const contractType = dataContractTypes.data?.find(
      (item) => item._id === value.contractTypeId
    );

    const servicesSelected = dataServices.data
      ?.filter((item) => value.serviceId?.includes(item._id))
      .map(({ _id, name, price }) => ({ serviceId: _id, name, price }));

    const termsInfo = dataContractTerms.data?.map(({ _id, content }) => ({
      termId: _id,
      content,
    }));

    if (!contractType) {
      toast.error("Đã xảy ra lỗi vui lòng thử lại sau.");
      return;
    }

    const dataPost: ParameterPostContract = {
      fullName: dataAuthMeStudent.data?.fullName ?? "",
      studentCode: dataAuthMeStudent.data?.studentCode ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      room: {
        roomId: dataDetailRoom.data._id,
        price: dataDetailRoom.data?.roomTypeId?.price,
      },
      service: servicesSelected,
      contractType: {
        contractTypeId: contractType._id,
        duration: contractType.duration,
        unit: contractType.unit,
      },
      term: termsInfo,
    };

    const response = await dispatch(postContractAction(dataPost));

    if (response?.payload?.error) {
      toast.error(
        `🦄 ${response.payload.error || "Đã xảy ra lỗi. Vui lòng thử lại sau."}`
      );
    } else {
      toast.success(
        `🦄 Đăng ký phòng thành công. Vui lòng chờ xét duyệt hợp đồng.`
      );
      dispatch(getInfomationStudentAction());
      onReset();
      router.push("/ky-tuc-xa/phong-ky-tuc-xa");
    }

    setIsLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
  };

  return (
    <>
      <div className="wrapper-register-room-page">
        <Flex
          justify="space-between"
          align="center"
          className="wrapper-register-room-page-head"
        >
          <h3 className="title-head">Đăng ký phòng</h3>

          <Button type="primary" href={searchParams.get("rollBack") as string}>
            Quay lại
          </Button>
        </Flex>

        <Form
          name="form-register-room"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onReset={onReset}
          autoComplete="off"
          layout="vertical"
          form={formRef}
        >
          <div className="infomation-student">
            <h4 className="title-form">Thông tin cá nhân</h4>
            <p>
              <strong>Họ và tên: </strong>
              {dataAuthMeStudent.data?.fullName}
            </p>
            <p>
              <strong>Căn cước công dân: </strong>
              {dataAuthMeStudent.data?.nationalIdCard}
            </p>
            <p>
              <strong>Giới tính: </strong>
              {dataAuthMeStudent.data?.gender === GenderEnum.nam ? "Nam" : "Nữ"}
            </p>
            <p>
              <strong>Email: </strong>
              {user.email}
            </p>
            <p>
              <strong>Số điện thoại: </strong>
              {user.phoneNumber}
            </p>
            <p>
              <strong>Phòng (Khoa): </strong>
              {dataAuthMeStudent.data?.department}
            </p>
            <p>
              <strong>Lớp: </strong>
              {dataAuthMeStudent.data?.takeClass}
            </p>
            <p>
              <strong>Năm nhập học: </strong>
              {dataAuthMeStudent.data?.enrollmentYear}
            </p>
            <small>
              (Nếu có bất kỳ thông tin sai sót nào, vui lòng liên hệ với ban
              quản lý ký túc xá để được hỗ trợ và cập nhật thông tin chính xác).
            </small>
          </div>

          <h4 className="title-form">Nội dung hợp đồng</h4>

          <Form.Item label="Thông tin phòng">
            <Row
              gutter={[
                { xs: 0, sm: 16, md: 16, lg: 16, xl: 16 },
                { xs: 12, sm: 0, md: 0, lg: 0, xl: 0 },
              ]}
            >
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Image
                  src={dataDetailRoom.data?.thumbnail || IMAGE_NOT_FOUND}
                  preview={false}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <div className="infomation-room">
                  <p className="infomation-room-title">
                    {dataDetailRoom.data?.roomName} - Tầng{" "}
                    {dataDetailRoom.data?.floor}
                  </p>
                  <p>
                    <strong>Loại phòng: </strong>
                    {dataDetailRoom.data?.roomTypeId?.type}
                  </p>
                  <p>
                    <strong>Dãy phòng: </strong>
                    {dataDetailRoom.data?.roomBlockId?.name}
                  </p>
                  <p>
                    <strong>Sức chứa: </strong>
                    {dataDetailRoom.data?.registeredStudents}/
                    {dataDetailRoom.data?.maximumCapacity}
                    người
                  </p>
                  <p>
                    <strong>Giá phòng: </strong>
                    {formatVND(dataDetailRoom.data?.roomTypeId?.price || 0)} VNĐ
                  </p>
                </div>
              </Col>
            </Row>
          </Form.Item>

          <Row
            gutter={[
              { xs: 0, sm: 16, md: 16, lg: 16, xl: 16 },
              { xs: 12, sm: 0, md: 0, lg: 0, xl: 0 },
            ]}
          >
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                name="contractTypeId"
                label="Loại hợp đồng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại hợp đồng!",
                  },
                ]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  allowClear
                  options={optionsContractType}
                  placeholder="Chọn loại hợp đồng"
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item name="serviceId" label="Dịch vụ">
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  mode="multiple"
                  allowClear
                  options={optionsService}
                  placeholder="Chọn dịch vụ"
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
          </Row>

          <h4 className="title-form">Điều khoản hợp đồng</h4>

          <div className="infomation-contract-term">
            <List
              locale={{
                emptyText: (
                  <Empty
                    description="Không có điều khoản hợp đồng nào"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                ),
              }}
              size="small"
              dataSource={dataContractTerms.data}
              bordered
              renderItem={(item, index) => (
                <List.Item key={item._id}>
                  {index + 1}. {item.content}
                </List.Item>
              )}
            />
          </div>

          <Form.Item>
            <Checkbox checked={accepted} onChange={handleCheckboxChange}>
              Đồng ý điều khoản hợp đồng
            </Checkbox>
          </Form.Item>

          <div className="form-footer">
            <Flex gap={8} justify="flex-end">
              <Button htmlType="reset">Hủy</Button>
              <Button
                disabled={!accepted}
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Đăng ký phòng
              </Button>
            </Flex>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RegisterRoomPage;
