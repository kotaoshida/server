const express = require('express');
require("express-async-errors");
const router = express.Router();
const bcrypt = require("bcrypt")
const app = express()
const db = require("../config/db")


app.use(express.urlencoded({ extended: true }));



router.post("/register",async(req,res)=>{
 
    try{
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,10);
    db.query("INSERT INTO user (username,password) VALUES (?,?);",[username,password],async(err,result)=>{
        if(err){
            res.json({message: "既に存在しているユーザー名です。別の名前を指定してください。"})
        }
        res.send(result)
    })
    }catch{
        res.json({message: "既に存在しているユーザー名です。別の名前を指定してください。"})
    }
})

router.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE username = ?",
        username,
        async(err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result){
            if(result.length<1){
                res.json({login:false,message:"入力されたユーザーが存在しません。"})
            }
            else if(await bcrypt.compare(password,result[0].password)){
                res.json({login:true,username:username})
            }else{
                res.json({login:false,message:"パスワードが間違っています。"})
            }
        } 
        
    })
})

router.get("/",(req,res)=>{
    const username = req.user;
    console.log(username)
    db.query(`SELECT * FROM saunalog WHERE username = ?`,username,
    (err,result)=>{
        if(err){
           
            console.log(err)
        }else{
           
            res.send(result)
        }
    }
    )
})


router.get('/logout', (req, res) => {

    console.log("a")
  });

module.exports = router 



