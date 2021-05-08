const express = require("express");
const cors = require('cors')
const app = express()

const fs = require('fs')
const https = require('https')


app.use(cors())

app.use(express.json());

const userRoute =require("./route/user");
app.use("/user",userRoute);

const uploadRoute =require("./route/upload");
app.use("/upload",uploadRoute);

https.createServer({
  key: fs.readFileSync("/Users/kotaoshida/key.pem"),
  cert: fs.readFileSync('/Users/kotaoshida/cert.pem')
}, app)
.listen(3001, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})


