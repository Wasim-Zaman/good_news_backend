const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class LiveNews {
  static async findById(id) {
    try {
      return await prisma.liveNews.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding live news by id:", error);
      throw error;
    }
  }

  static async findByName(name) {
    try {
      return await prisma.liveNews.findFirst({
        where: { name: name.toString() },
      });
    } catch (error) {
      console.error("Error finding live news by name:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating live news with data: ${JSON.stringify(data)}`);
      return await prisma.liveNews.create({
        data,
      });
    } catch (error) {
      console.error("Error creating live news:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating live news with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.liveNews.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error("Error updating live news by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting live news with ID ${id}`);
      return await prisma.liveNews.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting live news by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.liveNews.findMany();
    } catch (error) {
      console.error("Error finding all live news:", error);
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
              { name: { contains: query, mode: "insensitive" } },
              { uri: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated live news items
      const liveNewsItems = await prisma.liveNews.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of live news items
      const totalLiveNewsItems = await prisma.liveNews.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalLiveNewsItems / limit);

      return {
        data: liveNewsItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalLiveNewsItems,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting live news with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = LiveNews;
