import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export const SideBarItem = [
  {
    title: "Dashboard",
    icon: <RxDashboard size={20} />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <IoIosAddCircleOutline size={20} />,
    path: "/add-product",
  },
  {
    title: "Profile",
    icon: <CgProfile size={20} />,
    path: "/profile",
  },
];
