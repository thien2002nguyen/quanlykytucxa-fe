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
import { PAGE_SIZE_OPTIONS, SortEnum } from "@/utils/contants";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import dayjs from "dayjs";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import {
  deleteRoomAction,
  getRoomsAction,
  putRoomAction,
} from "@/store/rooms/rooms.action";
import { FilterRoomEnum, ParameterGetRoom } from "@/store/rooms/rooms.type";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  roomName: string;
  maximumCapacity: number;
  registeredStudents: number;
  floor: number;
  roomBlock: string;
  roomType: string;
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
    title: "Tên phòng",
    dataIndex: "roomName",
    key: "roomName",
  },
  {
    title: "Sức chứa",
    dataIndex: "maximumCapacity",
    key: "maximumCapacity",
    align: "center",
  },
  {
    title: "Đang ở",
    dataIndex: "registeredStudents",
    key: "registeredStudents",
    align: "center",
  },
  {
    title: "Dãy phòng",
    dataIndex: "roomBlock",
    key: "roomBlock",
  },
  {
    title: "Tầng",
    dataIndex: "floor",
    key: "floor",
  },
  {
    title: "Loại phòng",
    dataIndex: "roomType",
    key: "roomType",
  },
  {
    title: "Trạng thái",
    dataIndex: "isActive",
    key: "isActive",
    align: "center",
    width: 120,
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

const ManageRooms = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataRooms } = useAppSelector((state) => state.roomsSlice);

  const [parameters, setParameters] = useState<ParameterGetRoom>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    filter: (searchParams.get("filter") as FilterRoomEnum) || undefined,
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
      filter: (searchParams.get("filter") as FilterRoomEnum) || undefined,
    };

    setSearchKey(searchParams.get("search") || "");

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getRoomsAction(parameters));
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

  const dataSource: DataType[] = dataRooms.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    roomName: item.roomName,
    maximumCapacity: item.maximumCapacity,
    registeredStudents: item.registeredStudents,
    roomBlock: item.roomBlockId?.name,
    floor: item.floor,
    roomType: item.roomTypeId?.type,
    isActive: (
      <Switch
        checkedChildren="Bật"
        unCheckedChildren="Tắt"
        checked={item.isActive}
        onChange={async (checked) => {
          await dispatch(putRoomAction({ id: item._id, isActive: checked }));
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

    const response = await dispatch(deleteRoomAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa phòng thành công.");
      setModalDelete(undefined);
      dispatch(getRoomsAction({}));
    }

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
        loading={dataRooms.loading}
        pagination={false}
        footer={() => [
          <Flex justify="flex-end" key="dataRooms">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataRooms.meta?.total}
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

export default ManageRooms;
