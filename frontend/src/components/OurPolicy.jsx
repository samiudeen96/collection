import React from "react";
import { assets } from "../assets/assets";
const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policy.map((item, index) => (
        <div key={index}>
          <img src={item.image} className="w-12 m-auto mb-5" alt="" />
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-400">{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;

const policy = [
  {
    title: "Easy Exchange Policy",
    content: "We offer hassle free exchange policy",
    image: assets.exchange_icon,
  },
  {
    title: "Easy Exchange Policy",
    content: '7 Days Return Policy',
    image: assets.quality_icon,
  },
  {
    title: "Best Customer Support",
    content: "We provide 24/7 customer support",
    image: assets.exchange_icon,
  },
];
