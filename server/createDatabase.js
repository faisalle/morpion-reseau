const { createVerify } = require('crypto');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:'password',
});

db.connect(err => {
    if(err)
        console.log(err)
    else{
        console.log('Connecté à la base de donnée')
        deleteDatabase('morpion')
    }
})

const manageDatabase = (sql, successMsg, nextCall, database) => {
    db.query(sql,(err,res) => {
        if (err)
            console.log(err)
        else {
            console.log(successMsg)
            if(nextCall)
                nextCall(database) 
        }
        
    })
}

const deleteDatabase = (database) => {
    manageDatabase(`DROP DATABASE ${database}`,"delete success",createDatabase,database)
}
const createDatabase = (database) => {
    manageDatabase(`CREATE DATABASE ${database}`,"create success",useDatabase,database)

}
const useDatabase = (database) => {
    manageDatabase(`USE ${database}`,"use success",createStatistics,database)

}

const createStatistics = (database) => {
    manageDatabase(`CREATE TABLE stats(winX INT, winO INT, draw INT)`,"createStat success",false,database)
}

 /*   deleteDatabase(database)
    createDatabase(database)
    useDatabase(database)
    createStatistics(database) */