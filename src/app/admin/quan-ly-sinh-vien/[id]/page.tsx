"use client";

import HeadAdminContent from "@/components/admin/HeadAdminContent/HeadAdminContent";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FormStudent from "../form";
import { FormAction } from "@/utils/contants";
import { useAppDispatch } from "@/store";
import { getDetailStudentAction } from "@/store/students/students.action";

const EditStudent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getDetailStudentAction(params.id as string));
  }, [dispatch, params.id]);

  return (
    <div>
      <HeadAdminContent
        title="Chỉnh sửa thông tin sinh viên"
        onBack={() => router.back()}
      />

      <FormStudent
        formAction={FormAction.UPDATE}
        onBack={() => router.back()}
      />
    </div>
  );
};

export default EditStudent;
