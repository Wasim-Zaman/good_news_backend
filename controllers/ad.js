const Ad = require("../models/ad");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createAd = async (req, res, next) => {
  try {
    const { title, timestamp, frequency } = req.body;
    const media = req.file ? req.file.path : null;

    if (!media) {
      throw new CustomError("Media is required", 400);
    }

    console.log(`Attempting to create ad with title: ${title}`);
    const existingAd = await Ad.findByTitle(title);
    if (!existingAd) {
      const ad = await Ad.create({
        media,
        title,
        timestamp,
        frequency: Number(frequency),
      });
      console.log(`Ad created with title: ${title}`);
      res.status(201).json(generateResponse(201, true, "Ad created", ad));
    } else {
      throw new CustomError("Ad already exists with this title", 400);
    }
  } catch (error) {
    console.log(`Error in createAd: ${error.message}`);
    next(error);
  }
};

exports.getAdById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findById(id);
    if (!ad) {
      throw new CustomError("Ad not found", 404);
    }
    res.status(200).json(generateResponse(200, true, "Ad found", ad));
  } catch (error) {
    console.log(`Error in getAdById: ${error.message}`);
    next(error);
  }
};

exports.getAllAds = async (req, res, next) => {
  try {
    const ads = await Ad.getAll();

    if (!ads.length) {
      throw new CustomError("No ads found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Ads retrieved successfully", ads));
  } catch (error) {
    console.log(`Error in getAllAds: ${error.message}`);
    next(error);
  }
};

exports.getAds = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const ads = await Ad.get(Number(page), Number(limit), query);

    if (!ads.data.length) {
      throw new CustomError("No ads found", 404);
    }

    res
      .status(200)
      .json(generateResponse(200, true, "Ads retrieved successfully", ads));
  } catch (error) {
    console.log(`Error in getAds: ${error.message}`);
    next(error);
  }
};

exports.updateAd = async (req, res, next) => {
  const { id } = req.params;
  const { title, timestamp, frequency } = req.body;

  try {
    console.log(`Attempting to update ad with ID: ${id}`);

    const ad = await Ad.findById(id);
    if (!ad) {
      throw new CustomError("Ad not found", 404);
    }

    let media = req.file ? req.file.path : ad.media;

    if (media && req.file) {
      await fileHelper.deleteFile(ad.media);
    }

    const updatedAd = await Ad.updateById(id, {
      media: media ?? ad.media,
      title: title ?? ad.title,
      timestamp: timestamp ?? ad.timestamp,
      frequency: Number(frequency || ad.frequency),
    });
    res.status(200).json(generateResponse(200, true, "Ad updated", updatedAd));
  } catch (error) {
    console.log(`Error in updateAd: ${error.message}`);
    next(error);
  }
};

exports.deleteAd = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete ad with ID: ${id}`);
    const ad = await Ad.findById(id);
    if (!ad) {
      throw new CustomError("Ad not found", 404);
    }

    await fileHelper.deleteFile(ad.media);
    await Ad.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Ad deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteAd: ${error.message}`);
    next(error);
  }
};
