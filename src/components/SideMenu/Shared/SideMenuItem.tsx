import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useState } from "react";
import Link from "components/NetworkLink";
import { IMenuItem } from "utils/themes";

const SideMenuItem = ({
  menuItem,
  isActive,
}: {
  menuItem: IMenuItem;
  isActive?: boolean;
}) => {
  const _t = useLocalization("SideMenu");

  return (
    <Link
      to={menuItem.path || ""}
      className={`sidebar__menu-link ${isActive ? "active" : ""}`}
    >
      {_t(menuItem.name)}
    </Link>
  );
};

export default SideMenuItem;
