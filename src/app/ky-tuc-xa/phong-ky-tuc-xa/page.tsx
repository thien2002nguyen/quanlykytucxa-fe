"use client";

import {
  Col,
  Flex,
  Input,
  Pagination,
  PaginationProps,
  Row,
  Select,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
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

const customLocale: PaginationProps["locale"] = {
  items_per_page: "/ Trang",
};

const RoomPage = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { dataRooms } = useAppSelector((state) => state.roomsSlice);

  const [parameters, setParameters] = useState<ParameterGetRoom>({
    sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
    search: searchParams.get("search") || undefined,
    limit: Number(searchParams.get("limit")) || undefined,
    page: Number(searchParams.get("page")) || undefined,
    filter: (searchParams.get("filter") as FilterRoomEnum) || undefined,
    isClient: true,
  });
  const [searchKey, setSearchKey] = useState<string>("");

  const [isClient, setIsClient] = useState<boolean>(true);

  const filterRoomOptions = [
    { label: "Đã đầy", value: FilterRoomEnum.FULL },
    { label: "Có sẵn", value: FilterRoomEnum.AVAILABLE },
  ];

  useEffect(() => {
    setIsClient(false);
  }, []);

  useEffect(() => {
    const newParam = {
      sort: (searchParams.get("sort") as SortEnum) || SortEnum.DESC,
      search: searchParams.get("search") || undefined,
      limit: Number(searchParams.get("limit")) || undefined,
      page: Number(searchParams.get("page")) || undefined,
      filter: (searchParams.get("filter") as FilterRoomEnum) || undefined,
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
      filter: value,
    }));
  };

  return (
    <div className="wrapper-main-content">
      <div className="wrapper-main-content-head">
        <Row gutter={{ xs: 4, sm: 4, md: 8, lg: 16, xl: 16 }}>
          <Col xs={14} sm={12} md={8} lg={6} xl={6}>
            <Input
              key="search-room-name"
              placeholder="Tìm kiếm phòng..."
              onChange={onChangeSearchKey}
              prefix={<SearchOutlined />}
              defaultValue={searchKey}
            />
          </Col>

          <Col xs={10} sm={8} md={6} lg={4} xl={4}>
            <Select
              style={{ width: "100%" }}
              placeholder="Bộ lọc"
              allowClear
              options={filterRoomOptions}
              suffixIcon={<FilterOutlined />}
              onChange={onChangeFilter}
              value={parameters.filter}
            />
          </Col>
        </Row>
      </div>

      <div className="wrapper-main-content-body">
        <div className="wrapper-main-content-body-list">
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
      </div>
    </div>
  );
};

export default RoomPage;
