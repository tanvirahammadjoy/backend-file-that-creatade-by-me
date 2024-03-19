import dotenv from "dotenv"; // Importing dotenv for environment variable configuration
import connectDB from "./db/index.js"; // Importing database connection function
import app from "./app.js"; // Importing Express application instance

// Load environment variables from .env file
dotenv.config({
  path: "../.env",
});

// const PORT = process.env.PORT || 3000; // Setting the port to listen on, default to 3000 if not provided in environment variables

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Once database connection is successful, start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`\n Server is running at port : ${PORT} \n`);
    });
    // Error handler for the Express server
    app.on("error", (error) => {
      console.error("Express server error:", error);
    });
  })
  .catch((error) => {
    // Handle error if MongoDB connection fails
    console.log("MONGO db connection failed !!!", error);
  });

/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/
