const News = require("../models/news");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createNews = async (req, res, next) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    console.log(`Attempting to create news with title: ${title}`);
    const existingNews = await News.findByTitle(title);
    if (!existingNews) {
      const news = await News.create({
        image,
        title,
      });
      console.log(`News created with title: ${title}`);
      res.status(201).json(generateResponse(201, true, "News created", news));
    } else {
      throw new CustomError("News already exists with this title", 400);
    }
  } catch (error) {
    console.log(`Error in createNews: ${error.message}`);
    next(error);
  }
};

exports.getNewsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const news = await News.findById(id);
    if (!news) {
      throw new CustomError("News not found", 404);
    }
    res.status(200).json(generateResponse(200, true, "News found", news));
  } catch (error) {
    console.log(`Error in getNewsById: ${error.message}`);
    next(error);
  }
};

exports.getAllNews = async (req, res, next) => {
  try {
    const newsItems = await News.getAll();

    if (!newsItems.length) {
      throw new CustomError("No news found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "News retrieved successfully", newsItems)
      );
  } catch (error) {
    console.log(`Error in getAllNews: ${error.message}`);
    next(error);
  }
};

exports.getNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const newsItems = await News.get(Number(page), Number(limit), query);

    if (!newsItems.data.length) {
      throw new CustomError("No news found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(200, true, "News retrieved successfully", newsItems)
      );
  } catch (error) {
    console.log(`Error in getNews: ${error.message}`);
    next(error);
  }
};

exports.updateNews = async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    console.log(`Attempting to update news with ID: ${id}`);
    const news = await News.findById(id);
    if (!news) {
      throw new CustomError("News not found", 404);
    }

    let image = req.file ? req.file.path : news.image;

    if (image && req.file) {
      await fileHelper.deleteFile(news.image);
    }

    const updatedNews = await News.updateById(id, {
      image,
      title,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "News updated", updatedNews));
  } catch (error) {
    console.log(`Error in updateNews: ${error.message}`);
    next(error);
  }
};

exports.deleteNews = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete news with ID: ${id}`);
    const news = await News.findById(id);
    if (!news) {
      throw new CustomError("News not found", 404);
    }

    await fileHelper.deleteFile(news.image);
    await News.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "News deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteNews: ${error.message}`);
    next(error);
  }
};
