"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormRoom from "../form";
import { FormAction } from "@/utils/contants";
import { useAppDispatch } from "@/store";
import { getDetailRoomAction } from "@/store/rooms/rooms.action";
import { getRoomTypesAction } from "@/store/room-types/room-types.action";
import { getRoomBlocksAction } from "@/store/room-blocks/room-blocks.action";

const EditRoom = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailRoomAction(params.id as string));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(getRoomTypesAction());
    dispatch(getRoomBlocksAction());
  }, [dispatch]);

  return (
    <div>
      <HeadAdminContent
        title="Chỉnh sửa thông tin phòng"
        onBack={() => router.back()}
      />

      <FormRoom formAction={FormAction.UPDATE} onBack={() => router.back()} />
    </div>
  );
};

export default EditRoom;
