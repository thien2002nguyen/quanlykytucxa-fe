import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import "./style.scss";
import { FormAction } from "@/utils/contants";

type UploadSingleImageProps = {
  currentFileList: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
  formAction?: FormAction;
};

const UploadSingleImage: React.FC<UploadSingleImageProps> = ({
  currentFileList,
  onChange,
  formAction = FormAction.UPDATE,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage(); // Sử dụng hook để tạo message API

  // FileList thay đổi theo currentFileList
  useEffect(() => {
    // Cập nhật fileList với currentFileList
    setFileList(currentFileList);
  }, [currentFileList]);

  const handlePreview = async (file: UploadFile) => {
    // Nếu file đã có url hoặc preview từ response, sử dụng secure_url thay vì gọi getBase64
    if (!file.url && !file.preview && file.url) {
      file.preview = file.url; // Sử dụng url
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 1) {
      messageApi.warning("Chỉ được tải lên một hình ảnh.");
      return;
    }

    setFileList(newFileList);

    if (newFileList && newFileList?.[0]?.status === "done") {
      // Sau khi upload thành công, sử dụng secure_url từ response
      const uploadedFile = newFileList[0];
      if (uploadedFile.response?.secure_url) {
        uploadedFile.url = uploadedFile.response.secure_url; // Set URL từ secure_url
      }
      onChange(newFileList);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    try {
      if (formAction === FormAction.CREATE) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: file.url,
          }), // Chuyển url để xóa
        });
      }

      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
      onChange(newFileList);
    } catch (error: any) {
      console.error(`Có lỗi xảy ra khi xóa hình ảnh: ${error.message}`);
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
