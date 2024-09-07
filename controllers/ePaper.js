const EPaper = require("../models/ePaper");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createEPaper = async (req, res, next) => {
  try {
    const { name } = req.body;

    const media = req.files && req.files.media ? req.files.media[0].path : null;
    const pdf = req.files && req.files.pdf ? req.files.pdf[0].path : null;

    if (!media || !pdf) {
      throw new CustomError("Media file and PDF file are required", 400);
    }

    const ePaper = await EPaper.create({
      media,
      name,
      pdf,
    });

    console.log(`E-paper created with name: ${name}`);
    res
      .status(201)
      .json(generateResponse(201, true, "E-paper created", ePaper));
  } catch (error) {
    console.log(`Error in createEPaper: ${error.message}`);
    next(error);
  }
};

exports.getEPaperById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const ePaper = await EPaper.findById(id);
    if (!ePaper) {
      throw new CustomError("E-paper not found", 404);
    }
    res.status(200).json(generateResponse(200, true, "E-paper found", ePaper));
  } catch (error) {
    console.log(`Error in getEPaperById: ${error.message}`);
    next(error);
  }
};

exports.getAllEPapers = async (req, res, next) => {
  try {
    const ePaperItems = await EPaper.getAll();

    if (!ePaperItems.length) {
      throw new CustomError("No e-paper items found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "E-paper items retrieved successfully",
          ePaperItems
        )
      );
  } catch (error) {
    console.log(`Error in getAllEPapers: ${error.message}`);
    next(error);
  }
};

exports.getEPapers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const ePaperItems = await EPaper.get(Number(page), Number(limit), query);

    if (!ePaperItems.data.length) {
      throw new CustomError("No e-paper items found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "E-paper items retrieved successfully",
          ePaperItems
        )
      );
  } catch (error) {
    console.log(`Error in getEPapers: ${error.message}`);
    next(error);
  }
};

exports.updateEPaper = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    console.log(`Attempting to update e-paper with ID: ${id}`);

    // Find the existing e-paper by ID
    const ePaper = await EPaper.findById(id);
    if (!ePaper) {
      throw new CustomError("E-paper not found", 404);
    }

    // Determine if new media or PDF files have been uploaded; otherwise, use the existing ones
    const media =
      req.files && req.files.media ? req.files.media[0].path : ePaper.media;
    const pdf = req.files && req.files.pdf ? req.files.pdf[0].path : ePaper.pdf;

    // If new media is uploaded, delete the old one
    if (req.files && req.files.media) {
      await fileHelper.deleteFile(ePaper.media);
    }

    // If new PDF is uploaded, delete the old one
    if (req.files && req.files.pdf) {
      await fileHelper.deleteFile(ePaper.pdf);
    }

    // Update the e-paper with the new data
    ePaper.media = media;
    ePaper.pdf = pdf;
    ePaper.name = name;

    // Save the updated e-paper
    const updatedEPaper = await ePaper.save();

    console.log(`E-paper with ID: ${id} updated successfully`);
    res
      .status(200)
      .json(generateResponse(200, true, "E-paper updated", updatedEPaper));
  } catch (error) {
    console.log(`Error in updateEPaper: ${error.message}`);
    next(error);
  }
};

exports.deleteEPaper = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete e-paper with ID: ${id}`);
    const ePaper = await EPaper.findById(id);
    if (!ePaper) {
      throw new CustomError("E-paper not found", 404);
    }

    await fileHelper.deleteFile(ePaper.media);
    await fileHelper.deleteFile(ePaper.pdf);
    await EPaper.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "E-paper deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteEPaper: ${error.message}`);
    next(error);
  }
};
