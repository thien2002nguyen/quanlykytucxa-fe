"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useRouter } from "next/navigation";
import React from "react";
import FormNews from "../form";
import { FormAction } from "@/utils/contants";

const CreateNews = () => {
  const router = useRouter();
  return (
    <div>
      <HeadAdminContent title="Thêm tin tức mới" onBack={() => router.back()} />

      <FormNews formAction={FormAction.CREATE} onBack={() => router.back()} />
    </div>
  );
};

export default CreateNews;
