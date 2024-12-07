"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useRouter } from "next/navigation";
import React from "react";
import FormInfomation from "../form";
import { FormAction } from "@/utils/contants";

const CreateInfomation = () => {
  const router = useRouter();
  return (
    <div>
      <HeadAdminContent
        title="Thêm thông tin mới"
        onBack={() => router.back()}
      />

      <FormInfomation
        formAction={FormAction.CREATE}
        onBack={() => router.back()}
      />
    </div>
  );
};

export default CreateInfomation;
