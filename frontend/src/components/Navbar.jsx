import React from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <h2 className="text-4xl">Collection</h2>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="flex flex-col items-center gap-1"
          >
            <p>{item.name}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <img className="w-5 cursor-pointer" src={assets.search_icon} alt="" />

        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            10
          </p>
        </Link>

        {/* mobile menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* mobile menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="flex items-center gap-3 p-3" onClick={() => setVisible(false)}>
            <img
              src={assets.dropdown_icon}
              className="rotate-180 h-4"
              alt=""
            />
            <p>Back</p>
          </div>
          {menu.map((item)=>(
            <NavLink key={item.name} to={item.path} onClick={()=> setVisible(false)} className='py-2 pl-6 border-b-[0.5px] border-slate-200'>{item.name}</NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

const menu = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "COLLECTION",
    path: "/collection",
  },
  {
    name: "ABOUT",
    path: "/about",
  },
  {
    name: "CONTACT",
    path: "/contact",
  },
];

export default Navbar;
