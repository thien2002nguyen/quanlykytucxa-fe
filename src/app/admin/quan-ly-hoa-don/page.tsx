"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import {
  Button,
  Col,
  Empty,
  Flex,
  Form,
  Input,
  List,
  message,
  Modal,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import {
  BellOutlined,
  EyeOutlined,
  HistoryOutlined,
  MoneyCollectOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { PAGE_SIZE_OPTIONS, SortEnum } from "@/utils/contants";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import dayjs from "dayjs";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { TimeUnitEnum } from "@/store/contract-types/contract-types.type";
import { formatVND, parseVND } from "@/utils/formatMoney";
import {
  ParameterGetPayment,
  PaymentMethodEnum,
  PaymentStatusEnum,
} from "@/store/payments/payments.type";
import {
  createPaymentsAction,
  getDetailPaymentAction,
  getPaymentsAction,
  payBillByIdAction,
} from "@/store/payments/payments.action";
import { filterPaymentStatusOptions } from "@/utils/getPaymentStatusLabel";
import { getPaymentMethodLabel } from "@/utils/getPaymentMethodLabel";
import { v4 as uuidv4 } from "uuid";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  fullName: string;
  studentCode: string;
  room: string;
  contractType: string;
  services: React.ReactNode | undefined;
  totalAmount: string | number;
  remainingAmount: string | number;
  paidAmount: string | number;
  status: React.ReactNode;
  createdAt: string;
  invoice: string | undefined;
  historyPayment: React.ReactNode;
  action: React.ReactNode;
}

interface PaymentInterface {
  paymentMethod: Exclude<PaymentMethodEnum, PaymentMethodEnum.VNPAY>;
  amount: string | number;
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
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
    align: "center",
    className: "nowrap-column",
  },
  {
    title: "Mã số sinh viên",
    dataIndex: "studentCode",
    key: "studentCode",
    align: "center",
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
    title: "Được tạo",
    dataIndex: "invoice",
    key: "invoice",
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
    title: "Lịch sử",
    dataIndex: "historyPayment",
    key: "historyPayment",
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
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    align: "center",
    className: "nowrap-column",
  },
];

const ManagePayments = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [formRef] = Form.useForm<PaymentInterface>();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataPayments, dataDetailPayment } = useAppSelector(
    (state) => state.paymentsSlice
  );

  const [parameters, setParameters] = useState<ParameterGetPayment>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    filter: (searchParams.get("filter") as PaymentStatusEnum) || undefined,
  });
  const [searchKey, setSearchKey] = useState<string>("");

  const [modalSeeMore, setModalSeeMore] = useState<string | undefined>(
    undefined
  );
  const [modalService, setModalService] = useState<string | undefined>(
    undefined
  );
  const [modalHistory, setModalHistory] = useState<string | undefined>(
    undefined
  );
  const [modalPayment, setModalPayment] = useState<string | undefined>(
    undefined
  );

  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);

  useEffect(() => {
    const newParam = {
      sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
      search: searchParams.get("search") || undefined,
      limit: Number(searchParams.get("limit")) || undefined,
      page: Number(searchParams.get("page")) || undefined,
      filter: (searchParams.get("filter") as PaymentStatusEnum) || undefined,
    };

    setSearchKey(searchParams.get("search") || "");

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getPaymentsAction(parameters));
    const queryString = cleanAndSerializeQueryParams(parameters);
    router.replace(`${pathname}?${queryString}`);
  }, [parameters, dispatch, router, pathname]);

  const getStatusTag = (status: string) => {
    switch (status) {
      case PaymentStatusEnum.PAID:
        return <Tag color="green">Đã thanh toán</Tag>;
      case PaymentStatusEnum.UNPAID:
        return <Tag color="red">Chưa thanh toán</Tag>;
      case PaymentStatusEnum.PARTIALLY_PAID:
        return <Tag color="pink">Đang nợ</Tag>;
      default:
        return <Tag>Không có trạng thái này</Tag>;
    }
  };

  const debouncedSearchKey = useCallback(
    debounce((value: string) => {
      setSearchKey(value);

      setParameters((prev) => ({
        ...prev,
        page: 1,
        search: value,
      }));
    }, 1000),
    []
  );

  const dataSource: DataType[] = dataPayments.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    fullName: item.fullName,
    studentCode: item.studentCode,
    room: `${item.room?.roomName} - ${item.room?.floor} - ${item.room?.roomBlock} - ${item.room?.roomType}`,
    contractType: `${item.contractType?.contractTitle} - ${
      item.contractType?.duration
    } ${
      (item.contractType?.unit === TimeUnitEnum.DAY && "Ngày") ||
      (item.contractType?.unit === TimeUnitEnum.MONTH && "Tháng") ||
      "Năm"
    }`,
    totalAmount: formatVND(item.totalAmount || 0),
    remainingAmount: formatVND(item.remainingAmount || 0),
    paidAmount: formatVND(item.paidAmount || 0),
    historyPayment: (
      <Button
        type="primary"
        icon={<HistoryOutlined />}
        ghost
        onClick={() => {
          setModalHistory(item._id);
          dispatch(getDetailPaymentAction(item._id));
        }}
        title="Lịch sử thanh toán"
      />
    ),
    status: getStatusTag(item.status),
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
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    invoice: item.adminId ? item.adminId?.userName : "Tự động",
    action: (
      <Space>
        <Button
          icon={<EyeOutlined />}
          type="primary"
          className="btn-view-custom"
          onClick={() => {
            setModalSeeMore(item._id);
            dispatch(getDetailPaymentAction(item._id));
          }}
          title="Chi tiết hóa đơn"
        />
        <Button
          icon={<MoneyCollectOutlined />}
          type="primary"
          onClick={() => {
            setModalPayment(item._id);
          }}
          disabled={item.remainingAmount === 0}
          title="Thanh toán hóa đơn"
        />
      </Space>
    ),
  }));

  const onChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedSearchKey(value);
  };

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

  const onChangeFilter = (value: PaymentStatusEnum | undefined) => {
    setParameters((prev) => ({
      ...prev,
      page: 1,
      filter: value,
    }));
  };

  const handlePayment = async () => {
    setIsPaymentLoading(true);

    const response = await dispatch(
      payBillByIdAction({
        paymentId: modalPayment as string,
        paymentMethod: formRef.getFieldValue("paymentMethod"),
        amount: parseVND(formRef.getFieldValue("amount") || "0"),
      })
    );

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Thanh toán hóa đơn thành công.");
      handleCancel();
      dispatch(getPaymentsAction({}));
    }

    setIsPaymentLoading(false);
  };

  const handleCreatePayment = async () => {
    const response = await dispatch(createPaymentsAction());

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Tạo hóa đơn trong tháng thành công.");
      handleCancel();
      dispatch(getPaymentsAction({}));
    }
  };

  const handleCancel = () => {
    formRef.resetFields();
    setModalPayment(undefined);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent
        title="Danh sách hóa đơn"
        extra={[
          <Select
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            style={{ width: 160 }}
            placeholder="Tình trạng"
            allowClear
            options={filterPaymentStatusOptions}
            onChange={onChangeFilter}
            value={parameters.filter}
            maxTagCount="responsive"
          />,
          <Input
            key="search-payment"
            placeholder="Tìm kiếm hóa đơn..."
            onChange={onChangeSearchKey}
            prefix={<SearchOutlined />}
            defaultValue={searchKey}
          />,
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreatePayment}
          >
            Tạo hóa đơn
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={dataPayments.loading}
        pagination={false}
        scroll={{ x: "max-content" }}
        footer={() => [
          <Flex justify="flex-end" key="dataPayments">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataPayments.meta?.total}
              locale={customLocale}
            />
          </Flex>,
        ]}
      />

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

      {/* Lịch sử thanh toán */}
      <Modal
        title="Lịch sử thanh toán"
        open={modalHistory !== undefined}
        onCancel={() => setModalHistory(undefined)}
        centered
        footer={null}
      >
        <List
          locale={{
            emptyText: (
              <Empty
                description="Không có lịch sử nào"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
          dataSource={dataDetailPayment.data?.paymentHistory}
          renderItem={(item) => (
            <List.Item key={uuidv4()}>
              <List.Item.Meta
                title={getPaymentMethodLabel(item.paymentMethod)}
                description={
                  <>
                    <p>Số tiền thanh toán: {formatVND(item.amount || 0)} VNĐ</p>
                    <p>
                      {item.paymentDate &&
                        `Ngày thanh toán: ${dayjs(item.paymentDate).format(
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

      {/* Chi tiết hợp đồng */}
      <Modal
        title="Chi tiết hợp đồng"
        open={modalSeeMore !== undefined}
        onCancel={() => setModalSeeMore(undefined)}
        centered
        footer={null}
      >
        <div className="modal-see-more">
          <h4>Thông tin sinh viên</h4>
          <p>
            <span className="label">Mã số sinh viên: </span>
            {dataDetailPayment.data?.fullName}
          </p>
          <p>
            <span className="label">Họ và tên: </span>
            {dataDetailPayment.data?.fullName}
          </p>
          <p>
            <span className="label">Email: </span>
            {dataDetailPayment.data?.email}
          </p>
          <p>
            <span className="label">Số điện thoại: </span>
            {dataDetailPayment.data?.phoneNumber}
          </p>

          <h4>Thông tin phòng</h4>
          <p>
            <span className="label">Tên phòng: </span>
            {dataDetailPayment.data?.room?.roomName}
          </p>
          <p>
            <span className="label">Tầng: </span>
            {dataDetailPayment.data?.room?.floor}
          </p>
          <p>
            <span className="label">Loại phòng: </span>
            {dataDetailPayment.data?.room?.roomType}
          </p>
          <p>
            <span className="label">Dãy phòng: </span>
            {dataDetailPayment.data?.room?.roomBlock}
          </p>
          <p>
            <span className="label">Giá phòng: </span>
            {formatVND(dataDetailPayment.data?.room?.price || 0)} VNĐ
          </p>

          <h4>Dịch vụ phòng</h4>
          {dataDetailPayment.data?.services?.length > 0 ? (
            dataDetailPayment.data?.services?.map((item, index) => (
              <Flex key={index} align="flex-start" gap={4}>
                <p>{index + 1}.</p>
                <div>
                  <p>{item.name}</p>
                  <p>{formatVND(item.price || 0)} VNĐ</p>
                  <p>
                    {item.createdAt
                      ? `Ngày đăng ký dịch vụ: ${dayjs(item.createdAt).format(
                          "HH:mm - DD/MM/YYYY"
                        )}`
                      : "Hợp đồng chưa được phê duyệt"}
                  </p>
                </div>
              </Flex>
            ))
          ) : (
            <p>Chưa đăng ký dịch vụ nào</p>
          )}

          <h4>
            Tổng thanh toán:{" "}
            {formatVND(dataDetailPayment.data?.totalAmount || 0)} VNĐ
          </h4>

          <h4>
            Đã trả: {formatVND(dataDetailPayment.data?.paidAmount || 0)} VNĐ
          </h4>

          <h4>
            Số nợ: {formatVND(dataDetailPayment.data?.remainingAmount || 0)} VNĐ
          </h4>
        </div>
      </Modal>

      {/* Thanh toán hóa đơn */}
      <Modal
        title="Thanh toán hóa đơn"
        okText="Thanh toán"
        cancelText="Hủy"
        open={modalPayment !== undefined}
        onCancel={handleCancel}
        onOk={handlePayment}
        confirmLoading={isPaymentLoading}
        centered
      >
        <Form
          name="form-payment"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          form={formRef}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Hình thức thanh toán"
                name="paymentMethod"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức thanh toán!",
                  },
                ]}
              >
                <Select
                  getPopupContainer={(triggerNode) => triggerNode.parentNode}
                  placeholder="Chọn hình thức thanh toán"
                  allowClear
                  options={[
                    {
                      value: PaymentMethodEnum.BANK_TRANSFER,
                      label: "Chuyển khoản ngân hàng",
                    },
                    {
                      value: PaymentMethodEnum.CASH,
                      label: "Tiền mặt",
                    },
                  ]}
                  maxTagCount="responsive"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số tiền thanh toán (VNĐ)"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số tiền thanh toán!",
                  },
                ]}
              >
                <Input
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (
                      !(e.key >= "0" && e.key <= "9") && // Kiểm tra xem phím có phải là số không
                      e.key !== "Backspace" && // Cho phép phím Backspace
                      e.key !== "ArrowLeft" && // Cho phép phím mũi tên trái
                      e.key !== "ArrowRight" && // Cho phép phím mũi tên phải
                      e.key !== "Delete" // Cho phép phím Delete
                    ) {
                      e.preventDefault(); // Ngừng hành động mặc định nếu không phải phím hợp lệ
                    }
                  }}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const inputElement = e.currentTarget;

                    const value = inputElement.value.replace(/\D/g, ""); // Loại bỏ tất cả ký tự không phải số
                    inputElement.value = formatVND(Number(value)); // Format lại giá trị
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagePayments;
