const express = require("express");
const cors = require('cors')
const app = express()



app.use(cors())

app.use(express.json());

const PORT = "3001"

const userRoute =require("./route/user");
app.use("/user",userRoute);

const uploadRoute =require("./route/upload");
app.use("/upload",uploadRoute);

app.listen(process.env.PORT||PORT, function () {
  console.log('Example app listening on port 3000! Go to https://localhost:3000/')
})


