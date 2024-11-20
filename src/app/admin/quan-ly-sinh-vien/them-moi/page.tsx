"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useRouter } from "next/navigation";
import React from "react";
import FormStudent from "../form";
import { FormAction } from "@/utils/contants";

const CreateStudent = () => {
  const router = useRouter();
  return (
    <div>
      <HeadAdminContent
        title="Thêm sinh viên mới"
        onBack={() => router.back()}
      />

      <FormStudent
        formAction={FormAction.CREATE}
        onBack={() => router.back()}
      />
    </div>
  );
};

export default CreateStudent;
