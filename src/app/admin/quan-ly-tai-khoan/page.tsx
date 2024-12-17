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
  Tag,
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
  deleteUserAction,
  getUsersAction,
  putUserAction,
} from "@/store/users/users.action";
import { RoleAuth } from "@/store/auth/auth.type";
import { ParameterGetUser } from "@/store/users/users.type";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  userName: string;
  phoneNumber: string;
  email: string;
  role: React.ReactNode;
  isBlocked: React.ReactNode;
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
    title: "Họ và tên",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 160,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 160,
  },
  {
    title: "Quyền truy cập",
    dataIndex: "role",
    key: "role",
    align: "center",
    width: 150,
  },
  {
    title: "Đã khóa",
    dataIndex: "isBlocked",
    key: "isBlocked",
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

const ManageUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataUsers } = useAppSelector((state) => state.usersSlice);

  const [parameters, setParameters] = useState<ParameterGetUser>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    role: (searchParams.get("role") as RoleAuth) || RoleAuth.STUDENT,
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
      role: (searchParams.get("role") as RoleAuth) || RoleAuth.STUDENT,
    };

    setSearchKey(searchParams.get("search") || "");

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getUsersAction(parameters));
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

  const dataSource: DataType[] = dataUsers.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    userName: item.userName,
    phoneNumber: item.phoneNumber,
    email: item.email,
    role: (item.role === RoleAuth.ADMIN && (
      <Tag color="orange">Quản trị viên</Tag>
    )) ||
      (item.role === RoleAuth.MODERATOR && (
        <Tag color="green">Nhân viên</Tag>
      )) || <Tag color="blue">Sinh viên</Tag>,
    isBlocked: (
      <Switch
        checkedChildren="Bình thường"
        unCheckedChildren="Đã khóa"
        checked={!item.isBlocked}
        disabled={item.role === RoleAuth.ADMIN}
        onChange={async (checked) => {
          await dispatch(
            putUserAction({
              id: item._id,
              isBlocked: !checked,
            })
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
          disabled={item.role === RoleAuth.ADMIN}
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

    const response = await dispatch(deleteUserAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa tài khoản thành công.");
      setModalDelete(undefined);
      dispatch(getUsersAction({}));
    }

    setIsDeleteLoading(false);
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent
        title="Danh sách tài khoản"
        extra={[
          <Select
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            placeholder="Lọc tài khoản"
            style={{ minWidth: 150 }}
            value={parameters.role}
            options={[
              {
                label: "Sinh viên",
                value: RoleAuth.STUDENT,
              },
              {
                label: "Nhân viên",
                value: RoleAuth.MODERATOR,
              },
              {
                label: "Quản trị viên",
                value: RoleAuth.ADMIN,
              },
            ]}
            onSelect={(value) =>
              setParameters((prev) => ({
                ...prev,
                role: value,
              }))
            }
          />,
          <Input
            key="search-user-name"
            placeholder="Tìm kiếm tài khoản..."
            onChange={onChangeSearchKey}
            prefix={<SearchOutlined />}
            defaultValue={searchKey}
          />,
          parameters.role === RoleAuth.MODERATOR && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push(`${pathname}/them-moi`)}
            >
              Thêm nhân viên mới
            </Button>
          ),
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={dataUsers.loading}
        pagination={false}
        footer={() => [
          <Flex justify="flex-end" key="dataUsers">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataUsers.meta?.total}
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
        <p>Bạn có chắc chắn muốn xóa tài khoản này không?</p>
      </Modal>
    </div>
  );
};

export default ManageUser;
