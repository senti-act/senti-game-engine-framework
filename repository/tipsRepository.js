var dbConnection=require('../database/dbConnection');
var DbConnection=new dbConnection();

class Tips{

    getAllApproved(){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * from Tips
            inner join TipCategory TC on Tips.category_id = TC.id
            where approved = 1`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    getByCategoryId(id){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * from Tips where category_id = ${id} and approved = 1`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    getAllCategories(){
        return new Promise((resolve, reject)=>{
            DbConnection.runQuery(`SELECT * from  TipCategory`).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }

    postTip(tip){
        return new Promise((resolve, reject)=>{
            DbConnection.runQueryWithBody("INSERT INTO Tips SET ?",tip).then((x)=>{
                resolve(x);
            }).catch(x=>{
                reject(x);
            })
        })
    }
}

module.exports=Tips