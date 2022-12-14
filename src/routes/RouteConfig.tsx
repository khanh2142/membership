import React from "react";
import Page404 from "pages/Page404";
import PageTable from "pages/Table";
import Dashboard from "pages/Dashboard";
import PageStaffList from "pages/Staff/StaffList";
import StaffDetail from "pages/Staff/StaffDetail";
import StaffEdit from "pages/Staff/StaffEdit";
import DepList from "pages/Department/DepList";
import PositionList from "pages/Position/PositionList";
import ContractTypeList from "pages/ContractType/ContractTypeList";
import ResignReasonList from "pages/ResignReason/ResignReasonList";
import WorkLocationList from "pages/WorkLocation/WorkLocationList";
import NNTList from "pages/NNT/NNTList";
import NNTEdit from "pages/NNT/NNTEdit";
import StaffTypeList from "pages/StaffType/StaffTypeList";
import WorkingTimeList from "pages/WorkingTime/WorkingTimeList";
import WorkingTimeEdit from "pages/WorkingTime/WorkingTimeEdit";
import MemberRegister from "pages/Member/MemberRegister";
import MemberSearch from "pages/Member/MemberSearch";

export interface RouteItem {
  path: string;
  pageTitle?: string;
  mainMenuTitle?: string;
  subMenuTitle?: string;
  mainMenuKey: string;
  subMenuKey?: string;
  persmissions?: string;
  getPageElement: Function;
}

export const RouteList: RouteItem[] = [
  //   {
  //     path: "/",
  //     mainMenuKey: "",
  //     pageTitle: "Dashboard",

  //     getPageElement: () => {
  //       return <Dashboard />;
  //     },
  //   },

  //   //Employess

  //   {
  //     path: "/table",
  //     mainMenuKey: "employees",
  //     subMenuKey: "table",
  //     subMenuTitle: "Table Test",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <PageTable />;
  //     },
  //   },

  //   {
  //     path: "/staff/list",
  //     pageTitle: "Staff List",
  //     mainMenuTitle: "Employees",
  //     subMenuTitle: "Staff List",
  //     mainMenuKey: "employees",
  //     subMenuKey: "staff_list",
  //     persmissions: "",

  //     getPageElement: () => {
  //       return <PageStaffList />;
  //     },
  //   },

  //   {
  //     path: "/staff/detail/:staffCode", //n???u d??ng path c?? tham s??? th?? ch??? n??n d??ng 1 tham s??? v?? tham s??? ph???i ??? sau c??ng c???a path(gi???ng tr?????ng h???p n??y)
  //     pageTitle: "Staff detail",
  //     mainMenuKey: "employees",
  //     subMenuKey: "staff_list",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <StaffDetail />;
  //     },
  //   },

  //   {
  //     path: "/staff/edit",
  //     pageTitle: "Staff edit",
  //     mainMenuKey: "employees",
  //     subMenuKey: "staff_list",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <StaffEdit />;
  //     },
  //   },

  //   //Administrations
  //   {
  //     path: "/department/list",
  //     mainMenuTitle: "Administrations",
  //     mainMenuKey: "admin",
  //     subMenuKey: "dep_list",
  //     subMenuTitle: "Departments",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <DepList />;
  //     },
  //   },
  //   {
  //     path: "/position/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "position_list",
  //     subMenuTitle: "Positions",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <PositionList />;
  //     },
  //   },
  //   {
  //     path: "/contracttype/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "contracttype_list",
  //     subMenuTitle: "ContractTypes",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <ContractTypeList />;
  //     },
  //   },
  //   {
  //     path: "/resignreason/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "resignreason_list",
  //     subMenuTitle: "ResignReasons",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <ResignReasonList />;
  //     },
  //   }, //
  //   {
  //     path: "/worklocation/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "worklocation_list",
  //     subMenuTitle: "WorkLocations",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <WorkLocationList />;
  //     },
  //   },
  //   {
  //     path: "/nnt/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "nnt_list",
  //     subMenuTitle: "NNT",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <NNTList />;
  //     },
  //   },
  //   {
  //     path: "/nnt/create",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "nnt_list",
  //     subMenuTitle: "",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <NNTEdit isNew={true} />;
  //     },
  //   },
  //   {
  //     path: "/nnt/edit/:mst",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "nnt_list",
  //     subMenuTitle: "",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <NNTEdit isNew={false} />;
  //     },
  //   },
  //   {
  //     path: "/stafftype/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "stafftype_list",
  //     subMenuTitle: "StaffTypes",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <StaffTypeList />;
  //     },
  //   },
  //   {
  //     path: "/workingtime/list",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "workingtime_list",
  //     subMenuTitle: "WorkingTime",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <WorkingTimeList />;
  //     },
  //   },
  //   {
  //     path: "/workingtime/create",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "workingtime_list",
  //     subMenuTitle: "",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <WorkingTimeEdit isNew={true} />;
  //     },
  //   },
  //   {
  //     path: "/workingtime/edit/:workingtimecode",
  //     mainMenuTitle: "",
  //     mainMenuKey: "admin",
  //     subMenuKey: "workingtime_list",
  //     subMenuTitle: "",
  //     persmissions: "",
  //     getPageElement: () => {
  //       return <WorkingTimeEdit isNew={false} />;
  //     },
  //   },

  {
    path: "/member",
    mainMenuTitle: "H???i vi??n",
    mainMenuKey: "member",
    subMenuKey: "member_register",
    subMenuTitle: "????ng k?? th??? h???i vi??n",
    persmissions: "",
    getPageElement: () => {
      return <MemberRegister />;
    },
  },

  {
    path: "/member/search",
    mainMenuTitle: "",
    mainMenuKey: "member",
    subMenuKey: "member_search",
    subMenuTitle: "Tra c???u th??ng tin th???",
    persmissions: "",
    getPageElement: () => {
      return <MemberSearch />;
    },
  },
  {
    path: "/",
    mainMenuTitle: "Qu???n tr???",
    mainMenuKey: "admin",
    subMenuKey: "nnt_list",
    subMenuTitle: "Ghi nh???n s??? d???ng ??u ????i",
    persmissions: "",
    getPageElement: () => {
      return <NNTList />;
    },
  },
  {
    path: "/",
    mainMenuTitle: "B??o c??o",
    mainMenuKey: "admin",
    subMenuKey: "nnt_list",
    subMenuTitle: "Qu???n l?? ????ng k?? h???i vi??n m???i",
    persmissions: "",
    getPageElement: () => {
      return <NNTList />;
    },
  },
  {
    path: "/",
    mainMenuTitle: "",
    mainMenuKey: "admin",
    subMenuKey: "nnt_list",
    subMenuTitle: "Qu???n l?? th??ng tin th???",
    persmissions: "",
    getPageElement: () => {
      return <NNTList />;
    },
  },
  {
    path: "/",
    mainMenuTitle: "",
    mainMenuKey: "admin",
    subMenuKey: "nnt_list",
    subMenuTitle: "????? ngh??? thay ?????i th??ng tin",
    persmissions: "",
    getPageElement: () => {
      return <NNTList />;
    },
  },
  {
    path: "/",
    mainMenuTitle: "",
    mainMenuKey: "admin",
    subMenuKey: "nnt_list",
    subMenuTitle: "X??t h???ng th???",
    persmissions: "",
    getPageElement: () => {
      return <NNTList />;
    },
  },
  //
];
