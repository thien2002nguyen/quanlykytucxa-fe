import { useAppDispatch, useAppSelector } from "@/store";
import {
  getStudentsAction,
  postStudentAction,
  putStudentAction,
} from "@/store/students/students.action";
import { FormAction, genderOptions } from "@/utils/contants";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

interface FormProps {
  formAction: FormAction;
  onBack: () => void;
}

interface StudentInterface {
  studentCode: string;
  nationalIdCard: string;
  fullName: string;
  dateOfBirth: dayjs.Dayjs | string;
  gender: string;
  takeClass: string;
  department: string;
  address: string;
  enrollmentYear: dayjs.Dayjs | string;
}

const FormStudent = ({ formAction, onBack }: FormProps) => {
  const [formRef] = Form.useForm<StudentInterface>();
  const dispatch = useAppDispatch();
  const { dataDetailStudent } = useAppSelector((state) => state.studentsSlice);

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const {
        studentCode,
        nationalIdCard,
        fullName,
        dateOfBirth,
        gender,
        takeClass,
        department,
        address,
        enrollmentYear,
      } = dataDetailStudent.data;

      formRef.setFieldsValue({
        studentCode,
        nationalIdCard,
        fullName,
        dateOfBirth: dayjs(dateOfBirth),
        gender,
        takeClass,
        department,
        address,
        enrollmentYear: dayjs(enrollmentYear, "YYYY"),
      });
    } else {
      onReset();
    }
  }, [formRef, dataDetailStudent.data]);

  const onFinish = async (values: StudentInterface) => {
    const messageSuccess =
      formAction === FormAction.CREATE
        ? "Thêm sinh viên mới thành công."
        : "Cập nhật thông tin sinh viên thành công.";

    setIsLoading(true);

    let response;

    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postStudentAction({
          studentCode: values.studentCode,
          nationalIdCard: values.nationalIdCard,
          fullName: values.fullName,
          dateOfBirth: dayjs(values.dateOfBirth).endOf("date").toISOString(),
          gender: values.gender,
          takeClass: values.takeClass,
          department: values.department,
          address: values.address,
          enrollmentYear: dayjs(values.enrollmentYear).year().toString(),
        })
      );
    } else {
      response = await dispatch(
        putStudentAction({
          id: dataDetailStudent.data?._id,
          studentCode: values.studentCode,
          nationalIdCard: values.nationalIdCard,
          fullName: values.fullName,
          dateOfBirth: dayjs(values.dateOfBirth).endOf("date").toISOString(),
          gender: values.gender,
          takeClass: values.takeClass,
          department: values.department,
          address: values.address,
          enrollmentYear: dayjs(values.enrollmentYear).year().toString(),
        })
      );
    }

    if (response.payload?.error) {
      messageApi.error(response.payload?.error);
    } else {
      messageApi.success(messageSuccess);
      onReset();
      dispatch(getStudentsAction({}));
      onBack();
    }

    setIsLoading(false);
  };

  const onReset = () => {
    formRef.resetFields();
  };

  return (
    <div>
      {contextHolder}

      <Form
        name="form-student"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onReset={onReset}
        autoComplete="off"
        layout="vertical"
        form={formRef}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã số sinh viên"
              name="studentCode"
              rules={[
                { required: true, message: "Vui lòng nhập mã số sinh viên!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số căn cước công dân"
              name="nationalIdCard"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số căn cước công dân!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh!",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giới tính!",
                },
              ]}
            >
              <Select placeholder="Chọn giới tính" options={genderOptions} />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              label="Lớp"
              name="takeClass"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lớp!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item
              label="Năm tuyển sinh"
              name="enrollmentYear"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn năm tuyển sinh!",
                },
              ]}
            >
              <DatePicker
                placeholder="Chọn năm"
                picker="year"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phòng - Khoa"
              name="department"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập phòng - khoa!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <div className="form-footer">
          <Flex gap={8} justify="flex-end">
            <Button htmlType="reset">Hủy</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Lưu
            </Button>
          </Flex>
        </div>
      </Form>
    </div>
  );
};

export default FormStudent;
