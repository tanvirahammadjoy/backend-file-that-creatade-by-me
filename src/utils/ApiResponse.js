class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        // Constructor method for the ApiResponse class, invoked when a new ApiResponse instance is created
        // Parameters:
        // - statusCode: The HTTP status code of the response
        // - data: The data payload of the response
        // - message: The message associated with the response (default: "Success")

        this.statusCode = statusCode; // Assign the provided statusCode to the statusCode property
        this.data = data; // Assign the provided data to the data property
        this.message = message; // Assign the provided message to the message property
        this.success = statusCode < 400; // Determine the success status based on the statusCode (statusCode < 400 indicates success)
    }
}

export { ApiResponse }; // Export the ApiResponse class for use in other modules
