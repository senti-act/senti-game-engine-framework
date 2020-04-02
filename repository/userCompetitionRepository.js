var dbConnection=require('../database/dbConnection');
var DbConnection=new dbConnection();

class UserCompetition {

    getById(id){
        return new Promise((resolve, reject)=>{ 
            DbConnection.runQuery(`SELECT * FROM UserCompetition WHERE competition_id='${id}'`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    orderByPoints(id){
        return new Promise((resolve, reject)=>{ 
            DbConnection.runQuery(`SELECT * FROM UserCompetition WHERE competition_id='${id}' order by points desc`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }
} 

module.exports=UserCompetition