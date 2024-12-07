"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormInfomation from "../form";
import { FormAction } from "@/utils/contants";
import { useAppDispatch } from "@/store";
import { getDetailInfomationAction } from "@/store/infomation/infomation.action"; // Adjust action for infomations

const EditInfomation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailInfomationAction(params.id as string));
  }, [dispatch, params.id]);

  return (
    <div>
      <HeadAdminContent
        title="Chỉnh sửa thông tin"
        onBack={() => router.back()}
      />

      <FormInfomation
        formAction={FormAction.UPDATE}
        onBack={() => router.back()}
      />
    </div>
  );
};

export default EditInfomation;
