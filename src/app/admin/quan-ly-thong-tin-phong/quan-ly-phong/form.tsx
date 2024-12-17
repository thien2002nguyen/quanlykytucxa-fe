import { useAppDispatch, useAppSelector } from "@/store";
import {
  getRoomsAction,
  postRoomAction,
  putRoomAction,
} from "@/store/rooms/rooms.action";
import { FormAction } from "@/utils/contants";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import { DeviceItem } from "@/store/rooms/rooms.type";
import UploadSingleImage from "@/components/uploads/UploadSingleImage/UploadSingleImage";
import TextEditor from "@/components/admin/TextEditor/TextEditor";
import UploadMultiImage from "@/components/uploads/UploadMultiImage/UploadMultiImage";
import DeviceItemComponent from "@/components/form/DeviceItemComponent/DeviceItemComponent";
import { formatVND } from "@/utils/formatMoney";
import { v4 as uuidv4 } from "uuid";
import { isContentValid } from "@/utils/contentValidator";

interface FormProps {
  formAction: FormAction;
  onBack: () => void;
}

interface RoomInterface {
  roomName: string;
  description: string;
  maximumCapacity: number;
  floor: number;
  roomBlockId: string;
  roomTypeId: string;
  device: DeviceItem[];
  thumbnail: string;
  images: string[];
}

const FormRoom = ({ formAction, onBack }: FormProps) => {
  const [formRef] = Form.useForm<RoomInterface>();
  const dispatch = useAppDispatch();

  const { dataDetailRoom } = useAppSelector((state) => state.roomsSlice);
  const { dataRoomTypes } = useAppSelector((state) => state.roomTypesSlice);
  const { dataRoomBlocks } = useAppSelector((state) => state.roomBlocksSlice);

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentFile, setCurrentFile] = useState<UploadFile[]>([]);
  const [currentMultiFile, setCurrentMultiFile] = useState<UploadFile[]>([]);
  const [description, setDescription] = useState<string>("");

  const dataRoomTypesOptions = dataRoomTypes.data?.map((item) => ({
    label: `${item.type} - ${formatVND(item.price || 0)} VNĐ`,
    value: item._id,
  }));

  const dataRoomBlocksOptions = dataRoomBlocks.data?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  useEffect(() => {
    if (formAction === FormAction.UPDATE) {
      const {
        roomName,
        maximumCapacity,
        floor,
        roomBlockId,
        roomTypeId,
        description,
        thumbnail,
        device,
        images,
      } = dataDetailRoom.data;

      formRef.setFieldsValue({
        roomName,
        maximumCapacity,
        floor,
        roomBlockId: roomBlockId?._id,
        roomTypeId: roomTypeId?._id,
        device: device?.map((item) => ({
          deviceName: item.deviceName,
          quantity: item.quantity,
          status: item.status,
        })),
      });

      setCurrentFile([
        {
          name: uuidv4(),
          uid: uuidv4(),
          url: thumbnail,
          status: "done",
        },
      ]);

      setCurrentMultiFile(
        images?.map((item) => ({
          name: uuidv4(),
          uid: uuidv4(),
          url: item,
          status: "done",
        })) || []
      );

      setDescription(description);
    } else {
      onReset();
    }
  }, [formRef, dataDetailRoom.data]);

  const onFinish = async (values: RoomInterface) => {
    if (!currentFile?.[0]) {
      messageApi.warning("Vui lòng chọn ít nhất một ảnh.");
      return;
    }

    if (currentMultiFile?.length === 0) {
      messageApi.warning("Vui lòng chọn ít nhất một ảnh.");
      return;
    }

    const isDescription = isContentValid(description);

    if (!isDescription) {
      messageApi.warning("Vui lòng nhập mô tả phòng.");
      return;
    }

    const messageSuccess =
      formAction === FormAction.CREATE
        ? "Thêm phòng mới thành công."
        : "Cập nhật thông tin phòng thành công.";

    setIsLoading(true);

    let response;
    if (formAction === FormAction.CREATE) {
      response = await dispatch(
        postRoomAction({
          roomName: values.roomName,
          description,
          maximumCapacity: values.maximumCapacity,
          floor: values.floor,
          roomBlockId: values.roomBlockId,
          roomTypeId: values.roomTypeId,
          thumbnail: currentFile?.[0]?.url as string,
          images: currentMultiFile?.map((item) => item.url as string),
          device: values.device?.map((item) => ({
            deviceName: item.deviceName,
            quantity: item.quantity,
            status: item.status,
          })),
        })
      );
    } else {
      response = await dispatch(
        putRoomAction({
          id: dataDetailRoom.data?._id,
          roomName: values.roomName,
          description,
          maximumCapacity: values.maximumCapacity,
          floor: values.floor,
          roomBlockId: values.roomBlockId,
          roomTypeId: values.roomTypeId,
          thumbnail: currentFile?.[0]?.url as string,
          images: currentMultiFile?.map((item) => item.url as string),
          device: values.device?.map((item) => ({
            deviceName: item.deviceName,
            quantity: item.quantity,
            status: item.status,
          })),
        })
      );
    }

    if (response.payload?.error) {
      messageApi.error(response.payload?.error);
    } else {
      messageApi.success(messageSuccess);
      onReset();
      dispatch(getRoomsAction({}));
      onBack();
    }

    setIsLoading(false);
  };

  const onReset = () => {
    setCurrentFile([]);
    setCurrentMultiFile([]);
    setDescription("");
    formRef.resetFields();
  };

  return (
    <div>
      {contextHolder}

      <Form
        name="form-room"
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
              label="Tên phòng"
              name="roomName"
              rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Sức chứa tối đa"
              name="maximumCapacity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập sức chứa tối đa!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Tầng"
              name="floor"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tầng!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Dãy phòng"
              name="roomBlockId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn dãy phòng!",
                },
              ]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                placeholder="Chọn dãy phòng"
                options={dataRoomBlocksOptions}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Loại phòng"
              name="roomTypeId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại phòng!",
                },
              ]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                placeholder="Chọn loại phòng"
                options={dataRoomTypesOptions}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            {/* danh sách thiết bị phòng */}
            <div className="form-item-container">
              <h4 className="form-item-container-title">
                Danh sách thiết bị phòng
              </h4>
              <DeviceItemComponent />
            </div>
          </Col>

          <Col span={24}>
            <Form.Item label="Hình thu nhỏ">
              <UploadSingleImage
                currentFileList={currentFile}
                onChange={setCurrentFile}
                formAction={formAction}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Hình ảnh phòng">
              <UploadMultiImage
                currentFileList={currentMultiFile}
                onChange={setCurrentMultiFile}
                formAction={formAction}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả phòng">
              <TextEditor value={description} onBlur={setDescription} />
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

export default FormRoom;
