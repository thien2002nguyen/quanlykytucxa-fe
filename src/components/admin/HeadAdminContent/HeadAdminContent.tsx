import React from "react";
import { Button, Flex, Typography } from "antd";

interface HeadAdminContentProps {
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode[];
  onBack?: () => void;
}

const { Title, Text } = Typography;

const HeadAdminContent: React.FC<HeadAdminContentProps> = ({
  title,
  subtitle,
  extra,
  onBack,
}) => {
  return (
    <Flex vertical gap={12} style={{ marginBottom: 16 }}>
      {(title || subtitle || onBack) && (
        <Flex justify="space-between">
          <Flex vertical>
            {title && (
              <Title level={4} style={{ marginBottom: 0 }}>
                {title}
              </Title>
            )}
            {subtitle && <Text>{subtitle}</Text>}
          </Flex>
          {onBack && (
            <Button type="primary" onClick={onBack}>
              Quay lại
            </Button>
          )}
        </Flex>
      )}
      <Flex justify="flex-end" gap={8}>
        {extra &&
          extra.map((button, index) => <span key={index}>{button}</span>)}
      </Flex>
    </Flex>
  );
};

export default HeadAdminContent;
