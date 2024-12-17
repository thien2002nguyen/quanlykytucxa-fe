"use client";

import { Breadcrumb, Button, Empty, Flex, List, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  ApiOutlined,
  CalendarOutlined,
  CarryOutOutlined,
  DisconnectOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { formatVND } from "@/utils/formatMoney";
import { formatSchedule } from "@/utils/formatSchedule";
import "./style.scss";
import { getServicesAction } from "@/store/services/services.action";
import {
  ParameterRegisterRoomService,
  ServiceType,
  ParameterCancelRoomService,
} from "@/store/contracts/contracts.type";
import { Service } from "@/store/services/services.type";
import {
  cancelRoomServiceAction,
  registerRoomServiceAction,
} from "@/store/contracts/contracts.action";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getInfomationStudentAction } from "@/store/students/students.action";

const RoomServicePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataAuthMeStudent } = useAppSelector((state) => state.studentsSlice);
  const { dataServices } = useAppSelector((state) => state.servicesSlice);

  const [modalRegisterRoomService, setModalRegisterRoomService] = useState<
    ParameterRegisterRoomService | undefined
  >(undefined);
  const [modalCancelRoomService, setModalCancelRoomService] = useState<
    ParameterCancelRoomService | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCancelLoading, setIsCancelLoading] = useState<boolean>(false);

  const [roomRegistrationRequired, setRoomRegistrationRequired] =
    useState<boolean>(false);

  const [dataServiceRegistered, setDataServiceRegistered] = useState<
    ServiceType[] | undefined
  >();
  const [dataListServices, setDataListServices] = useState<
    Service[] | undefined
  >();

  useEffect(() => {
    // Lấy danh sách dịch vụ đã đăng ký
    const registeredServices: ServiceType[] | undefined =
      dataAuthMeStudent.data?.contractId?.service;

    // Lấy danh sách dịch vụ chưa đăng ký
    const unregisteredServices: Service[] | undefined =
      dataServices.data?.filter(
        (item) =>
          !registeredServices
            ?.map((myService) => myService?.serviceId?._id)
            ?.includes(item._id)
      );

    // Cập nhật state
    setDataServiceRegistered(registeredServices);
    setDataListServices(unregisteredServices);
  }, [dataAuthMeStudent, dataServices]);

  useEffect(() => {
    dispatch(getInfomationStudentAction());
    dispatch(getServicesAction());
  }, [dispatch]);

  const handleRegisterRoomService = async (
    values: ParameterRegisterRoomService
  ) => {
    setIsLoading(true);

    const response = await dispatch(registerRoomServiceAction(values));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Đăng ký dịch vụ thành công.");
      dispatch(getInfomationStudentAction());
      dispatch(getServicesAction());
      setModalRegisterRoomService(undefined);
    }

    setIsLoading(false);
  };

  const handleCancelRoomService = async (
    values: ParameterCancelRoomService
  ) => {
    setIsCancelLoading(true);

    const response = await dispatch(cancelRoomServiceAction(values));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Hủy dịch vụ thành công.");
      dispatch(getInfomationStudentAction());
      dispatch(getServicesAction());
      setModalCancelRoomService(undefined);
    }

    setIsCancelLoading(false);
  };

  return (
    <>
      {contextHolder}

      <div className="wrapper-main-content wrapper-service-room-page">
        <div className="wrapper-main-content-head">
          <Breadcrumb
            items={[
              {
                href: "/",
                title: <HomeOutlined />,
              },
              {
                title: (
                  <>
                    <CalendarOutlined />
                    <span>Dịch vụ phòng</span>
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="wrapper-main-content-body">
          {/* Dịch vụ của bạn */}
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
            header={
              <Flex justify="center" className="title-list">
                Dịch vụ của bạn
              </Flex>
            }
            dataSource={dataServiceRegistered}
            renderItem={(item) => (
              <List.Item key={item.serviceId?._id}>
                <List.Item.Meta
                  avatar={<CarryOutOutlined />}
                  title={
                    item.serviceId?._id
                      ? item.serviceId?.name
                      : "Dịch vụ ký túc xá"
                  }
                  description={
                    item.serviceId?._id ? (
                      <>
                        <p>{formatVND(item.serviceId?.price || 0)} VNĐ</p>
                        <p>{formatSchedule(item.serviceId?.schedule)}</p>
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
                  <Button
                    type="primary"
                    icon={<DisconnectOutlined />}
                    disabled={!item.serviceId?._id}
                    onClick={() =>
                      setModalCancelRoomService({
                        contractId: dataAuthMeStudent?.data?.contractId
                          ?._id as string,
                        serviceId: item.serviceId?._id,
                      })
                    }
                  >
                    Hủy đăng ký
                  </Button>
                </Flex>
              </List.Item>
            )}
          />

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
            header={
              <Flex justify="center" className="title-list">
                Dịch vụ ký túc xá
              </Flex>
            }
            dataSource={dataListServices}
            renderItem={(item) => (
              <List.Item key={item._id}>
                <List.Item.Meta
                  avatar={<CarryOutOutlined />}
                  title={item._id ? item.name : "Dịch vụ ký túc xá"}
                  description={
                    item._id ? (
                      <>
                        <p>{formatVND(item.price || 0)} VNĐ</p>
                        <p>{formatSchedule(item.schedule)}</p>
                      </>
                    ) : (
                      <p>Ngừng hoạt động</p>
                    )
                  }
                />
                <Flex gap={4}>
                  <Button
                    type="primary"
                    icon={<ApiOutlined />}
                    disabled={!item._id}
                    onClick={() => {
                      if (dataAuthMeStudent?.data?.contractId?._id) {
                        setModalRegisterRoomService({
                          contractId: dataAuthMeStudent?.data?.contractId?._id,
                          serviceId: item._id,
                          name: item.name,
                          price: item.price,
                        });
                      } else {
                        setRoomRegistrationRequired(true);
                      }
                    }}
                  >
                    Đăng ký
                  </Button>
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Modal đăng ký dịch vụ */}
      <Modal
        title="Đăng ký dịch vụ"
        okText="Đăng ký ngay"
        cancelText="Để sau"
        open={modalRegisterRoomService !== undefined}
        onOk={() => handleRegisterRoomService(modalRegisterRoomService!)}
        onCancel={() => setModalRegisterRoomService(undefined)}
        confirmLoading={isLoading}
        centered
      >
        <p>Bạn có chắc chắn muốn đăng ký dịch vụ này không?</p>
      </Modal>

      {/* Modal hủy đăng ký dịch vụ */}
      <Modal
        title="Hủy dịch vụ"
        okText="Hủy dịch vụ"
        cancelText="Để sau"
        open={modalCancelRoomService !== undefined}
        onOk={() => handleCancelRoomService(modalCancelRoomService!)}
        onCancel={() => setModalCancelRoomService(undefined)}
        confirmLoading={isCancelLoading}
        centered
      >
        <p>Bạn có chắc chắn muốn hủy dịch vụ này không?</p>
      </Modal>

      {/* Modal thông báo đăng ký phòng để đăng ký dịch vụ */}
      <Modal
        title="Yêu cầu đăng ký phòng"
        okText="Đăng ký ngay"
        cancelText="Để sau"
        open={roomRegistrationRequired}
        onOk={() => {
          setRoomRegistrationRequired(false);
          router.push("/ky-tuc-xa/phong-ky-tuc-xa");
        }}
        onCancel={() => setRoomRegistrationRequired(false)}
        centered
      >
        <p>Bạn cần đăng ký phòng trước khi thực hiện đăng ký dịch vụ phòng.</p>
      </Modal>
    </>
  );
};

export default RoomServicePage;
