import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      // console.log(tempData);
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className=" pt-14">
      <div className="text-2xl mb-3 border-b border-gray-200">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      {cartData.length > 0 ? (
        <>
          <div>
            {cartData.map((item, index) => {
              const productCopy = products.find(
                (product) => product._id === item._id
              );

              return (
                <div
                  key={index}
                  className="py-4 border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productCopy.image[0]}
                      alt=""
                    />

                    <div>
                      <p className="text-xm sm:text-lg font-medium">
                        {productCopy.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p>
                          {currency}
                          {productCopy.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border border-gray-200 bg-slate-100">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center flex-wrap justify-center">
                    <p>Quantity:</p>
                    <input
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQuantity(
                              item._id,
                              item.size,
                              Number(e.target.value)
                            )
                      }
                      className="border border-gray-200 bg-slate-100 max-w-10 sm:max-w-20 px-1 sm:px-2 p-1"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                  </div>

                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt=""
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mt-10">
            <p>Your cart is empty</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
