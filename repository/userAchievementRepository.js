var dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();

class UserAchievement {

    getByUserId(id) {
        return new Promise((resolve, reject) => {
            DbConnection.runQuery(`SELECT * FROM UserAchievements
            INNER JOIN Achievement A on UserAchievements.achievement_id = A.id
            WHERE user_id='${id}'`).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }

    create(obj) {
        return new Promise((resolve, reject) => {
            DbConnection.runQueryWithBody("INSERT INTO UserAchievements SET ?", obj).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }
}

module.exports = UserAchievement