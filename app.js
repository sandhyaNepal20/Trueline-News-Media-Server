const cors = require("cors")
const dotenv = require("dotenv");
const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./routes/UserRoute")
const CategoryRouter = require("./routes/CategoryRoute")
const NewsRouter = require("./routes/NewsRoute")
const CommentRouter = require("./routes/CommentRoute")
const ShareRoute = require("./routes/ShareRoute")
const AuthRouter = require("./routes/AuthRoute")
const NotificationsRouter = require("./routes/NotificationsRoute")
const auth = require("./routes/student");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "assets")));

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5173'] // Whitelist the domains you want to allow
};
app.use(cors(corsOptions)); // Use the cors middleware with your options

// Load env file
dotenv.config({
    path: "./config/config.env",
});
connectDb();
// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Parse form data
app.use(express.urlencoded({ extended: true }));
// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/news", NewsRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/share", ShareRoute);
app.use("/api/auth", AuthRouter);
app.use("/api/notifications", NotificationsRouter);
app.use("/api/users", auth);
app.use("/news_image", express.static("news_image"))




const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})

module.exports = app; // Exporting app for testing
