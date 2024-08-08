const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class EPaper {
  static async findById(id) {
    try {
      return await prisma.ePaper.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding e-paper by id:", error);
      throw error;
    }
  }

  static async findByName(name) {
    try {
      return await prisma.ePaper.findFirst({
        where: { name: name.toString() },
      });
    } catch (error) {
      console.error("Error finding e-paper by name:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating e-paper with data: ${JSON.stringify(data)}`);
      return await prisma.ePaper.create({
        data,
      });
    } catch (error) {
      console.error("Error creating e-paper:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating e-paper with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.ePaper.update({
        where: { id: id },
        data,
      });
    } catch (error) {
      console.error("Error updating e-paper by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting e-paper with ID ${id}`);
      return await prisma.ePaper.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting e-paper by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.ePaper.findMany();
    } catch (error) {
      console.error("Error finding all e-papers:", error);
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
              { pdf: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated e-papers
      const ePapers = await prisma.ePaper.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of e-papers
      const totalEPapers = await prisma.ePaper.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalEPapers / limit);

      return {
        data: ePapers,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalEPapers,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting e-papers with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = EPaper;
