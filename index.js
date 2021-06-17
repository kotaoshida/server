const express = require("express");
const cors = require('cors')
const app = express()
const https = require('https')
const fs = require('fs')
const server = require('https').createServer({
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./cert.pem'),
}, app)
const flash = require("connect-flash")
const passport = require("passport")
const session = require("express-session")

app.use(passport.initialize())
app.use(passport.session())

app.use(flash());
app.use(cors());

app.use(express.json());

const PORT = "3001"

const userRoute =require("./route/user");
app.use("/user",userRoute);

const uploadRoute =require("./route/upload");
app.use("/upload",uploadRoute);

app.listen(process.env.PORT||PORT, () => console.log(`Listening on port ${PORT}!`))


