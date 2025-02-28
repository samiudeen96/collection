import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Ensure file upload middleware is configured
    if (!req.files) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files[key] && req.files[key][0])
      .filter((file) => file !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error(`Error uploading ${file.path}:`, uploadError);
          return null;
        }
      })
    );

    // Filter out failed uploads
    imagesUrl = imagesUrl.filter((url) => url !== null);

    if (imagesUrl.length === 0) {
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true",
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default addProduct;


//function for list product
const listProduct = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
    console.log(products);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for remove product
const removeProduct = async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for get single product
const singleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
