class ApiError extends Error {
  constructor(
    statusCode, // The HTTP status code associated with the error
    message = "Something went wrong", // The error message (default: "Something went wrong")
    errors = [], // Any additional errors or error details (default: empty array)
    stack = "", // The stack trace (default: empty string)
  ) {
    super(message); // Call the constructor of the Error class and pass the provided message

    // Set properties of the ApiError instance
    this.statusCode = statusCode; // Assign the provided HTTP status code to the statusCode property
    this.data = null; // Initialize the data property to null
    this.message = message; // Assign the provided message to the message property
    this.success = false; // Set the success property to false to indicate failure
    this.errors = errors; // Assign the provided errors to the errors property

    // If a stack trace is provided, assign it to the stack property; otherwise, capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError }; // Export the ApiError class for use in other modules
