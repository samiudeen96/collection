import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e, filterType) => {
    const { value } = e.target;

    // Only toggle category if it's part of the CATEGORIES filter
    if (filterType === "CATEGORIES") {
      if (category.includes(value)) {
        setCategory((prev) => prev.filter((item) => item !== value));
      } else {
        setCategory((prev) => [...prev, value]);
      }
    }

    if (filterType === "TYPE") {
      if (subCategory.includes(value)) {
        setSubCategory((prev) => prev.filter((item) => item !== value));
      } else {
        setSubCategory((prev) => [...prev, value]);
      }
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortFilter = () => {
    const fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    sortFilter();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
    console.log(subCategory);
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        {/* Category Filter */}
        {filters.map((item, index) => (
          <div
            key={index}
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">{item.name}</p>

            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {item.options.map((option) => (
                <p className="flex gap-2" key={option.name}>
                  <input
                    className="w-3"
                    type="checkbox"
                    value={option.name}
                    onChange={(e) => toggleCategory(e, item.name)}
                  />
                  {option.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

const filters = [
  {
    name: "CATEGORIES",
    options: [
      {
        name: "Men",
      },
      {
        name: "Women",
      },
      {
        name: "Kids",
      },
    ],
  },
  {
    name: "TYPE",
    options: [
      {
        name: "Topwear",
      },
      {
        name: "Bottomwear",
      },
      {
        name: "Winterwear",
      },
    ],
  },
];
