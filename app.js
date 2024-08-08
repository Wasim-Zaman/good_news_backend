const path = require("path");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
require("dotenv").config();

const swaggerSpec = require("./config/swagger");
const CustomError = require("./utils/customError");
const response = require("./utils/response");
const testRoutes = require("./routes/sample");
const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
const blogRoutes = require("./routes/blog");
const adRoutes = require("./routes/ad");
const newsRoutes = require("./routes/news");
const liveNews = require("./routes/liveNews");
const rssRoutes = require("./routes/rss");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create folder with name images and uncomment below line for serving image statically
app.use("/images", express.static(path.join(__dirname, "uploads")));

app.use(testRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ad", adRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/liveNews", liveNews);
app.use("/api/rss", rssRoutes);

// Add your routes...
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new CustomError(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message =
    "An error occurred while processing your request. Please try again later.";
  let data = null;
  let success = false;

  if (error instanceof CustomError) {
    status = error.statusCode || 500;
    message = error.message || message;
    data = error.data || null;
  }

  res.status(status).json(response(status, success, message, data));
});

app.listen(port, function () {
  console.log("Server is running");
});
