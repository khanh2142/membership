import React, { useEffect, useState } from "react";
import { Sidenav, Nav, Sidebar, Toggle, IconButton } from "rsuite";
import Icon from "@rsuite/icons/lib/Icon";
import { FiMenu } from "react-icons/fi";
import SideMenuItem from "./SideMenuItem";
import { addWindowClass, removeWindowClass } from "utils/common";
import { v4 as uuid } from "uuid";

const SideMenu = ({ menu, activeKey }) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <>
      <Sidebar
        className="sidebar"
        style={{ zIndex: 1 }}
        width={expanded ? 189 : 50}
        collapsible
      >
        <div
          className={`sidebar__container ${expanded ? "active" : "deactive"}`}
        >
          <Icon
            as={FiMenu}
            className="sidebar__container-icon"
            onClick={() => {
              if (expanded) {
                setExpanded(false);
                addWindowClass("side-min");
              } else {
                setExpanded(true);
                removeWindowClass("side-min");
              }
            }}
          />

          <div className="sidebar__menu" role="menu">
            {menu.map((menuItem, index) => (
              <SideMenuItem
                key={uuid()}
                menuItem={menuItem}
                // isActive={index === 0 ? true : false}
                isActive={menuItem.key == activeKey ? true : false}
              />
            ))}
          </div>
        </div>
      </Sidebar>
    </>
  );
};
export default SideMenu;
