import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {

  const { cartItems } = useContext(ShopContext);
  console.log(cartItems);

  useEffect(()=>{

    
  }, [cartItems])
  

  return <div></div>;
};

export default Cart;
