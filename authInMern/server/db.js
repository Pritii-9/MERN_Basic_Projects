import mongoose from "mongoose";

export const connection = () => {
  const options = {
    // dbName: "RESTAURANT",
    writeConcern: { w: "majority" },
    retryWrites: true,
    wtimeoutMS: 5000,
  };

  mongoose.connect(process.env.DB, options)
    .then(() => {
      console.log("Connected successfully");
      mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to MongoDB");
      });
    })
    .catch((err) => {
      console.error("Error occurred:", err);
      // Additional error handling logic here
      process.exit(1); // Exit the process with a non-zero exit code
    });
};
