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
  Table,
  TableProps,
  Upload,
} from "antd";
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
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
  deleteStudentAction,
  getStudentsAction,
  importStudentsAction,
} from "@/store/students/students.action";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  studentCode: string;
  fullName: string;
  gender: string;
  takeClass: string;
  department: string;
  enrollmentYear: string;
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
    title: "Mã số sinh viên",
    dataIndex: "studentCode",
    key: "studentCode",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Lớp",
    dataIndex: "takeClass",
    key: "takeClass",
  },
  {
    title: "Phòng - Khoa",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Năm tuyển sinh",
    dataIndex: "enrollmentYear",
    key: "enrollmentYear",
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

const ManageStudent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { dataStudents } = useAppSelector((state) => state.studentsSlice);

  const [parameters, setParameters] = useState<ParameterGet>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
  });
  const [searchKey, setSearchKey] = useState<string>("");

  const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isModalImportFile, setModalImportFile] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);

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
    dispatch(getStudentsAction(parameters));
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

  const dataSource: DataType[] = dataStudents.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    studentCode: item.studentCode,
    fullName: item.fullName,
    gender: item.gender === "NAM" ? "Nam" : " Nữ",
    takeClass: item.takeClass,
    department: item.department,
    enrollmentYear: item.enrollmentYear,
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

    const response = await dispatch(deleteStudentAction(id));

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Xóa sinh viên thành công.");
      setModalDelete(undefined);
      dispatch(getStudentsAction({}));
    }

    setIsDeleteLoading(false);
  };

  const handleUploadChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFile(info.fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const handleImportFile = async () => {
    if (!file) {
      message.error("Vui lòng chọn file để tải lên.");
      return;
    }

    const response = await dispatch(importStudentsAction(file));
    if (response.payload?.error) {
      messageApi.error(response.payload?.error);
    } else {
      messageApi.success("Import danh sách sinh viên thành công.");
      setFile(null);
      setModalImportFile(false);
      dispatch(getStudentsAction({}));
    }
  };

  return (
    <div>
      {contextHolder}

      <HeadAdminContent
        title="Danh sách sinh viên"
        extra={[
          <Input
            key="search-student-name"
            placeholder="Tìm kiếm tên sinh viên..."
            onChange={onChangeSearchKey}
            prefix={<SearchOutlined />}
            defaultValue={searchKey}
          />,
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push(`${pathname}/them-moi`)}
          >
            Thêm sinh viên mới
          </Button>,
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => {
              setFile(null);
              setModalImportFile(true);
            }}
          >
            Import danh sách sinh viên
          </Button>,
        ]}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={dataStudents.loading}
        pagination={false}
        footer={() => [
          <Flex justify="flex-end" key="dataStudents">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataStudents.meta?.total}
              locale={customLocale}
            />
          </Flex>,
        ]}
      />

      <Modal
        title="Import danh sách sinh viên"
        okText="Lưu"
        cancelText="Hủy"
        open={isModalImportFile}
        onOk={handleImportFile}
        onCancel={() => setModalImportFile(false)}
        confirmLoading={isDeleteLoading}
      >
        <Flex vertical gap={8}>
          <Upload maxCount={1} onChange={handleUploadChange}>
            <Button block icon={<CloudUploadOutlined />}>
              Tải danh sách sinh viên
            </Button>
          </Upload>

          <Button type="dashed" icon={<CloudDownloadOutlined />}>
            <a href="/files/mau_danh_sach_sinh_vien_excel.xlsx" download>
              Mẫu danh sách sinh viên
            </a>
          </Button>
        </Flex>
      </Modal>

      <Modal
        title="Xóa dữ liệu"
        okText="Xóa"
        cancelText="Hủy"
        open={modalDelete !== undefined}
        onOk={() => handleDelete(modalDelete!)}
        onCancel={() => setModalDelete(undefined)}
        confirmLoading={isDeleteLoading}
      >
        <p>Bạn có chắc chắn muốn xóa sinh viên này không?</p>
      </Modal>
    </div>
  );
};

export default ManageStudent;
