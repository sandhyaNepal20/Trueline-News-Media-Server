const express = require("express")
const connectDb = require("./config/db")
const UserRouter = require("./routes/UserRoute")

const app = express();

connectDb();

app.use(express.json());
app.use("/api/user", UserRouter);
const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})