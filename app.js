const path = require("path");
const fs = require("fs");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
require("dotenv").config();

const swaggerSpec = require("./config/swagger");
const response = require("./utils/response");
const testRoutes = require("./routes/sample");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create folder with name images and uncomment below line for serving image statically
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(testRoutes);
app.use(adminRoutes);
// Add your routes...
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new Error(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message =
    error.message ||
    "An error occurred while trying to process your request. Please try again later.";
  const data = null;
  const success = false;
  res.status(status).json(response(status, success, message, data));
});

app.listen(port, function () {
  console.log("Server is running");
});
