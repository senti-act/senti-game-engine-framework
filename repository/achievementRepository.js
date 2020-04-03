var dbConnection = require('../database/dbConnection');
var DbConnection = new dbConnection();

class Achievement {

    // Get all achievements
    getAll() {
        return new Promise((resolve, reject) => {
            DbConnection.runQuery(`SELECT * FROM Achievement`).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }

    // Get achievement by user_id
    getAchievementsByUserId(userId) {
        return new Promise((resolve, reject) => {
            DbConnection.runQuery(`SELECT Achievement.*, User.Id FROM Achievement
            INNER JOIN UserAchievements ON Achievement.id =  UserAchievements.achievement_id 
            INNER JOIN User ON User.id =  UserAchievements.user_id 
            WHERE UserAchievements.user_id ='${userId}'`).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }

    // Get xp by user_id
    getXpFromAchievementByUserId(userId) {
        return new Promise((resolve, reject) => {
            DbConnection.runQuery(`SELECT Achievement.id, Achievement.xp, Achievement.name, User.id, User.nickname
            FROM Achievement, UserAchievements, User
            WHERE User.id =  UserAchievements.user_id AND
            Achievement.id =  UserAchievements.achievement_id AND
            UserAchievements.user_id ='${userId}'`).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }

    createAchievement(achievement) {
        return new Promise((resolve, reject) => {
            DbConnection.runQueryWithBody("INSERT INTO Achievement SET ?", achievement).then((x) => {
                resolve(x);
            }).catch(x => {
                reject(x);
            })
        })
    }
}

module.exports = Achievement