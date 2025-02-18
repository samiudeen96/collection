import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, searchVisible, setSearchVisible, getCartCount } =
    useContext(ShopContext);

  // const [searchVisible, setSearchVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname === "/collection") {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
    }
    // console.log(location);
  }, [location]);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link className="flex gap-1 items-end" to="/">
        <h2 className="text-4xl">Collection</h2>
        <div className="w-[3px] h-[px] p-1 rounded-full bg-red-200"></div>
      </Link>
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

      <div className="flex items-center gap-6 sm:w-28">
        <div className="sm:flex-1">
          {searchVisible && (
            <img
              onClick={() => setShowSearch(true)}
              className="w-5 cursor-pointer"
              src={assets.search_icon}
              alt=""
            />
          )}
        </div>
        <div className="group relative">
          <Link to={'/login'}>
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt=""
            />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded">
              <Link className="cursor-pointer hover:text-black">My Profile</Link>
              <Link to={'/orders'} className="cursor-pointer hover:text-black">Orders</Link>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
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
          <div
            className="flex items-center gap-3 p-3"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} className="rotate-180 h-4" alt="" />
            <p>Back</p>
          </div>
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-b-[0.5px] border-slate-200"
            >
              {item.name}
            </NavLink>
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
