const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Rss {
  static async findById(id) {
    try {
      return await prisma.rss.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding RSS feed item by id:", error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      return await prisma.rss.findFirst({
        where: { title: title.toString() },
      });
    } catch (error) {
      console.error("Error finding RSS feed item by title:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating RSS feed item with data: ${JSON.stringify(data)}`);
      return await prisma.rss.create({
        data,
      });
    } catch (error) {
      console.error("Error creating RSS feed item:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating RSS feed item with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.rss.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error("Error updating RSS feed item by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting RSS feed item with ID ${id}`);
      return await prisma.rss.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting RSS feed item by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.rss.findMany();
    } catch (error) {
      console.error("Error finding all RSS feed items:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { category: { contains: query, mode: "insensitive" } },
              { language: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated RSS feed items
      const rssFeedItems = await prisma.rss.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of RSS feed items
      const totalRssFeedItems = await prisma.rss.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalRssFeedItems / limit);

      return {
        data: rssFeedItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalRssFeedItems,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting RSS feed items with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = Rss;
