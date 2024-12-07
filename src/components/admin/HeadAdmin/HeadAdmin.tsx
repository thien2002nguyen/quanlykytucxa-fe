import React, { useEffect, useState } from "react";
import { Avatar, Button, Flex } from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/store";
import "./style.scss";

interface HeadAdminProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const HeadAdmin: React.FC<HeadAdminProps> = ({
  collapsed,
  toggleCollapsed,
}) => {
  const { user } = useAppSelector((state) => state.authSlice);

  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user.avatar) {
      setAvatarSrc(user.avatar);
    }
  }, [user.avatar]);

  return (
    <div className={`head-admin ${collapsed ? "head-admin--collapsed" : ""}`}>
      {!collapsed && (
        <Flex
          vertical
          justify="center"
          align="center"
          gap={6}
          className="admin-info"
        >
          <Avatar
            src={avatarSrc}
            icon={!avatarSrc && <UserOutlined />}
            size={40}
            className="avatar"
          />
          <span className="admin-name">
            Xin chào{" "}
            {user.userName?.length > 10
              ? user.userName?.substring(0, 10) + "..."
              : user.userName || "Admin"}
          </span>
        </Flex>
      )}
      <Button
        type="text"
        onClick={toggleCollapsed}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        className="toggle-button"
      />
    </div>
  );
};

export default HeadAdmin;
