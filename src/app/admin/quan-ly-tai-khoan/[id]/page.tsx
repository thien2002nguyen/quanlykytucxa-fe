"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormAdmin from "../form";
import { FormAction } from "@/utils/contants";
import { useAppDispatch } from "@/store";
import { getDetailUserAction } from "@/store/users/users.action";

const EditAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailUserAction(params.id as string));
  }, [dispatch, params.id]);

  return (
    <div>
      <HeadAdminContent
        title="Chỉnh sửa thông tin tài khoản"
        onBack={() => router.back()}
      />

      <FormAdmin formAction={FormAction.UPDATE} onBack={() => router.back()} />
    </div>
  );
};

export default EditAdmin;
