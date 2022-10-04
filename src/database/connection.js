const mysql = require('mysql');

const dbInfo = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const connection = mysql.createConnection(dbInfo);
connection.connect((err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Database connected!', dbInfo);
});

module.exports = connection;