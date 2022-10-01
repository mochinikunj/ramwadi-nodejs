const connection = require('./connection');

const contactusTableQuery = 'CREATE TABLE contactus (uid int NOT NULL AUTO_INCREMENT, name VARCHAR(100), email VARCHAR(100), phone VARCHAR(100), subject VARCHAR(100), message VARCHAR(2000), PRIMARY KEY (uid))';
connection.query(contactusTableQuery, (err, result) => {
    if (err) {
        throw new Error(err);
    }

    console.log('contactus Table created!');
    console.log(result);
});

module.exports = connection;