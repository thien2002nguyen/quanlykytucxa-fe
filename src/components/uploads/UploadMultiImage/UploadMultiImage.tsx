import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image, message } from "antd";
import type { UploadFile, UploadProps } from "antd";
import "./style.scss";
import { FormAction } from "@/utils/contants";

type UploadMultiImageProps = {
  currentFileList: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
  formAction?: FormAction;
  disabled?: boolean;
};

const UploadMultiImage: React.FC<UploadMultiImageProps> = ({
  currentFileList,
  onChange,
  formAction = FormAction.UPDATE,
  disabled = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // Update fileList with currentFileList
  useEffect(() => {
    setFileList(currentFileList);
  }, [currentFileList]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.url) {
      file.preview = file.url;
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (newFileList.length > 5) {
      messageApi.warning("Chỉ được tải lên tối đa 5 hình ảnh.");
      return;
    }

    // Update the fileList state
    setFileList(newFileList);

    // Loop through all the files in the newFileList and update the url for each
    newFileList.forEach((file) => {
      // Only update the file URL if the upload is done and the secure_url is available
      if (file.status === "done" && file.response?.secure_url) {
        file.url = file.response?.secure_url; // Set URL from secure_url
      }
    });

    // Call onChange with the updated fileList
    onChange(newFileList);
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
          }),
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
        disabled={disabled}
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
        {fileList.length < 5 ? (!disabled ? uploadButton : null) : null}
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

export default UploadMultiImage;
