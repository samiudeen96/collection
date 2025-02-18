import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Ratings from "../components/Ratings";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProduct = async () => {
    // products.map((item) => {
    //   if (item._id === productId) {
    //     setSelectedProduct(item);
    // setImage(item)
    //     return null;
    //   }
    // });

    const productFound = products.find((item) => {
      return item._id === productId;
    });

    // return newObj = {
    //   itemId: item._id === productId,
    //   itemImage:setImage(item)
    // }

    setSelectedProduct(productFound || false);
    setImage(productFound.image[0]);
    console.log(image);

    // const productFound = products.filter((item)=> item._id === productId);
    // setSelectedProduct(productFound || false)
  };

  useEffect(() => {
    fetchProduct();
  }, [productId, products]);

  return selectedProduct ? (
    <div className="border-t border-gray-300 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* <pre>{JSON.stringify(selectedProduct, null, 2)}</pre> */}
      {/* Product Date */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {/* <p>{selectedProduct.name} </p> */}
            {selectedProduct.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-3">{selectedProduct.name}</h1>
          <div className="flex gap-2">
            <Ratings rating={selectedProduct.ratings} />
            <p>(4)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {selectedProduct.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {selectedProduct.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {selectedProduct.sizes.map((item, index) => (
                <button
                  onClick={() => setSelectedSize(item)}
                  className={`border py-2 px-4 cursor-pointer ${
                    item === selectedSize ? "bg-black text-white" : "bg-gray-100"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=> addToCart(selectedProduct._id, selectedSize)} className="bg-black text-white px-8 py-3 text-sm cursor-pointer active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policywithin 7 days</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-200 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-200 px-5 py-3 text-sm">
            Review (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform thatfacilitates the
            buying and selling the products.
          </p>
        </div>
      </div>

      {/* -----------Display related products----------- */}
      <RelatedProduct
        category={selectedProduct.category}
        subCategory={selectedProduct.subCategory}
      />
    </div>
  ) : (
    <div>No product Found</div>
  );
};

export default Product;
