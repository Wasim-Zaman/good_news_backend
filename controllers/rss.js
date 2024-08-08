const Rss = require("../models/rss");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createRss = async (req, res, next) => {
  try {
    const { category, language, name, url, title } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
      throw new CustomError("Image is required", 400);
    }

    const rss = await Rss.create({
      category,
      language,
      name,
      url,
      image,
      title,
    });

    console.log(`RSS feed item created with title: ${title}`);
    res
      .status(201)
      .json(generateResponse(201, true, "RSS feed item created", rss));
  } catch (error) {
    console.log(`Error in createRss: ${error.message}`);
    next(error);
  }
};

exports.getRssById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rss = await Rss.findById(id);
    if (!rss) {
      throw new CustomError("RSS feed item not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "RSS feed item found", rss));
  } catch (error) {
    console.log(`Error in getRssById: ${error.message}`);
    next(error);
  }
};

exports.getAllRss = async (req, res, next) => {
  try {
    const rssFeedItems = await Rss.getAll();

    if (!rssFeedItems.length) {
      throw new CustomError("No RSS feed items found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "RSS feed items retrieved successfully",
          rssFeedItems
        )
      );
  } catch (error) {
    console.log(`Error in getAllRss: ${error.message}`);
    next(error);
  }
};

exports.getRss = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const rssFeedItems = await Rss.get(Number(page), Number(limit), query);

    if (!rssFeedItems.data.length) {
      throw new CustomError("No RSS feed items found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "RSS feed items retrieved successfully",
          rssFeedItems
        )
      );
  } catch (error) {
    console.log(`Error in getRss: ${error.message}`);
    next(error);
  }
};

exports.updateRss = async (req, res, next) => {
  const { id } = req.params;
  const { category, language, name, url, title } = req.body;

  try {
    console.log(`Attempting to update RSS feed item with ID: ${id}`);
    const rss = await Rss.findById(id);
    if (!rss) {
      throw new CustomError("RSS feed item not found", 404);
    }

    let image = req.file ? req.file.path : rss.image;

    if (image && req.file) {
      await fileHelper.deleteFile(rss.image);
    }

    const updatedRss = await Rss.updateById(id, {
      category,
      language,
      name,
      url,
      image,
      title,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "RSS feed item updated", updatedRss));
  } catch (error) {
    console.log(`Error in updateRss: ${error.message}`);
    next(error);
  }
};

exports.deleteRss = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete RSS feed item with ID: ${id}`);
    const rss = await Rss.findById(id);
    if (!rss) {
      throw new CustomError("RSS feed item not found", 404);
    }

    await fileHelper.deleteFile(rss.image);
    await Rss.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "RSS feed item deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteRss: ${error.message}`);
    next(error);
  }
};
