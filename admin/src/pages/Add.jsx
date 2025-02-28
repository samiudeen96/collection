import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState(false);
  const [previewImages, setPreviewImages] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const id = e.target.id;
    if (file) {
      setImages((prev) => ({ ...prev, [id]: file }));
      setPreviewImages((prev) => ({
        ...prev,
        [id]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      Object.keys(images).forEach((key) => {
        formData.append(key, images[key]);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        formReset();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const formReset = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Men");
    setSubCategory("Topwear");
    setBestseller(false);
    setSizes([]);
    setImages(false);
    setPreviewImages({});
  };

  const labelArr = ["image1", "image2", "image3", "image4"].map((id) => ({
    id,
    img: previewImages[id] || assets.upload_area,
  }));

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-3 w-full items-start"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2 ">
          {labelArr.map((item) => (
            <label key={item.id} htmlFor={item.id}>
              <img className="w-20 cursor-pointer" src={item.img} alt="" />
              <input onChange={handleImage} type="file" id={item.id} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
          type="text "
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
          type="text "
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="border border-gray-300 w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="">
          <p className="mb-2">Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px] border border-gray-300"
            type="Number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {sizesArr.map((item, index) => (
            <div key={index} onClick={() => handleSizeClick(item.size)}>
              <p
                className={`px-3 py-1 cursor-pointer transition-all ${
                  sizes.includes(item.size)
                    ? "bg-black text-white"
                    : "bg-slate-200"
                }`}
              >
                {item.size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white flex items-center justify-center"
        disabled={loading} // Disable button when loading
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

const sizesArr = [
  {
    size: "S",
  },
  {
    size: "M",
  },
  {
    size: "L",
  },
  {
    size: "XL",
  },
  {
    size: "XXL",
  },
];

export default Add;
