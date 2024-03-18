// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

// export { asyncHandler };

// asyncHandler function is a higher-order function that wraps an asynchronous route handler
const asyncHandler = (requestHandler) => {
    // Returned function to be used as Express middleware
    return (req, res, next) => {
        // Wrap the requestHandler function in a Promise to handle asynchronous operations
        Promise.resolve(requestHandler(req, res, next))
            // If the Promise resolves successfully, continue to the next middleware
            .catch((err) => next(err)); // If an error occurs, forward it to the Express error-handling middleware
    };
};

// Export the asyncHandler function for use in other modules
export { asyncHandler };

// With these comments, each part of the code is explained:

// The purpose of the asyncHandler function is clarified, stating that it's a higher-order function for wrapping asynchronous route handlers.
// The returned function's purpose is explained, indicating that it's used as Express middleware.
// Comments inside the returned function describe the wrapping of the requestHandler function in a Promise and the handling of errors using .catch().
// Finally, the function is exported for use in other modules.
// These comments provide a clear understanding of the code's functionality and usage.


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
