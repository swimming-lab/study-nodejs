const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'database_development',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// pool.connect();
// Create the connection pool. The pool-specific settings are the defaults

pool.query(
    'SELECT * FROM `users` where `name` = ?', 
    ['swimming'],
    (err, rows, fields) => {
        if (err) console.log(err);
        console.log('rows', rows);
        console.log('fields', fields);
});

// pool.end();
// Connection is automatically released when query resolves