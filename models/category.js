const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Category {
  static async findById(id) {
    try {
      return await prisma.category.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding category by id:", error);
      throw error;
    }
  }

  static async findByName(name) {
    try {
      return await prisma.category.findFirst({
        where: { name: name.toString() },
      });
    } catch (error) {
      console.error("Error finding category by name:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating category with data: ${JSON.stringify(data)}`);
      return await prisma.category.create({
        data,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating category with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.category.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating category by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting category with ID ${id}`);
      return await prisma.category.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting category by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.category.findMany();
    } catch (error) {
      console.error("Error finding all categories:", error);
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
              { mainCategory: { contains: query, mode: "insensitive" } },
              { name: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated categories
      const categories = await prisma.category.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of categories
      const totalCategories = await prisma.category.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalCategories / limit);

      return {
        data: categories,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalCategories,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(
        "Error getting categories with pagination and search:",
        error
      );
      throw error;
    }
  }
}

module.exports = Category;
