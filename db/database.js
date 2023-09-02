import mysql from 'mysql2/promise';

//initialized database
const dbpool = mysql.createPool ({
    host:"127.0.0.1",
    user:"root",
    password: "sayaalfin1",
    database: "shopping_cart",
    port: 3306
})

export default dbpool;