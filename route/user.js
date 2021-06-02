const express = require('express');
require("express-async-errors");
const router = express.Router();
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")
const app = express()
const db = require("../config/db")
var LocalStrategy = require('passport-local').Strategy;


app.use(express.urlencoded({ extended: true }));

passport.use(new LocalStrategy(function(username, password, done){
    console.log(username)
    db.query("SELECT * FROM user WHERE username = ?",[username]
        ,(err,result)=>{
            const hash = result[0].password

            if (result === null){
                return done(null,false,{messege:"no user"})
            }try{
                if(password===result[0].password){
                    return done(null,username)
    
                }else{
                    return done(null,false,{message:"no password"})}
            }
            catch(e){
                return done(e)
            }
    
        }
        )
}));



app.use(flash());
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
    proxy:true,
    cookie:{
        secure: true,
        maxage: 1000 * 60 * 60,
        sameSite:"none"
        }
}))
app.use(passport.initialize())


function isAuthenticated(req, res, next){
    if (req.isAuthenticated()) {  // 認証済
        return next();
    }
    else {  // 認証されていない
        console.log("not login")
       // ログイン画面に遷移
    }
}


router.post("/register",async (req,res)=>{
 
    try{
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password,10);
    db.query("INSERT INTO user (username,password) VALUES (?,?);",[username,password],(err,result)=>{
        console.log(err)
        res.send(result)
    })
    }catch{
        res.send(result)
    }
})

router.post("/login",async(req,res,next)=>{
   await passport.authenticate("local",(err,user,info)=>{
    // if(err) throw err;
    console.log(err)
    if(!user)res.send("nouser");
    else{
        req.logIn(user,err=>{
            if(err)throw err;
            res.send(user);
            console.log(req.user);
        })
    }
})(req,res,next);
})

router.get("/",isAuthenticated,(req,res)=>{
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

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.get('/logout', (req, res) => {

    req.session.destroy();
    console.log("a")
  });

module.exports = router 



