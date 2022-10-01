const connection = require('./../connection');

const storeContactUsDetails = (request) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO contactus (name, email, contactNumber, subject, message) VALUES ('${request.name}', '${request.email}', '${request.contactNumber}', '${request.subject}', '${request.message}')`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve({
                code: 200,
                status: 'OK',
                data: result
            });
        });
    });
};

module.exports = storeContactUsDetails;