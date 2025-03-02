// const request = require("supertest");
// const app = require("../app"); // Import the Express app
// const mongoose = require("mongoose");
// const Student = require("../model/student");

// let authToken;
// let studentId; // Store created student's ID

// // Sample user data
// const studentData = {
//     fullName: "John Doe",
//     email: "johndoe@example.com",
//     password: "password123",
// };

// beforeAll(async () => {
//     // Cleanup: Delete existing student if they exist
//     await Student.deleteOne({ email: studentData.email });

//     // Register a new test student
//     const registerResponse = await request(app)
//         .post("/api/users/register")
//         .send({ data: studentData });

//     // Log in to get authentication token
//     const loginResponse = await request(app)
//         .post("/api/users/login")
//         .send({ data: { email: studentData.email, password: studentData.password } });

//     authToken = loginResponse.body.token;

//     // Get student ID from DB
//     const student = await Student.findOne({ email: studentData.email });
//     studentId = student ? student._id.toString() : null;
// });

// afterAll(async () => {
//     await Student.deleteOne({ email: studentData.email }); // Cleanup created student
//     await mongoose.connection.close(); // Close DB connection to prevent Jest hanging
// });

// describe("Student API Endpoints", () => {
//     it("should register a new student", async () => {
//         const response = await request(app)
//             .post("/api/users/register")
//             .send({
//                 data: {
//                     fullName: "Jane Doe",
//                     email: "janedoe@example.com",
//                     password: "password123",
//                 },
//             });

//         expect(response.statusCode).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe("User created successfully");
//     });

//     it("should log in an existing student", async () => {
//         const response = await request(app)
//             .post("/api/users/login")
//             .send({ data: { email: studentData.email, password: studentData.password } });

//         expect(response.statusCode).toBe(200);
//         expect(response.body.token).toBeDefined();
//     });

//     it("should retrieve all students", async () => {
//         const response = await request(app)
//             .get("/api/users/getAllStudents")
//             .set("Authorization", `Bearer ${authToken}`);

//         expect(response.statusCode).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(Array.isArray(response.body.data)).toBe(true);
//     });

//     it("should send a password reset email", async () => {
//         const response = await request(app)
//             .post("/api/users/forgot-password")
//             .send({ email: studentData.email });

//         expect(response.statusCode).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe("Password reset link sent to your email!");
//     });

//     it("should retrieve a single student", async () => {
//         if (!studentId) {
//             throw new Error("Test student does not exist in the database");
//         }

//         const response = await request(app)
//             .get(`/api/users/getStudents/${studentId}`)
//             .set("Authorization", `Bearer ${authToken}`);

//         expect(response.statusCode).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.data.email).toBe(studentData.email);
//     });

//     it("should delete a student", async () => {
//         if (!studentId) {
//             throw new Error("Test student does not exist in the database");
//         }

//         const response = await request(app)
//             .delete(`/api/users/deleteStudent/${studentId}`)
//             .set("Authorization", `Bearer ${authToken}`);

//         expect(response.statusCode).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe("Student deleted successfully");
//     });
// });
