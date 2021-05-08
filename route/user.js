const express = require('express');
const router = express.Router();


const db = require("../config/db");

router.post("/register",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO user (username,password) VALUES (?,?);",[username,password],(err,result)=>{
        console.log(err)
        res.send(result)
    })
})

router.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user WHERE username = ?",
        username,
        (err,result)=>{
        if(err){
            console.log(err);
        }
        else if(result){
            if(result.length<1){
                res.json({login:false,message:"no user"})
            }
            else if(password==result[0].password){
                res.json({login:true,username:username})
            }else{
                res.json({login:false,message:"wrong!"})
            }
        } 
        
    })
})

module.exports = router 



