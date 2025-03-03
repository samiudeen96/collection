import React, { useContext, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/shopContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    searchVisible,
    setSearchVisible,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  // const [searchVisible, setSearchVisible] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

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
        <div className="relative" ref={dropdownRef}>
          {/* Profile Icon (Click to toggle dropdown) */}
          <img
            onClick={() => {
              if (token) {
                setIsOpen(!isOpen);
              } else {
                navigate("/login");
              }
            }}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />

          {/* Dropdown Menu */}
          {isOpen && token && (
            <div className="absolute right-0 mt-2 w-36 py-3 px-3 space-y-2 bg-slate-100 text-gray-500 rounded shadow-lg">
              {/* {token ? ( */}
                <>
                  {/* <Link className="block cursor-pointer hover:text-black">
                    My Profile
                  </Link> */}
                  <Link
                    to="/orders"
                    className="block cursor-pointer hover:text-black"
                  >
                    Orders
                  </Link>
                  <p
                    className="block cursor-pointer hover:text-black"
                    onClick={logout}
                  >
                    Logout
                  </p>
                </>
              {/* ) : null} */}
            </div>
          )}
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
