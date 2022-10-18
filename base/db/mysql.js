const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'database_development',
    // rowsAsArray: true
});

connection.connect();

// connection.query(
//     'SELECT * FROM `users`', 
//     (err, rows, fields) => {
//         if (err) console.log(err);
//         console.log('rows', rows);
//         console.log('fields', fields);
// });

connection.query(
    // { sql: 'SELECT * FROM `users` where `name` = ?', rowsAsArray: true },
    'SELECT * FROM `users` where `name` = ?',
    ['swimming'],
    (err, rows, fields) => {
        if (err) console.log(err);
        console.log('rows', rows);
        // console.log('fields', fields);
});

connection.end();