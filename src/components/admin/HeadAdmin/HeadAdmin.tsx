import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";
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
  const { admin } = useAppSelector((state) => state.adminSlice);

  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (admin.avatar) {
      setAvatarSrc(admin.avatar);
    }
  }, [admin.avatar]);

  return (
    <div className={`head-admin ${collapsed ? "head-admin--collapsed" : ""}`}>
      {!collapsed && (
        <>
          <Avatar
            src={avatarSrc}
            icon={!avatarSrc && <UserOutlined />}
            size={40}
            className="avatar"
          />
          <span className="admin-name">{admin.fullName || "Admin"}</span>
        </>
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
