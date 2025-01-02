"use client";

import {
  Breadcrumb,
  Button,
  Col,
  Empty,
  Flex,
  Form,
  Image,
  List,
  message,
  Modal,
  Popover,
  Result,
  Row,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ContactsOutlined,
  DisconnectOutlined,
  FileSyncOutlined,
  HomeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatVND } from "@/utils/formatMoney";
import { IMAGE_NOT_FOUND } from "@/utils/contants";
import { formatSchedule } from "@/utils/formatSchedule";
import dayjs from "dayjs";
import {
  cancelRoomServiceAction,
  checkInRoomAction,
  removeRequestCancelContractAction,
  requestCancelContractAction,
} from "@/store/contracts/contracts.action";
import { getInfomationStudentAction } from "@/store/students/students.action";
import { TimeUnitEnum } from "@/store/contract-types/contract-types.type";
import { getStatusLabel } from "@/utils/getStatusLabel";
import { StatusEnum } from "@/store/contracts/contracts.type";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";
import { getContractTermsAction } from "@/store/contract-terms/contract-terms.action";
import TextArea from "antd/es/input/TextArea";
import UploadMultiImage from "@/components/uploads/UploadMultiImage/UploadMultiImage";
import { postIncidentAction } from "@/store/incidents/incidents.action";

interface IncidentInterface {
  images: string[];
  description: string;
}

const ContactPage = () => {
  const [formRef] = Form.useForm<IncidentInterface>();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataAuthMeStudent } = useAppSelector((state) => state.studentsSlice);
  const { dataContractTerms } = useAppSelector(
    (state) => state.contractTermsSlice
  );

  const [cancelService, setCancelService] = useState<string | undefined>(
    undefined
  );
  const [modalRequestCancelContract, setModalRequestCancelContract] = useState<
    string | undefined
  >(undefined);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isIncidentLoading, setIsIncidentLoading] = useState<boolean>(false);
  const [currentMultiFile, setCurrentMultiFile] = useState<UploadFile[]>([]);

  useEffect(() => {
    dispatch(getInfomationStudentAction());
    dispatch(getContractTermsAction());
  }, [dispatch]);

  const handleRemoveRequestCancelContract = async (id: string) => {
    const response = await dispatch(removeRequestCancelContractAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa yêu cầu hủy đăng ký phòng thành công.");
      dispatch(getInfomationStudentAction());
    }
  };

  const handleCheckInDate = async (id: string) => {
    const response = await dispatch(checkInRoomAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xác nhận đã nhận phòng thành công.");
      dispatch(getInfomationStudentAction());
    }
  };

  const handleRequestCancelContract = async (id: string) => {
    setIsLoading(true);

    const response = await dispatch(requestCancelContractAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Gửi yêu cầu hủy đăng ký phòng thành công.");
      setModalRequestCancelContract(undefined);
      dispatch(getInfomationStudentAction());
    }

    setIsLoading(false);
  };

  const onSendIncident = async () => {
    if (currentMultiFile?.length === 0) {
      messageApi.warning("Vui lòng thêm ít nhất một ảnh mô tả sự cố.");
      return;
    }

    setIsIncidentLoading(true);

    const response = await dispatch(
      postIncidentAction({
        images: currentMultiFile?.map((item) => item.url as string),
        description: formRef.getFieldValue("description"),
      })
    );

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Đã gửi sự cố đến quản trị viên.");
      onCancelIncident();
    }

    setIsIncidentLoading(false);
  };

  const onCancelIncident = () => {
    formRef.resetFields();
    setCurrentMultiFile([]);
    setIsShowModal(false);
  };

  return (
    <div>
      {contextHolder}

      <div className="wrapper-main-content wrapper-contract-room-page">
        <Flex
          justify="space-between"
          align="flex-start"
          className="wrapper-main-content-head"
        >
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: (
                  <>
                    <ContactsOutlined />
                    <span>Hợp đồng</span>
                  </>
                ),
              },
            ]}
          />

          <Flex gap={6}>
            <Button
              type="primary"
              icon={<FileSyncOutlined />}
              href="/ky-tuc-xa/thanh-toan-hoa-don"
            >
              Thanh toán hóa đơn
            </Button>
            <Button
              type="primary"
              icon={<WarningOutlined />}
              onClick={() => setIsShowModal(true)}
            >
              Sự cố
            </Button>
          </Flex>
        </Flex>

        {!dataAuthMeStudent.loading && !dataContractTerms.loading && (
          <div className="wrapper-main-content-body">
            {dataAuthMeStudent.data?.contractId?._id &&
              dataAuthMeStudent.data?.roomId?._id && (
                <div className="wrapper-contract-room-page-my-contract">
                  <h3>Thông tin cá nhân</h3>
                  <div>
                    <p>
                      <strong>Mã số sinh viên: </strong>
                      {dataAuthMeStudent.data?.contractId?.studentCode}
                    </p>
                    <p>
                      <strong>Họ và tên: </strong>
                      {dataAuthMeStudent.data?.contractId?.fullName}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {dataAuthMeStudent.data?.contractId?.email}
                    </p>
                    <p>
                      <strong>Số điện thoại: </strong>
                      {dataAuthMeStudent.data?.contractId?.phoneNumber}
                    </p>
                  </div>
                  <h3>Thông tin phòng</h3>
                  <Row
                    gutter={[
                      { xs: 0, sm: 16, md: 16, lg: 16, xl: 16 },
                      { xs: 12, sm: 0, md: 0, lg: 0, xl: 0 },
                    ]}
                  >
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Image
                        src={
                          dataAuthMeStudent.data?.roomId?.thumbnail ||
                          IMAGE_NOT_FOUND
                        }
                        preview={false}
                      />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <div className="contract-infomation-room">
                        <p className="contract-infomation-room-title">
                          {dataAuthMeStudent.data?.roomId?.roomName} - Tầng{" "}
                          {dataAuthMeStudent.data?.roomId?.floor}
                        </p>
                        <p>
                          <strong>Loại phòng: </strong>
                          {dataAuthMeStudent.data?.roomId?.roomTypeId?.type}
                        </p>
                        <p>
                          <strong>Dãy phòng: </strong>
                          {dataAuthMeStudent.data?.roomId?.roomBlockId?.name}
                        </p>
                        <p>
                          <strong>Sức chứa: </strong>
                          {dataAuthMeStudent.data?.roomId?.registeredStudents}/
                          {dataAuthMeStudent.data?.roomId?.maximumCapacity}{" "}
                          người
                        </p>
                        <p>
                          <strong>Giá phòng: </strong>
                          {formatVND(
                            dataAuthMeStudent.data?.roomId?.roomTypeId?.price ||
                              0
                          )}{" "}
                          VNĐ
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <h3>Dịch vụ</h3>
                  <List
                    size="small"
                    bordered
                    locale={{
                      emptyText: (
                        <Empty
                          description="Không có dịch vụ nào"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      ),
                    }}
                    dataSource={dataAuthMeStudent.data?.contractId?.services}
                    renderItem={(item) => (
                      <List.Item key={item.serviceId?._id}>
                        <List.Item.Meta
                          title={
                            item.serviceId?._id
                              ? item.serviceId?.name
                              : "Dịch vụ ký túc xá"
                          }
                          description={
                            item.serviceId?._id ? (
                              <>
                                <p>
                                  Giá dịch vụ:{" "}
                                  {formatVND(item.serviceId?.price || 0)} VNĐ
                                </p>
                                <p>
                                  Lịch trình:{" "}
                                  {formatSchedule(item.serviceId?.schedule)}
                                </p>
                                <p>
                                  {item.createdAt
                                    ? `Ngày đăng ký dịch vụ: ${dayjs(
                                        item.createdAt
                                      ).format("HH:mm - DD/MM/YYYY")}`
                                    : "Hợp đồng chưa được phê duyệt"}
                                </p>
                              </>
                            ) : (
                              <p>Ngừng hoạt động</p>
                            )
                          }
                        />
                        <Flex gap={4}>
                          <Popover
                            content={
                              <Flex gap={4}>
                                <Button
                                  type="primary"
                                  ghost
                                  onClick={() => setCancelService(undefined)}
                                >
                                  Để sau
                                </Button>
                                <Button
                                  type="primary"
                                  onClick={async () => {
                                    const response = await dispatch(
                                      cancelRoomServiceAction({
                                        contractId: dataAuthMeStudent.data
                                          ?.contractId?._id as string,
                                        serviceId: cancelService as string,
                                      })
                                    );

                                    if (response?.payload?.error) {
                                      messageApi.error(response.payload.error);
                                    } else {
                                      messageApi.success(
                                        "Hủy dịch vụ thành công."
                                      );
                                      dispatch(getInfomationStudentAction());
                                      setCancelService(undefined);
                                    }
                                  }}
                                >
                                  Hủy dịch vụ
                                </Button>
                              </Flex>
                            }
                            trigger="click"
                            getPopupContainer={(triggerNode) => triggerNode}
                            arrow={false}
                            placement="topRight"
                            open={cancelService === item.serviceId?._id}
                            onOpenChange={() => setCancelService(undefined)}
                          >
                            <Button
                              type="primary"
                              icon={<DisconnectOutlined />}
                              disabled={!item.serviceId?._id}
                              onClick={() => {
                                if (cancelService) {
                                  setCancelService(undefined);
                                } else {
                                  setCancelService(item.serviceId?._id);
                                }
                              }}
                            />
                          </Popover>
                        </Flex>
                      </List.Item>
                    )}
                  />
                  <h3>Thông tin hợp đồng</h3>
                  <div>
                    <p>
                      <strong>Loại hợp đồng: </strong>
                      {dataAuthMeStudent.data?.contractId?.contractTypeId
                        ?.title || "Hợp đồng ký túc xá"}{" "}
                      -{" "}
                      {
                        dataAuthMeStudent.data?.contractId?.contractTypeId
                          ?.duration
                      }{" "}
                      {(dataAuthMeStudent.data?.contractId?.contractTypeId
                        ?.unit === TimeUnitEnum.DAY &&
                        "Ngày") ||
                        (dataAuthMeStudent.data?.contractId?.contractTypeId
                          ?.unit === TimeUnitEnum.MONTH &&
                          "Tháng") ||
                        "Năm"}
                    </p>
                    <p>
                      <strong>Trạng thái: </strong>
                      {getStatusLabel(
                        dataAuthMeStudent.data?.contractId?.status ||
                          StatusEnum.EXPIRED
                      )}
                    </p>
                    <p>
                      <strong>Ngày đăng ký: </strong>
                      {dataAuthMeStudent.data?.contractId?.startDate
                        ? dayjs(
                            dataAuthMeStudent.data?.contractId?.startDate
                          ).format("DD/MM/YYYY ")
                        : "Hợp đồng chưa được duyệt"}
                    </p>
                    <p>
                      <strong>Ngày bắt đầu: </strong>
                      {dataAuthMeStudent.data?.contractId?.endDate
                        ? dayjs(
                            dataAuthMeStudent.data?.contractId?.endDate
                          ).format("DD/MM/YYYY ")
                        : "Hợp đồng chưa được duyệt"}
                    </p>
                    <p>
                      <strong>Ngày nhận phòng: </strong>
                      {dataAuthMeStudent.data?.contractId?.checkInDate
                        ? dayjs(
                            dataAuthMeStudent.data?.contractId?.checkInDate
                          ).format("HH:mm - DD/MM/YYYY ")
                        : "Chưa nhận phòng"}
                    </p>
                  </div>
                  <h3>Điều khoản hợp đồng</h3>
                  <div className="contract-infomation-term">
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
                        <List.Item key={uuidv4()}>
                          {index + 1}. {item.content}
                        </List.Item>
                      )}
                    />
                  </div>

                  <div className="form-footer">
                    <Flex gap={8} justify="flex-end">
                      {dataAuthMeStudent.data?.contractId?.status ===
                        StatusEnum.PENDING_CANCELLATION && (
                        <Button
                          onClick={() =>
                            handleRemoveRequestCancelContract(
                              dataAuthMeStudent.data?.contractId?._id as string
                            )
                          }
                        >
                          Xóa yêu cầu
                        </Button>
                      )}

                      {dataAuthMeStudent.data?.contractId?.status ===
                        StatusEnum.CONFIRMED &&
                        !dataAuthMeStudent.data?.contractId?.checkInDate && (
                          <Button
                            type="primary"
                            ghost
                            onClick={() =>
                              handleCheckInDate(
                                dataAuthMeStudent.data?.contractId
                                  ?._id as string
                              )
                            }
                          >
                            Đã nhận phòng
                          </Button>
                        )}

                      <Button
                        type="primary"
                        disabled={
                          dataAuthMeStudent.data?.contractId?.status ===
                          StatusEnum.PENDING_CANCELLATION
                        }
                        onClick={() =>
                          setModalRequestCancelContract(
                            dataAuthMeStudent.data?.contractId?._id
                          )
                        }
                      >
                        Hủy đăng ký phòng
                      </Button>
                    </Flex>
                  </div>
                </div>
              )}

            {(!dataAuthMeStudent.data?.contractId?._id ||
              !dataAuthMeStudent.data?.roomId?._id) && (
              <Result
                status="404"
                subTitle="Không có hợp đồng nào."
                extra={
                  <Button
                    type="primary"
                    href="/ky-tuc-xa"
                    icon={<AppstoreOutlined />}
                  >
                    Đăng ký phòng
                  </Button>
                }
              />
            )}
          </div>
        )}

        <Modal
          title="Báo cáo sự cố"
          cancelText="Hủy"
          okText="Gửi"
          open={isShowModal}
          onOk={onSendIncident}
          onCancel={onCancelIncident}
          confirmLoading={isIncidentLoading}
          width={600}
          centered
        >
          <Form
            name="form-incident"
            form={formRef}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="description"
              label="Mô tả sự cố"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Hình ảnh mô tả">
              <UploadMultiImage
                currentFileList={currentMultiFile}
                onChange={setCurrentMultiFile}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Hủy đăng ký phòng"
          okText="Hủy"
          cancelText="Để sau"
          open={modalRequestCancelContract !== undefined}
          onOk={() => handleRequestCancelContract(modalRequestCancelContract!)}
          onCancel={() => setModalRequestCancelContract(undefined)}
          confirmLoading={isLoading}
          centered
        >
          <p>Bạn có chắc chắn muốn hủy đăng ký phòng không?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ContactPage;
