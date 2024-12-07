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
import { PAGE_SIZE_OPTIONS, ParameterGet, SortEnum } from "@/utils/contants";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import dayjs from "dayjs";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import {
  deleteInfomationAction,
  getInfomationsAction,
  putInfomationAction,
} from "@/store/infomation/infomation.action";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  title: string;
  description: string;
  author: string;
  isActive: React.ReactNode;
  createdAt: string;
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
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Mô tả ngắn",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Người đăng",
    dataIndex: "author",
    key: "author",
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "isActive",
    key: "isActive",
    align: "center",
    width: 160,
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    width: 160,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 100,
  },
];

const ManageInfomations = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataInfomations } = useAppSelector((state) => state.infomationSlice);

  const [parameters, setParameters] = useState<ParameterGet>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
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
    };

    setSearchKey(searchParams.get("search") || "");

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getInfomationsAction(parameters));
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

  const dataSource: DataType[] = dataInfomations.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    title:
      item.title?.length > 30 ? `${item.title?.slice(0, 30)}...` : item.title,
    description:
      item.description?.length > 40
        ? `${item.description?.slice(0, 40)}...`
        : item.description,
    author: item.adminId?.userName,
    isActive: (
      <Switch
        checkedChildren="Bật"
        unCheckedChildren="Tắt"
        checked={item.isActive}
        onChange={async (checked) => {
          await dispatch(
            putInfomationAction({ id: item._id, isActive: checked })
          );
        }}
      />
    ),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
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

    const response = await dispatch(deleteInfomationAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa thông tin thành công.");
      setModalDelete(undefined);
      dispatch(getInfomationsAction({}));
    }

    setIsDeleteLoading(false);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent
        title="Danh sách thông tin"
        extra={[
          <Input
            key="search-infomation-name"
            placeholder="Tìm kiếm thông tin..."
            onChange={onChangeSearchKey}
            prefix={<SearchOutlined />}
            defaultValue={searchKey}
          />,
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push(`${pathname}/them-moi`)}
          >
            Thêm thông tin mới
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={dataInfomations.loading}
        pagination={false}
        footer={() => [
          <Flex justify="flex-end" key="dataInfomations">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataInfomations.meta?.total}
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
        <p>Bạn có chắc chắn muốn xóa thông tin này không?</p>
      </Modal>
    </div>
  );
};

export default ManageInfomations;
