var dbConnection= require('../database/dbConnection');
var DbConnection= new dbConnection();

class Activity{


    getAll(){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * FROM Activity`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    getActivitesById(id){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * FROM Activity where id='${id}'`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    getActivitiesByUserId(userId){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * FROM Activity where user_id='${userId}'`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x)
            })
        })
    }
}

module.exports=Activity