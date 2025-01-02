"use client";
import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useAppDispatch, useAppSelector } from "@/store";
import { PAGE_SIZE_OPTIONS, ParameterGet, SortEnum } from "@/utils/contants";
import {
  Button,
  Flex,
  Form,
  message,
  Modal,
  Pagination,
  PaginationProps,
  Select,
  Space,
  Table,
  TableProps,
  Tooltip,
  UploadFile,
} from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";
import {
  getDetailIncidentAction,
  getIncidentsAction,
  putIncidentAction,
} from "@/store/incidents/incidents.action";
import isEqual from "lodash/isEqual";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { IncidentStatus } from "@/store/incidents/incidents.type";
import TextArea from "antd/es/input/TextArea";
import UploadMultiImage from "@/components/uploads/UploadMultiImage/UploadMultiImage";
import { v4 as uuidv4 } from "uuid";
import {
  filterIncidentStatusOptions,
  getIncidentStatusLabel,
} from "@/utils/getIncidentStatusLabel";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

interface DataType {
  id: string;
  stt: number;
  key: string;
  userName: string;
  description: React.ReactNode;
  status: React.ReactNode;
  createdAt: string;
  resolvedAt: string | undefined;
  adminId: string | undefined;
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
    title: "Tên đăng nhập",
    dataIndex: "userName",
    key: "userName",
    align: "center",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: 180,
  },
  {
    title: "Ngày báo cáo",
    dataIndex: "createdAt",
    key: "createdAt",
    align: "center",
    width: 160,
  },
  {
    title: "Ngày giải quyết",
    dataIndex: "resolvedAt",
    key: "resolvedAt",
    align: "center",
    width: 160,
  },
  {
    title: "Người giải quyết",
    dataIndex: "adminId",
    key: "adminId",
    align: "center",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
];

const ManageIncidents = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [modalSeeMore, setModalSeeMore] = useState<string | undefined>(
    undefined
  );
  const [currentMultiFile, setCurrentMultiFile] = useState<UploadFile[]>([]);

  const { dataIncidents, dataDetailIncident } = useAppSelector(
    (state) => state.incidentsSlice
  );

  const [parameters, setParameters] = useState<ParameterGet>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
  });

  useEffect(() => {
    const { images } = dataDetailIncident.data;

    if (images && images?.length > 0) {
      setCurrentMultiFile(
        images?.map((item) => ({
          name: uuidv4(),
          uid: uuidv4(),
          url: item,
          status: "done",
        })) || []
      );
    }
  }, [dataDetailIncident.data]);

  useEffect(() => {
    const newParam = {
      sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
      limit: Number(searchParams.get("limit")) || undefined,
      page: Number(searchParams.get("page")) || undefined,
    };

    if (!isEqual(newParam, parameters)) {
      setParameters(newParam);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getIncidentsAction(parameters));
    const queryString = cleanAndSerializeQueryParams(parameters);
    router.replace(`${pathname}?${queryString}`);
  }, [parameters, dispatch, router, pathname]);

  const handleStatusChange = async (id: string, value: string) => {
    const response = await dispatch(
      putIncidentAction({
        id,
        status: value as IncidentStatus,
      })
    );

    if (response?.payload?.error) {
      messageApi.error(response.payload.error);
    } else {
      messageApi.success("Cập nhật trạng thái thành công.");
      dispatch(getIncidentsAction({}));
    }
  };

  const dataSource: DataType[] = dataIncidents.data.map((item, index) => ({
    id: item._id,
    key: item._id,
    stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
    userName: item.userId.userName,
    description: (
      <Tooltip placement="top" title={item.description}>
        {item.description?.length > 30
          ? `${item.description?.slice(0, 30)}...`
          : item.description}
      </Tooltip>
    ),
    status: (
      <Select
        options={filterIncidentStatusOptions}
        style={{ width: "100%" }}
        defaultValue={item.status}
        onChange={(value) => handleStatusChange(item._id, value)}
        disabled={item.status === IncidentStatus.RESOLVED}
      />
    ),
    createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
    resolvedAt:
      item.resolvedAt && dayjs(item.resolvedAt).format("HH:mm - DD/MM/YYYY "),
    adminId: item.adminId?.userName,
    action: (
      <Space>
        <Button
          icon={<EyeOutlined />}
          type="primary"
          className="btn-view-custom"
          onClick={() => {
            setModalSeeMore(item._id);
            dispatch(getDetailIncidentAction(item._id));
          }}
          title="Chi tiết sự cố"
        />
      </Space>
    ),
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

  return (
    <div>
      {contextHolder}

      <HeadAdminContent title="Danh sách sự cố" />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        bordered
        loading={dataIncidents.loading}
        pagination={false}
        footer={() => [
          <Flex justify="flex-end" key="dataPayments">
            <Pagination
              current={parameters.page || 1}
              showSizeChanger
              pageSize={parameters.limit || 10}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onChange={onChangePagination}
              total={dataIncidents.meta?.total}
              locale={customLocale}
            />
          </Flex>,
        ]}
      />

      {/* Chi tiết sự cố */}
      <Modal
        title="Chi tiết sự cố"
        open={modalSeeMore !== undefined}
        onCancel={() => setModalSeeMore(undefined)}
        centered
        footer={null}
        width={600}
      >
        <Form
          name="form-incident"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
        >
          <div className="modal-see-more">
            <p>
              <span className="label">Người báo cáo sự cố: </span>
              {dataDetailIncident.data?.userId?.userName}
            </p>

            <p>
              <span className="label">Ngày báo cáo: </span>
              {dayjs(dataDetailIncident.data?.createdAt).format(
                "HH:mm - DD/MM/YYYY "
              )}
            </p>

            <p>
              <span className="label">Mô tả sự cố: </span>
            </p>
            <TextArea
              disabled
              rows={4}
              value={dataDetailIncident.data?.description}
            />

            <p>
              <span className="label">Hình ảnh mô tả: </span>
            </p>
            <UploadMultiImage
              disabled={true}
              currentFileList={currentMultiFile}
              onChange={setCurrentMultiFile}
            />

            <p>
              <span className="label">Trạng thái: </span>
              {getIncidentStatusLabel(dataDetailIncident.data?.status)}
            </p>

            <p>
              <span className="label">Ngày giải quyết: </span>
              {dataDetailIncident.data?.resolvedAt &&
                dayjs(dataDetailIncident.data?.resolvedAt).format(
                  "HH:mm - DD/MM/YYYY "
                )}
            </p>

            <p>
              <span className="label">Được giải quyết bởi: </span>
              {dataDetailIncident.data?.adminId?.userName}
            </p>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageIncidents;
