import React from "react";
import * as BsIcons from "react-icons/bs";
import * as FcIcons from "react-icons/fc";
export const ProfileMenu = [
  {
    title: "Home",
    path: "/",
    icon: <FcIcons.FcDepartment></FcIcons.FcDepartment>,
    cName: "nav-text",
  },
  {
    title: "proposed items",
    path: "/myitems",
    icon: <FcIcons.FcIdea></FcIcons.FcIdea>,
    cName: "nav-text",
  },
  {
    title: "previous items",
    path: "/previousitems",
    icon: <FcIcons.FcViewDetails></FcIcons.FcViewDetails>,
    cName: "nav-text",
  },
  {
    title: "Submit Item",
    path: "/submit",
    icon: <FcIcons.FcDataRecovery></FcIcons.FcDataRecovery>,
    cName: "nav-text",
  },
  {
    title: "My account",
    path: "/account",
    icon: <FcIcons.FcBusinessman></FcIcons.FcBusinessman>,
    cName: "nav-text",
  },

  {
    title: "Logout",
    path: "/",
    icon: <BsIcons.BsPower></BsIcons.BsPower>,
    cName: "nav-text",
  },
];
