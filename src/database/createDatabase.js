const connection = require('./connection');

const database = process.env.MYSQL_DATABASE;
connection.query(`CREATE DATABASE ${database}`, (err, result) => {
    if (err) {
        throw new Error(err);
    }

    console.log(`Database created with name: ${database}`);
    console.log(result);
});

module.exports = connection;