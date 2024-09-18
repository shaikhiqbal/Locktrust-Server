class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    console.log({data})
    this.statusCode = statusCode;
    this.message = message;
    this.statusCode=statusCode<400
    Object.assign(this, data);
  }
}

export { ApiResponse };
