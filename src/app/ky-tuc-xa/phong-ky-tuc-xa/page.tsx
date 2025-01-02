"use client";

import {
  Breadcrumb,
  Col,
  Empty,
  Flex,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Select,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  AppstoreOutlined,
  FilterOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import RoomCard from "@/components/card/RoomCard/RoomCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SortEnum } from "@/utils/contants";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import { getRoomsAction } from "@/store/rooms/rooms.action";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { v4 as uuidv4 } from "uuid";
import LoadingRoomCard from "@/components/card/RoomCard/LoadingRoomCard";
import { FilterRoomEnum, ParameterGetRoom } from "@/store/rooms/rooms.type";
import { getRoomTypesAction } from "@/store/room-types/room-types.action";
import "./style.scss";

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

const RoomPage = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { dataRooms } = useAppSelector((state) => state.roomsSlice);
  const { dataRoomTypes } = useAppSelector((state) => state.roomTypesSlice);

  const [parameters, setParameters] = useState<ParameterGetRoom>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    roomTypeId: searchParams.get("roomTypeId") || undefined,
    isClient: true,
  });
  const [searchKey, setSearchKey] = useState<string>("");

  const [isClient, setIsClient] = useState<boolean>(true);

  const filterRoomOptions = dataRoomTypes?.data?.map((item) => ({
    value: item._id,
    label: item.type,
  }));

  useEffect(() => {
    setIsClient(false);
  }, []);

  useEffect(() => {
    const newParam = {
      sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
      search: searchParams.get("search") || undefined,
      limit: Number(searchParams.get("limit")) || undefined,
      page: Number(searchParams.get("page")) || undefined,
      roomTypeId: searchParams.get("roomTypeId") || undefined,
      isClient: true,
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

  useEffect(() => {
    dispatch(getRoomTypesAction());
  }, [dispatch]);

  const debouncedSearchKey = useCallback(
    debounce((value: string) => {
      setSearchKey(value);

      setParameters((prev) => ({
        ...prev,
        page: 1,
        search: value,
      }));
    }, 1500),
    []
  );

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

  const onChangeFilter = (value: FilterRoomEnum | undefined) => {
    setParameters((prev) => ({
      ...prev,
      page: 1,
      roomTypeId: value,
    }));
  };

  return (
    <div className="wrapper-main-content wrapper-room-page">
      <Flex
        justify="space-between"
        align="flex-start"
        className="wrapper-main-content-head"
      >
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              title: (
                <>
                  <AppstoreOutlined />
                  <span>Phòng ký túc xá</span>
                </>
              ),
            },
          ]}
        />

        <Flex gap={8} className="wrapper-room-page-tools">
          <div className="input-search-room">
            <Input
              key="search-room-name"
              placeholder="Tìm kiếm phòng..."
              onChange={onChangeSearchKey}
              prefix={<SearchOutlined />}
              defaultValue={searchKey}
            />
          </div>

          <div className="select-filter-room">
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              style={{ width: "100%" }}
              placeholder="Loại phòng"
              allowClear
              options={filterRoomOptions}
              suffixIcon={<FilterOutlined />}
              onChange={onChangeFilter}
              value={parameters.filter}
              maxTagCount="responsive"
            />
          </div>
        </Flex>
      </Flex>

      {!dataRooms.loading && !dataRoomTypes.loading && (
        <div className="wrapper-main-content-body">
          {dataRooms.data?.length > 0 ? (
            <>
              <div className="wrapper-room-page-list">
                <Row gutter={[16, 16]}>
                  {isClient &&
                    Array.from({ length: 4 }).map((_, index) => (
                      <Col
                        key={uuidv4() + index}
                        xs={24}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={6}
                      >
                        <LoadingRoomCard />
                      </Col>
                    ))}

                  {!isClient &&
                    dataRooms.data?.map((item) => (
                      <Col key={item._id} xs={24} sm={12} md={12} lg={8} xl={6}>
                        <RoomCard
                          key={`room-card-${item._id}`}
                          roomName={item.roomName}
                          thumbnail={item.thumbnail}
                          roomType={item.roomTypeId?.type}
                          roomBlock={item.roomBlockId?.name}
                          floor={item.floor}
                          maximumCapacity={item.maximumCapacity}
                          roomPrice={item.roomTypeId.price}
                          roomSlug={item.roomSlug}
                          registeredStudents={item.registeredStudents}
                        />
                      </Col>
                    ))}
                </Row>
              </div>

              <Flex justify="flex-end" key="dataRooms">
                <Pagination
                  current={parameters.page || 1}
                  showSizeChanger
                  pageSize={parameters.limit || 12}
                  pageSizeOptions={[8, 12, 64]}
                  onChange={onChangePagination}
                  total={dataRooms.meta?.total}
                  locale={customLocale}
                />
              </Flex>
            </>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<p>Không có phòng nào</p>}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RoomPage;
