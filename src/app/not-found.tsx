import { Result, Button, ConfigProvider } from "antd";
import "./not-found.scss";
import { themeAntdClient } from "@/config/theme";
import { HomeOutlined } from "@ant-design/icons";

export default function NotFoundPage() {
  return (
    <ConfigProvider theme={themeAntdClient}>
      <div className="not-found-container">
        <Result
          status="404"
          title="404"
          subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
          extra={
            <Button
              type="primary"
              size="large"
              href="/"
              icon={<HomeOutlined />}
            >
              Quay về trang chủ
            </Button>
          }
        />
      </div>
    </ConfigProvider>
  );
}
