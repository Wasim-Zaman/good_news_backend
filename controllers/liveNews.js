const LiveNews = require("../models/liveNews");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");

exports.createLiveNews = async (req, res, next) => {
  try {
    const { media, name, uri } = req.body;

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
  const { media, name, uri } = req.body;

  try {
    console.log(`Attempting to update live news with ID: ${id}`);
    const liveNews = await LiveNews.findById(id);
    if (!liveNews) {
      throw new CustomError("Live news not found", 404);
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

    await LiveNews.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Live news deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteLiveNews: ${error.message}`);
    next(error);
  }
};
