import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    const mongoDBUrl = "mongodb://0.0.0.0:27017/note_app";
    await mongoose.connect(mongoDBUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    
  }
};

export default connectToMongoDB;
