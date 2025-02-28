import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);



  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      console.log(response.data);

      if (response.data.success) {
        setList(() => response.data.products);
        console.log(list);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
  
      console.log("API Response:", response.data); // Debugging line
  
      if (response.data.success) {
        setList((prev)=> prev.filter((item)=> item._id !== id))
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in removeProduct:", error);
    }
  };
  

  useEffect(()=>{
    fetchList();
  }, [])

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/*------------ List Table Title ------------*/}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/*------------ Product List ------------*/}

        {list.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-500 ">No products available</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-200 text-sm"
            >
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                className="text-right md:text-center cursor-pointer text-md font-bold text-red-500"
                onClick={() => removeProduct(item._id)}
              >
                X
              </p>
            </div>
            
          ))
        )}
      </div>
      {/* <button onClick={fetchList}>fetch</button> */}
    </>
  );
};

export default List;
