// import mongoose from "mongoose";

// const connectDb = async () => {

//     mongoose.Connection.on("connected", ()=>{
//         console.log('DB Connected');
//     });

//     await mongoose.Connect(`${process.env.MONGODB_URL}/e-commerce`)
// };

// export default connectDb;

import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`).then((con) => {
    console.log(`DB Connected ${con.connection.host}`);
  });
};

export default connectDB;
