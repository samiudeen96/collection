import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div>
        <Link className="flex gap-1 items-end" to="/add">
          <h2 className="text-4xl">Collection</h2>
          <div className="w-[3px] h-[px] p-1 rounded-full bg-red-300"></div>
        </Link>
        <p className="mt-[-7px] text-sm text-red-300 font-bold">Admin Panel</p>
      </div>
      <button onClick={()=> setToken('')} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
