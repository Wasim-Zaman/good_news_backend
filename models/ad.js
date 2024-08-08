const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Ad {
  static async findById(id) {
    try {
      return await prisma.ad.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding ad by id:", error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      return await prisma.ad.findFirst({
        where: { title: title.toString() },
      });
    } catch (error) {
      console.error("Error finding ad by title:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating ad with data: ${JSON.stringify(data)}`);
      return await prisma.ad.create({
        data,
      });
    } catch (error) {
      console.error("Error creating ad:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating ad with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.ad.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating ad by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting ad with ID ${id}`);
      return await prisma.ad.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting ad by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.ad.findMany();
    } catch (error) {
      console.error("Error finding all ads:", error);
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

      // Fetch the paginated ads
      const ads = await prisma.ad.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of ads
      const totalAds = await prisma.ad.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalAds / limit);

      return {
        data: ads,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalAds,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting ads with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = Ad;
