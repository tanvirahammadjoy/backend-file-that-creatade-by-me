import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
  path: "../.env",
});
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n Server is running at port : ${PORT} \n`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!!", error);
  });
