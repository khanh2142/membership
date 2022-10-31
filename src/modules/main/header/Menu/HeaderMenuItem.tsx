import React, { useEffect, useState } from "react";
import { useLocalization } from "hooks/useLocalization";
import { useSelector } from "react-redux";
import { IMenuItem } from "utils/themes";
import Link from "components/NetworkLink";

const HeaderMenuItem = ({
  menuItem,
  isActive,
}: {
  menuItem: IMenuItem;
  isActive: boolean;
}) => {
  const _t = useLocalization("MainMenu");

  return (
    <Link
      to={menuItem.path || ""}
      className={`header__menu-link ${isActive ? "active" : ""}`}
      data-key={menuItem.key}
    >
      {_t(menuItem.name)}
    </Link>
  );
};

export default HeaderMenuItem;
