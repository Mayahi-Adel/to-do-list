const mysql = require('mysql2')

const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "to_do_list_db"
})

db.connect((error) => {
    if(error) throw error;
    console.log("database connection")
})

module.exports = db
