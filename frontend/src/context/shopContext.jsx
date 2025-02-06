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
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select the size of the product");
      return;
    }
    let cartData = structuredClone(cartItems);

    // Checking if the Item Exists in the Cart
    if (cartData[itemId]) {
      // Updating Quantity If Item & Size Exist
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // If Size Exists: Increase the quantity by 1.
      } else {
        cartData[itemId][size] = 1; // If Size Doesn’t Exist: Add the size with an initial quantity of 1.
      }

      // Adding a New Item to the Cart
    } else {
      cartData[itemId] = {}; // Create an empty object {} for its sizes.
      cartData[itemId][size] = 1; // Add the selected size with a quantity of 1.
    }

    setCartItems(cartData);
    toast.success("Product added to the cart successfully");
    console.log(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      // console.log(cartItems[items]);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount = totalCount + cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmt =()=>{
    
  }

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
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity, 
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
