import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%]  min-h-screen border-gray-300 border-r-1">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {navs.map((nav) => (
          <NavLink
            key={nav.name}
            to={nav.path}
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img className="w-5 h-5" src={nav.img} alt="" />
            <p className="hidden md:block">{nav.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const navs = [
  {
    name: "Add Items",
    img: `${assets.add_icon}`,
    path: "/add",
  },
  {
    name: "List Items",
    img: `${assets.order_icon}`,
    path: "/list",
  },
  {
    name: "Orders",
    img: `${assets.order_icon}`,
    path: "/orders",
  }
];

export default Sidebar;
