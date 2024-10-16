const path = require('path');

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors-magic');
require('dotenv').config();

const swaggerSpec = require('./config/swagger');
const CustomError = require('./utils/error');
const response = require('./utils/response');
const testRoutes = require('./routes/sample');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const advertisementRoutes = require('./routes/advertisement');
const reporterRoutes = require('./routes/reporter');
const categoryRoutes = require('./routes/category');
// const blogRoutes = require('./routes/blog');
// const adRoutes = require('./routes/ad');
// const newsRoutes = require('./routes/news');
// const liveNews = require('./routes/liveNews');
// const rssRoutes = require('./routes/rss');
// const ePaperRoutes = require('./routes/ePaper');
// const searchLogRoutes = require('./routes/searchLog');
// const cmsRoutes = require('./routes/cms');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Create folder with name images and uncomment below line for serving image statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(testRoutes);
app.use('/api/admin/v1', adminRoutes);
app.use('/api/users/v1', userRoutes);
app.use('/api/post/v1', postRoutes);
app.use('/api/advertisement/v1', advertisementRoutes);
app.use('/api/reporter/v1', reporterRoutes);
app.use('/api/category', categoryRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/ad', adRoutes);
// app.use('/api/news', newsRoutes);
// app.use('/api/liveNews', liveNews);
// app.use('/api/rss', rssRoutes);
// app.use('/api/ePaper', ePaperRoutes);
// app.use('/api/searchLog', searchLogRoutes);
// app.use('/api/cms', cmsRoutes);

// Add your routes...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new CustomError(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message = 'An error occurred while processing your request. Please try again later.';
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
  console.log(`Server is running on port ${port}`);
});
