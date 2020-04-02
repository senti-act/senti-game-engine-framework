var dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();

class Competition {

    getAll() {
        return new Promise((resolve, reject) => {
            DbConnection.runQuery(`SELECT * from Competition`).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }

    getAllUserCompetition() {
        return new Promise((resolve, reject) => {
            DbConnection.runQuery(`SELECT * from UserCompetition`).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }

    postCompetition(competition) {
        return new Promise((resolve, reject) => {
            DbConnection.runQueryWithBody(`INSERT INTO Competition SET ?`, competition).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }
}

module.exports = Competition