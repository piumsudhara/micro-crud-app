const mysql = require('mysql');

// Create the database connection object
const connection = mysql.createConnection({
  host: 'microcrud.cxe23sq0q6yl.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin123',
  database: 'crudapp',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = connection;