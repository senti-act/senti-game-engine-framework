var mysql = require('mysql');
var connectionPool;

class DbConnection{
    createPool(){
        return new Promise((resolve, reject) => {
            try{
                connectionPool=mysql.createPool({
                    host:'remotemysql.com',
                    user: 'Zqpe6GE5nT',
                    password: 'KOR7DdSMoo',
                    database: 'Zqpe6GE5nT'
                })
                resolve();
            }
            catch(err){
                reject(err);
            }
        })
    }
    runQuery(query){
        return new Promise((resolve, reject) =>{
            connectionPool.query(query,(err,res,fields)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            })
        })
    }
    runQueryWithBody(query,body){
        return new Promise((resolve, reject) =>{
            connectionPool.query(query,body,(err,res,fields)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            })
        })
    }
}

module.exports=DbConnection