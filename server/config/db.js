const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    //   const conn = await mongoose.connect(process.env.DB_URL);
    const conn = await mongoose.connect(
      `mongodb+srv://imrans-todo:vBMHZcYyOIJDMJW6@cluster0.qxeleyw.mongodb.net/page-builder`
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
