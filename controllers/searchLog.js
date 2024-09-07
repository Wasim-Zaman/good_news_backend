const SearchLog = require("../models/searchLog");
const CustomError = require("../utils/error");
const generateResponse = require("../utils/response");

exports.createSearchLog = async (req, res, next) => {
  try {
    const { searchLog, count, searchDate } = req.body;

    if (!searchLog || !count || !searchDate) {
      throw new CustomError(
        "Search Log, Count, and Search Date are required",
        400
      );
    }

    const newSearchLog = await SearchLog.create({
      searchLog,
      count: parseInt(count, 10),
      searchDate: new Date(searchDate),
    });

    console.log(`Search log created with search term: ${searchLog}`);
    res
      .status(201)
      .json(generateResponse(201, true, "Search log created", newSearchLog));
  } catch (error) {
    console.log(`Error in createSearchLog: ${error.message}`);
    next(error);
  }
};

exports.getSearchLogById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const searchLog = await SearchLog.findById(id);
    if (!searchLog) {
      throw new CustomError("Search log not found", 404);
    }
    res
      .status(200)
      .json(generateResponse(200, true, "Search log found", searchLog));
  } catch (error) {
    console.log(`Error in getSearchLogById: ${error.message}`);
    next(error);
  }
};

exports.getAllSearchLogs = async (req, res, next) => {
  try {
    const searchLogs = await SearchLog.getAll();

    if (!searchLogs.length) {
      throw new CustomError("No search logs found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Search logs retrieved successfully",
          searchLogs
        )
      );
  } catch (error) {
    console.log(`Error in getAllSearchLogs: ${error.message}`);
    next(error);
  }
};

exports.getSearchLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query = "" } = req.query;

    const searchLogs = await SearchLog.get(Number(page), Number(limit), query);

    if (!searchLogs.data.length) {
      throw new CustomError("No search logs found", 404);
    }

    res
      .status(200)
      .json(
        generateResponse(
          200,
          true,
          "Search logs retrieved successfully",
          searchLogs
        )
      );
  } catch (error) {
    console.log(`Error in getSearchLogs: ${error.message}`);
    next(error);
  }
};

exports.updateSearchLog = async (req, res, next) => {
  const { id } = req.params;
  const { searchLog, count, searchDate } = req.body;

  try {
    console.log(`Attempting to update search log with ID: ${id}`);

    // Find the existing search log by ID
    const existingSearchLog = await SearchLog.findById(id);
    if (!existingSearchLog) {
      throw new CustomError("Search log not found", 404);
    }

    // Update the search log with the new data
    existingSearchLog.searchLog = searchLog || existingSearchLog.searchLog;
    existingSearchLog.count = count
      ? parseInt(count, 10)
      : existingSearchLog.count;
    existingSearchLog.searchDate = searchDate
      ? new Date(searchDate)
      : existingSearchLog.searchDate;

    // Save the updated search log
    const updatedSearchLog = await existingSearchLog.save();

    console.log(`Search log with ID: ${id} updated successfully`);
    res
      .status(200)
      .json(
        generateResponse(200, true, "Search log updated", updatedSearchLog)
      );
  } catch (error) {
    console.log(`Error in updateSearchLog: ${error.message}`);
    next(error);
  }
};

exports.deleteSearchLog = async (req, res, next) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete search log with ID: ${id}`);
    const searchLog = await SearchLog.findById(id);
    if (!searchLog) {
      throw new CustomError("Search log not found", 404);
    }

    await SearchLog.deleteById(id);

    res
      .status(200)
      .json(generateResponse(200, true, "Search log deleted successfully"));
  } catch (error) {
    console.log(`Error in deleteSearchLog: ${error.message}`);
    next(error);
  }
};
