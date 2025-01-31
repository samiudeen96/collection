import React from "react";
// import {assets} from '../assets/assets'
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear(); 
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link className="flex gap-1 items-end" to="/">
            <h2 className="text-4xl">Collection</h2>
            <div className="w-[3px] h-[px] p-1 rounded-full bg-red-200"></div>
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@collection.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300">
        <p className="py-5 text-sm text-center">Copyright {year}@ collection.com - All Right Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
