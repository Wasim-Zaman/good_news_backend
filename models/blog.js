const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Blog {
  static async findById(id) {
    try {
      return await prisma.blog.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error finding blog by id:", error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      return await prisma.blog.findFirst({
        where: { title: title.toString() },
      });
    } catch (error) {
      console.error("Error finding blog by title:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating blog with data: ${JSON.stringify(data)}`);
      return await prisma.blog.create({
        data,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      console.log(
        `Updating blog with ID ${id} and data: ${JSON.stringify(data)}`
      );
      return await prisma.blog.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error("Error updating blog by id:", error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting blog with ID ${id}`);
      return await prisma.blog.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error deleting blog by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.blog.findMany();
    } catch (error) {
      console.error("Error finding all blogs:", error);
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
              { visibility: { contains: query, mode: "insensitive" } },
              { status: { contains: query, mode: "insensitive" } },
              { type: { contains: query, mode: "insensitive" } },
            ],
          }
        : {};

      // Fetch the paginated blogs
      const blogs = await prisma.blog.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of blogs
      const totalBlogs = await prisma.blog.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalBlogs / limit);

      return {
        data: blogs,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalBlogs,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting blogs with pagination and search:", error);
      throw error;
    }
  }
}

module.exports = Blog;
