"use client";

import {
  Breadcrumb,
  Button,
  Empty,
  Flex,
  List,
  message,
  Modal,
  Pagination,
  PaginationProps,
  Table,
  TableProps,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  BellOutlined,
  FileSyncOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  ParameterGetPaymentByUser,
  PaymentStatusEnum,
} from "@/store/payments/payments.type";
import { PAGE_SIZE_OPTIONS, SortEnum } from "@/utils/contants";
import isEqual from "lodash/isEqual";
import {
  createPaymentMomoUrlAction,
  getDetailPaymentAction,
  getPaymentsByUserAction,
} from "@/store/payments/payments.action";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { TimeUnitEnum } from "@/store/contract-types/contract-types.type";
import { formatVND } from "@/utils/formatMoney";
import { getPaymentStatusLabel } from "@/utils/getPaymentStatusLabel";
import dayjs from "dayjs";
import "./style.scss";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  room: string;
  contractType: string;
  totalAmount: string | number;
  services: React.ReactNode | undefined;
  remainingAmount: string | number;
  paidAmount: string | number;
  status: React.ReactNode;
  createdAt: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    align: "center",
    width: 60,
    className: "nowrap-column",
  },
  {
    title: "Phòng",
    dataIndex: "room",
    key: "room",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Loại",
    dataIndex: "contractType",
    key: "contractType",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Dịch vụ",
    dataIndex: "services",
    key: "services",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "totalAmount",
    key: "totalAmount",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Số nợ (VNĐ)",
    dataIndex: "remainingAmount",
    key: "remainingAmount",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Đã trả (VNĐ)",
    dataIndex: "paidAmount",
    key: "paidAmount",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    className: "nowrap-column",
  },
];

const PaymentPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { dataAuthMeStudent } = useAppSelector((state) => state.studentsSlice);
  const { dataPaymentsByUser, dataDetailPayment } = useAppSelector(
    (state) => state.paymentsSlice
  );

  const [parameters, setParameters] = useState<ParameterGetPaymentByUser>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    filter: (searchParams.get("filter") as PaymentStatusEnum) || undefined,
    studentCode: searchParams.get("studentCode") || "",
  });

  const [modalService, setModalService] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const newParam = {
      sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
      limit: Number(searchParams.get("limit")) || undefined,
      page: Number(searchParams.get("page")) || undefined,
      filter: (searchParams.get("filter") as PaymentStatusEnum) || undefined,
      studentCode: dataAuthMeStudent.data?.studentCode,
    };

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams, dataAuthMeStudent.data]);

  useEffect(() => {
    if (parameters.studentCode) {
      dispatch(getPaymentsByUserAction(parameters));
      const queryString = cleanAndSerializeQueryParams(parameters);
      router.replace(`${pathname}?${queryString}`);
    }
  }, [parameters, dispatch, router, pathname]);

  const dataSource: DataType[] = dataPaymentsByUser.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    room: `${item.room?.roomName} - ${item.room?.floor} - ${item.room?.roomBlock} - ${item.room?.roomType}`,
    contractType: `${item.contractType?.contractTitle} - ${
      item.contractType?.duration
    } ${
      (item.contractType?.unit === TimeUnitEnum.DAY && "Ngày") ||
      (item.contractType?.unit === TimeUnitEnum.MONTH && "Tháng") ||
      "Năm"
    }`,
    services: (
      <Button
        type="primary"
        icon={<BellOutlined />}
        className="btn-notification-custom"
        onClick={() => {
          setModalService(item._id);
          dispatch(getDetailPaymentAction(item._id));
        }}
        title="Danh sách dịch vụ"
      />
    ),
    totalAmount: formatVND(item.totalAmount || 0),
    remainingAmount: formatVND(item.remainingAmount || 0),
    paidAmount: formatVND(item.paidAmount || 0),
    status: getPaymentStatusLabel(item.status),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    invoice: item.adminId ? item.adminId?.userName : "Tự động",
  }));

  const onChangePagination: PaginationProps["onChange"] = (
    pageNumber,
    pageSize
  ) => {
    setParameters({
      ...parameters,
      page: pageNumber,
      limit: pageSize,
    });
  };

  // Hàm formatFullName: Chuyển đổi tên thành dạng không có khoảng trắng và viết hoa
  const formatFullName = (fullName: string | undefined): string => {
    if (!fullName) return "";
    return fullName.replace(/\s+/g, "").toUpperCase();
  };

  // Hàm createPaymentRequest: Tạo yêu cầu thanh toán
  const createPaymentRequest = async (
    amount: number,
    studentCode: string | undefined,
    fullName: string | undefined
  ) => {
    if (!studentCode || !fullName || !amount) {
      throw new Error("Thông tin không đầy đủ để tạo yêu cầu thanh toán.");
    }

    const formattedFullName = formatFullName(fullName);

    return await dispatch(
      createPaymentMomoUrlAction({
        amount,
        orderInfo: `${studentCode} ${formattedFullName} THANHTOANMOMO ${amount}`,
      })
    );
  };

  // Hàm openPaymentMomoUrl: Mở URL thanh toán trong một tab mới
  const openPaymentUrl = (paymentMomoUrl: string) => {
    if (paymentMomoUrl) {
      window.location.href = paymentMomoUrl;
    } else {
      messageApi.error("Không thể tạo đường dẫn thanh toán.");
    }
  };

  // Hàm handlePayment: Xử lý toàn bộ logic thanh toán
  const handlePayment = async () => {
    try {
      const { data } = dataAuthMeStudent || {};
      const { studentCode, fullName } = data || {};
      const remainingAmount = dataPaymentsByUser?.totalBill?.remainingAmount;

      if (!studentCode || !fullName || !remainingAmount) {
        messageApi.error("Thông tin không đầy đủ để tạo yêu cầu thanh toán.");
        return;
      }

      // Gửi yêu cầu thanh toán
      const response = await createPaymentRequest(
        remainingAmount,
        studentCode,
        fullName
      );

      if (response?.payload?.error) {
        messageApi.error(response?.payload?.error);
      } else {
        openPaymentUrl(response.payload?.data?.payUrl);
      }
    } catch (error: any) {
      messageApi.error(
        error.message || "Đã xảy ra lỗi khi tạo yêu cầu thanh toán."
      );
    }
  };

  return (
    <>
      {contextHolder}

      <div className="wrapper-main-content wrapper-payment-page">
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
                    <FileSyncOutlined />
                    <span>Thanh toán hóa đơn</span>
                  </>
                ),
              },
            ]}
          />
        </div>
        <div className="wrapper-main-content-body">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            bordered
            loading={dataPaymentsByUser.loading}
            pagination={false}
            size="small"
            scroll={{ x: "max-content" }}
            footer={() => [
              <Flex justify="flex-end" key="dataPaymentsByUser" gap={8}>
                <Pagination
                  current={parameters.page || 1}
                  showSizeChanger
                  pageSize={parameters.limit || 10}
                  pageSizeOptions={PAGE_SIZE_OPTIONS}
                  onChange={onChangePagination}
                  total={dataPaymentsByUser.meta?.total}
                  locale={customLocale}
                />
              </Flex>,
            ]}
          />
        </div>

        <Flex vertical gap={4} align="flex-end" className="total-payment-cash">
          <p>
            <strong>Tổng tiền: </strong>
            {formatVND(dataPaymentsByUser.totalBill.totalAmount || 0)} VNĐ
          </p>
          <p>
            <strong>Tổng nợ: </strong>
            {formatVND(dataPaymentsByUser.totalBill.remainingAmount || 0)} VNĐ
          </p>
          <p>
            <strong>Đã thanh toán: </strong>
            {formatVND(dataPaymentsByUser.totalBill.paidAmount || 0)} VNĐ
          </p>
          <Button
            type="primary"
            icon={<MoneyCollectOutlined />}
            onClick={handlePayment}
            disabled={dataPaymentsByUser?.totalBill?.remainingAmount === 0}
          >
            Thanh toán MOMO
          </Button>
        </Flex>

        {/* Modal dịch vụ */}
        <Modal
          title="Danh sách dịch vụ"
          open={modalService !== undefined}
          onCancel={() => setModalService(undefined)}
          centered
          footer={null}
        >
          <List
            locale={{
              emptyText: (
                <Empty
                  description="Không có dịch vụ nào"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
            dataSource={dataDetailPayment.data?.services}
            renderItem={(item) => (
              <List.Item key={item.serviceId}>
                <List.Item.Meta
                  title={item.name}
                  description={
                    <>
                      <p>{formatVND(item.price || 0)} VNĐ</p>
                      <p>
                        {item.createdAt &&
                          `Ngày đăng ký dịch vụ: ${dayjs(item.createdAt).format(
                            "HH:mm - DD/MM/YYYY"
                          )}`}
                      </p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </>
  );
};

export default PaymentPage;
