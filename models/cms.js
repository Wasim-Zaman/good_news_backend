const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class CMS {
  static async findById(id) {
    try {
      return await prisma.cMS.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding CMS by id:", error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      return await prisma.cMS.findFirst({
        where: { title: title.toString() },
      });
    } catch (error) {
      console.error("Error finding CMS by title:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating CMS with data: ${JSON.stringify(data)}`);
      return await prisma.cMS.create({
        data,
      });
    } catch (error) {
      console.error("Error creating CMS:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating CMS with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.cMS.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error("Error updating CMS by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting CMS with ID ${id}`);
      return await prisma.cMS.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting CMS by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.cMS.findMany();
    } catch (error) {
      console.error("Error finding all CMS entries:", error);
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
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated CMS items
      const cmsItems = await prisma.cMS.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of CMS items
      const totalCMSItems = await prisma.cMS.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalCMSItems / limit);

      return {
        data: cmsItems,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCMSItems,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting CMS entries with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = CMS;
