const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./routes/UserRoute")
const CategoryRouter = require("./routes/CategoryRoute")
const NewsRouter = require("./routes/NewsRoute")
const CommentRouter = require("./routes/CommentRoute")
const ShareRoute = require("./routes/ShareRoute")

const NotificationsRouter = require("./routes/NotificationsRoute")


const app = express();

connectDb();

app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/news", NewsRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/share", ShareRoute);

app.use("/api/notifications", NotificationsRouter);



const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})