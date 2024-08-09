const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class SearchLog {
  static async findById(id) {
    try {
      return await prisma.searchLog.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding search log by id:", error);
      throw error;
    }
  }

  static async findBySearchLog(searchLog) {
    try {
      return await prisma.searchLog.findFirst({
        where: { searchLog: searchLog.toString() },
      });
    } catch (error) {
      console.error("Error finding search log by searchLog:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating search log with data: ${JSON.stringify(data)}`);
      return await prisma.searchLog.create({
        data,
      });
    } catch (error) {
      console.error("Error creating search log:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating search log with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.searchLog.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error("Error updating search log by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting search log with ID ${id}`);
      return await prisma.searchLog.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting search log by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.searchLog.findMany();
    } catch (error) {
      console.error("Error finding all search logs:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [{ searchLog: { contains: query, mode: "insensitive" } }],
          }
        : {};

      // Fetch the paginated search logs
      const searchLogs = await prisma.searchLog.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of search logs
      const totalSearchLogs = await prisma.searchLog.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalSearchLogs / limit);

      return {
        data: searchLogs,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalSearchLogs,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting search logs with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = SearchLog;
