// const request = require("supertest");
// const app = require("../app"); // Import Express app
// const mongoose = require("mongoose");
// const Category = require("../model/Category");

// let categoryId; // Store category ID for tests

// // Sample category data
// const categoryData = {
//     name: "Technology",
//     description: "Latest updates on technology",
// };

// beforeAll(async () => {
//     // Ensure the category doesn't already exist
//     await Category.deleteMany({ name: categoryData.name });

//     // Create a test category
//     const response = await request(app)
//         .post("/api/category/save")
//         .send(categoryData);

//     expect(response.statusCode).toBe(201);
//     categoryId = response.body._id;
// });

// afterAll(async () => {
//     await Category.deleteOne({ _id: categoryId }); // Cleanup category
//     await mongoose.connection.close(); // Close DB connection
// });

// describe("Category API Endpoints", () => {
//     it("should create a new category", async () => {
//         const response = await request(app)
//             .post("/api/category/save")
//             .send({
//                 name: "Science",
//                 description: "Latest science news",
//             });

//         expect(response.statusCode).toBe(201);
//         expect(response.body.name).toBe("Science");
//         expect(response.body.description).toBe("Latest science news");
//     });

//     it("should retrieve all categories", async () => {
//         const response = await request(app).get("/api/category/");
//         expect(response.statusCode).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//     });

//     it("should retrieve a single category by ID", async () => {
//         if (!categoryId) {
//             throw new Error("Test category does not exist");
//         }

//         const response = await request(app).get(`/api/category/${categoryId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.name).toBe(categoryData.name);
//     });

//     it("should update a category", async () => {
//         if (!categoryId) {
//             throw new Error("Test category does not exist");
//         }

//         const updatedData = { name: "Tech Updated", description: "Updated description" };

//         const response = await request(app)
//             .put(`/api/category/${categoryId}`)
//             .send(updatedData);

//         expect(response.statusCode).toBe(201);
//         expect(response.body.name).toBe("Tech Updated");
//         expect(response.body.description).toBe("Updated description");
//     });

//     it("should delete a category", async () => {
//         if (!categoryId) {
//             throw new Error("Test category does not exist");
//         }

//         const response = await request(app).delete(`/api/category/${categoryId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toBe("Data Deleted");
//     });
// });
