const express = require("express");
const cors = require('cors')
const app = express()
const https = require('https')
const fs = require('fs')
const flash = require("connect-flash")
const session = require("express-session")


app.use(flash());
app.use(cors());

app.use(express.json());

const PORT = "3001"

const userRoute =require("./route/user");
app.use("/user",userRoute);

const uploadRoute =require("./route/upload");
app.use("/upload",uploadRoute);

app.listen(process.env.PORT||PORT, () => console.log(`Listening on port ${PORT}!`))


