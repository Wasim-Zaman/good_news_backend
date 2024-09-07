const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class User {
  static async findById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw error;
    }
  }

  //   static async findByEmail(email) {
  //     try {
  //       return await prisma.user.findUnique({
  //         where: { email: email },
  //       });
  //     } catch (error) {
  //       console.error("Error finding user by email:", error);
  //       throw error;
  //     }
  //   }

  static async findByMobileNumber(mobileNumber) {
    try {
      return await prisma.user.findUnique({
        where: { mobileNumber: mobileNumber },
      });
    } catch (error) {
      console.error("Error finding user by mobile number:", error);
      throw error;
    }
  }

  static async create(data) {
    try {
      console.log(`Creating user with data: ${JSON.stringify(data)}`);
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async updateById(id, data) {
    try {
      // Perform the update
      return await prisma.user.update({
        where: { id: id.toString() },
        data,
      });
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error.message);
      throw new Error(`Unable to update user with id ${id}`);
    }
  }

  static async deleteById(id) {
    try {
      console.log(`Deleting user with ID ${id}`);
      return await prisma.user.delete({
        where: { id: id },
      });
    } catch (error) {
      console.error("Error deleting user by id:", error);
      throw error;
    }
  }

  static async getAll() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error("Error finding all users:", error);
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
              { fullName: { contains: query } },
              { email: { contains: query } },
              { mobileNumber: { contains: query } },
            ],
          }
        : {};

      // Fetch the paginated users
      const users = await prisma.user.findMany({
        skip,
        take: limit,
        where,
      });

      // Fetch the total number of users
      const totalUsers = await prisma.user.count({ where });

      // Calculate total pages
      const totalPages = Math.ceil(totalUsers / limit);

      return {
        users: users,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalUsers,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error("Error getting users with pagination and search:", error);
      throw error;
    }
  }

  // New login method
  static async login(mobileNumber) {
    try {
      let user = await this.findByMobileNumber(mobileNumber);

      if (!user) {
        // If user doesn't exist, create a new one with only mobileNumber
        user = await this.create({ mobileNumber });
        console.log(`Created new user with mobile number: ${mobileNumber}`);
      } else {
        console.log(`User with mobile number: ${mobileNumber} already exists`);
      }

      return user;
    } catch (error) {
      console.error("Error during login process:", error);
      throw error;
    }
  }

  // New method to update the status of the user
  //   static async updateStatus(id, status) {
  //     try {
  //       // Perform the update of the status field
  //       return await prisma.user.update({
  //         where: { id: id.toString() },
  //         data: { status },
  //       });
  //     } catch (error) {
  //       console.error(
  //         `Error updating status for user with id ${id}:`,
  //         error.message
  //       );
  //       throw new Error(`Unable to update status for user with id ${id}`);
  //     }
  //   }
}

module.exports = User;
