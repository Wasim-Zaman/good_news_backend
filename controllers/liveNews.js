const LiveNews = require("../models/liveNews");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createLiveNews = async (req, res, next) => {
  try {
    const { name, uri } = req.body;
    const media = req.file ? req.file.path : null;

    if (!media) {
      throw new CustomError("Media file is required", 400);
    }

    const liveNews = await LiveNews.create({
      media,
      name,
      uri,
    });

    console.log(`Live news created with name: ${name}`);
    res
      .status(201)
      .json(generateResponse(201, true, "Live news created", liveNews));
  } catch (error) {
    console.log(`Error in createLiveNews: ${error.message}`);
    next(error);
  }
};

exports.getLiveNewsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const liveNews = await LiveNews.findById(id);
    if (!liveNews) {
      throw new CustomError("Live news not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Live news found", liveNews));
  } catch (error) {
    console.log(`Error in getLiveNewsById: ${error.message}`);
    next(error);
  }
};

exports.getAllLiveNews = async (req, res, next) => {
  try {
    const liveNewsItems = await LiveNews.getAll();

    if (!liveNewsItems.length) {
      throw new CustomError("No live news items found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Live news items retrieved successfully",
          liveNewsItems
        )
      );
  } catch (error) {
    console.log(`Error in getAllLiveNews: ${error.message}`);
    next(error);
  }
};

exports.getLiveNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const liveNewsItems = await LiveNews.get(
      Number(page),
      Number(limit),
      query
    );

    if (!liveNewsItems.data.length) {
      throw new CustomError("No live news items found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Live news items retrieved successfully",
          liveNewsItems
        )
      );
  } catch (error) {
    console.log(`Error in getLiveNews: ${error.message}`);
    next(error);
  }
};

exports.updateLiveNews = async (req, res, next) => {
  const { id } = req.params;
  const { name, uri } = req.body;

  try {
    console.log(`Attempting to update live news with ID: ${id}`);
    const liveNews = await LiveNews.findById(id);
    if (!liveNews) {
      throw new CustomError("Live news not found", 404);
    }

    let media = req.file ? req.file.path : liveNews.media;

    if (req.file) {
      await fileHelper.deleteFile(liveNews.media);
    }

    const updatedLiveNews = await LiveNews.updateById(id, {
      media,
      name,
      uri,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "Live news updated", updatedLiveNews));
  } catch (error) {
    console.log(`Error in updateLiveNews: ${error.message}`);
    next(error);
  }
};

exports.deleteLiveNews = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete live news with ID: ${id}`);
    const liveNews = await LiveNews.findById(id);
    if (!liveNews) {
      throw new CustomError("Live news not found", 404);
    }

    await fileHelper.deleteFile(liveNews.media);
    await LiveNews.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Live news deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteLiveNews: ${error.message}`);
    next(error);
  }
};
