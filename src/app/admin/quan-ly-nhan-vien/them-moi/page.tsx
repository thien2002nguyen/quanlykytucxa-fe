"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useRouter } from "next/navigation";
import React from "react";
import FormStudent from "../form";

const CreateModerator = () => {
  const router = useRouter();
  return (
    <div>
      <HeadAdminContent
        title="Thêm nhân viên mới"
        onBack={() => router.back()}
      />

      <FormStudent />
    </div>
  );
};

export default CreateModerator;
