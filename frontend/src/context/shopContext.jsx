import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 50;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [cartItmes, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size of the product");
      return;
    }
    let cartData = structuredClone(cartItmes);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Product added to the cart successfully");
    console.log(cartData);
    // return cartData;
  };

  

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItmes) {
      // console.log(cartItmes[items]);
      for (const item in cartItmes[items]) {
        try {
          if (cartItmes[items][item] > 0) {
            totalCount = totalCount + cartItmes[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalCount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    searchVisible,
    setSearchVisible,
    cartItmes,
    addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
