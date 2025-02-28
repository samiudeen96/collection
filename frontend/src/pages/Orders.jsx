import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: { token },
        }
      );
      // console.log(response.data);

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.map((order) => {
          // console.log(item);
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });

        setOrders(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-green-500";

      case "Processing":
        return "bg-yellow-500";

      case "Shipped":
        return "bg-blue-500";

      case "Delivered":
        return "bg-purple-500";

      case "Cancelled":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="">
        {orders.map((item, index) => (
          <div
            key={index}
            className="py-4 border-b border-gray-300 text-gray-700 flex col md:flex-row md:items-center md:justify-between gap-4 "
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1 text-sm">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1 text-sm">
                  Payment:{" "}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${statusHandler(
                    item.status
                  )}`}
                ></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer" onClick={loadOrders}>
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
