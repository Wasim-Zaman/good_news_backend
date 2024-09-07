const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Good News",
    version: "1.0.0",
    description: "APIs Documentation",
    contact: {
      name: "Wasim Zaman",
      email: "wasimxaman13@gmail.com",
    },
  },
  servers: [
    {
      url: process.env.DOMAIN,
      description: "Production server",
    },
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
    // add more hosts...
  ],
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    path.join(__dirname, "../docs/swagger/testDocs.js"),
    path.join(__dirname, "../docs/swagger/admin.js"),
    path.join(__dirname, "../docs/swagger/category.js"),
    path.join(__dirname, "../docs/swagger/blog.js"),
    path.join(__dirname, "../docs/swagger/rss.js"),
    path.join(__dirname, "../docs/swagger/ad.js"),
    path.join(__dirname, "../docs/swagger/news.js"),
    path.join(__dirname, "../docs/swagger/liveNews.js"),
    path.join(__dirname, "../docs/swagger/ePaper.js"),
    path.join(__dirname, "../docs/swagger/searchLog.js"),
    path.join(__dirname, "../docs/swagger/cms.js"),
    path.join(__dirname, "../docs/swagger/user.js"),
    // add more paths...
  ],
};

var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
