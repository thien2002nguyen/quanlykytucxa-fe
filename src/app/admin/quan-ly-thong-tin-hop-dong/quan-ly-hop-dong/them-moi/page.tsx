"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormRoom from "../form";
import { FormAction } from "@/utils/contants";
import { useAppDispatch } from "@/store";
import { getRoomTypesAction } from "@/store/room-types/room-types.action";
import { getRoomBlocksAction } from "@/store/room-blocks/room-blocks.action";

const CreateRoom = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRoomTypesAction());
    dispatch(getRoomBlocksAction());
  }, [dispatch]);

  return (
    <div>
      <HeadAdminContent title="Thêm phòng mới" onBack={() => router.back()} />

      <FormRoom formAction={FormAction.CREATE} onBack={() => router.back()} />
    </div>
  );
};

export default CreateRoom;
