// Certainly! This code utilizes the multer middleware in a Node.js application for handling file uploads. Let's break it down step by step:
import multer from "multer"; // Importing multer middleware for handling file uploads


// Configuring storage: Multer allows you to define how files should be stored. In this code, it configures a disk storage engine using multer.diskStorage. This engine specifies where to store files on the server and how to name them.
// Configuring storage engine for multer
let storage = multer.diskStorage({
  // Define destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, "../public/temp"); // Set destination directory to "./public/temp"
  },
  // Define filename for uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set filename to original filename
  },
});


// destination: Defines the destination directory where uploaded files will be stored. In this case, it's set to ./public/temp.
// filename: Defines the filename for the uploaded file. It sets the filename to be the same as the original filename.

// Creating multer middleware instance: After configuring storage, the code creates a multer middleware instance using the configured storage engine.
// Creating multer middleware instance with configured storage
export const upload = multer({
  storage, // Use configured storage engine
});
// upload: This is the middleware instance created by multer. It's configured to use the storage engine defined earlier.



// Overall, this code sets up a multer middleware instance with a disk storage engine configured to store uploaded files in the ./public/temp directory on the server with their original filenames. This middleware can then be used in route handlers to handle file uploads.

// in this code one is uploding in multer server and number two is uploading in public/temp right?

// Yes, that's correct. Let's clarify:

// Uploading in multer server:

// When you configure multer with the diskStorage engine and set the destination to a directory, as done in the code ("./public/temp"), multer will save the uploaded files to that directory on the server where your Node.js application is running. This means the files are stored on the server's filesystem.
// Uploading in public/temp:

// In the provided code, ./public/temp is indeed the destination directory specified for storing uploaded files. So, when a file is uploaded using the multer middleware instance configured with this storage engine, it will be saved in the ./public/temp directory relative to the root of your Node.js application. This is also on the server's filesystem.
// In summary, both explanations refer to storing the uploaded files on the server, with the public/temp directory being the destination for file storage in this particular code snippet.






