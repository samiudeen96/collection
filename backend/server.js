import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

// api endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

app.get("/", (req, res, next) => {
  return res.send("Api Working");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
