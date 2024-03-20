import express from "express"; // Importing Express framework
import cors from "cors"; // Importing CORS middleware
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware

const app = express(); // Creating an instance of the Express application

// Setting up CORS middleware
// app.use(cors()) or
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Setting allowed origin(s) for cross-origin requests
    credentials: true, // Allowing credentials (e.g., cookies, authorization headers) to be included in cross-origin requests
  }),
);
// app.get("/products/", function (req, res, next) {
//   res.send({ msg: "This is CORS-enabled for all origins!" });
// });

// Parsing incoming JSON requests and setting maximum request body size limit to 16kb
app.use(express.json({ limit: "16kb" }));
// Parsing incoming URL-encoded requests and setting maximum request body size limit to 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// Serving static files from the "public" directory
app.use(express.static("public"));
// Parsing cookies attached to the client's request
app.use(cookieParser());

// Importing routes
import userRouter from "./routes/user.routes.js";

// Declaring routes
app.use("/api/v1/users", userRouter);

export default app; // Exporting the Express application instance
