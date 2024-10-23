import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "nima",
});

console.log("Connected as id " + connection.threadId);

const main = async () => {
    try {
        const dropDatabase = "DROP DATABASE IF EXISTS assignment";
        const createDatabase = "CREATE DATABASE IF NOT EXISTS assignment";

        await connection.query(dropDatabase);
        await connection.query(createDatabase);
        await connection.query("USE author_db");
        console.log("Database created");

        const createTableAuthor =
            "CREATE TABLE IF NOT EXISTS author (author_id INT AUTO_INCREMENT PRIMARY KEY, author_name VARCHAR(50) NOT NULL, date_of_birth DATE NOT NULL, h_index INT, gender ENUM('m', 'f') NOT NULL)";

        await connection.query(createTableAuthor);
        console.log("Table created");

        const addColumn = "ALTER TABLE author ADD COLUMN mentor INT";

        await connection.query(addColumn);
        console.log("Column added");

        const addConstraint =
            "ALTER TABLE author ADD CONSTRAINT mentor_fk FOREIGN KEY (mentor) REFERENCES author(author_id)";

        await connection.query(addConstraint);
        console.log("Constraint added");

        const insertQuery = `
            INSERT INTO author (author_name, date_of_birth, h_index, gender, mentor) VALUES
            ('John', '1995-03-19', 10, 'f', 1),
            ('Mark', '1991-12-11', 9, 'f', 2),
            ('Tim', '1992-12-21', 8, 'm', 3),
            ('Jo', '1990-12-29', 7, 'm', 4),
            ('Max', '1994-02-19', 6, 'm', 5),
            ('Nima', '1995-04-14', 5, 'f', 6),
            ('Fred', '1997-12-16', 4, 'f', 1),
            ('Kim', '1992-01-04', 3, 'm', 7),
            ('Sara', '1988-10-03', 2, 'f', 8),
            ('Chester', '2000-07-14', 1, 'm', 9),
            ('Kevin', '1998-11-24', 2, 'f', 2),
            ('Fill', '1999-02-14', 1, 'm', 3),
            ('Liam', '1982-03-01', 2, 'f', 4),
            ('Liana', '1998-10-06', 1, 'm', 5),
            ('Withney', '1992-01-02', 8, 'f', 6);
        `;

        await connection.query(insertQuery);
        console.log("Data inserted");
    } catch (error) {
        console.log("error:", error.message);
        console.log("error:", error.stack);
    } finally {
        await connection.end();
    }
};

main();