// const request = require("supertest");
// const app = require("../app"); // Import Express app
// const mongoose = require("mongoose");
// const News = require("../model/News");
// const Category = require("../model/Category");
// const Student = require("../model/student");

// let newsId;
// let categoryId;
// let userId;

// // Sample data
// const categoryData = {
//     name: "Technology",
//     description: "Latest tech news",
// };

// const userData = {
//     fullName: "John Doe",
//     email: "johndoe@example.com",
//     password: "password123",
// };

// const newsData = {
//     title: "Breaking Tech News",
//     content: "The latest tech updates are here!",
//     created_at: new Date().toISOString(),
//     image: "test-image.jpg",
// };

// beforeAll(async () => {
//     // Ensure clean database
//     await News.deleteMany({});
//     await Category.deleteMany({});
//     await Student.deleteMany({});

//     // Create category
//     const categoryResponse = await request(app)
//         .post("/api/category/save")
//         .send(categoryData);
//     categoryId = categoryResponse.body._id;

//     // Create user
//     const userResponse = await request(app)
//         .post("/api/users/register")
//         .send({ data: userData });

//     userId = (await Student.findOne({ email: userData.email }))._id.toString();

//     // Create news article
//     const newsResponse = await request(app)
//         .post("/api/news/save")
//         .field("userId", userId)
//         .field("categoryId", categoryId)
//         .field("title", newsData.title)
//         .field("content", newsData.content)
//         .field("created_at", newsData.created_at)
//         .attach("file", Buffer.from("test-image-content"), "test-image.jpg");

//     expect(newsResponse.statusCode).toBe(201);
//     newsId = newsResponse.body._id;
// });

// afterAll(async () => {
//     await News.deleteMany({});
//     await Category.deleteMany({});
//     await Student.deleteMany({});
//     await mongoose.connection.close(); // Close DB connection
// });

// describe("News API Endpoints", () => {
//     it("should create a news article", async () => {
//         const response = await request(app)
//             .post("/api/news/save")
//             .field("userId", userId)
//             .field("categoryId", categoryId)
//             .field("title", "New Science Discovery")
//             .field("content", "Scientists discover new particle.")
//             .field("created_at", new Date().toISOString())
//             .attach("file", Buffer.from("test-image-content"), "science-image.jpg");

//         expect(response.statusCode).toBe(201);
//         expect(response.body.title).toBe("New Science Discovery");
//     });

//     it("should retrieve all news articles", async () => {
//         const response = await request(app).get("/api/news/getAll");
//         expect(response.statusCode).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//     });

//     it("should retrieve a single news article by ID", async () => {
//         const response = await request(app).get(`/api/news/${newsId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body.title).toBe(newsData.title);
//     });

//     it("should update a news article", async () => {
//         const updatedData = { title: "Updated Tech News", content: "Updated content" };

//         const response = await request(app)
//             .put(`/api/news/${newsId}`)
//             .send(updatedData);

//         expect(response.statusCode).toBe(201);
//         expect(response.body.title).toBe("Updated Tech News");
//     });

//     it("should delete a news article", async () => {
//         const response = await request(app).delete(`/api/news/${newsId}`);
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toBe("Data Deleted");
//     });

//     it("should retrieve news articles by category", async () => {
//         const response = await request(app).get(`/api/news/category/${categoryId}`);
//         expect(response.statusCode).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//     });
// });
