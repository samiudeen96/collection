import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // Fetch user data
    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {}; // Ensure cartData is an object

    // Initialize item if not present
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // Update the user cart
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Added to the cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // Fetch user data
    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    // Validate item existence before updating
    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    // Update the cart in DB
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {}; // Ensure cartData is an object

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
