import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { dormitoryRoutes, MenuItem } from "./routes";
import "./style.scss";

const MenuDormitoryClient: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    handleResize(); // Kiểm tra ngay khi component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const flatMenuItems = flattenMenuItems(dormitoryRoutes);

  return (
    <div className="menu-client">
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        className="menu"
        items={flatMenuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.children ? (
            <span>{item.label}</span>
          ) : (
            <Link href={`/ky-tuc-xa/${item.key}`} scroll={false}>
              {item.label}
            </Link>
          ),
          children: item.children
            ? item.children.map((subItem: MenuItem) => ({
                key: subItem.key,
                icon: subItem.icon,
                label: (
                  <Link href={`/ky-tuc-xa/${subItem.key}`} scroll={false}>
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

export default MenuDormitoryClient;
