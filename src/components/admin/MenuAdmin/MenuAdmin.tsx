import React, { useState } from "react";
import { Menu } from "antd";
import HeadAdmin from "../HeadAdmin/HeadAdmin";
import Link from "next/link";
import { adminRoutes, MenuItem } from "./routes";
import "./style.scss";

const renderMenuItems = (items: MenuItem[], parentKey?: string) => {
  return items.map((item: MenuItem) => {
    const currentPath = parentKey ? `${parentKey}/${item.key}` : item.key;
    const fullPath = `admin/${currentPath}`;

    if (item.items) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {renderMenuItems(item.items, currentPath)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link href={`/${fullPath}`} scroll={false}>
          {item.label}
        </Link>
      </Menu.Item>
    );
  });
};

const MenuAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`menu-admin ${collapsed ? "menu-admin--collapsed" : ""}`}>
      <HeadAdmin collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Menu mode="inline" inlineCollapsed={collapsed} className="menu">
        {renderMenuItems(adminRoutes)}
      </Menu>
    </div>
  );
};

export default MenuAdmin;
