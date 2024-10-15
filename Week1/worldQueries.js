const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // your MySQL user
    password: 'nima',  // your MySQL password
    database: 'world'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL');
});

// Queries to run
const queries = [
    "SELECT Name FROM country WHERE Population > 8000000;",
    "SELECT Name FROM country WHERE Name LIKE '%land%';",
    "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;",
    "SELECT Name FROM country WHERE Continent = 'Europe';",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC;",
    "SELECT Name FROM city WHERE CountryCode = 'NLD';",  // Netherlands
    "SELECT Population FROM city WHERE Name = 'Rotterdam';",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    "SELECT Name FROM city ORDER BY Population DESC LIMIT 10;",
    "SELECT SUM(Population) AS WorldPopulation FROM country;"
];

// Execute queries
queries.forEach((query, index) => {
    connection.query(query, (err, results) => {
        if (err) throw err;
        console.log(`Query ${index + 1} result:`, results);
    });
});

// Close the connection
connection.end();
