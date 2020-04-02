var dbConnection=require('../database/dbConnection');
var DbConnection=new dbConnection();

class Level{
    getAllLevels(){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * from Level`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }
}

module.exports=Level