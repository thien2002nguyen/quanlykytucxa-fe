// "use client";

// import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
// import {
//   Button,
//   Empty,
//   Flex,
//   Input,
//   List,
//   message,
//   Modal,
//   Pagination,
//   PaginationProps,
//   Popover,
//   Select,
//   Space,
//   Table,
//   TableProps,
//   Tag,
// } from "antd";
// import {
//   ApiOutlined,
//   BellOutlined,
//   DeleteOutlined,
//   DisconnectOutlined,
//   EyeOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import React, { useCallback, useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store";
// import { PAGE_SIZE_OPTIONS, SortEnum } from "@/utils/contants";
// import isEqual from "lodash/isEqual";
// import debounce from "lodash/debounce";
// import dayjs from "dayjs";
// import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
// import {
//   ParameterGetContract,
//   StatusEnum,
// } from "@/store/contracts/contracts.type";
// import {
//   cancelContractAction,
//   cancelRoomServiceAction,
//   checkInRoomAction,
//   checkOutRoomAction,
//   confirmContractAction,
//   deleteContractAction,
//   getContractsAction,
//   getDetailContractAction,
// } from "@/store/contracts/contracts.action";
// import { TimeUnitEnum } from "@/store/contract-types/contract-types.type";
// import "./style.scss";
// import { GenderEnum } from "@/store/students/students.type";
// import { formatVND } from "@/utils/formatMoney";
// import { formatSchedule } from "@/utils/formatSchedule";
// import { filterStatusOptions } from "@/utils/getStatusLabel";

// const customLocale: PaginationProps["locale"] = {
//   items_per_page: "/ Trang",
// };

// interface DataType {
//   id: string;
//   stt: number;
//   key: string;
//   fullName: string;
//   studentCode: string;
//   room: string;
//   contractType: string;
//   status: React.ReactNode;
//   serviceStatus: React.ReactNode | undefined;
//   createdAt: string;
//   approvedDate: string | undefined;
//   adminId: string | undefined;
//   startDate: string | undefined;
//   endDate: string | undefined;
//   checkInDate: string | React.ReactNode | undefined;
//   checkOutDate: string | React.ReactNode | undefined;
//   action: React.ReactNode;
// }

// const columns: TableProps<DataType>["columns"] = [
//   {
//     title: "STT",
//     dataIndex: "stt",
//     key: "stt",
//     align: "center",
//     width: 60,
//     className: "nowrap-column",
//   },
//   {
//     title: "Họ và tên",
//     dataIndex: "fullName",
//     key: "fullName",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Mã số sinh viên",
//     dataIndex: "studentCode",
//     key: "studentCode",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Phòng",
//     dataIndex: "room",
//     key: "room",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Loại",
//     dataIndex: "contractType",
//     key: "contractType",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Trạng thái",
//     dataIndex: "status",
//     key: "status",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Trạng thái dịch vụ",
//     dataIndex: "serviceStatus",
//     key: "serviceStatus",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Ngày đăng ký",
//     dataIndex: "createdAt",
//     key: "createdAt",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Ngày duyệt",
//     dataIndex: "approvedDate",
//     key: "approvedDate",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Người duyệt",
//     dataIndex: "adminId",
//     key: "adminId",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Ngày bắt đầu",
//     dataIndex: "startDate",
//     key: "startDate",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Ngày kết thúc",
//     dataIndex: "endDate",
//     key: "endDate",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Ngày nhận phòng",
//     dataIndex: "checkInDate",
//     key: "checkInDate",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Ngày trả phòng",
//     dataIndex: "checkOutDate",
//     key: "checkOutDate",
//     align: "center",
//     className: "nowrap-column",
//   },
//   {
//     title: "Thao tác",
//     dataIndex: "action",
//     key: "action",
//     align: "center",
//     className: "nowrap-column",
//   },
// ];

// const ManagePayments = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const dispatch = useAppDispatch();
//   const [messageApi, contextHolder] = message.useMessage();

//   const { dataDetailContract, dataContracts } = useAppSelector(
//     (state) => state.contractsSlice
//   );

//   const [parameters, setParameters] = useState<ParameterGetContract>({
//     sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
//     search: searchParams.get("search") || undefined,
//     limit: Number(searchParams.get("limit")) || undefined,
//     page: Number(searchParams.get("page")) || undefined,
//     filter: (searchParams.get("filter") as StatusEnum) || undefined,
//   });
//   const [searchKey, setSearchKey] = useState<string>("");

//   const [modalDelete, setModalDelete] = useState<string | undefined>(undefined);
//   const [modalCancel, setModalCancel] = useState<string | undefined>(undefined);
//   const [modalCheckIn, setModalCheckIn] = useState<string | undefined>(
//     undefined
//   );
//   const [modalCheckOut, setModalCheckOut] = useState<string | undefined>(
//     undefined
//   );
//   const [modalSeeMore, setModalSeeMore] = useState<string | undefined>(
//     undefined
//   );
//   const [modalConfirm, setModalConfirm] = useState<string | undefined>(
//     undefined
//   );
//   const [modalService, setModalService] = useState<string | undefined>(
//     undefined
//   );
//   const [cancelService, setCancelService] = useState<string | undefined>(
//     undefined
//   );

//   const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
//   const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
//   const [isCheckInLoading, setIsCheckInLoading] = useState<boolean>(false);
//   const [isCheckOutLoading, setIsCheckOutLoading] = useState<boolean>(false);
//   const [isCancelContractLoading, setIsCancelContractLoading] =
//     useState<boolean>(false);

//   useEffect(() => {
//     const newParam = {
//       sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
//       search: searchParams.get("search") || undefined,
//       limit: Number(searchParams.get("limit")) || undefined,
//       page: Number(searchParams.get("page")) || undefined,
//       filter: (searchParams.get("filter") as StatusEnum) || undefined,
//     };

//     setSearchKey(searchParams.get("search") || "");

//     if (!isEqual(newParam, parameters)) {
//       setParameters(newParam);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     dispatch(getContractsAction(parameters));
//     const queryString = cleanAndSerializeQueryParams(parameters);
//     router.replace(`${pathname}?${queryString}`);
//   }, [parameters, dispatch, router, pathname]);

//   const getStatusTag = (id: string, status: string, endDate: string) => {
//     const now = dayjs();
//     const contractEndDate = dayjs(endDate);

//     // Kiểm tra nếu hợp đồng hết hạn và trạng thái là CONFIRMED hoặc PENDING_CANCELLATION
//     if (
//       contractEndDate.isBefore(now) &&
//       (status === StatusEnum.CONFIRMED ||
//         status === StatusEnum.PENDING_CANCELLATION)
//     ) {
//       return <Tag color="purple">Đã hết hạn</Tag>;
//     }

//     switch (status) {
//       case StatusEnum.PENDING:
//         return (
//           <Flex align="center" justify="center" gap={4}>
//             <Tag color="orange">Đang chờ xác nhận</Tag>
//             <Button
//               icon={<ApiOutlined />}
//               type="primary"
//               onClick={() => setModalConfirm(id)}
//               title="Duyệt"
//             />
//           </Flex>
//         );
//       case StatusEnum.CONFIRMED:
//         return <Tag color="green">Đã xác nhận</Tag>;
//       case StatusEnum.PENDING_CANCELLATION:
//         return (
//           <Flex align="center" justify="center" gap={4}>
//             <Tag color="pink">Đang chờ hủy</Tag>
//             <Button
//               icon={<DisconnectOutlined />}
//               type="primary"
//               ghost
//               onClick={() => setModalCancel(id)}
//               title="Duyệt"
//             />
//           </Flex>
//         );
//       case StatusEnum.CANCELLED:
//         return <Tag color="red">Đã hủy</Tag>;
//       case StatusEnum.EXPIRED:
//         return <Tag color="purple">Đã hết hạn</Tag>;
//       default:
//         return <Tag>Không có trạng thái này</Tag>;
//     }
//   };

//   const debouncedSearchKey = useCallback(
//     debounce((value: string) => {
//       setSearchKey(value);

//       setParameters((prev) => ({
//         ...prev,
//         page: 1,
//         search: value,
//       }));
//     }, 1000),
//     []
//   );

//   const dataSource: DataType[] = dataContracts.data.map((item, index) => ({
//     id: item._id,
//     key: item._id,
//     stt: ((parameters?.page || 1) - 1) * (parameters?.limit || 10) + index + 1,
//     fullName: item.fullName,
//     studentCode: item.studentCode,
//     room: item.room?.roomId?._id
//       ? `${item.room?.roomId?.roomName} - ${item.room?.roomId?.floor} - ${item.room?.roomId?.roomBlockId?.name} - ${item.room?.roomId?.roomTypeId?.type}`
//       : "Phòng ký túc xá",
//     contractType: `${
//       item.contractType?.contractTypeId?.title || "Loại hợp đồng ký túc xá"
//     } - ${item.contractType?.duration} ${
//       (item.contractType?.unit === TimeUnitEnum.DAY && "Ngày") ||
//       (item.contractType?.unit === TimeUnitEnum.MONTH && "Tháng") ||
//       "Năm"
//     }`,
//     status: getStatusTag(item._id, item.status, item.endDate || ""),
//     serviceStatus: (
//       <Button
//         type="primary"
//         icon={<BellOutlined />}
//         className="btn-service-room"
//         onClick={() => {
//           setModalService(item._id);
//           dispatch(getDetailContractAction(item._id));
//         }}
//         title="Danh sách dịch vụ"
//       />
//     ),
//     createdAt: dayjs(item.createdAt).format("HH:mm - DD/MM/YYYY "),
//     approvedDate:
//       item.approvedDate &&
//       dayjs(item.approvedDate).format("HH:mm - DD/MM/YYYY "),
//     adminId: item.adminId?.userName,
//     startDate: item.startDate && dayjs(item.startDate).format("DD/MM/YYYY "),
//     endDate: item.endDate && dayjs(item.endDate).format("DD/MM/YYYY "),
//     checkInDate: item.checkInDate
//       ? dayjs(item.checkInDate).format("HH:mm - DD/MM/YYYY ")
//       : (item.status === StatusEnum.CONFIRMED ||
//           item.status === StatusEnum.PENDING_CANCELLATION) && (
//           <Button
//             type="primary"
//             icon={<ApiOutlined />}
//             title="Đã nhận phòng"
//             onClick={() => setModalCheckIn(item._id)}
//           />
//         ),
//     checkOutDate: item.checkOutDate
//       ? dayjs(item.checkOutDate).format("HH:mm - DD/MM/YYYY ")
//       : item.checkInDate && (
//           <Button
//             type="primary"
//             icon={<ApiOutlined />}
//             title="Đã trả phòng"
//             onClick={() => setModalCheckOut(item._id)}
//           />
//         ),
//     action: (
//       <Space>
//         <Button
//           icon={<EyeOutlined />}
//           type="primary"
//           className="btn-view-contract"
//           onClick={() => {
//             setModalSeeMore(item._id);
//             dispatch(getDetailContractAction(item._id));
//           }}
//           title="Xem hợp đồng"
//         />
//         <Button
//           icon={<DisconnectOutlined />}
//           ghost
//           type="primary"
//           onClick={() => setModalCancel(item._id)}
//           disabled={item.status === StatusEnum.CANCELLED}
//           title="Hủy hợp đồng"
//         />
//         <Button
//           icon={<DeleteOutlined />}
//           danger
//           type="primary"
//           onClick={() => setModalDelete(item._id)}
//           disabled={item.status !== StatusEnum.PENDING}
//           title="Xóa hợp đồng"
//         />
//       </Space>
//     ),
//   }));

//   const onChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     debouncedSearchKey(value);
//   };

//   const onChangePagination: PaginationProps["onChange"] = (
//     pageNumber,
//     pageSize
//   ) => {
//     setParameters({
//       ...parameters,
//       page: pageNumber,
//       limit: pageSize,
//     });
//   };

//   const handleConfirmContract = async (id: string) => {
//     setIsConfirmLoading(true);

//     const response = await dispatch(confirmContractAction(id));
//     if (response?.payload?.error) {
//       messageApi.error(response?.payload?.error);
//     } else {
//       messageApi.success("Duyệt hợp đồng thành công.");
//       setModalConfirm(undefined);
//       dispatch(getContractsAction({}));
//     }

//     setIsConfirmLoading(false);
//   };

//   const handleDelete = async (id: string) => {
//     setIsDeleteLoading(true);

//     const response = await dispatch(deleteContractAction(id));

//     if (response?.payload?.error) {
//       messageApi.error(response.payload.error);
//     } else {
//       messageApi.success("Xóa hợp đồng thành công.");
//       setModalDelete(undefined);
//       dispatch(getContractsAction({}));
//     }

//     setIsDeleteLoading(false);
//   };

//   const handleCancel = async (id: string) => {
//     setIsCancelContractLoading(true);

//     const response = await dispatch(cancelContractAction(id));

//     if (response?.payload?.error) {
//       messageApi.error(response.payload.error);
//     } else {
//       messageApi.success("Hủy hợp đồng thành công.");
//       setModalCancel(undefined);
//       dispatch(getContractsAction({}));
//     }

//     setIsCancelContractLoading(false);
//   };

//   const handleCheckInRoom = async (id: string) => {
//     setIsCheckInLoading(true);

//     const response = await dispatch(checkInRoomAction(id));

//     if (response?.payload?.error) {
//       messageApi.error(response.payload.error);
//     } else {
//       messageApi.success("Cập nhật ngày nhận phòng thành công.");
//       setModalCheckIn(undefined);
//       dispatch(getContractsAction({}));
//     }

//     setIsCheckInLoading(false);
//   };

//   const handleCheckOutRoom = async (id: string) => {
//     setIsCheckOutLoading(true);

//     const response = await dispatch(checkOutRoomAction(id));

//     if (response?.payload?.error) {
//       messageApi.error(response.payload.error);
//     } else {
//       messageApi.success("Cập nhật ngày trả phòng thành công.");
//       setModalCheckOut(undefined);
//       dispatch(getContractsAction({}));
//     }

//     setIsCheckOutLoading(false);
//   };

//   const onChangeFilter = (value: StatusEnum | undefined) => {
//     setParameters((prev) => ({
//       ...prev,
//       page: 1,
//       filter: value,
//     }));
//   };

//   return (
//     <div>
//       {contextHolder}

//       <HeadAdminContent
//         title="Danh sách hợp đồng"
//         extra={[
//           <Select
//             getPopupContainer={(triggerNode) => triggerNode.parentNode}
//             style={{ width: 160 }}
//             placeholder="Tình trạng"
//             allowClear
//             options={filterStatusOptions}
//             onChange={onChangeFilter}
//             value={parameters.filter}
//             maxTagCount="responsive"
//           />,
//           <Input
//             key="search-contract"
//             placeholder="Tìm kiếm hợp đồng..."
//             onChange={onChangeSearchKey}
//             prefix={<SearchOutlined />}
//             defaultValue={searchKey}
//           />,
//         ]}
//       />

//       <Table
//         rowKey="id"
//         columns={columns}
//         dataSource={dataSource}
//         bordered
//         loading={dataContracts.loading}
//         pagination={false}
//         scroll={{ x: "max-content" }}
//         footer={() => [
//           <Flex justify="flex-end" key="dataContracts">
//             <Pagination
//               current={parameters.page || 1}
//               showSizeChanger
//               pageSize={parameters.limit || 10}
//               pageSizeOptions={PAGE_SIZE_OPTIONS}
//               onChange={onChangePagination}
//               total={dataContracts.meta?.total}
//               locale={customLocale}
//             />
//           </Flex>,
//         ]}
//       />

//       {/* Modal dịch vụ */}
//       <Modal
//         title="Danh sách dịch vụ"
//         open={modalService !== undefined}
//         onCancel={() => setModalService(undefined)}
//         centered
//         footer={null}
//       >
//         {
//           <List
//             locale={{
//               emptyText: (
//                 <Empty
//                   description="Không có dịch vụ nào"
//                   image={Empty.PRESENTED_IMAGE_SIMPLE}
//                 />
//               ),
//             }}
//             dataSource={dataDetailContract.data?.service}
//             renderItem={(item) => (
//               <List.Item key={item.serviceId?._id}>
//                 <List.Item.Meta
//                   title={
//                     item.serviceId?._id
//                       ? item.serviceId?.name
//                       : "Dịch vụ ký túc xá"
//                   }
//                   description={
//                     item.serviceId?._id ? (
//                       <>
//                         <p>{formatVND(item.serviceId?.price || 0)} VNĐ</p>
//                         <p>{formatSchedule(item.serviceId?.schedule)}</p>
//                         <p>
//                           {item.createdAt
//                             ? `Ngày đăng ký dịch vụ: ${dayjs(
//                                 item.createdAt
//                               ).format("HH:mm - DD/MM/YYYY")}`
//                             : "Hợp đồng chưa được phê duyệt"}
//                         </p>
//                       </>
//                     ) : (
//                       <p>Ngừng hoạt động</p>
//                     )
//                   }
//                 />
//                 <Flex gap={4}>
//                   <Popover
//                     content={
//                       <Flex gap={4}>
//                         <Button
//                           type="primary"
//                           ghost
//                           onClick={() => setCancelService(undefined)}
//                         >
//                           Để sau
//                         </Button>
//                         <Button
//                           type="primary"
//                           onClick={async () => {
//                             const response = await dispatch(
//                               cancelRoomServiceAction({
//                                 contractId: dataDetailContract.data?._id,
//                                 serviceId: cancelService as string,
//                               })
//                             );

//                             if (response?.payload?.error) {
//                               messageApi.error(response.payload.error);
//                             } else {
//                               messageApi.success("Hủy dịch vụ thành công.");
//                               dispatch(
//                                 getDetailContractAction(
//                                   dataDetailContract.data?._id
//                                 )
//                               );
//                               setCancelService(undefined);
//                             }
//                           }}
//                         >
//                           Hủy dịch vụ
//                         </Button>
//                       </Flex>
//                     }
//                     trigger="click"
//                     getPopupContainer={(triggerNode) => triggerNode}
//                     arrow={false}
//                     placement="topRight"
//                     open={cancelService === item.serviceId?._id}
//                     onOpenChange={() => setCancelService(undefined)}
//                   >
//                     <Button
//                       type="primary"
//                       icon={<DisconnectOutlined />}
//                       disabled={!item.serviceId?._id}
//                       onClick={() => {
//                         if (cancelService) {
//                           setCancelService(undefined);
//                         } else {
//                           setCancelService(item.serviceId?._id);
//                         }
//                       }}
//                     />
//                   </Popover>
//                 </Flex>
//               </List.Item>
//             )}
//           />
//         }
//       </Modal>

//       {/* Chi tiết hợp đồng */}
//       <Modal
//         title="Chi tiết hợp đồng"
//         open={modalSeeMore !== undefined}
//         onCancel={() => setModalSeeMore(undefined)}
//         centered
//         footer={null}
//       >
//         <div className="modal-see-more">
//           <h4>Thông tin sinh viên</h4>
//           {dataDetailContract.data?.studentInfomation?._id ? (
//             <>
//               <p>
//                 <span className="label">Họ và tên: </span>
//                 {dataDetailContract.data?.fullName}
//               </p>
//               <p>
//                 <span className="label">Căn cước công dân: </span>
//                 {dataDetailContract.data?.studentInfomation?.nationalIdCard}
//               </p>
//               <p>
//                 <span className="label">Giới tính: </span>
//                 {dataDetailContract.data?.studentInfomation?.gender ===
//                 GenderEnum.nam
//                   ? "Nam"
//                   : "Nữ"}
//               </p>
//               <p>
//                 <span className="label">Email: </span>
//                 {dataDetailContract.data?.email}
//               </p>
//               <p>
//                 <span className="label">Số điện thoại: </span>
//                 {dataDetailContract.data?.phoneNumber}
//               </p>
//               <p>
//                 <span className="label">Phòng (Khoa): </span>
//                 {dataDetailContract.data?.studentInfomation?.department}
//               </p>
//               <p>
//                 <span className="label">Lớp: </span>
//                 {dataDetailContract.data?.studentInfomation?.takeClass}
//               </p>
//               <p>
//                 <span className="label">Năm nhập học: </span>
//                 {dataDetailContract.data?.studentInfomation?.enrollmentYear}
//               </p>
//             </>
//           ) : (
//             <p>Thông tin sinh viên ký túc xá</p>
//           )}

//           <h4>Thông tin phòng</h4>
//           {dataDetailContract.data?.room?.roomId?._id ? (
//             <>
//               <p>
//                 <span className="label">Tên phòng: </span>
//                 {dataDetailContract.data?.room?.roomId?.roomName}
//               </p>
//               <p>
//                 <span className="label">Loại phòng: </span>
//                 {dataDetailContract.data?.room?.roomId?.roomTypeId?.type}
//               </p>
//               <p>
//                 <span className="label">Dãy phòng: </span>
//                 {dataDetailContract.data?.room?.roomId?.roomBlockId?.name}
//               </p>
//               <p>
//                 <span className="label">Sức chứa: </span>
//                 {dataDetailContract.data?.room?.roomId?.registeredStudents}/
//                 {dataDetailContract.data?.room?.roomId?.maximumCapacity} người
//               </p>
//               <p>
//                 <span className="label">Giá phòng: </span>
//                 {formatVND(
//                   dataDetailContract.data?.room?.roomId?.roomTypeId?.price || 0
//                 )}{" "}
//                 VNĐ
//               </p>
//             </>
//           ) : (
//             <p>Phòng ký túc xá - Ngừng hoạt động</p>
//           )}

//           <h4>Dịch vụ phòng</h4>
//           {dataDetailContract.data?.service?.length > 0 ? (
//             dataDetailContract.data?.service?.map((item, index) => (
//               <Flex key={index} align="flex-start" gap={4}>
//                 <p>{index + 1}.</p>
//                 <div>
//                   {item.serviceId?._id ? (
//                     <p>{item.serviceId?.name}</p>
//                   ) : (
//                     <p>Dịch vụ ký túc xá</p>
//                   )}
//                   {item.serviceId?._id ? (
//                     <>
//                       <p>{formatVND(item.serviceId?.price || 0)} VNĐ</p>
//                       <p>{formatSchedule(item.serviceId?.schedule)}</p>
//                       <p>
//                         {item.createdAt
//                           ? `Ngày đăng ký dịch vụ: ${dayjs(
//                               item.createdAt
//                             ).format("HH:mm - DD/MM/YYYY")}`
//                           : "Hợp đồng chưa được phê duyệt"}
//                       </p>
//                     </>
//                   ) : (
//                     <p>Ngừng hoạt động</p>
//                   )}
//                 </div>
//               </Flex>
//             ))
//           ) : (
//             <p>Chưa đăng ký dịch vụ nào</p>
//           )}
//         </div>
//       </Modal>

//       {/* Modal chức năng */}
//       <Modal
//         title="Đã nhận phòng"
//         okText="Xác nhận"
//         cancelText="Hủy"
//         open={modalCheckIn !== undefined}
//         onOk={() => handleCheckInRoom(modalCheckIn!)}
//         onCancel={() => setModalCheckIn(undefined)}
//         confirmLoading={isCheckInLoading}
//         centered
//       >
//         <p>Sinh viên đã nhận phòng?</p>
//       </Modal>

//       <Modal
//         title="Đã trả phòng"
//         okText="Xác nhận"
//         cancelText="Hủy"
//         open={modalCheckOut !== undefined}
//         onOk={() => handleCheckOutRoom(modalCheckOut!)}
//         onCancel={() => setModalCheckOut(undefined)}
//         confirmLoading={isCheckOutLoading}
//         centered
//       >
//         <p>Sinh viên đã trả phòng?</p>
//       </Modal>

//       <Modal
//         title="Duyệt hợp đồng"
//         okText="Xác nhận"
//         cancelText="Hủy"
//         open={modalConfirm !== undefined}
//         onOk={() => handleConfirmContract(modalConfirm!)}
//         onCancel={() => setModalConfirm(undefined)}
//         confirmLoading={isConfirmLoading}
//         centered
//       >
//         <p>Bạn có chắc chắn muốn xét duyệt hợp đồng này không?</p>
//       </Modal>

//       <Modal
//         title="Hủy hợp đồng"
//         okText="Xác nhận"
//         cancelText="Hủy"
//         open={modalCancel !== undefined}
//         onOk={() => handleCancel(modalCancel!)}
//         onCancel={() => setModalCancel(undefined)}
//         confirmLoading={isCancelContractLoading}
//         centered
//       >
//         <p>Bạn có chắc chắn muốn hủy hợp đồng này không?</p>
//       </Modal>

//       <Modal
//         title="Xóa dữ liệu"
//         okText="Xóa"
//         cancelText="Hủy"
//         open={modalDelete !== undefined}
//         onOk={() => handleDelete(modalDelete!)}
//         onCancel={() => setModalDelete(undefined)}
//         confirmLoading={isDeleteLoading}
//         centered
//       >
//         <p>Bạn có chắc chắn muốn xóa hợp đồng này không?</p>
//       </Modal>
//     </div>
//   );
// };

// export default ManagePayments;

import React from "react";

const MângePayments = () => {
  return <div>Quản lý hóa đơn</div>;
};

export default MângePayments;
