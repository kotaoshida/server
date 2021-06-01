const express = require('express');
const router = express.Router();


const db = require("../config/db");

router.post("/",(req,res)=>{
    const sauna = req.body.sauna;
    const saunaroomrate = req.body.saunaroomrate;
    const waterbathrate = req.body.waterbathrate;
    const windrate =req.body.windrate;
    const username=req.body.username;
    const memo = req.body.memo;
    console.log(saunaroomrate)
    db.query("INSERT INTO saunalog (sauna,saunaroomrate,waterbathrate,windrate,username,memo) VALUES (?,?,?,?,?,?);",[sauna,saunaroomrate,waterbathrate,windrate,username,memo],(err,result)=>{
        console.log(err)
        res.send(result)
    })
})

router.put("/",(req,res)=>{
    const sauna = req.body.sauna;
    const saunaroomrate = req.body.saunaroomrate;
    const waterbathrate = req.body.waterbathrate;
    const windrate =req.body.windrate;
    const username=req.body.username;
    const memo = req.body.memo
    const id = req.body.id
    db.query("UPDATE saunalog SET sauna = ?,saunaroomrate = ?,waterbathrate = ?,windrate = ?,username = ?,memo = ? WHERE id = ?;",[sauna,saunaroomrate,waterbathrate,windrate,username,memo,id],(err,result)=>{
        console.log(err)
        res.send(result)
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

router.delete("/",(req,res)=>{
    const id = req.body.id;
    db.query(`DELETE FROM saunalog where id = ?`,id,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
           
            res.send(result)
        }
    }
    )
})

module.exports = router 