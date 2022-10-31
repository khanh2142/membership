import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "store/reducers/auth";
import Dropdown from "components/dropdown/Dropdown";

const ssoDomain: string = `${process.env.REACT_APP_ACC_BASE_URL}`;

const client_id: string = `${process.env.REACT_APP_SOLUTION_CODE}`;

const UserDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.currentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logOut = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    dispatch(logoutUser());

    window.open(`${ssoDomain}/account/signout/${client_id}`);
    window.setTimeout(function () {
      window.close();
    }, 1);
    //
  };

  const navigateToProfile = (event: any) => {
    event.preventDefault();
    setDropdownOpen(false);
    navigate("/profile");
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      onChange={(open: boolean) => setDropdownOpen(open)}
      menuContainerTag="div"
      buttonTemplate={
        <div
          style={{
            backgroundImage: `url(${
              user.Avatar || "/img/default-profile.png"
            })`,
          }}
          className="header__user-avatar"
          // style={{
          //   height: "2rem",
          //   width: "2rem",
          //   marginLeft: "-8px !important",
          //   marginRight: "-0 !important",
          // }}
        />
      }
      menuTemplate={
        <>
          <div className="">
            <img
              src={user.Avatar || "/img/default-profile.png"}
              className=""
              alt="User"
            />
            <p>{user.Email}</p>
          </div>
          <li className="user-body"></li>
          <li className="user-footer">
            <button
              type="button"
              className="btn btn-default btn-flat float-right"
              onClick={logOut}
            >
              Signout
            </button>
          </li>
        </>
      }
    />
  );
};

export default UserDropdown;
