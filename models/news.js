const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class News {
  static async findById(id) {
    try {
      return await prisma.news.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding news by id:", error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      return await prisma.news.findFirst({
        where: { title: title.toString() },
      });
    } catch (error) {
      console.error("Error finding news by title:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating news with data: ${JSON.stringify(data)}`);
      return await prisma.news.create({
        data,
      });
    } catch (error) {
      console.error("Error creating news:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating news with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.news.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating news by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting news with ID ${id}`);
      return await prisma.news.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting news by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.news.findMany();
    } catch (error) {
      console.error("Error finding all news:", error);
      throw error;
    }
  }

  static async get(page = 1, limit = 10, query = "") {
    try {
      const skip = (page - 1) * limit;

      // Define where condition if query is provided
      const where = query
        ? {
            OR: [{ title: { contains: query, mode: "insensitive" } }],
          }
        : {};

      // Fetch the paginated news items
      const newsItems = await prisma.news.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of news items
      const totalNewsItems = await prisma.news.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalNewsItems / limit);

      return {
        data: newsItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalNewsItems,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting news with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = News;
