import React, { useState } from "react";
import { Menu } from "antd";
import HeadAdmin from "../HeadAdmin/HeadAdmin";
import Link from "next/link";
import { adminRoutes, MenuItem } from "./routes";
import "./style.scss";

const flattenMenuItems = (items: MenuItem[], parentKey?: string): any[] => {
  return items.flatMap((item) => {
    const currentPath = parentKey ? `${parentKey}/${item.key}` : item.key;

    if (item.items) {
      return {
        key: currentPath,
        icon: item.icon,
        label: item.label,
        children: flattenMenuItems(item.items, currentPath),
      };
    }

    return {
      key: currentPath,
      icon: item.icon,
      label: item.label,
    };
  });
};

const MenuAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const flatMenuItems = flattenMenuItems(adminRoutes);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`menu-admin ${collapsed ? "menu-admin--collapsed" : ""}`}>
      <HeadAdmin collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Menu
        mode="inline"
        className="menu"
        inlineCollapsed={collapsed}
        items={flatMenuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.children ? (
            <span>{item.label}</span>
          ) : (
            <Link href={`/admin/${item.key}`} scroll={false}>
              {item.label}
            </Link>
          ),
          children: item.children
            ? item.children.map((subItem: MenuItem) => ({
                key: subItem.key,
                icon: subItem.icon,
                label: (
                  <Link href={`/admin/${subItem.key}`} scroll={false}>
                    {subItem.label}
                  </Link>
                ),
              }))
            : null,
        }))}
      />
    </div>
  );
};

export default MenuAdmin;
