import React from "react";
import { Button, Flex, Typography } from "antd";
import { v4 as uuidv4 } from "uuid";

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
    (title || subtitle || onBack || extra) && (
      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        {title ? (
          <Flex vertical>
            {title && (
              <Title level={4} style={{ marginBottom: 0 }}>
                {title}
              </Title>
            )}
            {subtitle && <Text>{subtitle}</Text>}
          </Flex>
        ) : (
          <div />
        )}
        {onBack ? (
          <Button type="primary" onClick={onBack}>
            Quay lại
          </Button>
        ) : (
          <Flex align="center" gap={8}>
            {extra && extra.map((item) => <div key={uuidv4()}>{item}</div>)}
          </Flex>
        )}
      </Flex>
    )
  );
};

export default HeadAdminContent;
