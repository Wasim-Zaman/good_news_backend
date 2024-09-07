const CMS = require("../models/cms");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createCMS = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const media = req.file ? req.file.path : null;

    if (!media) {
      throw new CustomError("Media file is required", 400);
    }

    const cmsEntry = await CMS.create({
      media,
      title,
      description,
    });

    console.log(`CMS entry created with title: ${title}`);
    res
      .status(201)
      .json(generateResponse(201, true, "CMS entry created", cmsEntry));
  } catch (error) {
    console.log(`Error in createCMS: ${error.message}`);
    next(error);
  }
};

exports.getCMSById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cmsEntry = await CMS.findById(id);
    if (!cmsEntry) {
      throw new CustomError("CMS entry not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "CMS entry found", cmsEntry));
  } catch (error) {
    console.log(`Error in getCMSById: ${error.message}`);
    next(error);
  }
};

exports.getAllCMS = async (req, res, next) => {
  try {
    const cmsItems = await CMS.getAll();

    if (!cmsItems.length) {
      throw new CustomError("No CMS entries found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "CMS entries retrieved successfully",
          cmsItems
        )
      );
  } catch (error) {
    console.log(`Error in getAllCMS: ${error.message}`);
    next(error);
  }
};

exports.getCMS = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const cmsItems = await CMS.get(Number(page), Number(limit), query);

    if (!cmsItems.data.length) {
      throw new CustomError("No CMS entries found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "CMS entries retrieved successfully",
          cmsItems
        )
      );
  } catch (error) {
    console.log(`Error in getCMS: ${error.message}`);
    next(error);
  }
};

exports.updateCMS = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    console.log(`Attempting to update CMS entry with ID: ${id}`);
    const cmsEntry = await CMS.findById(id);
    if (!cmsEntry) {
      throw new CustomError("CMS entry not found", 404);
    }

    let media = req.file ? req.file.path : cmsEntry.media;

    if (req.file) {
      await fileHelper.deleteFile(cmsEntry.media);
    }

    const updatedCMS = await CMS.updateById(id, {
      media,
      title,
      description,
    });
    res
      .status(200)
      .json(generateResponse(200, true, "CMS entry updated", updatedCMS));
  } catch (error) {
    console.log(`Error in updateCMS: ${error.message}`);
    next(error);
  }
};

exports.deleteCMS = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete CMS entry with ID: ${id}`);
    const cmsEntry = await CMS.findById(id);
    if (!cmsEntry) {
      throw new CustomError("CMS entry not found", 404);
    }

    await fileHelper.deleteFile(cmsEntry.media);
    await CMS.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "CMS entry deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteCMS: ${error.message}`);
    next(error);
  }
};
