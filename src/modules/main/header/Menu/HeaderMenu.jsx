import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import HeaderMenuItem from "./HeaderMenuItem";
import { v4 as uuid } from "uuid";

import { RouteList } from "routes/RouteConfig";
import { usePermission } from "hooks/usePermission";

const HeaderMenu = ({ mainMenuKey }) => {
  const hasPermission = usePermission();

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let menuList = [];

    for (var item of RouteList) {
      if (item.mainMenuTitle && hasPermission(item.persmissions)) {
        menuList.push({
          path: item.path,
          name: item.mainMenuTitle,
          key: item.mainMenuKey,
        });
      }
    }

    setMenu(menuList);
  }, []);

  return (
    <div className="header__menu">
      {menu.map((menuItem, index) => (
        // <HeaderMenuItem menuItem={menuItem} isActive={mainMenuKey == menuItem.key ? true : false} key={uuid()} />
        <HeaderMenuItem
          menuItem={menuItem}
          isActive={mainMenuKey == menuItem.key ? true : false}
          key={uuid()}
        />
      ))}
    </div>
  );
};

export default HeaderMenu;
