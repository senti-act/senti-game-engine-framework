var dbConnection=require('../database/dbConnection');
var DbConnection=new dbConnection();

class Achievement{

    getAll(){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * FROM Achievement`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    getAchievementsByUserId(userId){
        return new Promise((resolve, reject)=>{ 
            DbConnection.runQuery(`SELECT * FROM UserAchievements where user_id='${userId}'`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    //get xp for user
}

module.exports=Achievement