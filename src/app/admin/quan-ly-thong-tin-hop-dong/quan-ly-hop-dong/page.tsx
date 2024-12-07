"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import {
  Button,
  Flex,
  Input,
  message,
  Modal,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Switch,
  Table,
  TableProps,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
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
import {
  ParameterGetContract,
  StatusEnum,
} from "@/store/contracts/contracts.type";
import { getContractsAction } from "@/store/contracts/contracts.action";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  studentCode: string;
  room: string;
  contractType: string;
  status: React.ReactNode;
  createdAt: string;
  startDate: string;
  endDate: string;
  action: React.ReactNode;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    align: "center",
    width: 60,
  },
  {
    title: "Mã số sinh viên",
    dataIndex: "studentCode",
    key: "studentCode",
  },
  {
    title: "Phòng",
    dataIndex: "room",
    key: "room",
  },
  {
    title: "Loại hợp đồng",
    dataIndex: "contractType",
    key: "contractType",
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Ngày đăng ký",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    width: 120,
  },
  {
    title: "Ngày xét duyệt",
    dataIndex: "startDate",
    key: "startDate",
    align: "center",
    width: 120,
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "endDate",
    key: "endDate",
    align: "center",
    width: 120,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 100,
  },
];

const ManageContracts = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataContracts } = useAppSelector((state) => state.contractsSlice);

  const [parameters, setParameters] = useState<ParameterGetContract>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    filter: (searchParams.get("filter") as StatusEnum) || undefined,
  });
  const [searchKey, setSearchKey] = useState<string>("");

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    const newParam = {
      sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
      search: searchParams.get("search") || undefined,
      limit: Number(searchParams.get("limit")) || undefined,
      page: Number(searchParams.get("page")) || undefined,
      filter: (searchParams.get("filter") as StatusEnum) || undefined,
    };

    setSearchKey(searchParams.get("search") || "");

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getContractsAction(parameters));
    const queryString = cleanAndSerializeQueryParams(parameters);
    router.replace(`${pathname}?${queryString}`);
  }, [parameters, dispatch, router, pathname]);

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

  const dataSource: DataType[] = dataContracts.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    studentCode: item.studentCode,
    room: item.room?.roomName,
    contractType: `${item.contractType?.title} - ${item.contractType?.duration} ${item.contractType.unit}`,
    status: <Select style={{ width: "120px" }} />,
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    startDate: dayjs(item.startDate).format("HH:mm - DD/MM/YYYY "),
    endDate: dayjs(item.endDate).format("HH:mm - DD/MM/YYYY "),
    action: (
      <Space>
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={() => {
            router.push(`${pathname}/${item._id}`);
          }}
        />
        <Button
          icon={<DeleteOutlined />}
          danger
          type="primary"
          onClick={() => setModalDelete(item._id)}
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

  const handleDelete = async (id: string) => {
    setIsDeleteLoading(true);

    // const response = await dispatch(deleteRoomAction(id));

    // if (response?.payload?.error) {
    //   messageApi.error(response.payload.error);
    // } else {
    //   messageApi.success("Xóa phòng thành công.");
    //   setModalDelete(undefined);
    //   dispatch(getRoomsAction({}));
    // }

    setIsDeleteLoading(false);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent
        title="Danh sách phòng"
        extra={[
          <Input
            key="search-room-name"
            placeholder="Tìm kiếm tên phòng..."
            onChange={onChangeSearchKey}
            prefix={<SearchOutlined />}
            defaultValue={searchKey}
          />,
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push(`${pathname}/them-moi`)}
          >
            Thêm phòng mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={dataContracts.loading}
        pagination={false}
        footer={() => [
          <Flex justify="flex-end" key="dataContracts">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataContracts.meta?.total}
              locale={customLocale}
            />
          </Flex>,
        ]}
      />

      <Modal
        title="Xóa dữ liệu"
        okText="Xóa"
        cancelText="Hủy"
        open={modalDelete !== undefined}
        onOk={() => handleDelete(modalDelete!)}
        onCancel={() => setModalDelete(undefined)}
        confirmLoading={isDeleteLoading}
        centered
      >
        <p>Bạn có chắc chắn muốn xóa phòng này không?</p>
      </Modal>
    </div>
  );
};

export default ManageContracts;
