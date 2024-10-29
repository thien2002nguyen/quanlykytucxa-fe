import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import "./style.scss";

type UploadSingleImageProps = {
  currentFileList: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
};

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadSingleImage: React.FC<UploadSingleImageProps> = ({
  currentFileList,
  onChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage(); // Sử dụng hook để tạo message API

  // FileList thay đổi theo currentFileList
  useEffect(() => {
    // Tạo một danh sách các ID của các file hiện có trong currentFileList
    const currentFileIds = currentFileList.map((file) => file.uid);

    // Kiểm tra nếu currentFileList có ít file hơn fileList
    if (currentFileList.length < fileList.length) {
      // Tìm các file cần xóa trong fileList
      const filesToRemove = fileList.filter(
        (file) => !currentFileIds.includes(file.uid)
      );

      // Gọi handleRemove cho từng file cần xóa
      filesToRemove.forEach((file) => handleRemove(file));
    }

    // Cập nhật fileList với currentFileList
    setFileList(currentFileList);
  }, [currentFileList]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 1) {
      messageApi.warning("Chỉ được tải lên một hình ảnh."); // Sử dụng message API
      return;
    }

    setFileList(newFileList);

    if (newFileList && newFileList?.[0]?.status === "done") {
      onChange(newFileList);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: file.response?.public_id }), // Chuyển public_id để xóa
      });

      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    } catch (error: any) {
      console.error(`Có lỗi xảy ra khi xóa hình ảnh: ${error.message}`); // Sử dụng message API
    }
  };

  const uploadButton = (
    <button className="upload-button" type="button">
      <PlusOutlined />
      <div className="upload-text">Tải lên</div>
    </button>
  );

  return (
    <>
      {contextHolder}
      <Upload
        action={`${process.env.NEXT_PUBLIC_API_URL}/upload/image`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={(file) => {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            messageApi.warning("Chỉ cho phép tải ảnh dưới 2MB.");
          }
          return isLt2M;
        }}
        locale={{
          uploading: "Đang tải...",
        }}
        className="upload-container"
      >
        {fileList.length === 0 ? uploadButton : null}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadSingleImage;
