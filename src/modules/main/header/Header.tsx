import React, { useCallback, useEffect, useState } from "react";
import Link from "components/NetworkLink";
import { Button } from "components/core";

import UserDropdown from "modules/main/header/user-dropdown/UserDropdown";
import HeaderMenu from "./Menu/HeaderMenu";
import PermissionContainer from "components/PermissionContainer";

const Header = ({ mainMenuKey }: { mainMenuKey: string }) => {
  return (
    <nav className="header">
      <div className="header__container">
        <div className="header__container-list">
          <Link to="/" className="header__logo">
            <div
              className="header__logo-image"
              style={{ backgroundImage: "url(/img/logo.png)" }}
            ></div>
          </Link>
          <HeaderMenu mainMenuKey={mainMenuKey} />
        </div>

        <div className="header__user">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Header;
