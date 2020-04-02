var dbConnection=require('../database/dbConnection');
var DbConnection=new dbConnection();

class User{

    getAll(){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * FROM User `).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    getById(id){
        return new Promise((resolve, reject)=>{ 
            DbConnection.runQuery(`SELECT * FROM User WHERE id='${id}'`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    updateUser(id,update){
        return new Promise((resolve,reject)=>{
            DbConnection.runQueryWithBody(`UPDATE User SET ? where id='${id}'`,update).then(x=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    create(user){
        return new Promise((resolve, reject)=>{
            DbConnection.runQueryWithBody("INSERT INTO User SET ?",user).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }
}

module.exports=User