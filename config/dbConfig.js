// // IMPORTS
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// // CONFIG
// dotenv.config();
// // CONNECTION TO MONGODB
// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// module.exports = {connectDB};


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully 🚀");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
