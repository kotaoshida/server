const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../config/db")


function initialize(passport,confirmUsername){

    const authenicateUser =  async(username,password,done)=>{
        db.query("SELECT * FROM user WHERE username = ?",
        username,async(err,result)=>{
            if (result === null){
                return done(null,false,{messege:"no user"})
            }try{
                if(await bcrypt.compare(result[0].password,password)){
                    return done(null,user)
    
                }else{
                    return done(null,false,{message:"no password"})}
            }
            catch(e){
                return done(e)
            }
    
        }
        )}
        

    passport.use(new LocalStrategy({username:"username"},authenicateUser))
    // passport.serilizeUser((user,done)=>{})
    // passport.deserilizeUser((id,done)=>{})

}

module.exports =initialize

