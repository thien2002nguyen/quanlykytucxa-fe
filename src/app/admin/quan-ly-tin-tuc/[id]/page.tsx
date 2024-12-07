"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormNews from "../form";
import { FormAction } from "@/utils/contants";
import { useAppDispatch } from "@/store";
import { getDetailNewsAction } from "@/store/news/news.action";

const EditNews = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailNewsAction(params.id as string));
  }, [dispatch, params.id]);

  return (
    <div>
      <HeadAdminContent
        title="Chỉnh sửa thông tin tin tức"
        onBack={() => router.back()}
      />

      <FormNews formAction={FormAction.UPDATE} onBack={() => router.back()} />
    </div>
  );
};

export default EditNews;
