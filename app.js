const express = require("express")
const connectDb = require("./config/db")

const app = express();

connectDb();



const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})